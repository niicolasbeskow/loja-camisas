import { NextResponse } from 'next/server'
import { MercadoPagoConfig, Preference } from 'mercadopago'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { items } = await request.json()

    // Validate items
    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Items list is required' },
        { status: 400 }
      )
    }

    if (items.length === 0) {
      return NextResponse.json(
        { error: 'Items list must not be empty' },
        { status: 400 }
      )
    }

    // Validate each item has required fields
    for (const item of items) {
      if (!item.id || typeof item.id !== 'number') {
        return NextResponse.json(
          { error: 'Each item must have a valid numeric ID' },
          { status: 400 }
        )
      }
      // Note: We're not validating name/price/quantity here because we'll fetch fresh product data
      // The cart should have valid items, but we'll handle missing products gracefully
    }

    const accessToken = process.env.MP_ACCESS_TOKEN
    if (!accessToken) {
      return NextResponse.json(
        { error: 'Mercado Pago access token not configured' },
        { status: 500 }
      )
    }

    // Use NEXTAUTH_URL for back_urls, fallback to localhost for development
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

    const client = new MercadoPagoConfig({ accessToken: accessToken! })
    const preference = new Preference(client)

    // Fetch full product details for each item to get image, category, etc.
    const productIds = items.map(item => item.id)
    const products = await prisma.product.findMany({
      where: {
        id: { in: productIds }
      },
      include: {
        artista: {
          select: {
            imagem_perfil: true
          }
        }
      }
    })

    // Create a map for quick lookup
    const productMap: Record<number, typeof products[number]> = {}
    products.forEach(product => {
      productMap[product.id] = product
    })

    const mercadopagoItems = items.map((item) => {
      // Get fresh product data, fallback to cart data if product not found
      const product = productMap[item.id] || {
        nome: item.name || 'Produto',
        preco: item.price || 0
      }

      return {
        id: String(item.id),
        title: product.nome,
        description: product.nome, // Could be enhanced with artista.nome or tipo if needed
        category_id: 'fashion', // roupas e acessórios
        picture_url: product.artista?.imagem_perfil ||
                    'https://http2.mlstatic.com/frontend-assets/ui-navigation/5.19.1/mercadopago/logo__large.png',
        quantity: item.quantity,
        currency_id: 'BRL',
        unit_price: Number(product.preco)
      }
    })

    // Create a reference that summarizes the order for tracking
    const externalReference = `LOJA-${Date.now()}-${items.length}itens`;

    const response = await preference.create({
      body: {
        items: mercadopagoItems,
        back_urls: {
          success: `${baseUrl}/sucesso`,
          failure: `${baseUrl}/`,
          pending: `${baseUrl}/`
        },
        statement_descriptor: 'LOJA CAMISAS', // Appears on customer's bank statement
        external_reference: externalReference // Helps with order tracking
      }
    })

    return NextResponse.json({ init_point: response.init_point })
  } catch (error) {
    console.error('Erro do MP:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}