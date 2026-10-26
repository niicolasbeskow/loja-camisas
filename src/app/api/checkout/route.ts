import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session || !session.user?.email) return NextResponse.json({ error: 'Não autorizado. Faça login.' }, { status: 401 });

    let user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) user = await prisma.user.create({ data: { email: session.user.email, name: session.user.name || 'Cliente B.SKW', image: session.user.image || '' } });

    const body = await req.json();
    const { cartItems, frete, desconto, totalGeral } = body;
    let items = [];
    const totalArredondado = Number(Number(totalGeral).toFixed(2));

    if (desconto > 0 || totalArredondado <= 1.00) {
      items.push({ title: totalArredondado <= 1.00 ? 'Pedido B.SKW (Teste)' : 'Pedido B.SKW', unit_price: totalArredondado, quantity: 1, currency_id: 'BRL' });
    } else {
      items = cartItems.map((item: any) => ({ title: `${item.titulo} | Cor: ${item.cor} | Tam: ${item.tamanho}`, unit_price: Number(Number(item.preco).toFixed(2)), quantity: Number(item.quantidade), currency_id: 'BRL' }));
      if (frete > 0) items.push({ title: 'Frete', unit_price: Number(Number(frete).toFixed(2)), quantity: 1, currency_id: 'BRL' });
    }

    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: items,
        payer: { name: user.name, email: user.email },
        // REMOVEMOS A TRAVA DE EXCLUSÃO DE PAGAMENTOS AQUI
        back_urls: { success: `${process.env.NEXTAUTH_URL}/sucesso`, failure: `${process.env.NEXTAUTH_URL}/checkout`, pending: `${process.env.NEXTAUTH_URL}/pedidos` },
        auto_return: "approved"
      })
    });
    
    const data = await response.json();

    if (data.id && data.init_point) {
      await prisma.order.create({
        data: {
          userId: user.id, total: totalArredondado, externalReference: data.id, paymentUrl: data.init_point, status: 'PENDENTE',
          items: { create: cartItems.map((item: any) => ({ nome: item.titulo, cor: item.cor, tamanho: item.tamanho, quantity: Number(item.quantidade), price: Number(item.preco) })) }
        }
      });
      return NextResponse.json({ url: data.init_point });
    } else {
      return NextResponse.json({ error: 'Erro MP', detalhes: data }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: 'Erro no servidor', mensagem: error.message }, { status: 500 });
  }
}
