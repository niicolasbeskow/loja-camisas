"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import ShopByCategory from '@/components/ShopByCategory';
import QuickBuyCard from '@/components/QuickBuyCard';
import { carregarProdutosStorage, produtosIniciais, Produto } from '@/data/produtos';
import { ArrowRight } from 'lucide-react';

type FiltroModelagem = 'todas' | 'camiseta-suedine' | 'camiseta-oversized' | 'camiseta-boxy' | 'moletom' | 'camiseta-basica';

export default function HomePage() {
  const [catalogo, setCatalogo] = useState<Produto[]>(produtosIniciais);
  const [filtroAtivo, setFiltroAtivo] = useState<FiltroModelagem>('todas');

  useEffect(() => {
    setCatalogo(carregarProdutosStorage());
  }, []);

  const categoriasParaAgrupar: { slug: string; tituloGrupo: string }[] = [
    { slug: 'camiseta-suedine', tituloGrupo: 'Camiseta Heavy Suedine B.SKW' },
    { slug: 'camiseta-oversized', tituloGrupo: 'Camiseta Oversized B.SKW' },
    { slug: 'camiseta-boxy', tituloGrupo: 'Camiseta Boxy B.SKW' },
    { slug: 'moletom', tituloGrupo: 'Moletom Heavyweight B.SKW' },
    { slug: 'camiseta-basica', tituloGrupo: 'Camiseta Clássica 200g B.SKW' },
    { slug: 'manga-longa', tituloGrupo: 'Manga Longa Vintage B.SKW' },
    { slug: 'camiseta-poliamida', tituloGrupo: 'Camiseta Ultra Tech B.SKW' },
    { slug: 'shorts', tituloGrupo: 'Shorts Poliamida B.SKW' }
  ];

  const produtosExibidos = filtroAtivo === 'todas'
    ? catalogo
    : catalogo.filter(p => p.categoria === filtroAtivo);

  return (
    <div className="min-h-screen bg-[#000000] text-white font-outfit">
      
      {/* NAVBAR + CART DRAWER */}
      <Header />

      {/* HERO BANNER: ARMADURA, NÃO ANÚNCIO */}
      <HeroBanner />

      {/* NAVEGAÇÃO POR MODELAGEM E COLLAB TRECE */}
      <ShopByCategory />

      {/* VITRINE PRINCIPAL DE EDIÇÕES E PEÇAS */}
      <section id="edicoes" className="py-20 md:py-28 border-b border-[#2a2a2a] scroll-mt-20">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          
          {/* CABEÇALHO E FILTROS DE LINHA */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#F59E0B] block mb-2">
                02 · Catálogo Autoral
              </span>
              <h2 className="font-anton text-4xl md:text-[56px] md:leading-[60px] uppercase text-white">
                Heavy Suedine, Zero Encolhimento
              </h2>
            </div>

            {/* PILLS DE FILTRO EM GRAFITE E ÂMBAR */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 [&::-webkit-scrollbar]:hidden">
              {[
                { id: 'todas', label: 'Todas as Linhas' },
                { id: 'camiseta-suedine', label: 'Heavy Suedine 250g' },
                { id: 'camiseta-oversized', label: 'Oversized' },
                { id: 'camiseta-boxy', label: 'Boxy' },
                { id: 'moletom', label: 'Moletons 320g' },
                { id: 'camiseta-basica', label: 'Clássicas 200g' }
              ].map((aba) => (
                <button
                  key={aba.id}
                  type="button"
                  onClick={() => setFiltroAtivo(aba.id as FiltroModelagem)}
                  className={`px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.15em] border rounded-none shrink-0 transition-all ${
                    filtroAtivo === aba.id
                      ? 'bg-[#F59E0B] text-[#000000] border-[#F59E0B]'
                      : 'bg-[#161616] text-[#9A9A9A] border-[#2a2a2a] hover:text-white hover:border-white'
                  }`}
                >
                  {aba.label}
                </button>
              ))}
            </div>
          </div>

          {/* GRID DE PRODUTOS */}
          {filtroAtivo === 'todas' ? (
            <div className="space-y-16">
              <div>
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#2a2a2a]">
                  <h3 className="font-anton text-[28px] leading-[32px] uppercase text-white">
                    Modelagens por Linha (Selecione a Tonalidade)
                  </h3>
                  <span className="text-[13px] text-[#9A9A9A] hidden sm:inline">
                    {catalogo.length} SKUs disponíveis
                  </span>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {categoriasParaAgrupar.map((grupo) => {
                    const pecasDoGrupo = catalogo.filter(p => p.categoria === grupo.slug);
                    if (pecasDoGrupo.length === 0) return null;
                    return (
                      <QuickBuyCard
                        key={grupo.slug}
                        tituloGrupo={grupo.tituloGrupo}
                        produtosDoGrupo={pecasDoGrupo}
                      />
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#2a2a2a]">
                  <h3 className="font-anton text-[28px] leading-[32px] uppercase text-white">
                    Destaques em Preto Profundo & Neutros
                  </h3>
                  <Link
                    href="/categoria/camiseta-oversized"
                    className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#F59E0B] hover:underline underline-offset-4 flex items-center gap-1.5"
                  >
                    Ver Todos <ArrowRight size={14} />
                  </Link>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {catalogo.slice(0, 8).map((peca) => (
                    <QuickBuyCard
                      key={peca.id}
                      tituloGrupo={peca.nome}
                      produtosDoGrupo={[peca]}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {produtosExibidos.map((peca) => (
                <QuickBuyCard
                  key={peca.id}
                  tituloGrupo={peca.nome}
                  produtosDoGrupo={[peca]}
                />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* SECÇÃO DE ENGENHARIA TÊXTIL */}
      <section className="py-20 md:py-28 border-b border-[#2a2a2a] bg-[#000000]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#F59E0B] block mb-2">
            03 · Especificação de Construção
          </span>
          <h2 className="font-anton text-4xl md:text-[56px] md:leading-[60px] uppercase text-white mb-12">
            Nada Decora, Tudo Sustenta o Peso
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#161616] border border-[#2a2a2a] p-8 flex flex-col justify-between">
              <div>
                <div
                  className="h-24 mb-6 border border-[#2a2a2a] flex items-end p-3"
                  style={{
                    backgroundColor: '#000000',
                    backgroundImage: 'repeating-linear-gradient(90deg, #1c1c1c 0 3px, transparent 3px 9px)'
                  }}
                >
                  <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#F59E0B]">
                    01 · ASSINATURA
                  </span>
                </div>
                <h3 className="font-anton text-[28px] leading-[32px] uppercase text-white mb-3">
                  Gola Canelada de 3 cm
                </h3>
                <p className="text-[17px] leading-[28px] text-[#9A9A9A]">
                  Construída com ribana de alta densidade que abraça o pescoço sem ceder. O canelado é o único ornamento da peça.
                </p>
              </div>
            </div>

            <div className="bg-[#161616] border border-[#2a2a2a] p-8 flex flex-col justify-between">
              <div>
                <div
                  className="h-24 mb-6 border border-[#2a2a2a] flex items-end p-3"
                  style={{
                    backgroundColor: '#000000',
                    backgroundImage: 'repeating-linear-gradient(90deg, #1c1c1c 0 3px, transparent 3px 9px)'
                  }}
                >
                  <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#F59E0B]">
                    02 · MATÉRIA-PRIMA
                  </span>
                </div>
                <h3 className="font-anton text-[28px] leading-[32px] uppercase text-white mb-3">
                  Heavy Suedine 250 g/m²
                </h3>
                <p className="text-[17px] leading-[28px] text-[#9A9A9A]">
                  Fio 40.1 100% algodão com toque aveludado e estrutura encorpada. Mantém o caimento armado longe do corpo.
                </p>
              </div>
            </div>

            <div className="bg-[#161616] border border-[#2a2a2a] p-8 flex flex-col justify-between">
              <div>
                <div
                  className="h-24 mb-6 border border-[#2a2a2a] flex items-end p-3"
                  style={{
                    backgroundColor: '#000000',
                    backgroundImage: 'repeating-linear-gradient(90deg, #1c1c1c 0 3px, transparent 3px 9px)'
                  }}
                >
                  <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#F59E0B]">
                    03 · ECONOMIA DE ESCALA
                  </span>
                </div>
                <h3 className="font-anton text-[28px] leading-[32px] uppercase text-white mb-3">
                  Kits Progressivos 2 e 3
                </h3>
                <p className="text-[17px] leading-[28px] text-[#9A9A9A]">
                  Monte a sua rotação semanal de essenciais em Breu, Branco e Off-White com valor unitário reduzido automaticamente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RODAPÉ OFICIAL */}
      <footer className="bg-[#000000] text-[#9A9A9A] py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#2a2a2a]">
            
            <div className="md:col-span-5 flex flex-col items-start">
              <div className="inline-flex flex-col items-center">
                <span className="font-anton text-6xl uppercase text-white leading-none tracking-normal">
                  B<span className="text-[#F59E0B]">.</span>SKW
                </span>
                <div className="w-full h-[3px] bg-[#F59E0B] my-2.5" />
                <span className="text-[12px] font-semibold uppercase tracking-[0.35em] text-white">
                  STREETWEAR PREMIUM
                </span>
              </div>
              <p className="text-[15px] text-[#9A9A9A] mt-6 max-w-sm leading-relaxed">
                Uma armadura de tecido para quem veste a rua com respeito. Desenvolvido em Florianópolis, Santa Catarina.
              </p>
            </div>

            <div className="md:col-span-3 space-y-3">
              <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#F59E0B] block mb-4">
                Modelagens
              </span>
              <ul className="space-y-2.5 text-[14px]">
                <li><Link href="/categoria/camiseta-suedine" className="hover:text-white transition-colors">Heavy Suedine 250g</Link></li>
                <li><Link href="/categoria/camiseta-oversized" className="hover:text-white transition-colors">Oversized 200g</Link></li>
                <li><Link href="/categoria/camiseta-boxy" className="hover:text-white transition-colors">Boxy Fit</Link></li>
                <li><Link href="/categoria/moletom" className="hover:text-white transition-colors">Moletons 320g</Link></li>
                <li><Link href="/categoria/camiseta-basica" className="hover:text-white transition-colors">Clássicas 200g</Link></li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-3">
              <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#F59E0B] block mb-4">
                Diretrizes B.SKW
              </span>
              <p className="text-[14px] text-[#9A9A9A] leading-relaxed">
                Pagamentos processados com segurança. Desconto de Kit 2 e Kit 3 aplicado diretamente na seleção da peça ou na gaveta de compras.
              </p>
              <div className="pt-2 text-[13px] text-white">
                loja-camisas-two.vercel.app · Florianópolis, SC
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-[#9A9A9A]">
            <span>© {new Date().getFullYear()} B.SKW · Todos os direitos reservados.</span>
            <span>Brand Book v1.0 · Breu, Grafite, Concreto & Âmbar.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
