import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = searchParams.get('limit')
    const page = searchParams.get('page')

    // Parse pagination parameters
    const take = limit ? parseInt(limit) : 10
    const skip = page ? (parseInt(page) - 1) * take : 0

    // Build where clause
    const where: any = {}
    if (status) {
      where.status = status
    }

    const orders = await prisma.order.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        },
        items: {
          include: {
            product: {
              include: {
                artista: {
                  select: {
                    nome: true,
                  }
                }
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
      take,
      skip,
    })

    // Get total count for pagination
    const total = await prisma.order.count({ where })

    return NextResponse.json({
      orders,
      pagination: {
        total,
        page: page ? parseInt(page) : 1,
        limit: take,
        pages: Math.ceil(total / take),
      }
    })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Note: Orders are typically created through the checkout process,
// not manually via API, so we don't implement POST here