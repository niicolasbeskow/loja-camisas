"use client";
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Produto, Tamanho } from '@/data/produtos';

export default function QuickBuyCard({ produto }: { produto: Produto }) {
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState<Tamanho | null>(null);
  const { addToCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();

  const isProntoParaComprar = tamanhoSelecionado !== null;

  const handleComprar = () => {
    if (!session) {
      alert('Faça login para adicionar itens à sua armadura.');
      router.push('/login');
      return;
    }

    if (isProntoParaComprar) {
      // Usa os dados exatos do banco para o carrinho não duplicar peças erradas
      addToCart({ 
        titulo: produto.nome, 
        preco: produto.preco, 
        cor: produto.cor, 
        tamanho: tamanhoSelecionado, 
        quantidade: 1 
      });
      alert(`Adicionado à sua armadura: ${produto.nome} | Cor: ${produto.cor} | Tam: ${tamanhoSelecionado}`);
      setTamanhoSelecionado(null);
    }
  };

  return (
    <div className="flex flex-col border border-zinc-200 rounded-md overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300">
      <div className="w-full aspect-[4/5] bg-zinc-100 relative flex items-center justify-center transition-colors duration-300">
        <div className="text-center px-4">
          <span className="text-zinc-400 font-medium text-sm block mb-2 line-clamp-1">{produto.nome}</span>
          <span className="text-xs font-bold px-2 py-1 rounded-sm text-white" 
                style={{ backgroundColor: produto.hex, color: produto.hex.toLowerCase() === '#ffffff' || produto.hex.toLowerCase() === '#f5f5f5' ? 'black' : 'white' }}>
            {produto.cor}
          </span>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-3">
        <div>
          <h3 className="font-bold text-zinc-900 uppercase text-sm line-clamp-1">{produto.nome}</h3>
          <span className="font-bold text-black text-lg">R$ {produto.preco.toFixed(2).replace('.', ',')}</span>
        </div>
        
        {/* Controle de Estoque de Tamanhos */}
        <div className="flex items-center gap-1.5 mt-1">
          {produto.tamanhos.map((tam) => {
            const emEstoque = produto.estoque[tam] > 0;
            return (
              <button 
                key={tam} 
                onClick={() => emEstoque && setTamanhoSelecionado(tam)} 
                disabled={!emEstoque}
                title={!emEstoque ? "Sem estoque" : ""}
                className={`flex-1 py-1.5 text-xs font-bold border rounded-sm transition-colors 
                  ${!emEstoque ? 'bg-zinc-100 text-zinc-300 border-zinc-200 cursor-not-allowed line-through' : 
                  tamanhoSelecionado === tam ? 'bg-black text-white border-black' : 'bg-white text-zinc-600 border-zinc-300 hover:border-black'}`}
              >
                {tam}
              </button>
            );
          })}
        </div>
        
        <button 
          onClick={handleComprar} 
          disabled={!isProntoParaComprar && !!session} 
          className={`mt-2 flex items-center justify-center gap-2 w-full py-3 text-xs font-bold uppercase tracking-widest rounded-sm transition-all duration-300 
            ${!session ? 'bg-zinc-900 text-white hover:bg-black' : 
            isProntoParaComprar ? 'bg-[#F59E0B] text-black hover:bg-amber-400' : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'}`}
        >
          <ShoppingCart className="w-4 h-4" />
          {!session ? 'Faça Login para Comprar' : isProntoParaComprar ? 'Comprar Rápido' : 'Selecione o Tamanho'}
        </button>
      </div>
    </div>
  );
}
