"use client";

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import QuickBuyCard from '@/components/QuickBuyCard';
import { getProdutosPorCategoria } from '@/data/produtos';

export default function Home() {
  // Puxa produtos reais do banco de dados para a secção de Coleções (se houver estoque)
  const todasOversized = getProdutosPorCategoria('camiseta-oversized');
  const todasSuedine = getProdutosPorCategoria('camiseta-suedine');
  const todosKits = getProdutosPorCategoria('kits');
  const todosMoletons = getProdutosPorCategoria('moletom');

  // Filtra as primeiras peças para exibir na vitrine (opcionalmente podes filtrar só as que têm estoque > 0)
  const produtosOversized = todasOversized.slice(0, 4);
  const produtosSuedine = todasSuedine.slice(0, 4);

  return (
    <main className="min-h-screen bg-white">
      
      {/* BANNER PRINCIPAL (HERO) */}
      <section className="relative h-[85vh] w-full bg-zinc-900 flex items-center overflow-hidden">
        {/* Imagem de Fundo (Provisória) */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          {/* Pode substituir esta div por uma tag <img> quando tiver a foto oficial */}
          <div className="w-full h-full bg-zinc-800 bg-[url('https://images.unsplash.com/photo-1523398002811-999aa8ec58d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center"></div>
        </div>

        <div className="relative z-20 max-w-[1400px] mx-auto px-6 w-full flex flex-col items-start mt-20">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-anton uppercase text-white tracking-wide leading-none mb-6 max-w-4xl drop-shadow-lg">
            Feito para os reais.
          </h1>
          <p className="text-zinc-200 text-sm md:text-base max-w-xl font-medium mb-10 leading-relaxed drop-shadow-md">
            Mais do que roupa, é um mindset. B.SKW é para quem faz acontecer e se mantém sólido.
          </p>
          <Link href="/categoria/camiseta-basica" className="border-2 border-white text-white px-8 py-4 font-bold text-xs md:text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
            Comprar Agora
          </Link>

          {/* Elementos Estéticos */}
          <div className="absolute bottom-12 right-6 flex flex-col items-end opacity-60 pointer-events-none hidden md:flex">
            <span className="font-anton text-white text-sm tracking-widest uppercase mb-2">EST. 2026</span>
            <div className="w-12 h-px bg-white/50 mb-2"></div>
            <span className="text-white text-[10px] font-mono tracking-widest">27.5954° S</span>
            <span className="text-white text-[10px] font-mono tracking-widest">48.5480° W</span>
          </div>
        </div>
      </section>

      {/* BLOCOS CATEGORIAIS ESTRATÉGICOS (SHOP BY CATEGORY) */}
      <section className="bg-zinc-100 py-4 md:py-6">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            
            {/* Bloco 1: KITS */}
            <Link href="/categoria/kits" className="group relative aspect-square md:aspect-[4/5] bg-zinc-900 overflow-hidden flex flex-col justify-end p-4 md:p-6 cursor-pointer">
              {/* Substitua a div abaixo pela tag img quando tiver a foto da categoria */}
              <div className="absolute inset-0 bg-zinc-800 transition-transform duration-700 group-hover:scale-105"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
              <div className="relative z-20">
                <h3 className="text-white font-anton text-xl md:text-2xl uppercase tracking-wide mb-1">Kits</h3>
                <span className="text-white/80 text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:text-amber-500 transition-colors">
                  Shop Now <ArrowRight size={12} />
                </span>
              </div>
            </Link>

            {/* Bloco 2: OVERSIZED */}
            <Link href="/categoria/camiseta-oversized" className="group relative aspect-square md:aspect-[4/5] bg-zinc-900 overflow-hidden flex flex-col justify-end p-4 md:p-6 cursor-pointer">
              <div className="absolute inset-0 bg-zinc-700 transition-transform duration-700 group-hover:scale-105"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
              <div className="relative z-20">
                <h3 className="text-white font-anton text-xl md:text-2xl uppercase tracking-wide mb-1">Oversized</h3>
                <span className="text-white/80 text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:text-amber-500 transition-colors">
                  Shop Now <ArrowRight size={12} />
                </span>
              </div>
            </Link>

            {/* Bloco 3: MOLETOM */}
            <Link href="/categoria/moletom" className="group relative aspect-square md:aspect-[4/5] bg-zinc-900 overflow-hidden flex flex-col justify-end p-4 md:p-6 cursor-pointer">
              <div className="absolute inset-0 bg-zinc-800 transition-transform duration-700 group-hover:scale-105"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
              <div className="relative z-20">
                <h3 className="text-white font-anton text-xl md:text-2xl uppercase tracking-wide mb-1">Moletom</h3>
                <span className="text-white/80 text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:text-amber-500 transition-colors">
                  Shop Now <ArrowRight size={12} />
                </span>
              </div>
            </Link>

            {/* Bloco 4: COLLAB */}
            <Link href="/categoria/collab" className="group relative aspect-square md:aspect-[4/5] bg-zinc-900 overflow-hidden flex flex-col justify-end p-4 md:p-6 cursor-pointer">
              <div className="absolute inset-0 bg-zinc-950 transition-transform duration-700 group-hover:scale-105"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
              <div className="relative z-20">
                <h3 className="text-white font-anton text-xl md:text-2xl uppercase tracking-wide mb-1">Collabs</h3>
                <span className="text-white/80 text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:text-amber-500 transition-colors">
                  Em Breve <ArrowRight size={12} />
                </span>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* VITRINE 1: DESTAQUES (OVERSIZED) */}
      <section className="py-20 md:py-32 border-b border-zinc-200">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-anton uppercase text-zinc-900 tracking-wide">Coleções</h2>
              <p className="text-zinc-500 text-sm mt-2 font-medium">O essencial para o seu corre diário.</p>
            </div>
            <Link href="/categoria/camiseta-oversized" className="text-xs font-bold uppercase tracking-widest text-zinc-900 hover:text-amber-600 transition-colors border-b-2 border-black pb-1 hover:border-amber-600">
              Ver Toda a Linha Oversized
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {produtosOversized.length > 0 ? (
              produtosOversized.map(p => <QuickBuyCard key={p.id} tituloGrupo={p.nome} produtosDoGrupo={[p]} />)
            ) : (
              <div className="col-span-2 md:col-span-4 py-12 text-center text-zinc-400 font-bold uppercase tracking-widest text-xs">
                Nenhum produto cadastrado nesta categoria.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* BANNER SECUNDÁRIO (MEIO DE PÁGINA) */}
      <section className="relative py-32 bg-zinc-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-zinc-800 z-0"></div>
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-anton uppercase text-white tracking-wide mb-6">
            Conforto Extremo.<br/>Design Sólido.
          </h2>
          <p className="text-zinc-300 text-sm md:text-base font-medium mb-10">
            Conheça a nossa linha premium de Suedine. O toque aveludado que eleva qualquer look básico para o próximo nível.
          </p>
          <Link href="/categoria/camiseta-suedine" className="inline-block bg-white text-black px-8 py-4 font-bold text-xs uppercase tracking-widest hover:bg-amber-500 transition-colors">
            Explorar Linha Suedine
          </Link>
        </div>
      </section>

      {/* VITRINE 2: SUEDINE */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-anton uppercase text-zinc-900 tracking-wide">Streetwear Premium</h2>
              <p className="text-zinc-500 text-sm mt-2 font-medium">Toque peletizado, caimento impecável.</p>
            </div>
            <Link href="/categoria/camiseta-suedine" className="text-xs font-bold uppercase tracking-widest text-zinc-900 hover:text-amber-600 transition-colors border-b-2 border-black pb-1 hover:border-amber-600">
              Ver Todos
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {produtosSuedine.length > 0 ? (
              produtosSuedine.map(p => <QuickBuyCard key={p.id} tituloGrupo={p.nome} produtosDoGrupo={[p]} />)
            ) : (
              <div className="col-span-2 md:col-span-4 py-12 text-center text-zinc-400 font-bold uppercase tracking-widest text-xs">
                Nenhum produto cadastrado nesta categoria.
              </div>
            )}
          </div>
        </div>
      </section>

    </main>
  );
}
