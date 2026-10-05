import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function ProductPage(
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  const productId = parseInt(id)

  if (isNaN(productId)) {
    notFound()
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
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