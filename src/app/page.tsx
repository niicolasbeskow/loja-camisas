"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import QuickBuyCard from '@/components/QuickBuyCard';
import { carregarProdutosStorage, produtosIniciais, Produto } from '@/data/produtos';
import { ArrowRight, Truck, ShieldCheck, RefreshCw, Award, Lock } from 'lucide-react';

export default function HomePage() {
  const [catalogo, setCatalogo] = useState<Produto[]>(produtosIniciais);
  const [modoCapturaDrop, setModoCapturaDrop] = useState(false);
  const [contatoDrop, setContatoDrop] = useState('');
  const [inscritoSucesso, setInscritoSucesso] = useState(false);

  useEffect(() => {
    setCatalogo(carregarProdutosStorage());
  }, []);

  const produtosDestaque = catalogo.slice(0, 5);

  const handleInscreverDrop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contatoDrop.trim()) return;
    try {
      const salvos = JSON.parse(localStorage.getItem('bskw_drop_alerts') || '[]');
      localStorage.setItem('bskw_drop_alerts', JSON.stringify([...salvos, { contato: contatoDrop, data: new Date().toISOString() }]));
    } catch (err) {}
    setInscritoSucesso(true);
    setContatoDrop('');
    setTimeout(() => setModoCapturaDrop(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white font-outfit">

      {/* 1. HERO BANNER PRINCIPAL COM IMAGEM DE FUNDO AJUSTADA */}
      <section className="relative bg-[#000000] text-white border-b border-[#2a2a2a] overflow-hidden select-none py-16 md:py-24 lg:py-32">
        
        {/* A SUA IMAGEM DE FUNDO AQUI (AJUSTADA SEM CORTES = contain) */}
        <div 
          className="absolute inset-0 bg-center bg-no-repeat opacity-60 z-0"
          style={{
            backgroundImage: "url('/files/capa-principal-2.jpg')",
            backgroundSize: 'contain'
          }}
        />

        {/* DEGRADÊ PARA GARANTIR LEITURA DOS TEXTOS POR CIMA DA FOTO */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#000000]/70 to-transparent z-0" />

        {/* TEXTURA CANELADA SUAVE */}
        <div className="absolute inset-0 bg-canelado opacity-30 pointer-events-none z-0" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* TEXTOS À ESQUERDA */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#F59E0B] mb-4 block">
                STREETWEAR // CULTURE // YOU
              </span>
              <h1 className="font-anton text-6xl sm:text-7xl lg:text-[90px] uppercase text-white tracking-normal leading-[0.95] mb-6 drop-shadow-md">
                FEITO PARA<br />OS REAIS<span className="text-[#F59E0B]">.</span>
              </h1>
              <p className="text-[15px] md:text-[16px] leading-[26px] text-[#9A9A9A] max-w-[48ch] mb-8 font-medium drop-shadow-sm">
                Mais do que roupa — é um mindset. B.SKW é para quem faz acontecer e se mantém sólido. Construído para durar.
              </p>
              <Link
                href="#destaques"
                className="bg-transparent border-2 border-white text-white px-8 py-4 font-semibold text-[12px] uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-white hover:text-black active:scale-[0.98] transition-all rounded-none"
              >
                SHOP NOW <ArrowRight size={15} />
              </Link>
            </div>

            {/* BLOCO EDITORIAL À DIREITA */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end relative">
              <div className="relative aspect-square md:aspect-[4/3] w-full max-w-lg bg-[#161616]/90 backdrop-blur-sm border border-[#2a2a2a] p-8 flex flex-col justify-between overflow-hidden bg-canelado shadow-2xl hidden md:flex">
                <div className="flex justify-between items-start">
                  <span className="font-anton text-4xl tracking-widest text-white">B<span className="text-[#F59E0B]">.</span>SKW</span>
                  <span className="font-mono text-[10px] text-[#9A9A9A] uppercase tracking-widest">EST. 2026</span>
                </div>
                <div className="my-auto text-center">
                  <span className="font-anton text-[120px] md:text-[160px] uppercase text-white/5 tracking-tighter block leading-none select-none">
                    SOLID
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center font-anton text-6xl text-white tracking-widest pointer-events-none">
                    B.SKW
                  </span>
                </div>
                <div className="pt-4 border-t border-[#2a2a2a] flex justify-between items-end font-mono text-[10px] text-[#9A9A9A]">
                  <span>27.5954° S</span>
                  <span>48.5480° W</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. 4 CAIXAS DE CATEGORIAS ESTRATÉGICAS */}
      <section className="bg-[#000000] py-8 md:py-12 border-b border-[#2a2a2a]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
            
            {[
              { id: 'KITS', href: '/categoria/kits' },
              { id: 'OVERSIZED', href: '/categoria/camiseta-oversized' },
              { id: 'MOLETONS', href: '/categoria/moletom' }
            ].map((cat) => (
              <Link
                key={cat.id}
                href={cat.href}
                className="group relative aspect-[4/5] bg-[#161616] border border-[#2a2a2a] hover:border-[#F59E0B] p-5 md:p-6 flex flex-col justify-end overflow-hidden transition-colors rounded-none bg-canelado cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/40 to-transparent z-10" />
                <div className="relative z-20">
                  <h3 className="font-anton text-2xl md:text-3xl uppercase text-white mb-1">{cat.id}</h3>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9A9A9A] group-hover:text-[#F59E0B] flex items-center gap-2 transition-colors">
                    Shop Now <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            ))}

            {/* CAIXA 4: COLLABS (CAPTURA DE LEAD) */}
            <div className="group relative aspect-[4/5] bg-[#161616] border border-[#2a2a2a] p-5 md:p-6 flex flex-col justify-between overflow-hidden rounded-none bg-canelado">
              <div className="relative z-20 flex justify-between items-center">
                <span className="text-[10px] font-mono uppercase text-[#9A9A9A] flex items-center gap-1">
                  <Lock size={11} className="text-[#F59E0B]" /> Drop Locked
                </span>
              </div>
              <div className="relative z-20 w-full">
                {inscritoSucesso ? (
                  <div className="bg-black border border-[#F59E0B] p-3 text-center">
                    <span className="text-[#F59E0B] font-bold text-[11px] uppercase tracking-wider block">Registrado!</span>
                  </div>
                ) : modoCapturaDrop ? (
                  <form onSubmit={handleInscreverDrop} className="flex flex-col gap-2">
                    <input
                      type="text"
                      required
                      value={contatoDrop}
                      onChange={(e) => setContatoDrop(e.target.value)}
                      placeholder="WhatsApp ou E-mail"
                      className="w-full bg-[#000000] border border-[#2a2a2a] focus:border-[#F59E0B] text-white p-2 text-xs outline-none rounded-none"
                    />
                    <button type="submit" className="w-full bg-[#F59E0B] text-black py-2 font-bold text-[10px] uppercase tracking-widest rounded-none">
                      Garantir Acesso
                    </button>
                  </form>
                ) : (
                  <div>
                    <h3 className="font-anton text-2xl md:text-3xl uppercase text-white mb-1">COLLABS</h3>
                    <button
                      type="button"
                      onClick={() => setModoCapturaDrop(true)}
                      className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9A9A9A] hover:text-[#F59E0B] flex items-center gap-2 transition-colors text-left mt-1"
                    >
                      Shop Now <ArrowRight size={13} />
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SEÇÃO "FRESH DROPS" */}
      <section className="relative bg-[#161616] text-white border-b border-[#2a2a2a] py-20 md:py-28 bg-canelado">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 flex flex-col items-start">
              <span className="text-[12px] font-semibold uppercase tracking-[0.25em] text-[#F59E0B] mb-3 block">
                NEW ARRIVALS
              </span>
              <h2 className="font-anton text-5xl md:text-7xl uppercase text-white tracking-normal leading-[0.95] mb-6">
                FRESH<br />DROPS
              </h2>
              <p className="text-[15px] text-[#9A9A9A] max-w-[42ch] mb-8 font-medium">
                The latest pieces from B.SKW. Limited stock. Don't miss out on our heavy cotton drops.
              </p>
              <Link
                href="/categoria/camiseta-suedine"
                className="bg-white text-black px-8 py-4 font-semibold text-[12px] uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-[#F59E0B] active:scale-[0.98] transition-all rounded-none"
              >
                VIEW ALL <ArrowRight size={15} />
              </Link>
            </div>

            <div className="lg:col-span-6">
              <div className="p-8 md:p-12 border border-[#2a2a2a] bg-black flex flex-col justify-center items-center text-center relative overflow-hidden">
                <span className="font-anton text-4xl md:text-6xl uppercase text-white/20 tracking-wider mb-4">
                  SAME MINDSET.<br />DIFFERENT ENERGY.
                </span>
                <div className="w-12 h-[2px] bg-[#F59E0B] my-4" />
                <span className="font-mono text-xs text-[#9A9A9A] uppercase tracking-widest">B.SKW EDITORIAL</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. ÍCONES DE BENEFÍCIOS */}
      <section className="bg-[#000000] border-b border-[#2a2a2a] py-10">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-3">
              <Truck size={24} className="text-[#F59E0B] shrink-0" />
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-white">Fast Shipping</h4>
                <p className="text-[11px] text-[#9A9A9A]">Worldwide Delivery</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-3">
              <ShieldCheck size={24} className="text-[#F59E0B] shrink-0" />
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-white">Secure Payments</h4>
                <p className="text-[11px] text-[#9A9A9A]">Shop with Confidence</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-3">
              <RefreshCw size={24} className="text-[#F59E0B] shrink-0" />
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-white">Easy Returns</h4>
                <p className="text-[11px] text-[#9A9A9A]">Hassle-Free Returns</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-3">
              <Award size={24} className="text-[#F59E0B] shrink-0" />
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-white">Premium Quality</h4>
                <p className="text-[11px] text-[#9A9A9A]">Built to Last</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VITRINE DE PRODUTOS EM DESTAQUE */}
      <section id="destaques" className="py-20 md:py-28 border-b border-[#2a2a2a] scroll-mt-20">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#F59E0B] block mb-2">
                CATÁLOGO OFICIAL
              </span>
              <h2 className="font-anton text-4xl md:text-5xl uppercase text-white">
                Featured Products
              </h2>
            </div>
            <Link href="/categoria/camiseta-oversized" className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#F59E0B] hover:underline underline-offset-4 flex items-center gap-1.5">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
            {produtosDestaque.map((peca) => (
              <QuickBuyCard
                key={peca.id}
                tituloGrupo={peca.nome}
                produtosDoGrupo={[peca]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. RODAPÉ */}
      <footer className="bg-[#000000] text-[#9A9A9A] py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#2a2a2a]">
            
            <div className="md:col-span-6 flex flex-col items-start">
              <span className="font-anton text-5xl uppercase text-white leading-none tracking-normal mb-3">
                B<span className="text-[#F59E0B]">.</span>SKW
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white mb-4">
                STREETWEAR PREMIUM
              </span>
              <p className="text-[14px] text-[#9A9A9A] max-w-sm leading-relaxed">
                Rooted in culture. Built for tomorrow. Desenvolvido em Florianópolis, Santa Catarina.
              </p>
            </div>

            <div className="md:col-span-6 flex flex-col md:items-end justify-center">
              <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#F59E0B] mb-2">JOIN THE MOVEMENT</span>
              <p className="text-xs text-[#9A9A9A] md:text-right">Acompanhe os próximos lançamentos e drops exclusivos.</p>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#9A9A9A]">
            <span>© {new Date().getFullYear()} B.SKW · All rights reserved.</span>
            <span>Breu, Grafite, Concreto & Âmbar.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
