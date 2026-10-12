import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session || !session.user?.email) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });

    const body = await req.json();
    const { cartItems, frete, desconto, totalGeral } = body;

    let items = [];

    // O Mercado Pago não aceita itens com valor negativo. 
    // Se houver desconto, enviamos o pacote fechado com o total exato.
    if (desconto > 0 || totalGeral === 0.01) {
      items.push({
        title: totalGeral === 0.01 ? 'Pedido B.SKW (Modo de Teste)' : 'Pedido B.SKW (Itens + Frete - Cupom)',
        unit_price: Number(totalGeral),
        quantity: 1,
        currency_id: 'BRL'
      });
    } else {
      // Se não houver desconto, enviamos a lista detalhada para o MP
      items = cartItems.map((item: any) => ({
        title: `${item.titulo} | Cor: ${item.cor} | Tam: ${item.tamanho}`,
        unit_price: Number(item.preco),
        quantity: Number(item.quantidade),
        currency_id: 'BRL'
      }));
      if (frete > 0) {
        items.push({ title: 'Frete de Envio', unit_price: Number(frete), quantity: 1, currency_id: 'BRL' });
      }
    }

    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`, 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        items: items,
        back_urls: { 
          success: `${process.env.NEXTAUTH_URL}/sucesso`, 
          failure: `${process.env.NEXTAUTH_URL}/checkout`, 
          pending: `${process.env.NEXTAUTH_URL}/pedidos` 
        },
        auto_return: "approved"
      })
    });
    
    const data = await response.json();

    if (data.id && data.init_point) {
      // Salva o pedido COMPLETO e DETALHADO no seu banco de dados
      await prisma.order.create({
        data: {
          userId: user.id,
          total: Number(totalGeral),
          externalReference: data.id,
          paymentUrl: data.init_point,
          status: 'PENDENTE',
          items: {
            create: cartItems.map((item: any) => ({
              nome: item.titulo, 
              cor: item.cor, 
              tamanho: item.tamanho, 
              quantity: Number(item.quantidade), 
              price: Number(item.preco)
            }))
          }
        }
      });
      return NextResponse.json({ url: data.init_point });
    } else {
      console.error("Erro no Mercado Pago:", data);
      return NextResponse.json({ error: 'Falha ao criar cobrança no MP' }, { status: 400 });
    }
  } catch (error) {
    console.error('Erro na API Checkout:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
