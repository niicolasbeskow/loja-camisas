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
      {/* Hero Banner limpo */}
      <section className="bg-breu text-branco min-h-[60vh] flex flex-col items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-5xl font-display mb-2 tracking-tighter uppercase">
            B.SKW BASIC COLLECTION
          </h1>
          <p className="text-xl mb-4">
            A essência do streetwear premium em sua forma mais pura.
          </p>
        </div>
      </section>

      {/* Grid de produtos vazio/placeholders */}
      <section className="py-16 bg-grafite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display mb-8 text-center text-branco tracking-tighter uppercase">
            Nova Coleção
          </h2>
          <div className="gap-6 sm:grid-cols-2 lg:grid-cols-3 grid">
            {/* Placeholder cards */}
            {[1, 2, 3, 4, 5, 6].map((_, idx) => (
              <Link
                key={idx}
                href="#"
                className="block hover:shadow-lg transition-shadow border border-gray-300 rounded p-6 bg-grafite/50 flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 mb-2 bg-breu/20 rounded"></div>
                <p className="text-sm text-branco/60 font-medium text-center">
                  Produto em breve
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}