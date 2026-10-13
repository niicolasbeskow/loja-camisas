"use client";
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShoppingCart, Truck, Home, ShieldCheck, CreditCard, Package } from 'lucide-react';
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
  const [cep, setCep] = useState('');
  const [frete, setFrete] = useState<number | null>(null);

  if (!produto) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-zinc-50">
        <h1 className="font-anton text-4xl mb-4 uppercase">Produto não encontrado</h1>
        <button onClick={() => router.push('/')} className="bg-black text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-[#F59E0B] hover:text-black transition-colors">Voltar à Loja</button>
      </div>
    );
  }

  // Puxa 4 produtos da mesma categoria para o "Você também pode gostar..."
  const relacionadas = produtos.filter(p => p.categoria === produto.categoria && p.id !== produto.id).slice(0, 4);
  const isProntoParaComprar = tamanhoSelecionado !== null;

  const handleComprar = () => {
    if (!session) { alert('Faça login para adicionar à sua armadura.'); router.push('/login'); return; }
    if (isProntoParaComprar) {
      addToCart({ titulo: produto.nome, preco: produto.preco, cor: produto.cor, tamanho: tamanhoSelecionado, quantidade });
      setIsCartOpen(true);
    }
  };

  const calcularFrete = () => {
    if (cep.replace(/\D/g, '').length !== 8) { alert('CEP inválido'); return; }
    setFrete(15.90);
  };

  return (
    <main className="min-h-screen bg-white text-black pb-24">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 pt-8 mt-4 md:mt-8">
        
        {/* BREADCRUMBS */}
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-8">
          <Link href="/" className="hover:text-[#F59E0B] transition-colors"><Home className="w-3 h-3" /></Link>
          <span>/</span>
          <Link href="/categoria/camiseta-basica" className="hover:text-[#F59E0B] transition-colors">Produtos</Link>
          <span>/</span>
          <span className="text-black font-medium">{produto.nome}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* GALERIA DE IMAGENS (Placeholder) */}
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-[4/5] bg-zinc-100 rounded-md flex items-center justify-center relative border border-zinc-200">
               <span className="text-zinc-400 font-medium">Imagem {produto.nome} <br/>(Aguardando Foto)</span>
               <span className="absolute top-4 right-4 bg-[#F59E0B] text-black text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-widest">Lançamento</span>
            </div>
            <div className="grid grid-cols-4 gap-4">
               {[1, 2, 3, 4].map(i => (
                 <div key={i} className="aspect-square bg-zinc-100 rounded-md flex items-center justify-center border border-zinc-200 cursor-pointer hover:border-black transition-colors">
                   <span className="text-zinc-400 text-xs">Foto {i}</span>
                 </div>
               ))}
            </div>
          </div>

          {/* INFORMAÇÕES DO PRODUTO */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-anton uppercase tracking-wide mb-2">{produto.nome}</h1>
            
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-black">R$ {produto.preco.toFixed(2).replace('.', ',')}</span>
              {produto.precoOriginal > produto.preco && (
                <span className="text-lg text-zinc-400 line-through">R$ {produto.precoOriginal.toFixed(2).replace('.', ',')}</span>
              )}
            </div>

            <div className="bg-zinc-50 border border-zinc-200 p-3 rounded-md flex items-center gap-3 mb-6 text-sm font-medium">
              <Truck className="w-5 h-5 text-[#F59E0B]" />
              <span>🚚 <strong className="text-[#F59E0B]">FRETE GRÁTIS</strong> em compras acima de R$ 299</span>
            </div>

            <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-zinc-600 mb-8 border-b border-zinc-200 pb-6">
              <span>{produto.tag}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-300"></span>
              <span>100% Algodão</span>
            </div>

            {/* SELEÇÃO DE TAMANHO */}
            <div className="mb-8">
              <div className="flex justify-between items-end mb-3">
                <span className="text-sm font-bold uppercase">Tamanho: <span className="text-zinc-500">{tamanhoSelecionado || 'Selecione'}</span></span>
                <button className="text-xs text-zinc-500 underline hover:text-black">Tabela de Medidas</button>
              </div>
              <div className="flex gap-2">
                {produto.tamanhos.map((tam) => {
                  const emEstoque = produto.estoque[tam] > 0;
                  return (
                    <button 
                      key={tam} 
                      onClick={() => emEstoque && setTamanhoSelecionado(tam)} 
                      disabled={!emEstoque}
                      className={`h-12 w-14 flex items-center justify-center text-sm font-bold border rounded-sm transition-all
                        ${!emEstoque ? 'bg-zinc-100 text-zinc-300 border-zinc-200 cursor-not-allowed line-through' : 
                        tamanhoSelecionado === tam ? 'bg-black text-white border-black' : 'bg-white text-zinc-600 border-zinc-300 hover:border-black'}`}
                    >
                      {tam}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SELEÇÃO DE QUANTIDADE E COMPRA */}
            <div className="flex gap-4 mb-8">
              <div className="flex items-center border border-zinc-300 rounded-sm h-14 bg-white">
                <button onClick={() => setQuantidade(Math.max(1, quantidade - 1))} className="px-4 h-full text-zinc-500 hover:text-black transition-colors">-</button>
                <span className="w-8 text-center font-bold">{quantidade}</span>
                <button onClick={() => setQuantidade(quantidade + 1)} className="px-4 h-full text-zinc-500 hover:text-black transition-colors">+</button>
              </div>
              <button 
                onClick={handleComprar} 
                disabled={!isProntoParaComprar && !!session}
                className={`flex-1 h-14 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest rounded-sm transition-all duration-300 
                  ${!session ? 'bg-zinc-900 text-white hover:bg-black' : 
                  isProntoParaComprar ? 'bg-[#F59E0B] text-black hover:bg-amber-400' : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'}`}
              >
                <ShoppingCart className="w-5 h-5" />
                {!session ? 'Faça Login' : isProntoParaComprar ? 'Adicionar ao Carrinho' : 'Selecione o Tamanho'}
              </button>
            </div>

            {/* CÁLCULO DE FRETE */}
            <div className="bg-zinc-50 p-4 rounded-md border border-zinc-200 mb-8">
              <span className="text-sm font-bold uppercase block mb-3">Calcule o Frete</span>
              <div className="flex gap-2">
                <input type="text" placeholder="Seu CEP" value={cep} onChange={(e) => setCep(e.target.value)} maxLength={9} className="flex-1 border border-zinc-300 px-4 h-12 rounded-sm text-sm outline-none focus:border-black" />
                <button onClick={calcularFrete} className="bg-black text-white px-6 font-bold uppercase tracking-widest text-xs hover:bg-zinc-800 transition-colors">Consultar</button>
              </div>
              {frete !== null && <p className="text-green-600 text-sm font-bold mt-3">Frete Fixo: R$ {frete.toFixed(2).replace('.', ',')}</p>}
            </div>

            {/* BADGES DE CONFIANÇA */}
            <div className="grid grid-cols-2 gap-4">
               <div className="flex items-center gap-3 text-xs font-bold uppercase text-zinc-600"><Package className="w-5 h-5 text-black" /> Envio Imediato</div>
               <div className="flex items-center gap-3 text-xs font-bold uppercase text-zinc-600"><CreditCard className="w-5 h-5 text-black" /> Até 12x no Cartão</div>
               <div className="flex items-center gap-3 text-xs font-bold uppercase text-zinc-600"><Truck className="w-5 h-5 text-black" /> Enviamos p/ Todo Brasil</div>
               <div className="flex items-center gap-3 text-xs font-bold uppercase text-zinc-600"><ShieldCheck className="w-5 h-5 text-black" /> Qualidade Garantida</div>
            </div>
          </div>
        </div>

        {/* ABAS DE INFORMAÇÃO */}
        <div className="mb-20">
          <div className="flex gap-8 border-b border-zinc-200 mb-8">
            <button onClick={() => setAbaAtiva('descricao')} className={`pb-4 text-sm font-bold uppercase tracking-widest transition-colors relative ${abaAtiva === 'descricao' ? 'text-black' : 'text-zinc-400 hover:text-black'}`}>
              Descrição
              {abaAtiva === 'descricao' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></span>}
            </button>
            <button onClick={() => setAbaAtiva('tecnica')} className={`pb-4 text-sm font-bold uppercase tracking-widest transition-colors relative ${abaAtiva === 'tecnica' ? 'text-black' : 'text-zinc-400 hover:text-black'}`}>
              Informações Técnicas
              {abaAtiva === 'tecnica' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></span>}
            </button>
            <button onClick={() => setAbaAtiva('lavagem')} className={`pb-4 text-sm font-bold uppercase tracking-widest transition-colors relative ${abaAtiva === 'lavagem' ? 'text-black' : 'text-zinc-400 hover:text-black'}`}>
              Recomendações de Lavagem
              {abaAtiva === 'lavagem' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></span>}
            </button>
          </div>

          <div className="text-zinc-600 text-sm leading-relaxed max-w-3xl">
            {abaAtiva === 'descricao' && (
              <div className="space-y-4">
                <p>A <strong>{produto.nome} Zero Encolhimento</strong> é produzida com modelagem exclusiva streetwear e acabamento de extrema qualidade.</p>
                <p>Nossas peças passam por um processo de pré-encolhimento, o que garante que a peça não encolha mais nas próximas lavagens.</p>
                <p>As nossas peças possuem toque conforto, não são transparentes e podem ser personalizadas com a sua estampa.</p>
                <p>Ideal para quem busca qualidade, conforto e custo benefício para iniciar a produção da sua marca!</p>
              </div>
            )}
            {abaAtiva === 'tecnica' && (
              <ul className="list-disc pl-5 space-y-2">
                <li>Fabricada com algodão BCI (Better Cotton Initiative).</li>
                <li>Malha 100% algodão.</li>
                <li>Gramatura {produto.tag.split(' ')[0]}g/m².</li>
                <li>{produto.tag.replace(produto.tag.split(' ')[0] + ' g/m² ', '')}.</li>
                <li>Peças pré encolhidas.</li>
                <br/>
                <li className="font-bold text-black list-none -ml-5">Importante!</li>
                <li>Peça que possui somente etiqueta de composição lateral.</li>
                <li>Insira a etiqueta da sua marca tranquilamente.</li>
              </ul>
            )}
            {abaAtiva === 'lavagem' && (
              <ul className="list-disc pl-5 space-y-2">
                <li>Lavar à mão ou em ciclo delicado.</li>
                <li>Não usar alvejantes.</li>
                <li>Secar à sombra para preservar a tonalidade.</li>
                <li>Passar com ferro em temperatura baixa.</li>
              </ul>
            )}
          </div>
        </div>

        {/* PRODUTOS RELACIONADOS */}
        {relacionadas.length > 0 && (
          <section className="border-t border-zinc-200 pt-16">
            <h2 className="text-3xl font-anton uppercase text-center mb-12 tracking-wide text-zinc-900">Você também pode gostar...</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relacionadas.map(prod => (
                <QuickBuyCard key={prod.id} tituloGrupo={prod.nome} produtosDoGrupo={[prod]} />
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}
