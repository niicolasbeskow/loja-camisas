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
      {/* Faixa Concreto e Destaques Brancos */}
      <section className="bg-[#9A9A9A] py-32 px-4 flex justify-center w-full">
        <img
          src="/edited-image.png"
          alt="B.SKW Logo"
          className="max-w-[400px] w-full object-contain mx-auto"
        />
      </section>

      {/* Seção DESTAQUES */}
      <section className="bg-white text-black py-16 px-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display mb-8 text-center text-black tracking-tighter uppercase">
            DESTAQUES
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Placeholder cards */}
            {/* TODO: Backend - Filtrar e exibir os produtos com maior número de adições ao carrinho (Mais Vendidos) */}
            {[1, 2, 3, 4, 5, 6].map((_, idx) => (
              <Link
                key={idx}
                href="#"
                className="block hover:shadow-lg transition-shadow border border-gray-300 rounded p-6 bg-white flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 mb-2 bg-black/5 rounded"></div>
                <p className="text-sm text-black/60 font-medium text-center">
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