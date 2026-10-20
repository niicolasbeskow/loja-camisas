"use client";

import { useState } from 'react';
import Link from 'next/link';
import { produtos, Tamanho } from '@/data/produtos';
import { ShoppingCart, Truck, ShieldCheck, Star } from 'lucide-react';
import QuickBuyCard from '@/components/QuickBuyCard';

const normalizar = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");

const coresHex: Record<string, string> = {
  'Preto': 'bg-zinc-900',
  'Branco': 'bg-white',
  'Areia': 'bg-[#e3dac9]',
  'Off-White': 'bg-[#f5f5f0]',
  'Marrom': 'bg-[#4a3728]',
  'Cinza': 'bg-zinc-400',
  'Azul Marinho': 'bg-blue-900',
  'Verde Militar': 'bg-[#4b5320]'
};

export default function ProdutoDetalhes({ params }: { params: { id: string } }) {
  const paramId = decodeURIComponent(params.id);
  
  // Encontra o produto exato pela URL inteligente
  const produto = produtos.find(p => 
    p.id === paramId || normalizar(p.nome).includes(normalizar(paramId))
  ) || produtos[0];

  const [tamanhoAtivo, setTamanhoAtivo] = useState<Tamanho | ''>('');
  const [kitSelecionado, setKitSelecionado] = useState<1 | 2 | 3>(1);
  const [abaAtiva, setAbaAtiva] = useState<'descricao' | 'tecnica' | 'lavagem'>('descricao');
  const [corAtiva, setCorAtiva] = useState(produto.cor);

  const getPrecoAtual = () => {
    if (kitSelecionado === 3 && produto.precoKit3) return produto.precoKit3;
    if (kitSelecionado === 2 && produto.precoKit2) return produto.precoKit2;
    return produto.preco;
  };

  const precoAtual = getPrecoAtual();
  const precoTotal = precoAtual * kitSelecionado;
  const parcela = (precoTotal / 3).toFixed(2).replace('.', ',');

  // Pega outros produtos para a secção de vendas cruzadas
  const sugestoes = produtos.filter(p => p.id !== produto.id).slice(0, 4);

  // Substitui traços por pontos elegantes para não parecer texto gerado
  const formataTexto = (txt: string) => txt.replace(/-/g, '•');

  return (
    <main className="min-h-screen bg-white font-outfit pb-24">
      
      <div className="bg-white border-b border-zinc-100">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-4 flex gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-400">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/categoria/${produto.categoria}`} className="hover:text-black transition-colors">
            {produto.categoria.replace('camiseta-', '')}
          </Link>
          <span>/</span>
          <span className="text-black">{produto.nome}</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* FOTO DO PRODUTO */}
          <div className="relative aspect-[4/5] bg-zinc-100 rounded-xl overflow-hidden flex items-center justify-center">
            {produto.imagens && produto.imagens.length > 0 ? (
               <img src={produto.imagens[0]} alt={produto.nome} className="absolute inset-0 w-full h-full object-cover object-center" />
            ) : (
               <span className="text-zinc-400 font-medium">Aguardando Foto</span>
            )}
            
            {produto.tags && produto.tags.length > 0 && (
              <div className="absolute top-6 right-6 flex flex-col gap-2 z-10">
                {produto.tags.map(tag => (
                  <span key={tag} className="bg-red-600 text-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-sm shadow-md flex items-center gap-1">
                    <span className="text-xs">🔥</span> {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* DADOS DE COMPRA */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-anton uppercase text-zinc-900 tracking-wide mb-3">
              {produto.nome}
            </h1>
            
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-zinc-300">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 border-b border-zinc-300 hover:text-black hover:border-black cursor-pointer transition-colors">
                (0) Avaliações
              </span>
            </div>

            <div className="mb-6">
              <div className="flex items-end gap-3 mb-1">
                {produto.precoAntigo > 0 && kitSelecionado === 1 && (
                  <span className="text-lg text-zinc-400 line-through font-medium">
                    R$ {produto.precoAntigo.toFixed(2).replace('.', ',')}
                  </span>
                )}
                <span className="text-4xl font-bold text-zinc-900">
                  R$ {precoTotal.toFixed(2).replace('.', ',')}
                </span>
              </div>
              <p className="text-xs text-zinc-600 font-medium">
                em até <strong className="text-black">3x de R$ {parcela}</strong> sem juros
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-zinc-700 bg-zinc-50 py-3 px-4 rounded border border-zinc-100 mb-8">
              <Truck size={16} className="text-amber-500" />
              <p>Compre e receba <strong className="text-amber-500 uppercase">Frete Grátis</strong> em compras acima de R$ 299</p>
            </div>

            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 block">
                {produto.especificacaoTecnica}
              </span>
            </div>

            {/* SELEÇÃO DE KITS */}
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-900 mb-3 block">Quantidade</span>
              <div className="grid grid-cols-3 gap-2 md:gap-4">
                <button 
                  onClick={() => setKitSelecionado(1)}
                  className={`border-2 py-3 md:py-4 flex flex-col items-center justify-center transition-colors rounded ${kitSelecionado === 1 ? 'border-black bg-black text-white' : 'border-zinc-200 text-zinc-600 hover:border-zinc-300'}`}
                >
                  <span className="font-bold text-sm">1 un</span>
                  <span className={`text-[10px] mt-1 ${kitSelecionado === 1 ? 'text-zinc-300' : 'text-zinc-400'}`}>R$ {produto.preco.toFixed(2).replace('.', ',')}/un</span>
                </button>

                {produto.precoKit2 && (
                  <button 
                    onClick={() => setKitSelecionado(2)}
                    className={`border-2 py-3 md:py-4 flex flex-col items-center justify-center transition-colors rounded ${kitSelecionado === 2 ? 'border-black bg-black text-white' : 'border-zinc-200 text-zinc-600 hover:border-zinc-300'}`}
                  >
                    <span className="font-bold text-sm">Kit c/ 2</span>
                    <span className={`text-[10px] mt-1 ${kitSelecionado === 2 ? 'text-zinc-300' : 'text-zinc-400'}`}>R$ {produto.precoKit2.toFixed(2).replace('.', ',')}/un</span>
                  </button>
                )}

                {produto.precoKit3 && (
                  <button 
                    onClick={() => setKitSelecionado(3)}
                    className={`border-2 py-3 md:py-4 flex flex-col items-center justify-center transition-colors rounded ${kitSelecionado === 3 ? 'border-black bg-black text-white' : 'border-zinc-200 text-zinc-600 hover:border-zinc-300'}`}
                  >
                    <span className="font-bold text-sm">Kit c/ 3</span>
                    <span className={`text-[10px] mt-1 ${kitSelecionado === 3 ? 'text-zinc-300' : 'text-zinc-400'}`}>R$ {produto.precoKit3.toFixed(2).replace('.', ',')}/un</span>
                  </button>
                )}
              </div>
            </div>

            {/* SELEÇÃO DE CORES */}
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-900 mb-3 block">
                Cor: <span className="font-medium capitalize text-zinc-600">{corAtiva}</span>
              </span>
              <div className="flex gap-3">
                {Array.from(new Set([produto.cor, 'Branco', 'Areia'])).map(cor => (
                  <button
                    key={cor}
                    onClick={() => setCorAtiva(cor)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${corAtiva === cor ? 'border-black scale-110' : 'border-zinc-200 hover:border-zinc-300'} ${coresHex[cor] || 'bg-zinc-200'}`}
                    title={cor}
                  />
                ))}
              </div>
            </div>

            {/* SELEÇÃO DE TAMANHOS */}
            <div className="mb-10">
              <div className="flex justify-between items-end mb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-900">Tamanho</span>
                <button className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-black border-b border-zinc-300 hover:border-black transition-all">
                  Guia de Medidas
                </button>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {(['P', 'M', 'G', 'GG', 'XG', 'G1', 'G2'] as Tamanho[]).map(tam => {
                  const qtdDisponivel = produto.estoque[tam] || 0;
                  const esgotado = qtdDisponivel === 0;
                  
                  return (
                    <button
                      key={tam}
                      disabled={esgotado}
                      onClick={() => setTamanhoAtivo(tam)}
                      className={`w-12 h-12 md:w-14 md:h-14 border-2 flex items-center justify-center font-bold text-sm transition-all rounded
                        ${esgotado ? 'border-zinc-100 text-zinc-300 cursor-not-allowed bg-zinc-50' 
                        : tamanhoAtivo === tam ? 'border-black bg-black text-white' 
                        : 'border-zinc-200 text-zinc-900 hover:border-black'}`}
                    >
                      {tam}
                    </button>
                  );
                })}
              </div>
            </div>

            <button className="w-full bg-black text-white h-16 flex items-center justify-center gap-3 font-bold text-sm uppercase tracking-widest hover:bg-zinc-800 transition-colors rounded shadow-xl shadow-black/10">
              <ShoppingCart size={18} /> Adicionar ao Carrinho
            </button>

            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-zinc-100">
              <div className="flex items-center gap-3 text-zinc-600">
                <ShieldCheck size={20} className="text-black" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Compra Segura</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-600">
                <Truck size={20} className="text-black" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Troca Facilitada</span>
              </div>
            </div>
          </div>
        </div>

        {/* ABAS COM INFORMAÇÕES LIMPAS E PROFISSIONAIS */}
        <div className="mt-20 pt-12 border-t border-zinc-200 max-w-4xl">
          
          <div className="flex gap-8 md:gap-12 border-b border-zinc-200 mb-8 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            <button 
              onClick={() => setAbaAtiva('descricao')}
              className={`pb-4 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors border-b-2 ${abaAtiva === 'descricao' ? 'border-black text-black' : 'border-transparent text-zinc-400 hover:text-zinc-600'}`}
            >
              Descrição
            </button>
            <button 
              onClick={() => setAbaAtiva('tecnica')}
              className={`pb-4 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors border-b-2 ${abaAtiva === 'tecnica' ? 'border-black text-black' : 'border-transparent text-zinc-400 hover:text-zinc-600'}`}
            >
              Informações Técnicas
            </button>
            <button 
              onClick={() => setAbaAtiva('lavagem')}
              className={`pb-4 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors border-b-2 ${abaAtiva === 'lavagem' ? 'border-black text-black' : 'border-transparent text-zinc-400 hover:text-zinc-600'}`}
            >
              Lavagem
            </button>
          </div>

          <div className="text-sm text-zinc-600 leading-relaxed font-medium">
            {abaAtiva === 'descricao' && (
              <div className="whitespace-pre-line">{formataTexto(produto.descricao)}</div>
            )}
            {abaAtiva === 'tecnica' && (
              <div className="whitespace-pre-line">{formataTexto(produto.informacoesTecnicas)}</div>
            )}
            {abaAtiva === 'lavagem' && (
              <div className="whitespace-pre-line">{formataTexto(produto.lavagem)}</div>
            )}
          </div>
        </div>
      </div>

      {/* COMPLETA O TEU KIT (SUGESTÕES) */}
      {sugestoes.length > 0 && (
        <section className="bg-zinc-50 border-t border-zinc-200 py-16 md:py-24 mt-12">
          <div className="max-w-[1400px] mx-auto px-4 md:px-6">
            <div className="mb-10 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-anton uppercase tracking-wide text-zinc-900">Completa o teu Kit</h2>
              <p className="text-zinc-500 text-xs mt-2 font-medium uppercase tracking-widest">A galera também levou</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {sugestoes.map(sugestao => (
                <QuickBuyCard key={sugestao.id} tituloGrupo={sugestao.nome} produtosDoGrupo={[sugestao]} />
              ))}
            </div>
          </div>
        </section>
      )}

    </main>
  );
}
