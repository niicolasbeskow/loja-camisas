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
    <main className="min-h-screen">
      {/* Hero Banner */}
      <section className="bg-grafite text-branco min-h-[60vh] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl font-display mb-4 tracking-tighter uppercase">
            DROP 01: B.SKW x TRECE
          </h1>
          <p className="text-xl mb-8 max-w-2xl text-branco">
            A agressividade da rua na malha mais pesada do mercado
          </p>
          <Link
            href="/artists/trece"
            className="bg-ambar text-breu font-sans font-semibold py-3 px-8 rounded transition-colors inline-flex items-center justify-center gap-2 hover:bg-amber-600"
          >
            Explorar Collab
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
          </Link>
        </div>
      </section>

      {/* Diferenciais da Marca */}
      <section className="bg-grafite text-branco py-12 border-t border-gray-700">
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
      <section className="py-16 bg-grafite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display mb-10 text-center text-branco tracking-tighter uppercase">
            O Drop Atual
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/produto/${product.id}`}
                className="block hover:shadow-lg transition-shadow border border-gray-300 rounded p-6 bg-grafite text-branco flex flex-col"
              >
                <div className="mb-4">
                  <span className="inline-block px-2 py-1 text-xs font-bold bg-gray-900 text-white rounded mb-3">
                    {product.tipo === 'Tag' ? 'A Tag' : 'A Coleção'}
                  </span>
                  <h3 className="text-xl font-display mb-1 text-branco">
                    {product.nome}
                  </h3>
                  <p className="text-sm text-branco/60 font-medium">
                    por {product.artista?.nome}
                  </p>
                </div>
                <div className="mt-auto pt-6 border-t border-gray-200">
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