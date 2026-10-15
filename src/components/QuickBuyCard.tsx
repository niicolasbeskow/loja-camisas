"use client";
import { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Produto, Tamanho } from '@/data/produtos';

const TAMANHOS: Tamanho[] = ['P', 'M', 'G', 'GG', 'G1', 'G2'];

export default function QuickBuyCard({ tituloGrupo, produtosDoGrupo }: { tituloGrupo: string, produtosDoGrupo: Produto[] }) {
  const [corSelecionadaId, setCorSelecionadaId] = useState<string | null>(null);
  const [corHoverId, setCorHoverId] = useState<string | null>(null);
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState<Tamanho | null>(null);

  const { addToCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => { setTamanhoSelecionado(null); }, [corSelecionadaId]);

  const idAtivo = corHoverId || corSelecionadaId || (produtosDoGrupo[0]?.id);
  const produtoAtivo = produtosDoGrupo.find(p => p.id === idAtivo) || produtosDoGrupo[0];

  const isProntoParaComprar = corSelecionadaId !== null && tamanhoSelecionado !== null;
  const isEsgotado = Object.values(produtoAtivo.estoque).every(qtd => qtd === 0);

  const handleComprar = () => {
    if (!session) { alert('Faça login para adicionar itens à sua armadura.'); router.push('/login'); return; }
    if (isProntoParaComprar) {
      const produtoReal = produtosDoGrupo.find(p => p.id === corSelecionadaId);
      if (!produtoReal) return;
      addToCart({ titulo: produtoReal.nome, preco: produtoReal.preco, cor: produtoReal.cor, tamanho: tamanhoSelecionado, quantidade: 1 });
      setCorSelecionadaId(null);
      setTamanhoSelecionado(null);
    }
  };

  if (!produtoAtivo) return null;

  return (
    <div className="flex flex-col border border-zinc-200 rounded-md overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300 relative group">
      
      <div className="absolute top-2 left-2 md:top-3 md:left-3 flex flex-col gap-1 z-10">
        {isEsgotado && (
          <span className="bg-zinc-900 text-white text-[8px] md:text-[10px] font-bold px-1.5 py-0.5 md:px-2 md:py-1 rounded-sm shadow-md uppercase tracking-wide">
             ESGOTADO
          </span>
        )}
        {produtoAtivo.promocao && (
          <span className="bg-red-600 text-white text-[8px] md:text-[10px] font-bold px-1.5 py-0.5 md:px-2 md:py-1 rounded-sm shadow-md flex items-center gap-1">
             🔥 20% OFF
          </span>
        )}
      </div>

      <div className="w-full aspect-[4/5] bg-zinc-100 relative flex items-center justify-center transition-colors duration-300">
        <div className="text-center px-2 md:px-4">
          <span className="text-zinc-400 font-medium text-xs md:text-sm block mb-1.5 line-clamp-1">{produtoAtivo.nome}</span>
          <span className="text-[10px] md:text-xs font-bold px-2 py-1 rounded-sm shadow-sm" 
                style={{ backgroundColor: produtoAtivo.hex, color: ['#ffffff', '#faf9f6'].includes(produtoAtivo.hex.toLowerCase()) ? 'black' : 'white' }}>
            {produtoAtivo.cor}
          </span>
        </div>
      </div>
      
      <div className="p-2 md:p-4 flex flex-col gap-2 md:gap-3">
        <div>
          <h3 className="font-bold text-zinc-900 uppercase text-xs md:text-sm line-clamp-1" title={produtoAtivo.nome}>{produtoAtivo.nome}</h3>
          <div className="flex items-center gap-1.5 md:gap-2">
            {produtoAtivo.promocao && <span className="text-xs text-zinc-400 line-through">R$ {produtoAtivo.precoOriginal.toFixed(2).replace('.', ',')}</span>}
            <span className="font-bold text-black text-sm md:text-lg">R$ {produtoAtivo.preco.toFixed(2).replace('.', ',')}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap h-auto min-h-[1.5rem]">
          {produtosDoGrupo.map((produto) => (
            <button 
              key={produto.id} onMouseEnter={() => setCorHoverId(produto.id)} onMouseLeave={() => setCorHoverId(null)} onClick={() => setCorSelecionadaId(produto.id)} 
              className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 transition-all ${corSelecionadaId === produto.id ? 'border-[#F59E0B] scale-110' : 'border-zinc-300 hover:border-zinc-400'}`} 
              style={{ backgroundColor: produto.hex }} aria-label={`Cor ${produto.cor}`} title={produto.cor} 
            />
          ))}
        </div>
        
        <div className="flex items-center gap-1 mt-1">
          {TAMANHOS.map((tam) => {
            const emEstoque = produtoAtivo.estoque[tam] > 0;
            return (
              <button 
                key={tam} onClick={() => emEstoque && setTamanhoSelecionado(tam)} disabled={!emEstoque} title={!emEstoque ? "Sem estoque" : ""}
                className={`flex-1 py-1 md:py-1.5 text-[9px] md:text-xs font-bold border rounded-sm transition-colors ${!emEstoque ? 'bg-zinc-100 text-zinc-300 border-zinc-200 cursor-not-allowed line-through' : tamanhoSelecionado === tam ? 'bg-black text-white border-black' : 'bg-white text-zinc-600 border-zinc-300 hover:border-black'}`}
              >{tam}</button>
            );
          })}
        </div>
        
        <button 
          onClick={handleComprar} disabled={(!isProntoParaComprar || isEsgotado) && !!session} 
          className={`mt-1 md:mt-2 flex items-center justify-center gap-1.5 w-full py-2.5 md:py-3 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-sm transition-all duration-300 ${!session ? 'bg-zinc-900 text-white hover:bg-black' : isEsgotado ? 'bg-zinc-300 text-zinc-500 cursor-not-allowed' : isProntoParaComprar ? 'bg-[#F59E0B] text-black hover:bg-amber-400' : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'}`}
        >
          <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
          {!session ? 'Login' : isEsgotado ? 'Esgotado' : isProntoParaComprar ? 'Comprar' : (!corSelecionadaId ? 'Cor' : 'Tamanho')}
        </button>
      </div>
    </div>
  );
}
