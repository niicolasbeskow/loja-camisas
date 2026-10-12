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

    const items = cartItems.map((item: any) => ({
      title: `${item.titulo} | Cor: ${item.cor} | Tam: ${item.tamanho}`,
      unit_price: Number(item.preco),
      quantity: Number(item.quantidade),
      currency_id: 'BRL'
    }));
    if (frete > 0) items.push({ title: 'Frete de Envio', unit_price: Number(frete), quantity: 1, currency_id: 'BRL' });
    if (desconto > 0) items.push({ title: 'Desconto (Cupom BSKW)', unit_price: -Number(desconto), quantity: 1, currency_id: 'BRL' });

    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: items,
        back_urls: { success: `${process.env.NEXTAUTH_URL}/sucesso`, failure: `${process.env.NEXTAUTH_URL}/checkout`, pending: `${process.env.NEXTAUTH_URL}/pedidos` },
        auto_return: "approved"
      })
    });
    const data = await response.json();

    if (data.id && data.init_point) {
      await prisma.order.create({
        data: {
          userId: user.id,
          total: Number(totalGeral),
          externalReference: data.id,
          paymentUrl: data.init_point,
          status: 'PENDENTE',
          items: {
            create: cartItems.map((item: any) => ({
              nome: item.titulo, cor: item.cor, tamanho: item.tamanho, quantity: Number(item.quantidade), price: Number(item.preco)
            }))
          }
        }
      });
      return NextResponse.json({ url: data.init_point });
    } else {
      return NextResponse.json({ error: 'Falha ao criar cobrança' }, { status: 400 });
    }
  } catch (error) {
    console.error('Erro na API Checkout:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
