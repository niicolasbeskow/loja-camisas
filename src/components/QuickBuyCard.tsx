"use client";

import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

export type CorOpcao = { id: string; name: string; hex: string };

const TAMANHOS = ['P', 'M', 'G', 'GG'];

export default function QuickBuyCard({ titulo, preco, cores }: { titulo: string, preco: string, cores: CorOpcao[] }) {
  const [corSelecionada, setCorSelecionada] = useState<string | null>(null);
  const [corHover, setCorHover] = useState<string | null>(null);
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState<string | null>(null);

  const corAtivaId = corHover || corSelecionada || cores[0].id;
  const corAtivaObj = cores.find(c => c.id === corAtivaId);

  const isProntoParaComprar = corSelecionada && tamanhoSelecionado;

  const handleComprar = () => {
    if (isProntoParaComprar) {
      const corObj = cores.find(c => c.id === corSelecionada);
      const precoNumerico = parseFloat(preco.replace('.', '').replace(',', '.'));
      
      const newItem = {
        titulo,
        preco: precoNumerico,
        cor: corObj?.name || 'Padrão',
        tamanho: tamanhoSelecionado,
        quantidade: 1
      };
      
      // 1. O Alerta que você gostou!
      alert(`Adicionado ao carrinho: ${titulo} | Cor: ${corObj?.name} | Tam: ${tamanhoSelecionado}`);
      
      // 2. O Evento Mágico que envia para a gaveta do Carrinho
      window.dispatchEvent(new CustomEvent('adicionarAoCarrinho', { detail: newItem }));
      
      // 3. Limpa a seleção visualmente para o cliente poder comprar outra
      setCorSelecionada(null);
      setTamanhoSelecionado(null);
    }
  };

  return (
    <div className="flex flex-col border border-zinc-200 rounded-md overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300">
      <div className="w-full aspect-[4/5] bg-zinc-100 relative flex items-center justify-center transition-colors duration-300">
        <div className="text-center px-4">
          <span className="text-zinc-400 font-medium text-sm block mb-2 line-clamp-1">{titulo}</span>
          <span className="text-xs font-bold px-2 py-1 rounded-sm text-white" style={{ backgroundColor: corAtivaObj?.hex, color: corAtivaObj?.id === 'offwhite' ? 'black' : 'white' }}>
            {corAtivaObj?.name}
          </span>
        </div>
        <span className="absolute top-2 left-2 bg-[#F59E0B] text-[#000000] text-[10px] font-bold px-2 py-1 rounded-sm">100% Algodão</span>
      </div>

      <div className="p-4 flex flex-col gap-3">
        <div>
          <h3 className="font-bold text-zinc-900 uppercase text-sm line-clamp-1">{titulo}</h3>
          <span className="font-bold text-black text-lg">R$ {preco}</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap h-7">
          {cores.map((cor) => (
            <button
              key={cor.id}
              onMouseEnter={() => setCorHover(cor.id)}
              onMouseLeave={() => setCorHover(null)}
              onClick={() => setCorSelecionada(cor.id)}
              className={`w-6 h-6 rounded-full border-2 transition-all ${corSelecionada === cor.id ? 'border-[#F59E0B] scale-110' : 'border-zinc-300 hover:border-zinc-400'}`}
              style={{ backgroundColor: cor.hex }}
              aria-label={`Cor ${cor.name}`}
              title={cor.name}
            />
          ))}
        </div>

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
          {isProntoParaComprar ? 'Comprar Rápido' : 'Selecione a Cor'}
        </button>
      </div>
    </div>
  );
}
