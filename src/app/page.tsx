import { produtos } from '@/data/produtos';
import QuickBuyCard from '@/components/QuickBuyCard';

export default async function Home() {
  const basicaEmEstoque = produtos.filter(p => p.categoria === 'camiseta-basica' && Object.values(p.estoque).some(qtd => qtd > 0));
  const overEmEstoque = produtos.filter(p => p.categoria === 'camiseta-oversized' && Object.values(p.estoque).some(qtd => qtd > 0));
  const boxyEmEstoque = produtos.filter(p => p.categoria === 'camiseta-boxy' && Object.values(p.estoque).some(qtd => qtd > 0));
  const poliamidaEmEstoque = produtos.filter(p => p.categoria === 'camiseta-poliamida' && Object.values(p.estoque).some(qtd => qtd > 0));

  return (
    <main className="min-h-screen">
      {/* BANNER PRINCIPAL AJUSTADO PARA MOBILE */}
      <section className="bg-[#9A9A9A] bg-[url('/files/textura.png')] bg-cover bg-center bg-blend-multiply py-20 md:py-40 px-4 flex justify-center w-full">
        <img
          src="/files/BSKW_empilhado_cor-branco-ambar.png"
          alt="B.SKW Logo"
          className="max-w-[200px] md:max-w-[400px] w-full object-contain mx-auto pointer-events-none select-none drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
        />
      </section>

      <section className="max-w-[1600px] mx-auto px-3 md:px-6 pt-12 md:pt-16 pb-20">
        <h2 className="text-3xl md:text-5xl font-anton uppercase text-center mb-8 md:mb-12 tracking-wide text-zinc-900">
          Destaques B<span className="text-[#F59E0B]">.</span>SKW
        </h2>

        {/* GRID DE 2 COLUNAS NO MOBILE E 4 NO DESKTOP */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-y-12 gap-x-3 md:gap-x-6">
          {basicaEmEstoque.length > 0 && <QuickBuyCard tituloGrupo="Camiseta Básica" produtosDoGrupo={basicaEmEstoque} />}
          {overEmEstoque.length > 0 && <QuickBuyCard tituloGrupo="Oversized" produtosDoGrupo={overEmEstoque} />}
          {boxyEmEstoque.length > 0 && <QuickBuyCard tituloGrupo="Modelagem Boxy" produtosDoGrupo={boxyEmEstoque} />}
          {poliamidaEmEstoque.length > 0 && <QuickBuyCard tituloGrupo="Ultra Tech (Treino)" produtosDoGrupo={poliamidaEmEstoque} />}
        </div>
      </section>
    </main>
  );
}
