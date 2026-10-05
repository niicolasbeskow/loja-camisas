import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const artistas = await prisma.artist.findMany({
      orderBy: {
        nome: 'asc',
      }
    })

    return NextResponse.json(artistas)
  } catch (error) {
    console.error('Error fetching artists:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { nome, slug, categoria_arte, bio, imagem_perfil } = await request.json()

    // Validate required fields
    if (!nome || !slug || !categoria_arte) {
      return NextResponse.json(
        { error: 'Nome, slug e categoria_arte são obrigatórios' },
        { status: 400 }
      )
    }

    // Check if slug already exists
    const existingArtist = await prisma.artist.findUnique({
      where: { slug }
    })

    if (existingArtist) {
      return NextResponse.json(
        { error: 'Slug já está em uso' },
        { status: 400 }
      )
    }

    // Create the artist
    const artist = await prisma.artist.create({
      data: {
        nome,
        slug,
        categoria_arte,
        bio: bio || null,
        imagem_perfil: imagem_perfil || null,
      }
    })

    return NextResponse.json(artist, { status: 201 })
  } catch (error) {
    console.error('Error creating artist:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}