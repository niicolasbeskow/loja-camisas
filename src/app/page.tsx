import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';
import QuickBuyCard from '@/components/QuickBuyCard';

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
      <section className="bg-[#9A9A9A] bg-[url('/files/textura.png')] bg-cover bg-center bg-blend-multiply py-32 md:py-40 px-4 flex justify-center w-full">
        <img
          src="/files/BSKW_empilhado_cor-branco-ambar.png"
          alt="B.SKW Logo"
          className="max-w-[250px] md:max-w-[400px] w-full object-contain mx-auto pointer-events-none select-none"
        />
      </section>

      {/* Seção DESTAQUES */}
      <section className="max-w-[1600px] mx-auto px-4 md:px-6 py-16">
        <h2 className="text-4xl md:text-5xl font-anton uppercase text-center mb-12 tracking-wide text-zinc-900">
          Destaques B.<span className="text-[#F59E0B]">SKW</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <QuickBuyCard titulo="Camiseta Básica B.SKW" preco="89,90" />
          <QuickBuyCard titulo="Camiseta Oversized B.SKW" preco="119,90" />
          <QuickBuyCard titulo="Camiseta Boxy B.SKW" preco="109,90" />
          <QuickBuyCard titulo="Camiseta Suedine Premium" preco="139,90" />
        </div>
      </section>
    </main>
  );
}