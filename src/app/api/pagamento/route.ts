import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session || !session.user?.email) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });

    let user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) {
      user = await prisma.user.create({ data: { email: session.user.email, name: session.user.name || 'Cliente B.SKW', image: session.user.image || '' } });
    }

    const body = await req.json();
    const { formData, cartItems, totalGeral } = body;
    
    const idempotencyKey = crypto.randomUUID();

    const response = await fetch('https://api.mercadopago.com/v1/payments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'X-Idempotency-Key': idempotencyKey,
      },
      body: JSON.stringify({
        ...formData,
        description: 'Pedido B.SKW',
        external_reference: `BSKW-${Date.now()}`,
        payer: {
          ...formData.payer,
          email: user.email, 
        }
      }),
    });

    const payment = await response.json();

    if (payment.status === 'approved' || payment.status === 'pending' || payment.status === 'in_process') {
       await prisma.order.create({
          data: {
            userId: user.id,
            total: Number(totalGeral),
            externalReference: payment.id.toString(),
            status: payment.status === 'approved' ? 'PROCESSANDO' : 'PENDENTE',
            paymentUrl: payment.point_of_interaction?.transaction_data?.ticket_url || payment.point_of_interaction?.transaction_data?.qr_code || '',
            items: {
              create: cartItems.map((item: any) => ({
                nome: item.titulo, cor: item.cor, tamanho: item.tamanho, quantity: Number(item.quantidade), price: Number(item.preco)
              }))
            }
          }
       });
       
       return NextResponse.json({ 
          success: true, 
          status: payment.status, 
          // Retornamos o texto e a IMAGEM BASE64 do QR Code!
          pix_qr_code: payment.point_of_interaction?.transaction_data?.qr_code,
          pix_qr_code_base64: payment.point_of_interaction?.transaction_data?.qr_code_base64,
          ticket_url: payment.point_of_interaction?.transaction_data?.ticket_url
       });
    } else {
       return NextResponse.json({ error: 'Pagamento não aprovado.', detalhes: payment }, { status: 400 });
    }

  } catch (error: any) {
    return NextResponse.json({ error: 'Erro interno', mensagem: error.message }, { status: 500 });
  }
}
