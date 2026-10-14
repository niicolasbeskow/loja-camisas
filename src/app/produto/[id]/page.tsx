"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShoppingCart, Truck, Home, ShieldCheck, CreditCard, Package, Star } from 'lucide-react';
import { getProdutoPorId, produtos, Tamanho } from '@/data/produtos';
import { useCart } from '@/contexts/CartContext';
import { useSession } from 'next-auth/react';
import QuickBuyCard from '@/components/QuickBuyCard';

export default function ProdutoPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  
  const produto = getProdutoPorId(id);
  const { addToCart, setIsCartOpen } = useCart();
  const { data: session } = useSession();

  const [tamanhoSelecionado, setTamanhoSelecionado] = useState<Tamanho | null>(null);
  const [quantidade, setQuantidade] = useState(1);
  const [abaAtiva, setAbaAtiva] = useState<'descricao' | 'tecnica' | 'lavagem'>('descricao');
  const [showTabelaMedidas, setShowTabelaMedidas] = useState(false);
  const [cep, setCep] = useState('');
  const [frete, setFrete] = useState<number | null>(null);

  useEffect(() => { setQuantidade(1); setTamanhoSelecionado(null); }, [id]);

  if (!produto) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-zinc-50">
        <h1 className="font-anton text-4xl mb-4 uppercase">Produto não encontrado</h1>
        <button onClick={() => router.push('/')} className="bg-black text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-[#F59E0B] hover:text-black transition-colors">Voltar à Loja</button>
      </div>
    );
  }

  const grupoDeCores = produtos.filter(p => p.categoria === produto.categoria && p.precoOriginal === produto.precoOriginal && p.nome.includes(produto.nome.split(' ')[0]));
  const relacionadas = produtos.filter(p => p.categoria === produto.categoria && p.id !== produto.id).slice(0, 4);

  const p1 = produto.preco;
  const p3 = produto.precoKit || produto.preco;
  const p2 = Math.floor(p1 - ((p1 - p3) / 2)) + 0.90; 
  
  const precoAtual = quantidade >= 3 ? p3 : quantidade === 2 ? p2 : p1;
  const valorTotal = precoAtual * quantidade;
  
  const maxDisponivel = tamanhoSelecionado ? produto.estoque[tamanhoSelecionado] : Math.max(...Object.values(produto.estoque));
  const isProntoParaComprar = tamanhoSelecionado !== null;
  const isProdutoEsgotado = Object.values(produto.estoque).every(qtd => qtd === 0);

  const isPoliamida = produto.categoria === 'camiseta-poliamida';
  const isBabyLook = produto.nome.includes('Baby Look');
  const isCroppedSuedine = produto.nome.includes('Cropped');
  const isMoletomOversized = produto.nome.includes('Moletom Oversized');
  const isMoletomCanguruOuCalca = produto.nome.includes('Canguru') || produto.nome.includes('Calça');
  const isRegata = produto.categoria === 'regata-oversized';
  const isShorts = produto.categoria === 'shorts';
  
  let composicaoTexto = '100% Algodão';
  if (isPoliamida) composicaoTexto = '100% Poliamida';
  if (isBabyLook) composicaoTexto = '96% Algodão, 4% Elastano';
  if (isMoletomOversized) composicaoTexto = '75% Algodão, 25% Poliéster';
  if (isMoletomCanguruOuCalca) composicaoTexto = '50% Algodão, 50% Poliéster';
  if (isShorts) composicaoTexto = '83% Poliamida, 17% Elastano';

  const handleSetQuantidade = (novaQtd: number) => {
    if (novaQtd < 1) return;
    if (tamanhoSelecionado && novaQtd > maxDisponivel) {
       alert(`Temos apenas ${maxDisponivel} unidades do tamanho ${tamanhoSelecionado} em estoque no momento!`);
       setQuantidade(maxDisponivel);
    } else {
       setQuantidade(novaQtd);
    }
  };

  const handleSelectTamanho = (tam: Tamanho) => {
    setTamanhoSelecionado(tam);
    if (quantidade > produto.estoque[tam]) {
       setQuantidade(Math.max(1, produto.estoque[tam]));
    }
  };

  const handleComprar = () => {
    if (!session) { alert('Faça login para adicionar à sua armadura.'); router.push('/login'); return; }
    if (isProntoParaComprar) {
      addToCart({ titulo: produto.nome, preco: p1, cor: produto.cor, tamanho: tamanhoSelecionado, quantidade });
      setIsCartOpen(true);
    }
  };

  const calcularFrete = () => {
    if (cep.replace(/\D/g, '').length !== 8) { alert('CEP inválido'); return; }
    setFrete(15.90);
  };

  return (
    <main className="min-h-screen bg-white text-black pb-24">
      
      {showTabelaMedidas && (
        <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in-up" onClick={() => setShowTabelaMedidas(false)}>
          <div className="bg-white max-w-2xl w-full rounded-md p-2 relative shadow-2xl" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowTabelaMedidas(false)} className="absolute top-2 right-4 text-zinc-500 hover:text-black font-bold text-3xl z-10">&times;</button>
            <div className="w-full aspect-[4/3] bg-zinc-100 flex items-center justify-center rounded-sm">
              <span className="text-zinc-400 font-bold uppercase tracking-widest text-center px-4">
                Imagem da Tabela de Medidas<br/>(Aguardando Foto)
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 pt-8 mt-4 md:mt-8">
        
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-8">
          <Link href="/" className="hover:text-[#F59E0B] transition-colors"><Home className="w-3 h-3" /></Link>
          <span>/</span>
          <Link href={`/categoria/${produto.categoria}`} className="hover:text-[#F59E0B] transition-colors capitalize">{produto.categoria.replace('-', ' ')}</Link>
          <span>/</span>
          <span className="text-black font-medium">{produto.nome}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-[4/5] bg-zinc-100 rounded-md flex items-center justify-center relative border border-zinc-200">
               <span className="text-zinc-400 font-medium text-center px-4">Imagem {produto.nome} <br/>(Aguardando Foto)</span>
               
               {/* ETIQUETAS EMPILHADAS NA PÁGINA DO PRODUTO */}
               <div className="absolute top-4 right-4 flex flex-col items-end gap-2 z-10">
                 {isProdutoEsgotado && (
                   <span className="bg-zinc-900 text-white text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-widest shadow-md">
                     Esgotado
                   </span>
                 )}
                 {produto.promocao ? (
                   <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-widest shadow-md flex items-center gap-1">
                     🔥 20% OFF
                   </span>
                 ) : produto.tag && !isProdutoEsgotado && (
                   <span className="bg-[#F59E0B] text-black text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-widest shadow-md">
                     {produto.tag}
                   </span>
                 )}
               </div>
               
            </div>
            <div className="grid grid-cols-4 gap-4">
               {[1, 2, 3, 4].map(i => (
                 <div key={i} className="aspect-square bg-zinc-100 rounded-md flex items-center justify-center border border-zinc-200 cursor-pointer hover:border-black transition-colors">
                   <span className="text-zinc-400 text-xs">Foto {i}</span>
                 </div>
               ))}
            </div>
          </div>

          <div className="flex flex-col pt-2">
            <h1 className="text-2xl md:text-3xl font-outfit font-medium text-zinc-900 mb-3">{produto.nome}</h1>
            
            <a href="#avaliacoes" className="flex items-center gap-2 mb-6 group cursor-pointer">
               <div className="flex text-zinc-300 group-hover:text-[#F59E0B] transition-colors">
                 {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
               </div>
               <span className="text-sm text-zinc-500 group-hover:text-black transition-colors underline">(0) Avaliações</span>
            </a>

            <div className="mb-4">
               <div className="flex items-center gap-3">
                 {produto.promocao && <span className="text-lg text-zinc-400 line-through">R$ {produto.precoOriginal.toFixed(2).replace('.', ',')}</span>}
                 <span className="text-3xl font-bold text-black block">R$ {precoAtual.toFixed(2).replace('.', ',')}</span>
               </div>
               <span className="text-sm text-zinc-500 mt-1 block">em até <strong className="text-black">3x de R$ {(precoAtual / 3).toFixed(2).replace('.', ',')}</strong> sem juros</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-zinc-600 mb-4 pb-4">
               <span>🚚</span>
               <span>Compre e receba <strong className="text-[#F59E0B]">FRETE GRÁTIS</strong> em compras acima de R$ 299</span>
            </div>

            <div className="flex items-center gap-3 text-xs md:text-sm font-bold uppercase tracking-widest text-zinc-600 mb-8 border-b border-zinc-100 pb-8">
              <span>{produto.tag}</span>
              <span className="w-1 h-1 rounded-full bg-zinc-400"></span>
              <span>{composicaoTexto}</span>
            </div>

            <div className="mb-8">
              <span className="text-base text-zinc-800 mb-3 block">Quantidade</span>
              <div className="grid grid-cols-3 gap-3">
                <button onClick={() => handleSetQuantidade(1)} className={`flex flex-col items-center justify-center py-3 px-2 rounded-md border-2 transition-all ${quantidade === 1 ? 'border-black bg-black text-white' : 'border-zinc-200 bg-white hover:border-black'}`}>
                   <span className="font-bold text-sm">1 un</span>
                   <span className={`text-xs mt-1 ${quantidade === 1 ? 'opacity-90' : 'text-zinc-500'}`}>R$ {p1.toFixed(2).replace('.', ',')}/un</span>
                </button>
                <button onClick={() => handleSetQuantidade(2)} className={`flex flex-col items-center justify-center py-3 px-2 rounded-md border-2 transition-all ${quantidade === 2 ? 'border-black bg-black text-white' : 'border-zinc-200 bg-white hover:border-black'}`}>
                   <span className="font-bold text-sm">Kit com 2</span>
                   <span className={`text-xs mt-1 ${quantidade === 2 ? 'opacity-90' : 'text-zinc-500'}`}>R$ {p2.toFixed(2).replace('.', ',')}/un</span>
                </button>
                <button onClick={() => handleSetQuantidade(3)} className={`flex flex-col items-center justify-center py-3 px-2 rounded-md border-2 transition-all ${quantidade >= 3 ? 'border-black bg-black text-white' : 'border-zinc-200 bg-white hover:border-black'}`}>
                   <span className="font-bold text-sm">Kit com {quantidade >= 3 ? quantidade : '3'}</span>
                   <span className={`text-xs mt-1 ${quantidade >= 3 ? 'opacity-90' : 'text-zinc-500'}`}>R$ {p3.toFixed(2).replace('.', ',')}/un</span>
                </button>
              </div>
            </div>

            <div className="mb-8">
              <span className="text-base text-zinc-800 mb-3 block">Cor: <strong className="font-bold">{produto.cor}</strong></span>
              <div className="flex gap-3 flex-wrap">
                {grupoDeCores.map(p => (
                   <Link key={p.id} href={`/produto/${p.id}`} className={`w-12 h-12 rounded-md border-2 transition-all flex items-center justify-center ${produto.id === p.id ? 'border-black p-0.5' : 'border-transparent hover:border-zinc-300'}`} title={p.cor}>
                      <div className="w-full h-full rounded-sm border border-zinc-200 shadow-sm" style={{ backgroundColor: p.hex }}></div>
                   </Link>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <div className="flex justify-between items-end mb-3">
                <span className="text-base text-zinc-800">Tamanho: <span className="font-bold">{tamanhoSelecionado || ''}</span></span>
                <button onClick={() => setShowTabelaMedidas(true)} className="text-xs text-zinc-500 underline hover:text-black transition-colors">Tabela de Medidas</button>
              </div>
              <div className="flex gap-2">
                {produto.tamanhos.map((tam) => {
                  const emEstoque = produto.estoque[tam] > 0;
                  return (
                    <button key={tam} onClick={() => emEstoque && handleSelectTamanho(tam)} disabled={!emEstoque} className={`h-12 flex-1 max-w-[60px] flex items-center justify-center text-sm font-bold border rounded-sm transition-all ${!emEstoque ? 'bg-zinc-100 text-zinc-300 border-zinc-200 cursor-not-allowed line-through' : tamanhoSelecionado === tam ? 'bg-black text-white border-black shadow-md' : 'bg-white text-zinc-600 border-zinc-300 hover:border-black'}`}>
                      {tam}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              <div className="flex items-center border border-zinc-300 rounded-sm h-14 bg-white w-32 shrink-0">
                <button onClick={() => handleSetQuantidade(quantidade - 1)} disabled={quantidade <= 1} className="px-4 h-full text-zinc-500 hover:text-black transition-colors">-</button>
                <span className="flex-1 text-center font-bold text-lg">{quantidade}</span>
                <button onClick={() => handleSetQuantidade(quantidade + 1)} className="px-4 h-full text-zinc-500 hover:text-black transition-colors">+</button>
              </div>
              <button onClick={handleComprar} disabled={(!isProntoParaComprar || isProdutoEsgotado) && !!session} className={`flex-1 h-14 flex items-center justify-center gap-2 text-sm md:text-base font-bold uppercase tracking-widest rounded-sm transition-all duration-300 shadow-sm ${!session ? 'bg-zinc-900 text-white hover:bg-black' : isProdutoEsgotado ? 'bg-zinc-300 text-zinc-500 cursor-not-allowed' : isProntoParaComprar ? 'bg-[#F59E0B] text-black hover:bg-amber-400' : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'}`}>
                <ShoppingCart className="w-5 h-5" />
                {!session ? 'Faça Login' : isProdutoEsgotado ? 'Esgotado' : isProntoParaComprar ? `Adicionar - R$ ${valorTotal.toFixed(2).replace('.', ',')}` : 'Selecione o Tamanho'}
              </button>
            </div>

            <div className="bg-zinc-50 p-4 rounded-md border border-zinc-200 mb-8">
              <span className="text-sm font-bold uppercase block mb-3 text-zinc-700">Calcule o Frete</span>
              <div className="flex gap-2">
                <input type="text" placeholder="Seu CEP" value={cep} onChange={(e) => setCep(e.target.value)} maxLength={9} className="flex-1 border border-zinc-300 px-4 h-12 rounded-sm text-sm outline-none focus:border-black" />
                <button onClick={calcularFrete} className="bg-black text-white px-6 font-bold uppercase tracking-widest text-xs hover:bg-zinc-800 transition-colors">Consultar</button>
              </div>
              {frete !== null && <p className="text-green-600 text-sm font-bold mt-3">Frete Fixo: R$ {frete.toFixed(2).replace('.', ',')}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4 bg-zinc-50 p-4 rounded-md border border-zinc-100">
               <div className="flex items-center gap-3 text-xs font-bold uppercase text-zinc-600"><Package className="w-4 h-4 text-[#F59E0B]" /> Envio Imediato</div>
               <div className="flex items-center gap-3 text-xs font-bold uppercase text-zinc-600"><CreditCard className="w-4 h-4 text-[#F59E0B]" /> Até 3x Sem Juros</div>
               <div className="flex items-center gap-3 text-xs font-bold uppercase text-zinc-600"><Truck className="w-4 h-4 text-[#F59E0B]" /> Enviamos p/ Todo Brasil</div>
               <div className="flex items-center gap-3 text-xs font-bold uppercase text-zinc-600"><ShieldCheck className="w-4 h-4 text-[#F59E0B]" /> Qualidade Garantida</div>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <div className="flex gap-8 border-b border-zinc-200 mb-8">
            <button onClick={() => setAbaAtiva('descricao')} className={`pb-4 text-sm font-bold uppercase tracking-widest transition-colors relative ${abaAtiva === 'descricao' ? 'text-black' : 'text-zinc-400 hover:text-black'}`}>Descrição{abaAtiva === 'descricao' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></span>}</button>
            <button onClick={() => setAbaAtiva('tecnica')} className={`pb-4 text-sm font-bold uppercase tracking-widest transition-colors relative ${abaAtiva === 'tecnica' ? 'text-black' : 'text-zinc-400 hover:text-black'}`}>Informações Técnicas{abaAtiva === 'tecnica' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></span>}</button>
            <button onClick={() => setAbaAtiva('lavagem')} className={`pb-4 text-sm font-bold uppercase tracking-widest transition-colors relative ${abaAtiva === 'lavagem' ? 'text-black' : 'text-zinc-400 hover:text-black'}`}>Lavagem{abaAtiva === 'lavagem' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></span>}</button>
          </div>
          <div className="text-zinc-600 text-sm leading-relaxed max-w-3xl">
             <p>Acesse as informações completas da <strong>{produto.nome}</strong> escolhendo uma das abas acima!</p>
          </div>
        </div>
      </div>
    </main>
  );
}
