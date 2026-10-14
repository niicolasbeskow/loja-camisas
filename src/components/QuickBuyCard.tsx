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
      
      {/* ETIQUETA DE PROMOÇÃO */}
      {produtoAtivo.promocao && (
        <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm shadow-md z-10 flex items-center gap-1">
           🔥 20% OFF
        </span>
      )}

      <div className="w-full aspect-[4/5] bg-zinc-100 relative flex items-center justify-center transition-colors duration-300">
        <div className="text-center px-4">
          <span className="text-zinc-400 font-medium text-sm block mb-2 line-clamp-1">{produtoAtivo.nome}</span>
          <span className="text-xs font-bold px-2 py-1 rounded-sm transition-colors shadow-sm" 
                style={{ backgroundColor: produtoAtivo.hex, color: ['#ffffff', '#faf9f6'].includes(produtoAtivo.hex.toLowerCase()) ? 'black' : 'white' }}>
            {produtoAtivo.cor}
          </span>
        </div>
      </div>
      
      <div className="p-4 flex flex-col gap-3">
        <div>
          <h3 className="font-bold text-zinc-900 uppercase text-sm line-clamp-1" title={produtoAtivo.nome}>{produtoAtivo.nome}</h3>
          <div className="flex items-center gap-2">
            {/* SE ESTIVER EM PROMOÇÃO, MOSTRA O PREÇO ORIGINAL RISCADO */}
            {produtoAtivo.promocao && <span className="text-sm text-zinc-400 line-through">R$ {produtoAtivo.precoOriginal.toFixed(2).replace('.', ',')}</span>}
            <span className="font-bold text-black text-lg">R$ {produtoAtivo.preco.toFixed(2).replace('.', ',')}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap h-7">
          {produtosDoGrupo.map((produto) => (
            <button 
              key={produto.id} onMouseEnter={() => setCorHoverId(produto.id)} onMouseLeave={() => setCorHoverId(null)} onClick={() => setCorSelecionadaId(produto.id)} 
              className={`w-6 h-6 rounded-full border-2 transition-all ${corSelecionadaId === produto.id ? 'border-[#F59E0B] scale-110' : 'border-zinc-300 hover:border-zinc-400'}`} 
              style={{ backgroundColor: produto.hex }} aria-label={`Cor ${produto.cor}`} title={produto.cor} 
            />
          ))}
        </div>
        
        <div className="flex items-center gap-1.5 mt-1">
          {TAMANHOS.map((tam) => {
            const emEstoque = produtoAtivo.estoque[tam] > 0;
            return (
              <button 
                key={tam} onClick={() => emEstoque && setTamanhoSelecionado(tam)} disabled={!emEstoque} title={!emEstoque ? "Sem estoque" : ""}
                className={`flex-1 py-1.5 text-xs font-bold border rounded-sm transition-colors ${!emEstoque ? 'bg-zinc-100 text-zinc-300 border-zinc-200 cursor-not-allowed line-through' : tamanhoSelecionado === tam ? 'bg-black text-white border-black' : 'bg-white text-zinc-600 border-zinc-300 hover:border-black'}`}
              >{tam}</button>
            );
          })}
        </div>
        
        <button 
          onClick={handleComprar} disabled={!isProntoParaComprar && !!session} 
          className={`mt-2 flex items-center justify-center gap-2 w-full py-3 text-xs font-bold uppercase tracking-widest rounded-sm transition-all duration-300 ${!session ? 'bg-zinc-900 text-white hover:bg-black' : isProntoParaComprar ? 'bg-[#F59E0B] text-black hover:bg-amber-400' : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'}`}
        >
          <ShoppingCart className="w-4 h-4" />
          {!session ? 'Faça Login para Comprar' : isProntoParaComprar ? 'Comprar Rápido' : (!corSelecionadaId ? 'Selecione a Cor' : 'Selecione o Tamanho')}
        </button>
      </div>
    </div>
  );
}
