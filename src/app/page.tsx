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

  // Definição das cores para cada grupo
  const coresBasicaEssenciais = [
    { id: 'preto', name: 'Preto', hex: '#000000' },
    { id: 'offwhite', name: 'Off White', hex: '#FAF9F6' },
  ];

  const coresBasicaCores = [
    { id: 'marrom', name: 'Marrom', hex: '#5E4B3C' },
    { id: 'verdemilitar', name: 'Verde Militar', hex: '#4B5320' },
    { id: 'azulmarinho', name: 'Azul Marinho', hex: '#000080' },
    { id: 'bordo', name: 'Bordô', hex: '#800000' },
  ];

  const coresBasicaEstonada = [
    { id: 'pretoestonado', name: 'Preto Estonado', hex: '#2C2C2C' },
    { id: 'cinzaenvelhecido', name: 'Cinza Envelhecido', hex: '#808080' },
  ];

  const coresBasicaVintage = [
    { id: 'azulenvelhecido', name: 'Azul Envelhecido', hex: '#4682B4' },
  ];

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
          Destaques B<span className="text-[#F59E0B]">.</span>SKW
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <QuickBuyCard titulo="Básica Essenciais" preco="78,90" cores={coresBasicaEssenciais} />
          <QuickBuyCard titulo="Básica Cores" preco="89,90" cores={coresBasicaCores} />
          <QuickBuyCard titulo="Básica Estonada" preco="112,90" cores={coresBasicaEstonada} />
          <QuickBuyCard titulo="Básica Vintage" preco="123,90" cores={coresBasicaVintage} />
        </div>
      </section>
    </main>
  );
}