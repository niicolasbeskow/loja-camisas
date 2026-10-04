import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: Number(params.id) },
    include: { artista: true },
  })

  if (!product) {
    notFound()
  }

  return (
    <div>
      <h1>{product.nome}</h1>
      <p>Price: {product.preco}</p>
      <p>Type: {product.tipo}</p>
      <h2>Artist</h2>
      <p>{product.artista?.nome}</p>
    </div>
  )
}