import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import AddToCartButton from '@/components/AddToCartButton'
import CartSidebar from '@/components/CartSidebar'
import CartToggleButton from '@/components/CartToggleButton'

export default async function ArtistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artist = await prisma.artist.findUnique({
    where: { slug },
    include: { products: true },
  })

  if (!artist) {
    notFound()
  }

  // Format price to BRL
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price)
  }

  // Separate products by type
  const tagProducts = artist.products.filter(p => p.tipo === 'Tag')
  const colecaoProducts = artist.products.filter(p => p.tipo === 'Colecao')

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 relative">
      <CartToggleButton />
      <header className="mb-12 flex items-center space-x-6">
        {artist.imagem_perfil ? (
          <img
            src={artist.imagem_perfil}
            alt={`${artist.nome} profile`}
            className="w-24 h-24 rounded-full ring-2 ring-gray-800"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center">
            <span className="text-gray-600">Sem imagem</span>
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold mb-2">{artist.nome}</h1>
          <p className="text-gray-400 uppercase tracking-wider text-sm">{artist.categoria_arte}</p>
          {artist.bio && (
            <p className="mt-4 text-lg leading-relaxed">{artist.bio}</p>
          )}
        </div>
      </header>

      <div className="space-y-12">
        {/* A Tag Section */}
        {tagProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center space-x-3">
              <span className="w-3 h-3 bg-green-500 rounded"></span>
              A Tag
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tagProducts.map(product => (
                <div
                  key={product.id}
                  className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors"
                >
                  <h3 className="font-semibold mb-2">{product.nome}</h3>
                  <p className="text-yellow-400 font-medium mb-4">
                    {formatPrice(product.preco)}
                  </p>
                  <AddToCartButton id={product.id} name={product.nome} price={product.preco} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* A Coleção Section */}
        {colecaoProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center space-x-3">
              <span className="w-3 h-3 bg-purple-500 rounded"></span>
              A Coleção
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {colecaoProducts.map(product => (
                <div
                  key={product.id}
                  className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors"
                >
                  <h3 className="font-semibold mb-2">{product.nome}</h3>
                  <p className="text-yellow-400 font-medium mb-4">
                    {formatPrice(product.preco)}
                  </p>
                  <AddToCartButton id={product.id} name={product.nome} price={product.preco} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <CartSidebar />
    </div>
  )
}