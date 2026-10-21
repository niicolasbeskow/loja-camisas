"use client";

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import QuickBuyCard from '@/components/QuickBuyCard';
import { getProdutosPorCategoria } from '@/data/produtos';

export default function Home() {
  const todasSuedine = getProdutosPorCategoria('camiseta-suedine');
  const todasOversized = getProdutosPorCategoria('camiseta-oversized');
  
  // Vitrines
  const produtosSuedine = todasSuedine.slice(0, 4);
  const produtosOversized = todasOversized.slice(0, 4);

  return (
    <main className="min-h-screen bg-white">
      
      {/* BANNER PRINCIPAL (HERO) - RESTAURADO COM A SUA IMAGEM */}
      <section className="relative h-[85vh] w-full bg-zinc-100 flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 flex justify-end">
          {/* A SUA IMAGEM DO MODELO AGACHADO */}
          <div 
            className="w-full h-full md:w-[70%] bg-cover bg-center md:bg-right" 
            style={{ backgroundImage: "url('/files/hero-modelo.jpg')" }} 
          ></div>
        </div>
        
        {/* Degradê para garantir a leitura do texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/80 to-transparent z-10"></div>

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
        </div>
      </section>

      {/* 4 CAIXAS DE CATEGORIAS ESTRATÉGICAS */}
      <section className="bg-white py-8 md:py-12 border-b border-zinc-200">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            
            {/* KITS */}
            <Link href="/categoria/kits" className="group relative aspect-square md:aspect-[4/5] bg-zinc-900 overflow-hidden flex flex-col justify-end p-4 md:p-6 cursor-pointer rounded-sm">
              <div className="absolute inset-0 bg-zinc-800 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/files/bg-kits.jpg')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>
              <div className="relative z-20">
                <h3 className="text-white font-anton text-xl md:text-3xl uppercase tracking-wide mb-1">Kits</h3>
                <span className="text-white/80 text-[9px] md:text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 group-hover:text-white transition-colors">
                  Shop Now <ArrowRight size={12} />
                </span>
              </div>
            </Link>

            {/* OVERSIZED */}
            <Link href="/categoria/camiseta-oversized" className="group relative aspect-square md:aspect-[4/5] bg-zinc-900 overflow-hidden flex flex-col justify-end p-4 md:p-6 cursor-pointer rounded-sm">
              <div className="absolute inset-0 bg-zinc-800 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/files/bg-oversized.jpg')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>
              <div className="relative z-20">
                <h3 className="text-white font-anton text-xl md:text-3xl uppercase tracking-wide mb-1">Oversized</h3>
                <span className="text-white/80 text-[9px] md:text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 group-hover:text-white transition-colors">
                  Shop Now <ArrowRight size={12} />
                </span>
              </div>
            </Link>

            {/* MOLETONS */}
            <Link href="/categoria/moletom" className="group relative aspect-square md:aspect-[4/5] bg-zinc-900 overflow-hidden flex flex-col justify-end p-4 md:p-6 cursor-pointer rounded-sm">
              <div className="absolute inset-0 bg-zinc-800 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/files/bg-moletom.jpg')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>
              <div className="relative z-20">
                <h3 className="text-white font-anton text-xl md:text-3xl uppercase tracking-wide mb-1">Moletons</h3>
                <span className="text-white/80 text-[9px] md:text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 group-hover:text-white transition-colors">
                  Shop Now <ArrowRight size={12} />
                </span>
              </div>
            </Link>

            {/* COLLABS */}
            <Link href="/categoria/collab" className="group relative aspect-square md:aspect-[4/5] bg-zinc-900 overflow-hidden flex flex-col justify-end p-4 md:p-6 cursor-pointer rounded-sm">
              <div className="absolute inset-0 bg-zinc-950 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/files/bg-collabs.jpg')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>
              <div className="relative z-20">
                <h3 className="text-white font-anton text-xl md:text-3xl uppercase tracking-wide mb-1">Collabs</h3>
                <span className="text-white/80 text-[9px] md:text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 group-hover:text-white transition-colors">
                  Em Breve <ArrowRight size={12} />
                </span>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* VITRINE 1: DESTAQUES (SUEDINE) - MUDADO CONFORME PEDIDO */}
      <section className="py-20 md:py-32 border-b border-zinc-200">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-anton uppercase text-zinc-900 tracking-wide">Coleções</h2>
              <p className="text-zinc-500 text-sm mt-2 font-medium">O essencial para o seu corre diário.</p>
            </div>
            <Link href="/categoria/camiseta-suedine" className="text-xs font-bold uppercase tracking-widest text-zinc-900 hover:text-amber-600 transition-colors border-b-2 border-black pb-1 hover:border-amber-600">
              Ver Toda a Linha Suedine
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

      {/* BANNER SECUNDÁRIO (MEIO DE PÁGINA) - DESIGN PRETO E BRANCO RESTAURADO */}
      <section className="relative py-32 bg-zinc-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black z-0"></div>
        <div className="relative z-20 text-center px-4 max-w-3xl">
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

      {/* VITRINE 2: OVERSIZED (MOVIDA PARA BAIXO DO BANNER) */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-anton uppercase text-zinc-900 tracking-wide">Streetwear Premium</h2>
              <p className="text-zinc-500 text-sm mt-2 font-medium">Caimento estruturado, atitude máxima.</p>
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

    </main>
  );
}
