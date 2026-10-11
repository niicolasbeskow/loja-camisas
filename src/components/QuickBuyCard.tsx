"use client";

import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

// Dados mockados para a vitrine de compra rápida
const CORES = [
  { id: 'preto', name: 'Preto', hex: '#000000' },
  { id: 'offwhite', name: 'Off White', hex: '#FAF9F6' },
  { id: 'marrom', name: 'Marrom', hex: '#5E4B3C' },
  { id: 'verdemilitar', name: 'Verde Militar', hex: '#4B5320' },
];

const TAMANHOS = ['P', 'M', 'G', 'GG'];

export default function QuickBuyCard({ titulo, preco }: { titulo: string, preco: string }) {
  const [corSelecionada, setCorSelecionada] = useState<string | null>(null);
  const [corHover, setCorHover] = useState<string | null>(null);
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState<string | null>(null);

  // A cor ativa na imagem é a que está a sofrer hover, ou a selecionada, ou a primeira por padrão
  const corAtivaId = corHover || corSelecionada || CORES[0].id;
  const corAtivaObj = CORES.find(c => c.id === corAtivaId);

  const isProntoParaComprar = corSelecionada && tamanhoSelecionado;

  const handleComprar = () => {
    if (isProntoParaComprar) {
      alert(`Adicionado: ${titulo} | Cor: ${CORES.find(c => c.id === corSelecionada)?.name} | Tam: ${tamanhoSelecionado}`);
      // Futuramente aqui chamamos a abertura do Cart Drawer
    }
  };

  return (
    <div className="flex flex-col border border-zinc-200 rounded-md overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300">
      {/* Imagem Dinâmica */}
      <div className="w-full aspect-[4/5] bg-zinc-100 relative flex items-center justify-center transition-colors duration-300">
        {/* Placeholder simulando a troca de imagem baseada na cor */}
        <div className="text-center px-4">
          <span className="text-zinc-400 font-medium text-sm block mb-2">Imagem da Camiseta</span>
          <span className="text-xs font-bold px-2 py-1 rounded-sm text-white" style={{ backgroundColor: corAtivaObj?.hex, color: corAtivaObj?.id === 'offwhite' ? 'black' : 'white' }}>
            {corAtivaObj?.name}
          </span>
        </div>
        <span className="absolute top-2 left-2 bg-[#F59E0B] text-[#000000] text-[10px] font-bold px-2 py-1 rounded-sm">100% Algodão</span>
      </div>

      {/* Info e Seleção */}
      <div className="p-4 flex flex-col gap-3">
        <div>
          <h3 className="font-bold text-zinc-900 uppercase text-sm line-clamp-1">{titulo}</h3>
          <span className="font-bold text-black text-lg">R$ {preco}</span>
        </div>

        {/* Seletor de Cores */}
        <div className="flex items-center gap-2">
          {CORES.map((cor) => (
            <button
              key={cor.id}
              onMouseEnter={() => setCorHover(cor.id)}
              onMouseLeave={() => setCorHover(null)}
              onClick={() => setCorSelecionada(cor.id)}
              className={`w-6 h-6 rounded-full border-2 transition-all ${corSelecionada === cor.id ? 'border-[#F59E0B] scale-110' : 'border-zinc-300 hover:border-zinc-400'}`}
              style={{ backgroundColor: cor.hex }}
              aria-label={`Cor ${cor.name}`}
            />
          ))}
        </div>

        {/* Seletor de Tamanhos */}
        <div className="flex items-center gap-1.5 mt-1">
          {TAMANHOS.map((tam) => (
            <button
              key={tam}
              onClick={() => setTamanhoSelecionado(tam)}
              className={`flex-1 py-1.5 text-xs font-bold border rounded-sm transition-colors ${tamanhoSelecionado === tam ? 'bg-black text-white border-black' : 'bg-white text-zinc-600 border-zinc-300 hover:border-black'}`}
            >
              {tam}
            </button>
          ))}
        </div>

        {/* Botão de Compra */}
        <button
          onClick={handleComprar}
          disabled={!isProntoParaComprar}
          className={`mt-2 flex items-center justify-center gap-2 w-full py-3 text-xs font-bold uppercase tracking-widest rounded-sm transition-all duration-300 ${
            isProntoParaComprar
              ? 'bg-[#F59E0B] text-black hover:bg-amber-400 cursor-pointer'
              : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {isProntoParaComprar ? 'Comprar Rápido' : 'Selecione Cor e Tamanho'}
        </button>
      </div>
    </div>
  );
}