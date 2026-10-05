import { NextResponse } from 'next/server'
import { MercadoPagoConfig, Preference } from 'mercadopago'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

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

    // Get session to check if user is logged in
    const session = await getServerSession(authOptions)
    const userId = session?.user ? (session.user as any).id : undefined

    // Calculate total price
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

    // Generate a unique external reference
    const externalReference = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Create order record in database
    const order = await prisma.order.create({
      data: {
        status: 'PENDING',
        total: totalPrice,
        externalReference,
        userId: userId,
        items: {
          create: items.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price
          }))
        }
      }
    })

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

    const response = await preference.create({
      body: {
        items: mercadopagoItems,
        back_urls: {
          success: `${baseUrl}/sucesso`,
          failure: `${baseUrl}/`,
          pending: `${baseUrl}/`
        },
        notification_url: `${baseUrl}/api/webhooks/mercadopago`,
        statement_descriptor: 'LOJA CAMISAS', // Appears on customer's bank statement
        external_reference: order.externalReference ?? `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` // Use the exact externalReference from the created Order
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