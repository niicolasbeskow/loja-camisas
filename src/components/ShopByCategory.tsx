"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Lock, Check, X } from 'lucide-react';

const categoriasAtivas = [
  {
    id: '01',
    tag: 'DESCONTO PROGRESSIVO',
    titulo: 'Kits B.SKW',
    href: '/categoria/kits',
    imagem: '/files/cat-kits.jpg',
    cta: 'Ver a Edição'
  },
  {
    id: '02',
    tag: 'GOLA CANELADA · 3 CM',
    titulo: 'Oversized',
    href: '/categoria/camiseta-oversized',
    imagem: '/files/cat-oversized.jpg',
    cta: 'Ver a Edição'
  },
  {
    id: '03',
    tag: '320 G/M² · ZERO ENCOLHIMENTO',
    titulo: 'Moletons',
    href: '/categoria/moletom',
    imagem: '/files/cat-moletom.jpg',
    cta: 'Ver a Edição'
  }
];

export default function ShopByCategory() {
  const [modoCapturaDrop, setModoCapturaDrop] = useState(false);
  const [contatoDrop, setContatoDrop] = useState('');
  const [inscritoSucesso, setInscritoSucesso] = useState(false);

  const handleInscreverDrop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contatoDrop.trim()) return;

    try {
      const salvos = JSON.parse(localStorage.getItem('bskw_drop_alerts') || '[]');
      localStorage.setItem(
        'bskw_drop_alerts',
        JSON.stringify([...salvos, { contato: contatoDrop, data: new Date().toISOString() }])
      );
    } catch (err) {}

    setInscritoSucesso(true);
    setContatoDrop('');
    setTimeout(() => {
      setModoCapturaDrop(false);
    }, 2500);
  };

  return (
    <section className="bg-[#000000] py-16 md:py-24 border-b border-[#2a2a2a] font-outfit text-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#F59E0B] block mb-2">
              01 · Armadura de Tecido
            </span>
            <h2 className="text-4xl md:text-[56px] md:leading-[60px] font-anton uppercase text-white">
              Peso que se sente
            </h2>
          </div>
          <p className="text-[13px] text-[#9A9A9A]">
            Heavy Suedine e algodão de alta gramatura. Feitas para durar.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          
          {categoriasAtivas.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="group relative aspect-[4/5] overflow-hidden flex flex-col justify-between p-5 md:p-7 cursor-pointer rounded-none border border-[#2a2a2a] hover:border-[#F59E0B] transition-colors"
              style={{
                backgroundColor: '#000000',
                backgroundImage: 'repeating-linear-gradient(90deg, #1c1c1c 0 3px, transparent 3px 9px)'
              }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center grayscale contrast-125 opacity-60 transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url('${cat.imagem}')` }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/40 to-transparent z-10" />

              <div className="relative z-20">
                <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#9A9A9A]">
                  {cat.id}
                </span>
              </div>

              <div className="relative z-20">
                <span className="text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.2em] text-[#F59E0B] block mb-1.5">
                  {cat.tag}
                </span>
                <h3 className="text-white font-anton text-3xl md:text-4xl uppercase mb-4 leading-none">
                  {cat.titulo}
                </h3>
                <span className="inline-flex items-center gap-2 bg-[#161616] border border-[#2a2a2a] group-hover:bg-[#F59E0B] group-hover:text-[#000000] group-hover:border-[#F59E0B] text-white px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.08em] transition-all">
                  {cat.cta}
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 ease-out group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          ))}

          <div
            className="group relative aspect-[4/5] overflow-hidden flex flex-col justify-between p-5 md:p-7 rounded-none border border-[#2a2a2a] select-none"
            style={{
              backgroundColor: '#000000',
              backgroundImage: 'repeating-linear-gradient(90deg, #1c1c1c 0 3px, transparent 3px 9px)'
            }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center grayscale contrast-125 opacity-30 transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ backgroundImage: "url('/files/cat-collab.jpg')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/60 to-transparent z-10" />

            <div className="relative z-20 flex items-center justify-between w-full">
              <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#9A9A9A] flex items-center gap-1.5">
                <Lock size={12} className="text-[#F59E0B]" /> 04
              </span>

              {modoCapturaDrop && !inscritoSucesso && (
                <button
                  type="button"
                  onClick={() => setModoCapturaDrop(false)}
                  className="text-[#9A9A9A] hover:text-white p-1 transition-colors"
                  aria-label="Fechar"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <div className="relative z-20 w-full">
              {inscritoSucesso ? (
                <div className="bg-[#161616] border border-[#F59E0B] p-4 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 text-[#F59E0B] text-[12px] font-semibold uppercase tracking-[0.2em] mb-1">
                    <Check size={14} strokeWidth={3} /> Lista Confirmada
                  </div>
                  <p className="text-[#9A9A9A] text-[13px] leading-snug">
                    Acesso prioritário registrado para a edição limitada.
                  </p>
                </div>
              ) : modoCapturaDrop ? (
                <form onSubmit={handleInscreverDrop} className="flex flex-col gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
                  <label className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#F59E0B] block">
                    Edição Limitada:
                  </label>
                  <input
                    type="text"
                    required
                    value={contatoDrop}
                    onChange={(e) => setContatoDrop(e.target.value)}
                    placeholder="Seu WhatsApp ou E-mail"
                    className="w-full bg-[#000000] border border-[#2a2a2a] focus:border-[#F59E0B] text-white px-3 py-2.5 text-base md:text-xs rounded-none outline-none placeholder:text-[#9A9A9A]"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#F59E0B] text-[#000000] h-10 font-semibold text-[12px] uppercase tracking-[0.08em] hover:brightness-110 active:scale-[0.98] transition-all rounded-none"
                  >
                    Garantir a Sua
                  </button>
                </form>
              ) : (
                <div>
                  <span className="text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.2em] text-[#F59E0B] block mb-1.5">
                    EDIÇÃO LIMITADA
                  </span>
                  <h3 className="text-white font-anton text-3xl md:text-4xl uppercase mb-4 leading-none">
                    Collab TRECE
                  </h3>
                  <button
                    type="button"
                    onClick={() => setModoCapturaDrop(true)}
                    className="inline-flex items-center gap-2 bg-[#F59E0B] text-[#000000] px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.08em] hover:brightness-110 active:scale-95 transition-all"
                  >
                    Garantir a Sua
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
