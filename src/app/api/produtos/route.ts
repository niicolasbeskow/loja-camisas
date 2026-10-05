import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { nome, descricao, preco, tipo, imagem, artistaId } = await request.json()

    // Validate required fields
    if (!nome || preco === undefined || !tipo || !imagem || !artistaId) {
      return NextResponse.json(
        { error: 'Nome, preço, tipo, imagem e artistaId são obrigatórios' },
        { status: 400 }
      )
    }

    // Validate that preco is a valid number
    const precoNum = parseFloat(preco)
    if (isNaN(precoNum)) {
      return NextResponse.json(
        { error: 'Preço deve ser um número válido' },
        { status: 400 }
      )
    }

    // Validate tipo
    if (tipo !== 'Tag' && tipo !== 'Colecao') {
      return NextResponse.json(
        { error: 'Tipo deve ser "Tag" ou "Colecao"' },
        { status: 400 }
      )
    }

    // Create the product
    const product = await prisma.product.create({
      data: {
        nome,
        preco: precoNum,
        tipo,
        imagem,
        artista_id: parseInt(artistaId),
      }
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}