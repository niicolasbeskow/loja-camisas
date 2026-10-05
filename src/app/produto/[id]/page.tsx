import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import ProductActions from '@/components/ProductActions'

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
    <div className="min-h-screen bg-gray-50">
      {/* Product Detail Header */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Product Image */}
            <div className="w-full md:w-1/2">
              {product.imagem ? (
                <img
                  src={product.imagem}
                  alt={product.nome}
                  className="rounded-xl h-96 w-full object-cover shadow-lg"
                />
              ) : (
                <div className="rounded-xl h-96 w-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Sem imagem disponível</span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="w-full md:w-1/2 space-y-6">
              <h1 className="text-4xl font-bold text-gray-900">
                {product.nome}
              </h1>
              <p className="text-lg text-gray-500">
                por {product.artista?.nome}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-amber-600">
                  R$ {product.preco.toFixed(2).replace('.', ',')}
                </span>
                <span className="text-lg font-medium text-gray-600">
                  {product.tipo === 'Tag' ? 'Edição Limitada' : 'Coleção Completa'}
                </span>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Product Actions (Size Selector, Add to Cart) */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductActions productId={product.id} />
        </div>
      </section>

      {/* Additional Info / Related Products */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Você também pode gostar
          </h2>

          {/* Related products by same artist */}
          {/* This would be implemented in a real scenario */}
          <div className="text-center text-gray-500 py-8">
            Mais produtos deste artista chegando em breve...
          </div>
        </div>
      </section>
    </div>
  )
}