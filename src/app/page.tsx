import { produtos } from '@/data/produtos';
import QuickBuyCard from '@/components/QuickBuyCard';

export default async function Home() {
  // GRUPOS DE CAMISETAS BÁSICAS
  const basicaEssenciais = produtos.filter(p => p.categoria === 'camiseta-basica' && p.preco === 78.90);
  const basicaCores = produtos.filter(p => p.categoria === 'camiseta-basica' && p.preco === 89.90);
  const basicaEstonadas = produtos.filter(p => p.categoria === 'camiseta-estonada');
  const basicaVintage = produtos.filter(p => p.categoria === 'camiseta-vintage');

  // GRUPOS DE CAMISETAS OVERSIZED
  const overEssenciais = produtos.filter(p => p.categoria === 'camiseta-oversized' && p.preco === 98.90);
  const overBranca = produtos.filter(p => p.categoria === 'camiseta-oversized' && p.preco === 103.90);
  const overCores = produtos.filter(p => p.categoria === 'camiseta-oversized' && p.preco === 107.90);
  const overEstonadas = produtos.filter(p => p.categoria === 'camiseta-oversized' && p.preco === 152.90);

  return (
    <main className="min-h-screen">
      {/* BANNER PRINCIPAL */}
      <section className="bg-[#9A9A9A] bg-[url('/files/textura.png')] bg-cover bg-center bg-blend-multiply py-32 md:py-40 px-4 flex justify-center w-full">
        <img
          src="/files/BSKW_empilhado_cor-branco-ambar.png"
          alt="B.SKW Logo"
          className="max-w-[250px] md:max-w-[400px] w-full object-contain mx-auto pointer-events-none select-none"
        />
      </section>

      {/* SEÇÃO 1: DESTAQUES BÁSICAS */}
      <section className="max-w-[1600px] mx-auto px-4 md:px-6 pt-16 pb-8">
        <h2 className="text-4xl md:text-5xl font-anton uppercase text-center mb-12 tracking-wide text-zinc-900">
          Destaques B<span className="text-[#F59E0B]">.</span>SKW Básicas
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <QuickBuyCard tituloGrupo="Básica Essenciais" produtosDoGrupo={basicaEssenciais} />
          <QuickBuyCard tituloGrupo="Básica Cores" produtosDoGrupo={basicaCores} />
          <QuickBuyCard tituloGrupo="Básica Estonada" produtosDoGrupo={basicaEstonadas} />
          <QuickBuyCard tituloGrupo="Básica Vintage" produtosDoGrupo={basicaVintage} />
        </div>
      </section>

      {/* SEÇÃO 2: DESTAQUES OVERSIZED */}
      <section className="max-w-[1600px] mx-auto px-4 md:px-6 pt-8 pb-20">
        <h2 className="text-4xl md:text-5xl font-anton uppercase text-center mb-12 tracking-wide text-zinc-900">
          Destaques B<span className="text-[#F59E0B]">.</span>SKW Oversized
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {overEssenciais.length > 0 && <QuickBuyCard tituloGrupo="Oversized Essenciais" produtosDoGrupo={overEssenciais} />}
          {overBranca.length > 0 && <QuickBuyCard tituloGrupo="Oversized Branca" produtosDoGrupo={overBranca} />}
          {overCores.length > 0 && <QuickBuyCard tituloGrupo="Oversized Cores" produtosDoGrupo={overCores} />}
          {overEstonadas.length > 0 && <QuickBuyCard tituloGrupo="Oversized Premium" produtosDoGrupo={overEstonadas} />}
        </div>
      </section>
    </main>
  );
}
