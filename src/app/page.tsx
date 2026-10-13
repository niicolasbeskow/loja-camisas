import { produtos } from '@/data/produtos';
import QuickBuyCard from '@/components/QuickBuyCard';

export default async function Home() {
  // Filtramos os produtos do banco de dados para formar os grupos de preço
  const essenciais = produtos.filter(p => ['basica-preta', 'basica-off-white'].includes(p.id));
  const cores = produtos.filter(p => ['basica-marrom', 'basica-verde', 'basica-azul-marinho', 'basica-bordo'].includes(p.id));
  const estonadas = produtos.filter(p => ['basica-preto-estonado', 'basica-cinza-envelhecido'].includes(p.id));
  const vintage = produtos.filter(p => ['basica-azul-envelhecido'].includes(p.id));

  return (
    <main className="min-h-screen">
      <section className="bg-[#9A9A9A] bg-[url('/files/textura.png')] bg-cover bg-center bg-blend-multiply py-32 md:py-40 px-4 flex justify-center w-full">
        <img
          src="/files/BSKW_empilhado_cor-branco-ambar.png"
          alt="B.SKW Logo"
          className="max-w-[250px] md:max-w-[400px] w-full object-contain mx-auto pointer-events-none select-none"
        />
      </section>

      <section className="max-w-[1600px] mx-auto px-4 md:px-6 py-16">
        <h2 className="text-4xl md:text-5xl font-anton uppercase text-center mb-12 tracking-wide text-zinc-900">
          Destaques B<span className="text-[#F59E0B]">.</span>SKW
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Passamos o Título do Grupo e o Array com as variações de cor para o Card */}
          <QuickBuyCard tituloGrupo="Básica Essenciais" produtosDoGrupo={essenciais} />
          <QuickBuyCard tituloGrupo="Básica Cores" produtosDoGrupo={cores} />
          <QuickBuyCard tituloGrupo="Básica Estonada" produtosDoGrupo={estonadas} />
          <QuickBuyCard tituloGrupo="Básica Vintage" produtosDoGrupo={vintage} />
        </div>
      </section>
    </main>
  );
}
