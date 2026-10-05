import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id)

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'ID de produto inválido' },
        { status: 400 }
      )
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        artista: {
          select: {
            nome: true,
          }
        }
      }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id)

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'ID de produto inválido' },
        { status: 400 }
      )
    }

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

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId }
    })

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      )
    }

    // Update the product
    const product = await prisma.product.update({
      where: { id: productId },
      data: {
        nome,
        preco: precoNum,
        tipo,
        imagem,
        artista_id: parseInt(artistaId),
      }
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id)

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'ID de produto inválido' },
        { status: 400 }
      )
    }

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId }
    })

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      )
    }

    // Delete the product
    await prisma.product.delete({
      where: { id: productId }
    })

    return NextResponse.json({ message: 'Produto excluído com sucesso' })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}