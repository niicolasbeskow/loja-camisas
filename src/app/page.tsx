"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
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

      <Header />

      {/* 1. HERO BANNER PRINCIPAL COM FOTO ENCOSTADA À DIREITA */}
      <section className="relative bg-[#000000] text-white border-b border-[#2a2a2a] overflow-hidden select-none flex items-center min-h-[75vh] lg:min-h-[85vh] py-16 md:py-24">
        
        <div 
          className="absolute inset-0 bg-right bg-no-repeat opacity-80 z-0"
          style={{
            backgroundImage: "url('/files/capa-principal-2.jpg')",
            backgroundSize: 'contain'
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#000000]/80 to-transparent z-0" />

        <div className="absolute top-6 right-6 md:top-8 md:right-10 font-mono text-[10px] text-[#9A9A9A] uppercase tracking-widest z-20 pointer-events-none">
          EST. 2026
        </div>
        <div className="absolute bottom-6 left-6 md:bottom-8 md:left-10 font-mono text-[10px] text-[#9A9A9A] tracking-widest z-20 pointer-events-none">
          27.5954° S
        </div>
        <div className="absolute bottom-6 right-6 md:bottom-8 md:right-10 font-mono text-[10px] text-[#9A9A9A] tracking-widest z-20 pointer-events-none">
          48.5480° W
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 flex flex-col items-start">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#F59E0B] mb-4 block">
                STREETWEAR // CULTURE // YOU
              </span>
              <h1 className="font-anton text-6xl sm:text-7xl lg:text-[90px] uppercase text-white tracking-normal leading-[0.95] mb-6 drop-shadow-md">
                FEITO PARA<br />OS REAIS<span className="text-[#F59E0B]">.</span>
              </h1>
              <p className="text-[15px] md:text-[16px] leading-[26px] text-[#9A9A9A] max-w-[48ch] mb-8 font-medium drop-shadow-sm">
                O peso da rua exige uma estrutura à altura. Construímos peças sólidas em alta gramatura para quem dita o próprio ritmo.
              </p>
              <Link
                href="#destaques"
                className="bg-transparent border-2 border-white text-white px-8 py-4 font-semibold text-[12px] uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-white hover:text-black active:scale-[0.98] transition-all rounded-none"
              >
                SHOP NOW <ArrowRight size={15} />
              </Link>
            </div>

            <div className="hidden lg:block lg:col-span-5"></div>

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
                    <button type="submit" className="w-full bg-[#F59E0B] text-[#000000] py-2 font-bold text-[10px] uppercase tracking-widest rounded-none">
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

      {/* 3. SEÇÃO "FRESH DROPS" EDITORIAL */}
      <section className="relative bg-[#FAFAFA] text-zinc-900 border-y border-zinc-200 overflow-hidden py-16 md:py-24">
        
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          
          <div className="flex flex-col md:flex-row items-stretch min-h-[400px] lg:min-h-[480px]">
            
            {/* BLOCO ESQUERDA: CAIXA CINZA (#EBEBEB) */}
            <div className="relative w-full md:w-[35%] lg:w-[32%] flex flex-col justify-center py-10 md:py-16 z-20 bg-[#EBEBEB]">
              <div className="absolute inset-y-0 right-0 left-[-50vw] bg-[#EBEBEB] z-0" />
              
              <div className="relative z-10 lg:pr-6">
                <span className="text-[12px] font-semibold uppercase tracking-[0.25em] text-[#F59E0B] mb-3 block">
                  NEW ARRIVALS
                </span>
                <h2 className="font-anton text-5xl md:text-6xl lg:text-[72px] uppercase text-zinc-900 tracking-normal leading-[0.95] mb-6">
                  FRESH<br />DROPS
                </h2>
                <p className="text-[14px] lg:text-[15px] text-zinc-600 max-w-[28ch] mb-8 font-medium">
                  The latest pieces from B.SKW. Limited stock. Don't miss out.
                </p>
                <Link
                  href="/categoria/kits"
                  className="bg-[#000000] text-white px-10 py-4 font-semibold text-[12px] uppercase tracking-[0.2em] inline-flex items-center gap-3 hover:bg-[#F59E0B] hover:text-[#000000] active:scale-[0.98] transition-all rounded-none"
                >
                  VIEW ALL <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* BLOCO DIREITA: IMAGEM + TEXTO */}
            <div className="relative w-full md:w-[65%] lg:w-[68%] flex flex-col md:flex-row items-stretch z-10">
              
              <div className="relative flex-1 min-h-[350px] md:min-h-full bg-[#FAFAFA]">
                <div 
                  className="absolute inset-0 bg-cover md:bg-[length:auto_100%] bg-left bg-no-repeat"
                  style={{ backgroundImage: "url('/files/banner-meio-2.jpg')" }}
                />
                {/* BLUSH MUITO MAIS SUAVE: Agora cobre apenas 25% a 35% do lado direito */}
                <div className="absolute inset-y-0 right-0 w-[20%] lg:w-[25%] bg-gradient-to-l from-[#FAFAFA] via-[#FAFAFA]/60 to-transparent pointer-events-none" />
              </div>

              {/* TEXTO DA DIREITA */}
              <div className="relative z-10 w-full md:w-[220px] lg:w-[320px] flex flex-col items-start md:items-end justify-center text-left md:text-right py-10 md:py-0 bg-[#FAFAFA]">
                
                <span className="font-semibold text-[12px] uppercase tracking-[0.25em] text-zinc-900 mb-4 leading-relaxed">
                  SAME MINDSET.<br />DIFFERENT ENERGY.
                </span>
                
                <div className="w-10 h-[2px] bg-[#F59E0B] my-2 md:ml-auto" />
                
                <span className="font-medium text-[14px] lg:text-[15px] text-zinc-600 italic mt-2">
                  B.SKW Editorial
                </span>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. ÍCONES DE BENEFÍCIOS */}
      <section className="bg-white border-b border-zinc-200 py-10">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left">
              <Truck size={28} className="text-zinc-900 shrink-0" />
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-900">Fast Shipping</h4>
                <p className="text-[11px] text-zinc-500 mt-0.5">Worldwide Delivery</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left">
              <ShieldCheck size={28} className="text-zinc-900 shrink-0" />
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-900">Secure Payments</h4>
                <p className="text-[11px] text-zinc-500 mt-0.5">Shop with Confidence</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left">
              <RefreshCw size={28} className="text-zinc-900 shrink-0" />
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-900">Easy Returns</h4>
                <p className="text-[11px] text-zinc-500 mt-0.5">Hassle-Free Returns</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left">
              <Award size={28} className="text-zinc-900 shrink-0" />
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-900">Premium Quality</h4>
                <p className="text-[11px] text-zinc-500 mt-0.5">Built to Last</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VITRINE DE PRODUTOS EM DESTAQUE */}
      <section id="destaques" className="py-20 md:py-28 bg-[#FAFAFA]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-500 block mb-2">
                CATÁLOGO OFICIAL
              </span>
              <h2 className="font-anton text-4xl md:text-5xl uppercase text-zinc-900">
                Featured Products
              </h2>
            </div>
            <Link href="/categoria/oversized" className="text-[12px] font-semibold uppercase tracking-[0.2em] text-zinc-500 hover:text-[#F59E0B] flex items-center gap-1.5 transition-colors">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
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
