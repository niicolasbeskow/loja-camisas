"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Home, Minus, Plus, Truck, CreditCard, Package, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { Product } from '@/lib/data';

export default function ClientProdutoUI({ produto }: { produto: Product }) {
  const [quantidade, setQuantidade] = useState(1);
  const [tamanho, setTamanho] = useState('G');
  const [abaAtiva, setAbaAtiva] = useState('descricao');
  const tamanhos = ['PP', 'P', 'M', 'G', 'GG', 'G1', 'G2'];

  const toggleAba = (aba: string) => setAbaAtiva(abaAtiva === aba ? '' : aba);

  return (
    <main className="min-h-screen bg-white text-black pb-24 mt-16">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 pt-8">
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-8">
          <Link href="/" className="hover:text-[#F59E0B] transition-colors"><Home className="w-3 h-3" /></Link>
          <span>/</span>
          <Link href="/produtos" className="hover:text-[#F59E0B] transition-colors">Produtos</Link>
          <span>/</span>
          <span className="text-black font-medium">{produto.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-3/5 flex flex-col gap-4">
            <div className="w-full aspect-[4/5] md:aspect-square bg-zinc-100 rounded-md flex items-center justify-center border border-zinc-200">
              <span className="text-zinc-400 font-medium text-lg text-center px-4">Imagem {produto.name} <br/>(Aguardando Foto)</span>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="aspect-square bg-zinc-100 rounded-md flex items-center justify-center border border-zinc-200 cursor-pointer hover:border-[#F59E0B] transition-colors">
                  <span className="text-zinc-400 text-xs">Foto {item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-2/5 flex flex-col">
            <h1 className="text-3xl md:text-4xl font-anton uppercase mb-4 text-zinc-900">{produto.name}</h1>
            <div className="mb-6">
              <div className="flex items-end gap-3 mb-2">
                <span className="text-3xl font-bold text-black">R$ {produto.price.toFixed(2).replace('.', ',')}</span>
                {produto.originalPrice && (
                  <span className="text-lg text-zinc-400 line-through mb-1">R$ {produto.originalPrice.toFixed(2).replace('.', ',')}</span>
                )}
              </div>
              {produto.atacadoPrice && (
                <div className="inline-block bg-[#F59E0B]/10 text-[#F59E0B] font-bold text-sm px-3 py-1 rounded-sm border border-[#F59E0B]/20">
                  🔥 R$ {produto.atacadoPrice.toFixed(2).replace('.', ',')} no atacado (12+ unidades)
                </div>
              )}
            </div>

            <div className="flex gap-2 mb-8">
              {produto.tag && <span className="bg-zinc-100 text-zinc-600 text-xs font-bold px-3 py-1.5 rounded-full">{produto.tag}</span>}
              <span className="bg-zinc-100 text-zinc-600 text-xs font-bold px-3 py-1.5 rounded-full">100% Algodão</span>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-bold text-zinc-900 uppercase tracking-wide">Tamanho: <span className="text-[#F59E0B] ml-1">{tamanho}</span></span>
                <button className="text-xs text-zinc-500 underline hover:text-black">Tabela de Medidas</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tamanhos.map((t) => (
                  <button key={t} onClick={() => setTamanho(t)} className={`w-12 h-12 flex items-center justify-center font-bold text-sm border rounded-sm transition-all ${tamanho === t ? 'border-black bg-black text-white' : 'border-zinc-300 text-zinc-600 hover:border-black'}`}>{t}</button>
                ))}
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              <div className="flex items-center border border-zinc-300 rounded-sm h-14 w-32">
                <button onClick={() => setQuantidade(Math.max(1, quantidade - 1))} className="flex-1 flex justify-center text-zinc-500 hover:text-black"><Minus className="w-4 h-4" /></button>
                <span className="w-10 text-center font-bold">{quantidade}</span>
                <button onClick={() => setQuantidade(quantidade + 1)} className="flex-1 flex justify-center text-zinc-500 hover:text-black"><Plus className="w-4 h-4" /></button>
              </div>
              <button className="flex-1 bg-black text-white font-bold uppercase tracking-widest text-sm rounded-sm hover:bg-[#F59E0B] hover:text-black transition-colors h-14">
                Adicionar ao Carrinho
              </button>
            </div>

            <div className="mb-10">
              <span className="block text-sm font-bold text-zinc-900 uppercase tracking-wide mb-3">Calcule o Frete</span>
              <div className="flex gap-2">
                <input type="text" placeholder="Digite seu CEP" className="flex-1 border border-zinc-300 rounded-sm px-4 h-12 focus:outline-none focus:border-[#F59E0B]" />
                <button className="bg-zinc-900 text-white font-bold text-sm px-6 rounded-sm hover:bg-zinc-800 transition-colors h-12">Consultar</button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-10">
              <div className="border border-zinc-200 rounded-sm p-4 flex flex-col items-center justify-center text-center gap-2 bg-zinc-50"><Package className="w-5 h-5 text-zinc-600" /><span className="text-xs font-bold text-zinc-600 uppercase">Envio Imediato</span></div>
              <div className="border border-zinc-200 rounded-sm p-4 flex flex-col items-center justify-center text-center gap-2 bg-zinc-50"><CreditCard className="w-5 h-5 text-zinc-600" /><span className="text-xs font-bold text-zinc-600 uppercase">Até 3x Sem Juros</span></div>
              <div className="border border-zinc-200 rounded-sm p-4 flex flex-col items-center justify-center text-center gap-2 bg-zinc-50"><Truck className="w-5 h-5 text-zinc-600" /><span className="text-xs font-bold text-zinc-600 uppercase">Enviamos p/ Todo Brasil</span></div>
              <div className="border border-zinc-200 rounded-sm p-4 flex flex-col items-center justify-center text-center gap-2 bg-zinc-50"><ShieldCheck className="w-5 h-5 text-zinc-600" /><span className="text-xs font-bold text-zinc-600 uppercase">Qualidade Garantida</span></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}