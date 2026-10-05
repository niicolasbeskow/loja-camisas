import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';

export default async function Home() {
  const products = await prisma.product.findMany({
    include: {
      artista: true,
    },
  });

  const formatPriceBR = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section className="bg-gray-900 text-white min-h-[60vh] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl font-bold mb-4 tracking-tighter">
            DROP 01: B.SKW x TRECE
          </h1>
          <p className="text-xl mb-8 max-w-2xl text-gray-300">
            A agressividade da rua na malha mais pesada do mercado
          </p>
          <Link
            href="/artists/trece"
            className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold py-3 px-8 rounded transition-colors inline-flex items-center justify-center gap-2"
          >
            Explorar Collab
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
          </Link>
        </div>
      </section>

      {/* Diferenciais da Marca */}
      <section className="bg-gray-800 text-white py-12 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3 items-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-amber-500 text-gray-900 rounded flex items-center justify-center mb-4 font-bold text-xl">
                1
              </div>
              <p className="text-lg font-medium text-gray-200">Algodão Heavy Suedine</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-amber-500 text-gray-900 rounded flex items-center justify-center mb-4 font-bold text-xl">
                2
              </div>
              <p className="text-lg font-medium text-gray-200">Gola 3cm Canelada</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-amber-500 text-gray-900 rounded flex items-center justify-center mb-4 font-bold text-xl">
                3
              </div>
              <p className="text-lg font-medium text-gray-200">Zero Encolhimento</p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid de Produtos */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-10 text-center text-gray-900 tracking-tighter">O Drop Atual</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/produto/${product.id}`}
                className="block hover:shadow-lg transition-shadow border border-gray-200 rounded p-6 bg-white flex flex-col"
              >
                <div className="mb-4">
                  <span className="inline-block px-2 py-1 text-xs font-bold bg-gray-900 text-white rounded mb-3">
                    {product.tipo === 'Tag' ? 'A Tag' : 'A Coleção'}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {product.nome}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium">
                    por {product.artista?.nome}
                  </p>
                </div>
                <div className="mt-auto pt-6 border-t border-gray-100">
                  <p className="text-amber-500 font-bold text-xl mb-4">
                    {formatPriceBR(product.preco)}
                  </p>
                  <AddToCartButton
                    id={product.id}
                    name={product.nome}
                    price={product.preco}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}