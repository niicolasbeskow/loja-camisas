import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { cartItems, frete, desconto } = body;

    // 1. Monta os itens do carrinho no formato exigido pelo Mercado Pago
    const items = cartItems.map((item: any) => ({
      title: `${item.titulo} | Cor: ${item.cor} | Tam: ${item.tamanho}`,
      unit_price: Number(item.preco),
      quantity: Number(item.quantidade),
      currency_id: 'BRL'
    }));

    // 2. Adiciona o Frete como um serviço extra
    if (frete > 0) {
      items.push({
        title: 'Frete de Envio (Correios)',
        unit_price: Number(frete),
        quantity: 1,
        currency_id: 'BRL'
      });
    }

    // 3. Aplica o desconto do Cupom (se houver) como um item de valor negativo
    if (desconto > 0) {
      items.push({
        title: 'Desconto (Cupom BSKW)',
        unit_price: -Number(desconto),
        quantity: 1,
        currency_id: 'BRL'
      });
    }

    // 4. Comunica com o servidor oficial do Mercado Pago
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

    if (data.id) {
      // Retorna a URL de pagamento seguro para o cliente clicar
      return NextResponse.json({ url: data.init_point });
    } else {
      console.error("Erro no MP:", data);
      return NextResponse.json({ error: 'Falha ao criar cobrança' }, { status: 400 });
    }

  } catch (error) {
    console.error('Erro na API Checkout:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
