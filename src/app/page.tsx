import { produtos } from '@/data/produtos';
import QuickBuyCard from '@/components/QuickBuyCard';

export default async function Home() {
  // Agora buscamos os IDs diretamente para garantir o agrupamento perfeito independente do preço
  const basicaEssenciais = produtos.filter(p => ['basica-preta', 'basica-off-white'].includes(p.id));
  const basicaCores = produtos.filter(p => ['basica-marrom', 'basica-verde', 'basica-azul-marinho', 'basica-bordo'].includes(p.id));
  const basicaEstonadas = produtos.filter(p => ['basica-preto-estonado', 'basica-cinza-envelhecido'].includes(p.id));
  const basicaVintage = produtos.filter(p => ['basica-azul-envelhecido'].includes(p.id));

  const overEssenciais = produtos.filter(p => ['oversized-preta', 'oversized-off-white'].includes(p.id));
  const overBranca = produtos.filter(p => ['oversized-branca'].includes(p.id));
  const overCores = produtos.filter(p => ['oversized-marrom', 'oversized-azul-marinho', 'oversized-verde-claro', 'oversized-roxo', 'oversized-bordo', 'oversized-verde-militar'].includes(p.id));
  const overEstonadas = produtos.filter(p => ['oversized-preto-estonado', 'oversized-destroyed', 'oversized-azul-estonado', 'oversized-cinza-envelhecido', 'oversized-azul-envelhecido'].includes(p.id));

  return (
    <main className="min-h-screen">
      <section className="bg-[#9A9A9A] bg-[url('/files/textura.png')] bg-cover bg-center bg-blend-multiply py-32 md:py-40 px-4 flex justify-center w-full">
        <img
          src="/files/BSKW_empilhado_cor-branco-ambar.png"
          alt="B.SKW Logo"
          className="max-w-[250px] md:max-w-[400px] w-full object-contain mx-auto pointer-events-none select-none"
        />
      </section>

      {/* SEÇÃO ÚNICA DE DESTAQUES (Básicas e Oversized juntas) */}
      <section className="max-w-[1600px] mx-auto px-4 md:px-6 pt-16 pb-20">
        <h2 className="text-4xl md:text-5xl font-anton uppercase text-center mb-12 tracking-wide text-zinc-900">
          Destaques B<span className="text-[#F59E0B]">.</span>SKW
        </h2>

        {/* 2 linhas com 4 opções - igual à imagem de referência! */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6">
          <QuickBuyCard tituloGrupo="Básica Essenciais" produtosDoGrupo={basicaEssenciais} />
          <QuickBuyCard tituloGrupo="Básica Cores" produtosDoGrupo={basicaCores} />
          <QuickBuyCard tituloGrupo="Básica Estonada" produtosDoGrupo={basicaEstonadas} />
          <QuickBuyCard tituloGrupo="Básica Vintage" produtosDoGrupo={basicaVintage} />

          {overEssenciais.length > 0 && <QuickBuyCard tituloGrupo="Oversized Essenciais" produtosDoGrupo={overEssenciais} />}
          {overBranca.length > 0 && <QuickBuyCard tituloGrupo="Oversized Branca" produtosDoGrupo={overBranca} />}
          {overCores.length > 0 && <QuickBuyCard tituloGrupo="Oversized Cores" produtosDoGrupo={overCores} />}
          {overEstonadas.length > 0 && <QuickBuyCard tituloGrupo="Oversized Premium" produtosDoGrupo={overEstonadas} />}
        </div>
      </section>
    </main>
  );
}
