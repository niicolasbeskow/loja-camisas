import { produtos } from '@/data/produtos';
import QuickBuyCard from '@/components/QuickBuyCard';
import Link from 'next/link';
import { Truck, ShieldCheck, RefreshCw, Leaf } from 'lucide-react';

export default async function Home() {
  const basicaEmEstoque = produtos.filter(p => p.categoria === 'camiseta-basica' && Object.values(p.estoque).some(qtd => qtd > 0));
  const overEmEstoque = produtos.filter(p => p.categoria === 'camiseta-oversized' && Object.values(p.estoque).some(qtd => qtd > 0));
  const boxyEmEstoque = produtos.filter(p => p.categoria === 'camiseta-boxy' && Object.values(p.estoque).some(qtd => qtd > 0));
  const poliamidaEmEstoque = produtos.filter(p => p.categoria === 'camiseta-poliamida' && Object.values(p.estoque).some(qtd => qtd > 0));
  const promocoes = produtos.filter(p => p.promocao && Object.values(p.estoque).some(qtd => qtd > 0));

  return (
    <main className="min-h-screen bg-white">
      
      {/* 1. HERO SECTION */}
      <div className="w-full px-3 pt-3 md:px-0 md:pt-0">
        <section className="relative w-full aspect-[4/3] sm:aspect-video md:aspect-[16/9] bg-zinc-900 flex items-center justify-start overflow-hidden rounded-xl md:rounded-none">
          <img 
            src="/files/capa-principal.jpg" 
            alt="Capa B.SKW" 
            className="absolute inset-0 w-full h-full object-cover object-[90%_center] md:object-center opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/95 via-zinc-900/50 to-transparent md:bg-gradient-to-r md:from-zinc-900/80 md:via-zinc-900/40 md:to-transparent z-0"></div>
          
          <div className="relative z-10 w-full px-5 md:px-12 lg:px-24">
            <div className="max-w-[170px] sm:max-w-[260px] md:max-w-xl flex flex-col items-start text-left">
              <img 
                src="/files/BSKW_empilhado_cor-branco-ambar.png" 
                alt="B.SKW Logo" 
                className="w-20 sm:w-28 md:w-full md:max-w-[320px] lg:max-w-[400px] object-contain mb-2 md:mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
              />
              <h1 className="text-white text-[11px] sm:text-base md:text-2xl lg:text-3xl font-outfit font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] mb-1.5 md:mb-4 drop-shadow-md">
                Feito para os reais.
              </h1>
              <div className="w-6 md:w-16 h-[1px] md:h-[2px] bg-white mb-2 md:mb-6 drop-shadow-sm"></div>
              <p className="text-zinc-200 text-[8px] sm:text-xs md:text-sm lg:text-base mb-3 md:mb-8 font-medium drop-shadow-md leading-snug md:leading-relaxed">
                Mais do que roupa, é um mindset. B.SKW é para quem faz acontecer e se mantém sólido.
              </p>
              <Link href="/categoria/promocoes" className="inline-block border md:border-2 border-white text-white px-3 md:px-8 py-1.5 md:py-4 font-bold text-[7px] md:text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300">
                Comprar Agora
              </Link>
            </div>
          </div>
          
          <div className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8 text-right hidden md:block z-10">
             <span className="text-zinc-300 text-[10px] font-bold tracking-widest uppercase block mb-1">Est. 2026</span>
             <span className="text-zinc-400 text-[10px] tracking-widest font-mono">27.5954° S<br/>48.5480° W</span>
             <div className="w-12 h-[1px] bg-zinc-400 mt-2 ml-auto"></div>
          </div>
        </section>
      </div>

      {/* 2. COMPRAS RÁPIDAS (MVP) */}
      <section className="max-w-[1600px] mx-auto px-4 md:px-6 py-12 md:py-24">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-8 md:mb-12 gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-anton uppercase tracking-wide text-zinc-900 leading-none">Coleções</h2>
            <p className="text-zinc-500 text-xs md:text-sm mt-1.5 md:mt-2 font-medium">O essencial para o seu corre diário.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-y-12 gap-x-3 md:gap-x-6">
          {basicaEmEstoque.length > 0 && <QuickBuyCard tituloGrupo="Camiseta Básica" produtosDoGrupo={basicaEmEstoque} />}
          {overEmEstoque.length > 0 && <QuickBuyCard tituloGrupo="Oversized" produtosDoGrupo={overEmEstoque} />}
          {boxyEmEstoque.length > 0 && <QuickBuyCard tituloGrupo="Modelagem Boxy" produtosDoGrupo={boxyEmEstoque} />}
          {poliamidaEmEstoque.length > 0 && <QuickBuyCard tituloGrupo="Ultra Tech (Treino)" produtosDoGrupo={poliamidaEmEstoque} />}
        </div>
      </section>

      {/* 3. BANNER DE CHAMADA (MEIO DO SITE) */}
      <section className="w-full bg-zinc-100 py-16 md:py-24">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 flex flex-col justify-center max-w-lg text-center md:text-left mx-auto md:mx-0">
              <span className="text-zinc-500 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Novo Lançamento</span>
              <h2 className="text-4xl md:text-6xl font-anton uppercase leading-[0.9] mb-6 tracking-wide text-zinc-900">Fresh<br/>Drops</h2>
              <p className="text-zinc-600 text-sm md:text-base mb-8">As últimas peças adicionadas ao catálogo. Estoque limitado para garantir exclusividade. Não fique de fora.</p>
              <Link href="/categoria/camiseta-oversized" className="inline-block bg-black text-white border-2 border-black px-8 py-4 font-bold text-xs uppercase tracking-widest hover:bg-transparent hover:text-black transition-colors duration-300 w-fit mx-auto md:mx-0">Ver Coleção Oversized →</Link>
            </div>
            
            {/* AQUI: Foco ajustado para 'object-[80%_center]' para garantir que o modelo agachado na direita aparece perfeito */}
            <div className="order-1 lg:order-2 w-full aspect-[4/3] md:aspect-[16/9] bg-zinc-200 relative overflow-hidden flex items-center justify-center rounded-xl md:rounded-none">
               <img src="/files/banner-meio.jpg" alt="Campanha Fresh Drops" className="absolute inset-0 w-full h-full object-cover object-[80%_center]" />
               
               <div className="absolute top-8 right-8 z-10 text-right hidden md:block mix-blend-difference text-white">
                 <span className="block text-sm font-medium uppercase tracking-[0.2em] mb-1">Mesmo Mindset.</span>
                 <span className="block text-sm font-medium uppercase tracking-[0.2em]">Energia Diferente.</span>
                 <div className="w-12 h-[1px] bg-white mt-4 ml-auto"></div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BARRA DE BENEFÍCIOS (TRUST BADGES) */}
      <section className="border-y border-zinc-200 bg-white">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4">
              <Truck className="w-8 h-8 text-black shrink-0" strokeWidth={1.5} />
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-900 mb-1">Envio Rápido</h4>
                <p className="text-[10px] text-zinc-500 font-medium">Entregamos em todo o Brasil.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4">
              <ShieldCheck className="w-8 h-8 text-black shrink-0" strokeWidth={1.5} />
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-900 mb-1">Pagamento Seguro</h4>
                <p className="text-[10px] text-zinc-500 font-medium">Até 3x Sem Juros no Cartão.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4">
              <RefreshCw className="w-8 h-8 text-black shrink-0" strokeWidth={1.5} />
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-900 mb-1">Troca Fácil</h4>
                <p className="text-[10px] text-zinc-500 font-medium">Processo simples e sem dor de cabeça.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4">
              <Leaf className="w-8 h-8 text-black shrink-0" strokeWidth={1.5} />
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-900 mb-1">Qualidade Premium</h4>
                <p className="text-[10px] text-zinc-500 font-medium">Malha BCI. Feito para durar.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROMOÇÕES EM DESTAQUE */}
      {promocoes.length > 0 && (
        <section className="max-w-[1600px] mx-auto px-4 md:px-6 py-16 md:py-24">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-4">
            <div className="text-center md:text-left">
              <span className="text-red-600 text-xs font-bold tracking-[0.2em] uppercase mb-2 block">Oportunidade</span>
              <h2 className="text-3xl md:text-4xl font-anton uppercase tracking-wide text-zinc-900 leading-none">Black Promo</h2>
            </div>
            <Link href="/categoria/promocoes" className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-black transition-colors flex items-center gap-2">
              Ver Tudo →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-4 md:gap-x-6">
            {promocoes.slice(0, 4).map(produto => (
              <QuickBuyCard key={produto.id} tituloGrupo={produto.nome} produtosDoGrupo={[produto]} />
            ))}
          </div>
        </section>
      )}

    </main>
  );
}
