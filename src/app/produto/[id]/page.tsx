"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { carregarProdutosStorage, produtosIniciais, Produto, Tamanho } from '@/data/produtos';
import { ShoppingCart, Truck, ShieldCheck, Star, MessageSquare } from 'lucide-react';
import QuickBuyCard from '@/components/QuickBuyCard';

const normalizar = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");

// Dicionário Mestre de Cores B.SKW
const coresHex: Record<string, string> = {
  'Preto': 'bg-[#18181b]',
  'Branco': 'bg-[#FFFFFF] border-zinc-200',
  'Off-White': 'bg-[#F5F5F0] border-zinc-200',
  'Marrom': 'bg-[#4A3728]',
  'Areia': 'bg-[#E3DAC9]',
  'Cinza': 'bg-[#a1a1aa]',
  'Chumbo': 'bg-[#3f3f46]',
  'Azul Marinho': 'bg-[#1e3a8a]',
  'Verde Militar': 'bg-[#3f6212]',
  'Verde Musgo': 'bg-[#3b4426]',
  'Bordô': 'bg-[#7f1d1d]',
  'Rosa Pastel': 'bg-[#f4c2c2]',
  'Azul Bebê': 'bg-[#89cff0]',
  'Cinza Envelhecido': 'bg-[#71717a]',
  'Preto Estonado': 'bg-[#27272a]',
  'Verde Claro': 'bg-[#a3e635]',
  'Roxo': 'bg-[#581c87]',
  'Azul Envelhecido': 'bg-[#3b82f6]',
  'Azul Estonado': 'bg-[#60a5fa]',
  'Preto Vintage': 'bg-[#27272a]',
  'Cinza Escuro': 'bg-[#3f3f46]',
  'Cinza Claro': 'bg-[#d4d4d8]',
  'Destroyed': 'bg-[#3f3f46]'
};

// Função para misturar array (Fisher-Yates) para exibir produtos aleatórios
function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export default function ProdutoDetalhes() {
  const router = useRouter();
  const params = useParams();
  const rawId = typeof params?.id === 'string' ? params.id : '';
  const paramId = decodeURIComponent(rawId).replace(/-/g, '').toUpperCase();

  const [catalogo, setCatalogo] = useState<Produto[]>(produtosIniciais);
  const [sugestoesInteligentes, setSugestoesInteligentes] = useState<Produto[]>([]);

  useEffect(() => {
    const produtosSalvos = carregarProdutosStorage();
    setCatalogo(produtosSalvos);
  }, []);

  const produto = catalogo.find(p => 
    p.codigo.replace(/-/g, '').toUpperCase() === paramId ||
    p.id === rawId || 
    normalizar(p.nome).includes(normalizar(decodeURIComponent(rawId)))
  ) || catalogo[0];

  useEffect(() => {
    if (catalogo.length > 0) {
      // 1. Pega os produtos que não são do mesmo SKU e cujas cores sejam Preto ou Branco
      const candidatos = catalogo.filter(p => 
        p.id !== produto.id && 
        (p.cor === 'Preto' || p.cor === 'Branco')
      );
      
      // 2. Mistura os candidatos de forma aleatória
      const candidatosMisturados = shuffleArray(candidatos);
      
      // 3. Pega os 4 primeiros
      setSugestoesInteligentes(candidatosMisturados.slice(0, 4));
    }
  }, [catalogo, produto.id]);

  const [tamanhoAtivo, setTamanhoAtivo] = useState<Tamanho | ''>('');
  const [kitSelecionado, setKitSelecionado] = useState<1 | 2 | 3>(1);
  const [abaAtiva, setAbaAtiva] = useState<'descricao' | 'tecnica' | 'lavagem'>('descricao');

  const precoAtual = kitSelecionado === 3 && produto.precoKit3 ? produto.precoKit3 : 
                     kitSelecionado === 2 && produto.precoKit2 ? produto.precoKit2 : 
                     produto.preco;
  
  const precoTotal = precoAtual * kitSelecionado;
  
  // Calcula o valor riscado multiplicado pela quantidade de kits
  const precoRiscadoTotal = produto.precoAntigo * kitSelecionado;
  
  const parcela = (precoTotal / 3).toFixed(2).replace('.', ',');

  const variacoesDaMesmaCategoria = catalogo.filter(p => p.categoria === produto.categoria);
  const formataTexto = (txt: string) => txt.replace(/-/g, '•');

  return (
    <main className="min-h-screen bg-white font-outfit pb-24">
      {/* BREADCRUMB */}
      <div className="bg-zinc-50 border-b border-zinc-200">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-4 flex justify-between items-center text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-400">
          <div className="flex gap-2">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <Link href={`/categoria/${produto.categoria}`} className="hover:text-black transition-colors">
              {produto.categoria.replace(/-/g, ' ')}
            </Link>
            <span>/</span>
            <span className="text-black">{produto.nome}</span>
          </div>
          <span className="font-mono text-zinc-400 hidden sm:inline">SKU: {produto.codigo.replace(/-/g, '')}</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* FOTO DO PRODUTO (Estética Streetwear Limpa) */}
          <div className="relative aspect-[4/5] bg-zinc-100/80 rounded-sm overflow-hidden flex items-center justify-center border border-zinc-200">
            {produto.imagens && produto.imagens.length > 0 ? (
               <img src={produto.imagens[0]} alt={produto.nome} className="absolute inset-0 w-full h-full object-cover object-center" />
            ) : (
               <div className="flex flex-col items-center opacity-30">
                 <span className="text-zinc-500 font-anton text-2xl uppercase tracking-widest">B.SKW</span>
                 <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-2">Aguardando Foto Oficial</span>
               </div>
            )}
            
            {produto.tags && produto.tags.length > 0 && (
              <div className="absolute top-6 right-6 flex flex-col gap-2 z-10">
                {produto.tags.map(tag => (
                  <span key={tag} className="bg-black text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest shadow-md border border-zinc-800">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* DADOS DE COMPRA */}
          <div className="flex flex-col">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 mb-2 block">
              CÓD: {produto.codigo.replace(/-/g, '')}
            </span>
            <h1 className="text-4xl md:text-5xl font-anton uppercase text-zinc-900 tracking-wide mb-4 leading-none">
              {produto.nome}
            </h1>
            
            {/* GATILHO DE AVALIAÇÕES (Âncora para o fundo da página) */}
            <div className="flex items-center gap-2 mb-8">
              <div className="flex text-zinc-900">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
              </div>
              <a href="#avaliacoes" className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-black transition-colors underline decoration-zinc-300 underline-offset-4">
                (0) Avaliações
              </a>
            </div>

            <div className="mb-8 p-6 bg-zinc-50 border border-zinc-200 rounded-sm">
              <div className="flex flex-col mb-2">
                {produto.precoAntigo > 0 && (
                  <span className="text-lg text-zinc-400 line-through font-medium mb-1">
                    R$ {precoRiscadoTotal.toFixed(2).replace('.', ',')}
                  </span>
                )}
                <span className="text-4xl font-anton tracking-wide text-zinc-900">
                  R$ {precoTotal.toFixed(2).replace('.', ',')}
                </span>
              </div>
              <p className="text-xs text-zinc-600 font-bold uppercase tracking-widest mt-2">
                em até <strong className="text-black">3x de R$ {parcela}</strong> s/ juros
              </p>
            </div>

            <div className="mb-8">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block border-l-2 border-black pl-3">
                {produto.especificacaoTecnica}
              </span>
            </div>

            {/* SELEÇÃO DE KITS */}
            <div className="mb-8">
              <div className="flex justify-between items-end mb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-900">Quantidade / Kits</span>
                {produto.precoKit2 > 0 && <span className="text-[10px] font-bold uppercase tracking-widest text-green-600 bg-green-50 px-2 py-1">Desconto Progressivo</span>}
              </div>
              <div className="grid grid-cols-3 gap-3">
                <button 
                  onClick={() => setKitSelecionado(1)}
                  className={`border-2 py-4 flex flex-col items-center justify-center transition-all rounded-sm ${kitSelecionado === 1 ? 'border-black bg-black text-white' : 'border-zinc-200 text-zinc-600 hover:border-black'}`}
                >
                  <span className="font-bold text-sm">1 un</span>
                  <span className={`text-[10px] mt-1 font-medium ${kitSelecionado === 1 ? 'text-zinc-300' : 'text-zinc-400'}`}>R$ {produto.preco.toFixed(2).replace('.', ',')}/un</span>
                </button>

                {produto.precoKit2 > 0 && (
                  <button 
                    onClick={() => setKitSelecionado(2)}
                    className={`border-2 py-4 flex flex-col items-center justify-center transition-all rounded-sm ${kitSelecionado === 2 ? 'border-black bg-black text-white' : 'border-zinc-200 text-zinc-600 hover:border-black'}`}
                  >
                    <span className="font-bold text-sm">Kit c/ 2</span>
                    <span className={`text-[10px] mt-1 font-medium ${kitSelecionado === 2 ? 'text-zinc-300' : 'text-zinc-400'}`}>R$ {produto.precoKit2.toFixed(2).replace('.', ',')}/un</span>
                  </button>
                )}

                {produto.precoKit3 > 0 && (
                  <button 
                    onClick={() => setKitSelecionado(3)}
                    className={`border-2 py-4 flex flex-col items-center justify-center transition-all rounded-sm ${kitSelecionado === 3 ? 'border-black bg-black text-white' : 'border-zinc-200 text-zinc-600 hover:border-black'}`}
                  >
                    <span className="font-bold text-sm">Kit c/ 3</span>
                    <span className={`text-[10px] mt-1 font-medium ${kitSelecionado === 3 ? 'text-zinc-300' : 'text-zinc-400'}`}>R$ {produto.precoKit3.toFixed(2).replace('.', ',')}/un</span>
                  </button>
                )}
              </div>
            </div>

            {/* SELEÇÃO DE CORES CORRIGIDA */}
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-900 mb-3 block">
                Cor: <span className="font-medium text-zinc-600">{produto.cor}</span>
              </span>
              <div className="flex flex-wrap gap-3">
                {variacoesDaMesmaCategoria.map(variacao => (
                  <button
                    key={variacao.codigo}
                    onClick={() => router.push(`/produto/${variacao.codigo.replace(/-/g, '')}`)}
                    className={`w-10 h-10 rounded-full border-2 transition-all shadow-sm ${produto.codigo === variacao.codigo ? 'border-black scale-110 ring-2 ring-offset-2 ring-black' : 'border-zinc-300 hover:scale-105'} ${coresHex[variacao.cor] || 'bg-zinc-200'}`}
                    title={`${variacao.cor} (${variacao.codigo.replace(/-/g, '')})`}
                  />
                ))}
              </div>
            </div>

            {/* SELEÇÃO DE TAMANHOS */}
            <div className="mb-10">
              <div className="flex justify-between items-end mb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-900">Tamanho</span>
                <button className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-black transition-colors underline decoration-zinc-300 underline-offset-4">
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
                      className={`w-14 h-14 border-2 flex items-center justify-center font-bold text-sm transition-all rounded-sm
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

            <button className="w-full bg-black text-white h-16 flex items-center justify-center gap-3 font-bold text-sm uppercase tracking-widest hover:bg-zinc-800 transition-colors rounded-sm shadow-xl shadow-black/10">
              <ShoppingCart size={18} /> Adicionar ao Carrinho
            </button>

            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-zinc-200">
              <div className="flex items-center gap-3 text-zinc-600">
                <ShieldCheck size={20} className="text-black" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Compra 100% Segura</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-600">
                <Truck size={20} className="text-black" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Primeira Troca Grátis</span>
              </div>
            </div>
          </div>
        </div>

        {/* ABAS (DESCRIÇÃO E INFORMAÇÕES TÉCNICAS) */}
        <div className="mt-24 pt-12 border-t border-zinc-200 max-w-4xl">
          <div className="flex gap-8 md:gap-12 border-b border-zinc-200 mb-8 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            <button 
              onClick={() => setAbaAtiva('descricao')}
              className={`pb-4 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors border-b-2 ${abaAtiva === 'descricao' ? 'border-black text-black' : 'border-transparent text-zinc-400 hover:text-zinc-900'}`}
            >
              A Peça
            </button>
            <button 
              onClick={() => setAbaAtiva('tecnica')}
              className={`pb-4 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors border-b-2 ${abaAtiva === 'tecnica' ? 'border-black text-black' : 'border-transparent text-zinc-400 hover:text-zinc-900'}`}
            >
              Info Técnica
            </button>
            <button 
              onClick={() => setAbaAtiva('lavagem')}
              className={`pb-4 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors border-b-2 ${abaAtiva === 'lavagem' ? 'border-black text-black' : 'border-transparent text-zinc-400 hover:text-zinc-900'}`}
            >
              Cuidados
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

        {/* MÓDULO DE AVALIAÇÕES DE CLIENTES */}
        <div id="avaliacoes" className="mt-24 pt-16 border-t border-zinc-200 scroll-mt-20">
          <h2 className="text-3xl md:text-4xl font-anton uppercase tracking-wide text-zinc-900 mb-8">Avaliações de Clientes</h2>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="md:w-1/3 bg-zinc-50 p-8 rounded-sm border border-zinc-200 text-center flex flex-col items-center justify-center">
              <div className="text-6xl font-anton text-zinc-900 mb-2">0.0</div>
              <div className="flex text-zinc-300 mb-3">
                <Star fill="currentColor" size={20} />
                <Star fill="currentColor" size={20} />
                <Star fill="currentColor" size={20} />
                <Star fill="currentColor" size={20} />
                <Star fill="currentColor" size={20} />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Nenhuma avaliação ainda</p>
            </div>
            
            <div className="md:w-2/3 border border-zinc-200 rounded-sm p-8 flex flex-col items-center justify-center text-center bg-white min-h-[200px]">
              <MessageSquare className="text-zinc-200 mb-4" size={40} />
              <h3 className="font-bold text-zinc-900 uppercase tracking-widest mb-2">Seja o primeiro a avaliar</h3>
              <p className="text-sm text-zinc-500 font-medium mb-6">Compre esta peça e deixe a sua opinião sobre a qualidade e o caimento para ajudar outros clientes.</p>
              <button className="border-2 border-black text-black px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                Escrever Avaliação
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* CROSS SELLING INTELIGENTE E ALEATÓRIO (Completa o teu Kit) */}
      {sugestoesInteligentes.length > 0 && (
        <section className="bg-zinc-50 border-t border-zinc-200 py-16 md:py-24 mt-12">
          <div className="max-w-[1400px] mx-auto px-4 md:px-6">
            <div className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-anton uppercase tracking-wide text-zinc-900">Completa o teu Kit</h2>
                <p className="text-zinc-500 text-xs mt-2 font-bold uppercase tracking-widest">Peças coringas para o teu setup</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {sugestoesInteligentes.map(sugestao => (
                <QuickBuyCard key={sugestao.id} tituloGrupo={sugestao.nome} produtosDoGrupo={[sugestao]} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
