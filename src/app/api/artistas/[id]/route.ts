import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const artistId = parseInt(params.id)

    if (isNaN(artistId)) {
      return NextResponse.json(
        { error: 'ID de artista inválido' },
        { status: 400 }
      )
    }

    const artist = await prisma.artist.findUnique({
      where: { id: artistId },
      include: {
        products: {
          select: {
            id: true,
            nome: true,
          }
        }
      }
    })

    if (!artist) {
      return NextResponse.json(
        { error: 'Artista não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(artist)
  } catch (error) {
    console.error('Error fetching artist:', error)
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
    const artistId = parseInt(params.id)

    if (isNaN(artistId)) {
      return NextResponse.json(
        { error: 'ID de artista inválido' },
        { status: 400 }
      )
    }

    const { nome, slug, categoria_arte, bio, imagem_perfil } = await request.json()

    // Validate required fields
    if (!nome || !slug || !categoria_arte) {
      return NextResponse.json(
        { error: 'Nome, slug e categoria_arte são obrigatórios' },
        { status: 400 }
      )
    }

    // Check if artist exists
    const existingArtist = await prisma.artist.findUnique({
      where: { id: artistId }
    })

    if (!existingArtist) {
      return NextResponse.json(
        { error: 'Artista não encontrado' },
        { status: 404 }
      )
    }

    // Check if slug already exists (excluding current artist)
    if (slug !== existingArtist.slug) {
      const slugExists = await prisma.artist.findUnique({
        where: { slug }
      })

      if (slugExists) {
        return NextResponse.json(
          { error: 'Slug já está em uso' },
          { status: 400 }
        )
      }
    }

    // Update the artist
    const artist = await prisma.artist.update({
      where: { id: artistId },
      data: {
        nome,
        slug,
        categoria_arte,
        bio: bio || null,
        imagem_perfil: imagem_perfil || null,
      }
    })

    return NextResponse.json(artist)
  } catch (error) {
    console.error('Error updating artist:', error)
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
    const artistId = parseInt(params.id)

    if (isNaN(artistId)) {
      return NextResponse.json(
        { error: 'ID de artista inválido' },
        { status: 400 }
      )
    }

    // Check if artist exists
    const existingArtist = await prisma.artist.findUnique({
      where: { id: artistId }
    })

    if (!existingArtist) {
      return NextResponse.json(
        { error: 'Artista não encontrado' },
        { status: 404 }
      )
    }

    // Check if artist has products
    const productCount = await prisma.product.count({
      where: { artista_id: artistId }
    })

    if (productCount > 0) {
      return NextResponse.json(
        { error: 'Não é possível excluir artista que possui produtos associados' },
        { status: 400 }
      )
    }

    // Delete the artist
    await prisma.artist.delete({
      where: { id: artistId }
    })

    return NextResponse.json({ message: 'Artista excluído com sucesso' })
  } catch (error) {
    console.error('Error deleting artist:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}