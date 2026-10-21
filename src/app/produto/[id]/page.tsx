"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { carregarProdutosStorage, produtosIniciais, Produto, Tamanho } from '@/data/produtos';
import { ShoppingCart, Truck, ShieldCheck, Star, MessageSquare, X, Camera, Check } from 'lucide-react';
import QuickBuyCard from '@/components/QuickBuyCard';

const normalizar = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");

interface Avaliacao {
  id: string; sku: string; nome: string; nota: number; comentario: string; data: string; imagem?: string;
}

const coresHex: Record<string, string> = {
  'Preto': 'bg-[#18181b]', 'Branco': 'bg-[#FFFFFF] border-zinc-300', 'Off-White': 'bg-[#F5F5F0] border-zinc-300',
  'Marrom': 'bg-[#4A3728]', 'Areia': 'bg-[#E3DAC9]', 'Cinza': 'bg-[#a1a1aa]', 'Chumbo': 'bg-[#3f3f46]',
  'Azul Marinho': 'bg-[#1e3a8a]', 'Verde Militar': 'bg-[#3f6212]', 'Verde Musgo': 'bg-[#3b4426]',
  'Bordô': 'bg-[#7f1d1d]', 'Rosa Pastel': 'bg-[#f4c2c2]', 'Azul Bebê': 'bg-[#89cff0]',
  'Cinza Envelhecido': 'bg-[#71717a]', 'Preto Estonado': 'bg-[#27272a]', 'Verde Claro': 'bg-[#a3e635]',
  'Roxo': 'bg-[#581c87]', 'Azul Envelhecido': 'bg-[#3b82f6]', 'Azul Estonado': 'bg-[#60a5fa]',
  'Preto Vintage': 'bg-[#27272a]', 'Cinza Escuro': 'bg-[#3f3f46]', 'Cinza Claro': 'bg-[#d4d4d8]',
  'Destroyed': 'bg-[#3f3f46]'
};

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

  const seletorTamanhoRef = useRef<HTMLDivElement>(null);

  const [catalogo, setCatalogo] = useState<Produto[]>(produtosIniciais);
  const [sugestoesInteligentes, setSugestoesInteligentes] = useState<Produto[]>([]);
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [modalAvaliacaoAberto, setModalAvaliacaoAberto] = useState(false);
  const [novaAvaliacao, setNovaAvaliacao] = useState({ nome: '', nota: 5, comentario: '', imagem: '' });

  const [tamanhoAtivo, setTamanhoAtivo] = useState<Tamanho | ''>('');
  const [erroTamanho, setErroTamanho] = useState(false);
  const [adicionadoFeedback, setAdicionadoFeedback] = useState(false);
  const [kitSelecionado, setKitSelecionado] = useState<1 | 2 | 3>(1);
  const [abaAtiva, setAbaAtiva] = useState<'descricao' | 'tecnica' | 'lavagem'>('descricao');

  useEffect(() => {
    const produtosSalvos = carregarProdutosStorage();
    setCatalogo(produtosSalvos);
    const avaliacoesSalvas = localStorage.getItem('bskw_avaliacoes');
    if (avaliacoesSalvas) {
      try {
        const todas: Avaliacao[] = JSON.parse(avaliacoesSalvas);
        setAvaliacoes(todas.filter(a => a.sku.replace(/-/g, '').toUpperCase() === paramId));
      } catch (e) {}
    }
  }, [paramId]);

  const produto = catalogo.find(p => p.codigo.replace(/-/g, '').toUpperCase() === paramId || p.id === rawId || normalizar(p.nome).includes(normalizar(decodeURIComponent(rawId)))) || catalogo[0];

  useEffect(() => {
    if (catalogo.length > 0) {
      const candidatos = catalogo.filter(p => p.id !== produto.id && (p.cor === 'Preto' || p.cor === 'Branco' || p.cor === 'Off-White'));
      setSugestoesInteligentes(shuffleArray(candidatos).slice(0, 4));
    }
  }, [catalogo, produto.id]);

  // Cálculos de Preço e Economia
  const precoUnitarioAtual = kitSelecionado === 3 && produto.precoKit3 ? produto.precoKit3 : kitSelecionado === 2 && produto.precoKit2 ? produto.precoKit2 : produto.preco;
  const precoTotal = precoUnitarioAtual * kitSelecionado;
  const precoBaseComparacao = (produto.precoAntigo > produto.preco ? produto.precoAntigo : produto.preco) * kitSelecionado;
  const economiaTotal = precoBaseComparacao - precoTotal;
  const parcela = (precoTotal / 3).toFixed(2).replace('.', ',');

  const variacoesDaMesmaCategoria = catalogo.filter(p => p.categoria === produto.categoria);
  const specsPills = produto.especificacaoTecnica ? produto.especificacaoTecnica.split('•').map(s => s.trim()) : [];
  const formataTexto = (txt: string) => txt.replace(/-/g, '•');
  const mediaAvaliacoes = avaliacoes.length > 0 ? (avaliacoes.reduce((acc, curr) => acc + curr.nota, 0) / avaliacoes.length).toFixed(1) : '0.0';

  const handleComprar = () => {
    if (!tamanhoAtivo) {
      setErroTamanho(true);
      seletorTamanhoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => setErroTamanho(false), 2500);
      return;
    }
    setAdicionadoFeedback(true);
    setTimeout(() => setAdicionadoFeedback(false), 2000);
  };

  const handleFotoAvaliacao = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNovaAvaliacao({ ...novaAvaliacao, imagem: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const salvarAvaliacao = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaAvaliacao.nome || !novaAvaliacao.comentario) return;
    const avaliacaoFormatada: Avaliacao = {
      id: String(Date.now()), sku: produto.codigo, nome: novaAvaliacao.nome, nota: novaAvaliacao.nota,
      comentario: novaAvaliacao.comentario, data: new Date().toLocaleDateString('pt-BR'), imagem: novaAvaliacao.imagem
    };
    setAvaliacoes([avaliacaoFormatada, ...avaliacoes]);
    const gerais = JSON.parse(localStorage.getItem('bskw_avaliacoes') || '[]');
    localStorage.setItem('bskw_avaliacoes', JSON.stringify([...gerais, avaliacaoFormatada]));
    setModalAvaliacaoAberto(false);
    setNovaAvaliacao({ nome: '', nota: 5, comentario: '', imagem: '' });
  };

  const renderEstrelas = (nota: number, size = 14) => Array(5).fill(0).map((_, i) => (
    <Star key={i} size={size} className={i < nota ? "text-zinc-900 fill-zinc-900" : "text-zinc-300"} />
  ));

  return (
    <main className="min-h-screen bg-[#FAFAFA] font-outfit pb-36 md:pb-24 text-zinc-900">
      
      {/* MODAL DE AVALIAÇÃO */}
      {modalAvaliacaoAberto && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-none border border-zinc-900 shadow-2xl relative flex flex-col max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden">
            <button onClick={() => setModalAvaliacaoAberto(false)} className="absolute top-4 right-4 text-zinc-400 hover:text-black z-10 bg-white p-1.5 transition-colors">
              <X size={24} />
            </button>
            <div className="p-6 md:p-8 border-b border-zinc-200 bg-zinc-50">
              <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-500 block mb-1">Review Verificado</span>
              <h3 className="font-anton text-2xl md:text-3xl uppercase tracking-wide text-zinc-900">Deixe a sua opinião</h3>
              <p className="text-zinc-600 text-xs font-medium mt-1">Peça: <strong className="text-black">{produto.nome}</strong></p>
            </div>
            <form onSubmit={salvarAvaliacao} className="p-6 md:p-8 flex flex-col gap-6">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-700 block mb-3">A sua nota</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(estrela => (
                    <button key={estrela} type="button" onClick={() => setNovaAvaliacao({ ...novaAvaliacao, nota: estrela })} className="focus:outline-none transition-transform active:scale-90 hover:scale-110">
                      <Star size={32} className={estrela <= novaAvaliacao.nota ? "text-zinc-900 fill-zinc-900" : "text-zinc-200"} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-700 block mb-2">O seu nome</label>
                {/* text-base no mobile previne o auto-zoom do Safari no iOS */}
                <input type="text" required value={novaAvaliacao.nome} onChange={e => setNovaAvaliacao({ ...novaAvaliacao, nome: e.target.value })} className="w-full border-2 border-zinc-200 rounded-none p-3.5 text-base md:text-sm focus:border-black outline-none transition-colors" placeholder="Como quer ser identificado?" />
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-700 block mb-2">Comentário sobre a peça</label>
                <textarea required rows={3} value={novaAvaliacao.comentario} onChange={e => setNovaAvaliacao({ ...novaAvaliacao, comentario: e.target.value })} className="w-full border-2 border-zinc-200 rounded-none p-3.5 text-base md:text-sm focus:border-black outline-none resize-none transition-colors" placeholder="Fale sobre o caimento, a gramatura do tecido..." ></textarea>
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-700 block mb-2">Adicionar Foto do Fit (Opcional)</label>
                {novaAvaliacao.imagem ? (
                  <div className="relative w-32 h-32 rounded-none border border-zinc-900 overflow-hidden group">
                    <img src={novaAvaliacao.imagem} alt="Preview" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => setNovaAvaliacao({ ...novaAvaliacao, imagem: '' })} className="absolute inset-0 bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><X size={24} /></button>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-zinc-300 rounded-none p-6 flex flex-col items-center justify-center bg-zinc-50 hover:bg-zinc-100 hover:border-zinc-900 transition-colors cursor-pointer group">
                    <Camera size={24} className="text-zinc-400 group-hover:text-black mb-2 transition-colors" />
                    <p className="text-zinc-600 text-[11px] font-bold uppercase tracking-widest text-center">Tirar foto ou escolher arquivo</p>
                    <input type="file" accept="image/*" onChange={handleFotoAvaliacao} className="hidden" />
                  </label>
                )}
              </div>
              <button type="submit" className="w-full bg-black text-white h-14 mt-2 font-bold text-xs uppercase tracking-widest hover:bg-zinc-800 active:scale-[0.98] transition-all rounded-none">
                Publicar Avaliação
              </button>
            </form>
          </div>
        </div>
      )}

      {/* BREADCRUMB EDITORIAL */}
      <div className="bg-white border-b border-zinc-200 hidden md:block">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-3.5 flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-zinc-400">
          <div className="flex gap-2 items-center">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <Link href={`/categoria/${produto.categoria}`} className="hover:text-black transition-colors">{produto.categoria.replace(/-/g, ' ')}</Link>
            <span>/</span>
            <span className="text-black">{produto.nome}</span>
          </div>
          <span className="font-mono text-zinc-500">REF // {produto.codigo.replace(/-/g, '')}</span>
        </div>
      </div>

      {/* GRID PRINCIPAL DO PRODUTO */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-6 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* COLUNA ESQUERDA: FOTO COM STICKY NO DESKTOP */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <div className="relative aspect-[4/5] bg-zinc-100 rounded-none overflow-hidden flex items-center justify-center border border-zinc-200 w-full">
              {produto.imagens && produto.imagens.length > 0 ? (
                <img src={produto.imagens[0]} alt={produto.nome} className="absolute inset-0 w-full h-full object-cover object-center" />
              ) : (
                <div className="flex flex-col items-center opacity-30 select-none">
                  <span className="text-zinc-600 font-anton text-4xl uppercase tracking-widest">B.SKW</span>
                  <span className="font-mono text-zinc-500 text-[11px] uppercase tracking-widest mt-2">[ Aguardando Editorial ]</span>
                </div>
              )}
              {produto.tags && produto.tags.length > 0 && (
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                  {produto.tags.map(tag => (
                    <span key={tag} className="bg-black text-white px-3.5 py-1.5 text-[10px] font-mono font-bold uppercase tracking-widest border border-zinc-800">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* COLUNA DIREITA: CONFIGURAÇÃO E COMPRA */}
          <div className="lg:col-span-5 flex flex-col">
            
            {/* HEADER DA PEÇA */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-zinc-400">
                SKU: {produto.codigo.replace(/-/g, '')}
              </span>
              <a href="#avaliacoes" className="flex items-center gap-2 group">
                <div className="flex">{renderEstrelas(Number(mediaAvaliacoes), 13)}</div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-black underline decoration-zinc-300 underline-offset-4 transition-colors">
                  ({avaliacoes.length})
                </span>
              </a>
            </div>

            <h1 className="text-3xl md:text-5xl font-anton uppercase text-zinc-900 tracking-wide mb-4 leading-[1.05]">
              {produto.nome}
            </h1>
            
            {/* SPECS TÉCNICAS ESTILO INDUSTRIAL (PILLS) */}
            {specsPills.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {specsPills.map((spec, idx) => (
                  <span key={idx} className="bg-zinc-200/70 text-zinc-800 font-mono text-[11px] font-semibold uppercase px-2.5 py-1 tracking-wider border border-zinc-300/80">
                    {spec}
                  </span>
                ))}
              </div>
            )}

            {/* BLOCO DE PREÇO DINÂMICO E TRANSPARENTE */}
            <div className="mb-8 p-5 bg-white border border-zinc-200">
              <div className="flex items-baseline justify-between gap-2 mb-1">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-3xl md:text-4xl font-anton tracking-wide text-zinc-900">
                    R$ {precoUnitarioAtual.toFixed(2).replace('.', ',')}
                  </span>
                  {kitSelecionado > 1 && (
                    <span className="text-xs font-mono uppercase font-bold text-zinc-500">/ cada</span>
                  )}
                </div>

                {economiaTotal > 0 && (
                  <span className="bg-zinc-900 text-[#a3e635] font-mono text-[10px] font-bold uppercase px-2.5 py-1 tracking-wider">
                    Economize R$ {economiaTotal.toFixed(2).replace('.', ',')}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-zinc-100 mt-2">
                <p className="text-xs text-zinc-600 font-medium">
                  {kitSelecionado > 1 ? (
                    <>Total do Kit ({kitSelecionado} peças): <strong className="text-black font-bold">R$ {precoTotal.toFixed(2).replace('.', ',')}</strong></>
                  ) : (
                    produto.precoAntigo > produto.preco && (
                      <>De <span className="line-through text-zinc-400">R$ {produto.precoAntigo.toFixed(2).replace('.', ',')}</span></>
                    )
                  )}
                </p>
                <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-wider">
                  até <strong className="text-black">3x R$ {parcela}</strong> s/ juros
                </p>
              </div>
            </div>

            {/* SELETOR DE KITS COM DESTAQUE PARA O MAIS VENDIDO */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-900">1. Escolha o Combo</span>
                {produto.precoKit2 > 0 && (
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-600 bg-zinc-200/60 px-2 py-0.5">
                    Leve mais, pague menos
                  </span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setKitSelecionado(1)}
                  className={`border-2 py-3.5 px-2 flex flex-col items-center justify-center transition-all duration-150 rounded-none active:scale-[0.98] ${
                    kitSelecionado === 1 ? 'border-black bg-black text-white' : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-900'
                  }`}
                >
                  <span className="font-bold text-xs md:text-sm uppercase tracking-wider">1 Peça</span>
                  <span className={`text-[11px] font-mono mt-1 ${kitSelecionado === 1 ? 'text-zinc-300' : 'text-zinc-500'}`}>
                    R$ {produto.preco.toFixed(0)}/un
                  </span>
                </button>

                {produto.precoKit2 > 0 && (
                  <button
                    type="button"
                    onClick={() => setKitSelecionado(2)}
                    className={`border-2 py-3.5 px-2 flex flex-col items-center justify-center transition-all duration-150 rounded-none active:scale-[0.98] ${
                      kitSelecionado === 2 ? 'border-black bg-black text-white' : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-900'
                    }`}
                  >
                    <span className="font-bold text-xs md:text-sm uppercase tracking-wider">Kit 2</span>
                    <span className={`text-[11px] font-mono mt-1 ${kitSelecionado === 2 ? 'text-zinc-300' : 'text-zinc-500'}`}>
                      R$ {produto.precoKit2.toFixed(0)}/un
                    </span>
                  </button>
                )}

                {produto.precoKit3 > 0 && (
                  <button
                    type="button"
                    onClick={() => setKitSelecionado(3)}
                    className={`relative border-2 py-3.5 px-2 flex flex-col items-center justify-center transition-all duration-150 rounded-none active:scale-[0.98] ${
                      kitSelecionado === 3 ? 'border-black bg-black text-white' : 'border-zinc-900 bg-white text-zinc-900 hover:bg-zinc-50'
                    }`}
                  >
                    <span className={`absolute -top-2.5 px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-widest border ${
                      kitSelecionado === 3 ? 'bg-[#a3e635] text-black border-black' : 'bg-black text-white border-black'
                    }`}>
                      Mais Vendido
                    </span>
                    <span className="font-bold text-xs md:text-sm uppercase tracking-wider">Kit 3</span>
                    <span className={`text-[11px] font-mono mt-1 ${kitSelecionado === 3 ? 'text-[#a3e635] font-bold' : 'text-zinc-600'}`}>
                      R$ {produto.precoKit3.toFixed(0)}/un
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* SELETOR DE CORES (ESTILO SWATCH QUADRADO INDUSTRIAL) */}
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-900 mb-3 block">
                2. Cor: <span className="font-mono font-normal text-zinc-600 uppercase">{produto.cor}</span>
              </span>
              <div className="flex flex-wrap gap-2.5">
                {variacoesDaMesmaCategoria.map(variacao => {
                  const selecionado = produto.codigo === variacao.codigo;
                  return (
                    <button
                      key={variacao.codigo}
                      type="button"
                      onClick={() => router.push(`/produto/${variacao.codigo.replace(/-/g, '')}`)}
                      className={`w-9 h-9 md:w-10 md:h-10 rounded-none border transition-all duration-150 active:scale-95 ${
                        selecionado
                          ? 'ring-2 ring-offset-2 ring-black border-black scale-105'
                          : 'border-zinc-300 hover:border-black'
                      } ${coresHex[variacao.cor] || 'bg-zinc-200'}`}
                      title={variacao.cor}
                      aria-label={`Selecionar cor ${variacao.cor}`}
                    />
                  );
                })}
              </div>
            </div>

            {/* SELETOR DE TAMANHOS COM CORTE DIAGONAL NOS ESGOTADOS */}
            <div
              ref={seletorTamanhoRef}
              className={`mb-8 p-3 -mx-3 transition-colors duration-300 ${
                erroTamanho ? 'bg-red-50/80 border border-red-300' : 'border border-transparent'
              }`}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-900">
                  3. Tamanho {tamanhoAtivo && <span className="font-mono text-zinc-500">({tamanhoAtivo})</span>}
                </span>
                <button type="button" className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 hover:text-black underline decoration-zinc-300 underline-offset-4 transition-colors">
                  Guia de Medidas
                </button>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {(['P', 'M', 'G', 'GG', 'XG', 'G1', 'G2'] as Tamanho[]).map(tam => {
                  const qtdDisponivel = produto.estoque[tam] || 0;
                  const esgotado = qtdDisponivel === 0;
                  const ativo = tamanhoAtivo === tam;

                  return (
                    <button
                      key={tam}
                      type="button"
                      disabled={esgotado}
                      onClick={() => {
                        setTamanhoAtivo(tam);
                        setErroTamanho(false);
                      }}
                      className={`relative h-12 md:h-14 border flex items-center justify-center font-bold text-xs md:text-sm transition-all duration-150 rounded-none overflow-hidden ${
                        esgotado
                          ? 'border-zinc-200 text-zinc-300 cursor-not-allowed bg-zinc-100/60 after:content-[""] after:absolute after:w-[150%] after:h-[1px] after:bg-zinc-300 after:-rotate-45'
                          : ativo
                            ? 'border-black bg-black text-white scale-[0.98]'
                            : 'border-zinc-300 bg-white text-zinc-900 hover:border-black active:scale-95'
                      }`}
                    >
                      {tam}
                    </button>
                  );
                })}
              </div>

              {erroTamanho && (
                <p className="text-[11px] font-mono font-bold uppercase text-red-600 mt-2 tracking-wider animate-pulse">
                  ↑ Selecione um tamanho disponível para continuar
                </p>
              )}
            </div>

            {/* BOTÃO COMPRAR DESKTOP */}
            <button
              type="button"
              onClick={handleComprar}
              className={`hidden md:flex w-full h-16 items-center justify-center gap-3 font-bold text-xs uppercase tracking-widest transition-all duration-150 rounded-none active:scale-[0.99] ${
                adicionadoFeedback
                  ? 'bg-[#a3e635] text-black border-2 border-black'
                  : 'bg-black text-white hover:bg-zinc-800'
              }`}
            >
              {adicionadoFeedback ? (
                <>
                  <Check size={18} strokeWidth={3} /> Adicionado ao Setup
                </>
              ) : (
                <>
                  <ShoppingCart size={18} /> Adicionar ao Carrinho — R$ {precoTotal.toFixed(2).replace('.', ',')}
                </>
              )}
            </button>

            {/* TRUST BADGES */}
            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-zinc-200">
              <div className="flex items-center gap-3 text-zinc-700">
                <ShieldCheck size={18} className="text-black shrink-0" />
                <span className="text-[11px] font-bold uppercase tracking-wider">Compra 100% Segura</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-700">
                <Truck size={18} className="text-black shrink-0" />
                <span className="text-[11px] font-bold uppercase tracking-wider">1ª Troca Grátis</span>
              </div>
            </div>
          </div>
        </div>

        {/* ABAS DE INFORMAÇÕES */}
        <div className="mt-16 md:mt-24 pt-8 md:pt-12 border-t border-zinc-200 max-w-4xl">
          <div className="flex gap-8 md:gap-12 border-b border-zinc-200 mb-6 md:mb-8 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            <button onClick={() => setAbaAtiva('descricao')} className={`pb-4 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors border-b-2 ${abaAtiva === 'descricao' ? 'border-black text-black' : 'border-transparent text-zinc-400 hover:text-zinc-700'}`}>
              A Peça
            </button>
            <button onClick={() => setAbaAtiva('tecnica')} className={`pb-4 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors border-b-2 ${abaAtiva === 'tecnica' ? 'border-black text-black' : 'border-transparent text-zinc-400 hover:text-zinc-700'}`}>
              Ficha Técnica
            </button>
            <button onClick={() => setAbaAtiva('lavagem')} className={`pb-4 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors border-b-2 ${abaAtiva === 'lavagem' ? 'border-black text-black' : 'border-transparent text-zinc-400 hover:text-zinc-700'}`}>
              Conservação
            </button>
          </div>
          <div className="text-sm text-zinc-700 leading-relaxed font-medium bg-white p-6 border border-zinc-200">
            {abaAtiva === 'descricao' && <div className="whitespace-pre-line">{formataTexto(produto.descricao)}</div>}
            {abaAtiva === 'tecnica' && <div className="whitespace-pre-line font-mono text-xs leading-loose">{formataTexto(produto.informacoesTecnicas)}</div>}
            {abaAtiva === 'lavagem' && <div className="whitespace-pre-line">{formataTexto(produto.lavagem)}</div>}
          </div>
        </div>

        {/* AVALIAÇÕES */}
        <div id="avaliacoes" className="mt-16 md:mt-24 pt-12 md:pt-16 border-t border-zinc-200 scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-400 block mb-1">Comunidade B.SKW</span>
              <h2 className="text-2xl md:text-4xl font-anton uppercase tracking-wide text-zinc-900">Avaliações de Clientes</h2>
            </div>
            <button
              onClick={() => setModalAvaliacaoAberto(true)}
              className="w-full md:w-auto bg-white border-2 border-black text-black px-6 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white active:scale-[0.98] transition-all rounded-none"
            >
              Escrever Avaliação
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-6 mb-10">
            <div className="md:w-1/3 bg-white p-8 rounded-none border border-zinc-200 text-center flex flex-col items-center justify-center">
              <div className="text-5xl md:text-6xl font-anton text-zinc-900 mb-2">{mediaAvaliacoes}</div>
              <div className="flex mb-3">{renderEstrelas(Number(mediaAvaliacoes), 18)}</div>
              <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-zinc-500">
                {avaliacoes.length === 0 ? "Nenhuma avaliação registrada" : `Baseado em ${avaliacoes.length} review(s)`}
              </p>
            </div>

            {avaliacoes.length === 0 ? (
              <div className="md:w-2/3 border border-zinc-200 rounded-none p-8 flex flex-col items-center justify-center text-center bg-white">
                <MessageSquare className="text-zinc-300 mb-3" size={32} />
                <h3 className="font-bold text-xs text-zinc-900 uppercase tracking-widest mb-1">Seja o primeiro a avaliar este drop</h3>
                <p className="text-xs text-zinc-500 font-medium max-w-md">
                  Compartilhe o caimento e a qualidade da peça para ajudar outros membros da comunidade.
                </p>
              </div>
            ) : (
              <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
                {avaliacoes.map(aval => (
                  <div key={aval.id} className="p-6 border border-zinc-200 rounded-none bg-white flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex">{renderEstrelas(aval.nota, 13)}</div>
                        <span className="text-[11px] font-mono text-zinc-400">{aval.data}</span>
                      </div>
                      <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-900 mb-2">{aval.nome}</h4>
                      <p className="text-xs md:text-sm text-zinc-600 font-medium mb-4 leading-relaxed">"{aval.comentario}"</p>
                      {aval.imagem && (
                        <div className="mt-3 mb-3 rounded-none overflow-hidden border border-zinc-200 w-24 h-24 md:w-28 md:h-28">
                          <img src={aval.imagem} alt="Foto Cliente" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                    <div className="mt-2 flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-700 bg-zinc-100 px-2.5 py-1 w-fit">
                      <ShieldCheck size={12} className="text-black" /> Comprador Verificado
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* CROSS-SELLING: COMPLETA O TEU KIT */}
      {sugestoesInteligentes.length > 0 && (
        <section className="bg-white border-t border-zinc-200 py-12 md:py-20 mt-8">
          <div className="max-w-[1400px] mx-auto px-4 md:px-6">
            <div className="mb-8 md:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-400 block mb-1">Curadoria Essencial</span>
                <h2 className="text-2xl md:text-4xl font-anton uppercase tracking-wide text-zinc-900">Completa o teu Kit</h2>
              </div>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Peças coringas para o teu setup diário</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {sugestoesInteligentes.map(sugestao => (
                <QuickBuyCard key={sugestao.id} tituloGrupo={sugestao.nome} produtosDoGrupo={[sugestao]} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* STICKY BOTTOM BAR INTELIGENTE (EXCLUSIVO MOBILE) */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-zinc-200 z-40 md:hidden shadow-[0_-8px_20px_rgba(0,0,0,0.06)]">
        <div className="flex items-center gap-3">
          <div className="flex flex-col justify-center px-1 min-w-[95px]">
            <span className="text-[10px] font-mono uppercase text-zinc-500">
              {kitSelecionado > 1 ? `Kit ${kitSelecionado} Peças` : '1 Peça'} {tamanhoAtivo ? `• ${tamanhoAtivo}` : ''}
            </span>
            <span className="text-lg font-anton tracking-wide text-zinc-900 leading-tight">
              R$ {precoTotal.toFixed(2).replace('.', ',')}
            </span>
          </div>

          <button
            type="button"
            onClick={handleComprar}
            className={`flex-1 h-12 flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest rounded-none active:scale-[0.98] transition-all ${
              adicionadoFeedback
                ? 'bg-[#a3e635] text-black border border-black'
                : !tamanhoAtivo
                  ? 'bg-zinc-900 text-white'
                  : 'bg-black text-white'
            }`}
          >
            {adicionadoFeedback ? (
              <>
                <Check size={16} strokeWidth={3} /> Adicionado
              </>
            ) : !tamanhoAtivo ? (
              <>Escolher Tamanho</>
            ) : (
              <>
                <ShoppingCart size={15} /> Comprar Agora
              </>
            )}
          </button>
        </div>
      </div>

    </main>
  );
}
