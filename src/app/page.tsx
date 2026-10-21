"use client";

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import QuickBuyCard from '@/components/QuickBuyCard';
import { getProdutosPorCategoria } from '@/data/produtos';

export default function Home() {
  const todasSuedine = getProdutosPorCategoria('camiseta-suedine');
  const todasOversized = getProdutosPorCategoria('camiseta-oversized');
  
  const produtosSuedine = todasSuedine.slice(0, 4);
  const produtosOversized = todasOversized.slice(0, 4);

  return (
    <main className="min-h-screen bg-white">
      
      {/* 1. HERO BANNER - RESTAURADO IDÊNTICO À SUA IMAGEM */}
      <section className="relative h-[85vh] w-full bg-[#1c1c1c] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* COLOQUE AQUI O NOME DA SUA IMAGEM DO MODELO DE ÓCULOS ESCUROS */}
          <div 
            className="w-full h-full bg-cover bg-center md:bg-right opacity-80" 
            style={{ backgroundImage: "url('/files/capa-principal.jpg')" }} 
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#1c1c1c] via-[#1c1c1c]/80 to-transparent"></div>
        </div>

        <div className="relative z-20 max-w-[1400px] mx-auto px-6 w-full flex flex-col items-start">
          
          <h1 className="text-7xl md:text-[9rem] font-anton text-white tracking-tight leading-none flex items-end">
            B.SKW<span className="w-4 h-4 md:w-8 md:h-8 bg-[#eab308] ml-2 mb-3 md:mb-5 inline-block"></span>
          </h1>
          
          <div className="w-[80%] max-w-md h-[2px] bg-[#eab308] mt-4 mb-8"></div>
          
          <h2 className="text-white text-sm md:text-lg font-bold tracking-[0.3em] uppercase mb-4">
            Streetwear Premium
          </h2>
          
          <h3 className="text-4xl md:text-5xl font-anton text-white uppercase tracking-wide mb-6">
            Feito para os reais.
          </h3>
          
          <p className="text-zinc-300 text-xs md:text-sm max-w-md font-medium mb-10 leading-relaxed">
            Mais do que roupa, é um mindset. B.SKW é para quem faz acontecer e se mantém sólido.
          </p>
          
          <Link href="/categoria/camiseta-basica" className="border-2 border-white text-white px-8 py-4 font-bold text-xs md:text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
            Comprar Agora
          </Link>
        </div>

        <div className="absolute bottom-8 right-6 flex flex-col items-end opacity-40 hidden md:flex">
          <span className="text-white text-[10px] font-bold tracking-widest uppercase mb-1">EST. 2026</span>
          <span className="text-white text-[9px] font-mono tracking-widest">27.5954° S</span>
          <span className="text-white text-[9px] font-mono tracking-widest">48.5480° W</span>
        </div>
      </section>

      {/* 2. AS 4 CAIXAS ESTRATÉGICAS (NOVA ADIÇÃO) */}
      <section className="bg-white py-8 md:py-12 border-b border-zinc-200">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            
            <Link href="/categoria/kits" className="group relative aspect-square md:aspect-[4/5] bg-zinc-900 overflow-hidden flex flex-col justify-end p-4 md:p-6 cursor-pointer rounded-sm">
              <div className="absolute inset-0 bg-zinc-800 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/files/cat-kits.jpg')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>
              <div className="relative z-20">
                <h3 className="text-white font-anton text-xl md:text-3xl uppercase tracking-wide mb-1">Kits</h3>
                <span className="text-white/80 text-[9px] md:text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 group-hover:text-white transition-colors">Shop Now <ArrowRight size={12} /></span>
              </div>
            </Link>

            <Link href="/categoria/camiseta-oversized" className="group relative aspect-square md:aspect-[4/5] bg-zinc-900 overflow-hidden flex flex-col justify-end p-4 md:p-6 cursor-pointer rounded-sm">
              <div className="absolute inset-0 bg-zinc-800 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/files/cat-oversized.jpg')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>
              <div className="relative z-20">
                <h3 className="text-white font-anton text-xl md:text-3xl uppercase tracking-wide mb-1">Oversized</h3>
                <span className="text-white/80 text-[9px] md:text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 group-hover:text-white transition-colors">Shop Now <ArrowRight size={12} /></span>
              </div>
            </Link>

            <Link href="/categoria/moletom" className="group relative aspect-square md:aspect-[4/5] bg-zinc-900 overflow-hidden flex flex-col justify-end p-4 md:p-6 cursor-pointer rounded-sm">
              <div className="absolute inset-0 bg-zinc-800 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/files/cat-moletom.jpg')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>
              <div className="relative z-20">
                <h3 className="text-white font-anton text-xl md:text-3xl uppercase tracking-wide mb-1">Moletons</h3>
                <span className="text-white/80 text-[9px] md:text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 group-hover:text-white transition-colors">Shop Now <ArrowRight size={12} /></span>
              </div>
            </Link>

            <Link href="/categoria/collab" className="group relative aspect-square md:aspect-[4/5] bg-zinc-900 overflow-hidden flex flex-col justify-end p-4 md:p-6 cursor-pointer rounded-sm">
              <div className="absolute inset-0 bg-zinc-950 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/files/cat-collab.jpg')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>
              <div className="relative z-20">
                <h3 className="text-white font-anton text-xl md:text-3xl uppercase tracking-wide mb-1">Collabs</h3>
                <span className="text-white/80 text-[9px] md:text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 group-hover:text-white transition-colors">Em Breve <ArrowRight size={12} /></span>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* 3. VITRINE DE PRODUTOS */}
      <section className="py-16 md:py-24 border-b border-zinc-200">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-anton uppercase text-zinc-900 tracking-wide">Coleções</h2>
              <p className="text-zinc-500 text-sm mt-2 font-medium">O essencial para o seu corre diário.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {produtosOversized.length > 0 ? (
              produtosOversized.map(p => <QuickBuyCard key={p.id} tituloGrupo={p.nome} produtosDoGrupo={[p]} />)
            ) : (
              <div className="col-span-2 md:col-span-4 py-12 text-center text-zinc-400 font-bold uppercase tracking-widest text-xs">Nenhum produto cadastrado.</div>
            )}
          </div>
        </div>
      </section>

      {/* 4. FRESH DROPS - RESTAURADO IDÊNTICO À SUA IMAGEM (AGORA COM SUEDINE) */}
      <section className="bg-[#f6f5f2] relative pt-16 pb-0 md:py-0 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 items-center gap-8 md:h-[600px]">
          
          <div className="flex flex-col items-start order-2 md:order-1 z-20 pb-16 md:pb-0">
            <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-3">Novo Lançamento</span>
            <h2 className="text-6xl md:text-8xl font-anton text-zinc-900 uppercase leading-[0.85] mb-6">FRESH<br/>DROPS</h2>
            <p className="text-zinc-600 text-sm font-medium max-w-xs md:max-w-sm mb-8 leading-relaxed">
              As últimas peças adicionadas ao catálogo. Estoque limitado para garantir exclusividade. Não fique de fora.
            </p>
            <Link href="/categoria/camiseta-suedine" className="bg-black text-white px-8 py-4 font-bold text-xs uppercase tracking-widest hover:bg-zinc-800 transition-colors flex items-center gap-2">
              VER COLEÇÃO SUEDINE <ArrowRight size={14} />
            </Link>
          </div>

          <div className="order-1 md:order-2 flex justify-center items-end h-full relative z-10 pt-8 md:pt-0">
            {/* COLOQUE AQUI O NOME DA IMAGEM DO MODELO AGACHADO */}
            <div className="w-[300px] h-[350px] md:w-full md:h-full bg-contain bg-bottom bg-no-repeat" style={{ backgroundImage: "url('/files/fresh-drops.png')" }}></div>
          </div>

          <div className="order-3 hidden md:flex flex-col justify-start items-end h-full pt-20 z-20">
            <div className="text-right">
              <span className="block text-zinc-800 font-bold uppercase tracking-[0.2em] text-[10px] mb-1">MESMO MINDSET.</span>
              <span className="block text-zinc-800 font-bold uppercase tracking-[0.2em] text-[10px] mb-4">ENERGIA DIFERENTE.</span>
              <div className="w-8 h-px bg-zinc-400 ml-auto"></div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. VITRINE SUEDINE */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-anton uppercase text-zinc-900 tracking-wide">Streetwear Premium</h2>
              <p className="text-zinc-500 text-sm mt-2 font-medium">Toque peletizado, caimento impecável.</p>
            </div>
            <Link href="/categoria/camiseta-suedine" className="text-xs font-bold uppercase tracking-widest text-zinc-900 hover:text-amber-600 transition-colors border-b-2 border-black pb-1 hover:border-amber-600">
              Ver Toda a Linha Suedine
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {produtosSuedine.length > 0 ? (
              produtosSuedine.map(p => <QuickBuyCard key={p.id} tituloGrupo={p.nome} produtosDoGrupo={[p]} />)
            ) : (
              <div className="col-span-2 md:col-span-4 py-12 text-center text-zinc-400 font-bold uppercase tracking-widest text-xs">Nenhum produto cadastrado.</div>
            )}
          </div>
        </div>
      </section>

    </main>
  );
}
