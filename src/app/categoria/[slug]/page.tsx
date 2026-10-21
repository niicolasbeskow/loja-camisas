"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { carregarProdutosStorage, Produto, Tamanho } from '@/data/produtos';
import { SlidersHorizontal, ChevronDown, X, Star, Check } from 'lucide-react';

const coresHex: Record<string, string> = {
  'Preto': 'bg-[#18181b]', 'Branco': 'bg-[#FFFFFF] border-zinc-200', 'Off-White': 'bg-[#F5F5F0] border-zinc-200',
  'Marrom': 'bg-[#4A3728]', 'Areia': 'bg-[#E3DAC9]', 'Cinza': 'bg-[#a1a1aa]', 'Chumbo': 'bg-[#3f3f46]',
  'Azul Marinho': 'bg-[#1e3a8a]', 'Verde Militar': 'bg-[#3f6212]', 'Verde Musgo': 'bg-[#3b4426]',
  'Bordô': 'bg-[#7f1d1d]', 'Rosa Pastel': 'bg-[#f4c2c2]', 'Azul Bebê': 'bg-[#89cff0]',
  'Cinza Envelhecido': 'bg-[#71717a]', 'Preto Estonado': 'bg-[#27272a]', 'Verde Claro': 'bg-[#a3e635]',
  'Roxo': 'bg-[#581c87]', 'Azul Envelhecido': 'bg-[#3b82f6]', 'Azul Estonado': 'bg-[#60a5fa]',
  'Preto Vintage': 'bg-[#27272a]', 'Cinza Escuro': 'bg-[#3f3f46]', 'Cinza Claro': 'bg-[#d4d4d8]',
  'Destroyed': 'bg-[#3f3f46]'
};

export default function CategoriaPage() {
  const params = useParams();
  const rawSlug = typeof params?.slug === 'string' ? params.slug : '';
  
  const [todosProdutos, setTodosProdutos] = useState<Produto[]>([]);
  const [produtosExibidos, setProdutosExibidos] = useState<Produto[]>([]);
  
  const [menuFiltrosAberto, setMenuFiltrosAberto] = useState(false);
  const [menuOrdenarAberto, setMenuOrdenarAberto] = useState(false);
  
  const [coresSelecionadas, setCoresSelecionadas] = useState<string[]>([]);
  const [tamanhosSelecionados, setTamanhosSelecionados] = useState<Tamanho[]>([]);
  const [apenasDisponiveis, setApenasDisponiveis] = useState(false);
  const [ordenacao, setOrdenacao] = useState('recentes');

  useEffect(() => {
    const catalogo = carregarProdutosStorage();
    setTodosProdutos(catalogo.filter(p => p.categoria === rawSlug));
  }, [rawSlug]);

  useEffect(() => {
    let resultado = [...todosProdutos];
    if (coresSelecionadas.length > 0) resultado = resultado.filter(p => coresSelecionadas.includes(p.cor));
    if (tamanhosSelecionados.length > 0) resultado = resultado.filter(p => tamanhosSelecionados.some(t => (p.estoque[t] || 0) > 0));
    if (apenasDisponiveis) resultado = resultado.filter(p => Object.values(p.estoque).some(qtd => (qtd || 0) > 0));

    if (ordenacao === 'menor-preco') resultado.sort((a, b) => a.preco - b.preco);
    if (ordenacao === 'maior-preco') resultado.sort((a, b) => b.preco - a.preco);
    if (ordenacao === 'az') resultado.sort((a, b) => a.nome.localeCompare(b.nome));

    setProdutosExibidos(resultado);
  }, [todosProdutos, coresSelecionadas, tamanhosSelecionados, apenasDisponiveis, ordenacao]);

  const tituloCategoria = rawSlug.replace(/-/g, ' ');
  const coresUnicas = Array.from(new Set(todosProdutos.map(p => p.cor)));
  const tamanhosDisponiveis: Tamanho[] = ['P', 'M', 'G', 'GG', 'XG', 'G1', 'G2'];

  const toggleCor = (cor: string) => setCoresSelecionadas(prev => prev.includes(cor) ? prev.filter(c => c !== cor) : [...prev, cor]);
  const toggleTamanho = (tam: Tamanho) => setTamanhosSelecionados(prev => prev.includes(tam) ? prev.filter(t => t !== tam) : [...prev, tam]);
  const limparFiltros = () => { setCoresSelecionadas([]); setTamanhosSelecionados([]); setApenasDisponiveis(false); };

  const getAvaliacao = (sku: string) => {
    if (typeof window === 'undefined') return { media: 0, total: 0 };
    const avaliacoes = JSON.parse(localStorage.getItem('bskw_avaliacoes') || '[]');
    const doProduto = avaliacoes.filter((a: any) => a.sku.replace(/-/g, '') === sku.replace(/-/g, ''));
    if (doProduto.length === 0) return { media: 0, total: 0 };
    return { media: Number((doProduto.reduce((acc: number, curr: any) => acc + curr.nota, 0) / doProduto.length).toFixed(1)), total: doProduto.length };
  };

  return (
    <main className="min-h-screen bg-white font-outfit pb-24 relative overflow-x-hidden">
      
      {/* OVERLAY E GAVETA DE FILTROS (MOBILE OTIMIZADO) */}
      {menuFiltrosAberto && (
        <div className="fixed inset-0 z-[60] flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-[85vw] max-w-sm h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-5 md:p-6 border-b border-zinc-200 flex justify-between items-center">
              <h3 className="font-anton text-xl md:text-2xl uppercase tracking-wide text-zinc-900">Filtros</h3>
              <button onClick={() => setMenuFiltrosAberto(false)} className="text-zinc-400 hover:text-black"><X size={24} /></button>
            </div>
            
            <div className="p-5 md:p-6 flex-1 overflow-y-auto space-y-6 md:space-y-8">
              <div className="space-y-3 md:space-y-4">
                <h4 className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-zinc-400">Disponibilidade</h4>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 border-2 rounded-sm flex items-center justify-center transition-colors ${apenasDisponiveis ? 'border-black bg-black' : 'border-zinc-300'}`}>
                    {apenasDisponiveis && <Check size={12} className="text-white" />}
                  </div>
                  <span className="text-xs md:text-sm font-bold text-zinc-900 uppercase tracking-widest">Em Estoque</span>
                </label>
              </div>

              <div className="space-y-3 md:space-y-4 pt-4 border-t border-zinc-100">
                <h4 className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-zinc-400">Cores</h4>
                <div className="grid grid-cols-5 md:grid-cols-6 gap-2 md:gap-3">
                  {coresUnicas.map(cor => (
                    <button key={cor} onClick={() => toggleCor(cor)} title={cor} className={`w-9 h-9 md:w-10 md:h-10 rounded-full border-2 transition-all ${coresSelecionadas.includes(cor) ? 'border-black scale-110 ring-2 ring-offset-2 ring-black' : 'border-zinc-200'} ${coresHex[cor] || 'bg-zinc-200'}`} />
                  ))}
                </div>
              </div>

              <div className="space-y-3 md:space-y-4 pt-4 border-t border-zinc-100">
                <h4 className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-zinc-400">Tamanhos</h4>
                <div className="flex flex-wrap gap-2">
                  {tamanhosDisponiveis.map(tam => (
                    <button key={tam} onClick={() => toggleTamanho(tam)} className={`w-10 h-10 md:w-12 md:h-12 border-2 flex items-center justify-center font-bold text-xs md:text-sm transition-all rounded-sm ${tamanhosSelecionados.includes(tam) ? 'border-black bg-black text-white' : 'border-zinc-200 text-zinc-900'}`}>
                      {tam}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 md:p-6 border-t border-zinc-200 flex flex-col gap-2 md:gap-3">
              <button onClick={() => setMenuFiltrosAberto(false)} className="w-full bg-black text-white h-12 md:h-14 text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors rounded-sm">
                Ver {produtosExibidos.length} Produtos
              </button>
              <button onClick={limparFiltros} className="w-full bg-white text-zinc-500 py-3 text-[9px] md:text-[10px] font-bold uppercase tracking-widest hover:text-black transition-colors underline decoration-zinc-300 underline-offset-4">
                Limpar Filtros
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER DA CATEGORIA (MOBILE LADO A LADO) */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 pt-8 md:pt-16 pb-6 md:pb-8">
        <h1 className="text-3xl md:text-5xl font-anton uppercase text-zinc-900 tracking-wide mb-6 md:mb-8 text-center md:text-left">
          {tituloCategoria}
        </h1>

        <div className="grid grid-cols-2 md:flex md:flex-row gap-2 md:gap-4 border-b border-zinc-200 pb-4 md:pb-6">
          <button onClick={() => setMenuFiltrosAberto(true)} className="flex items-center justify-center md:justify-start gap-2 border-2 border-zinc-200 h-12 md:h-14 px-4 md:px-6 rounded-sm font-bold text-[9px] md:text-xs uppercase tracking-widest hover:border-black transition-colors">
            <SlidersHorizontal size={14} /> Filtros
            {(coresSelecionadas.length > 0 || tamanhosSelecionados.length > 0 || apenasDisponiveis) && (
              <span className="bg-amber-500 text-black w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center text-[8px] md:text-[9px] ml-1">!</span>
            )}
          </button>

          <div className="relative">
            <button onClick={() => setMenuOrdenarAberto(!menuOrdenarAberto)} className="w-full flex items-center justify-center md:justify-between gap-2 border-2 border-zinc-200 h-12 md:h-14 px-4 md:px-6 rounded-sm font-bold text-[9px] md:text-xs uppercase tracking-widest hover:border-black transition-colors bg-white md:w-[200px]">
              <span className="truncate">{ordenacao === 'recentes' ? 'Recentes' : ordenacao === 'menor-preco' ? 'Menor Preço' : ordenacao === 'maior-preco' ? 'Maior Preço' : 'Nome A-Z'}</span>
              <ChevronDown size={14} className={`transition-transform ${menuOrdenarAberto ? 'rotate-180' : ''}`} />
            </button>

            {menuOrdenarAberto && (
              <div className="absolute right-0 top-full mt-2 w-full md:w-[200px] bg-white border border-zinc-200 shadow-xl rounded-sm z-20 flex flex-col py-2 animate-in fade-in slide-in-from-top-2">
                {[{ id: 'recentes', label: 'Mais Recentes' }, { id: 'menor-preco', label: 'Menor Preço' }, { id: 'maior-preco', label: 'Maior Preço' }, { id: 'az', label: 'Alfabética' }].map(op => (
                  <button key={op.id} onClick={() => { setOrdenacao(op.id); setMenuOrdenarAberto(false); }} className={`text-left px-4 md:px-6 py-3 text-[9px] md:text-xs font-bold uppercase tracking-widest transition-colors ${ordenacao === op.id ? 'bg-zinc-50 text-amber-600' : 'text-zinc-600 hover:bg-zinc-50 hover:text-black'}`}>
                    {op.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* VITRINE DE PRODUTOS MOBILE OTIMIZADA */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-4 md:mb-6 text-center md:text-left">
          Mostrando {produtosExibidos.length} produtos
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {produtosExibidos.map(produto => {
            const estoqueTotal = Object.values(produto.estoque).reduce((acc, curr) => acc + (curr || 0), 0);
            const esgotado = estoqueTotal === 0;
            const avaliacao = getAvaliacao(produto.codigo);

            return (
              <Link href={`/produto/${produto.codigo.replace(/-/g, '')}`} key={produto.id} className="group block flex flex-col h-full">
                <div className="relative aspect-[4/5] bg-zinc-100/80 rounded-sm overflow-hidden mb-3 border border-zinc-200">
                  {produto.imagens && produto.imagens.length > 0 ? (
                    <img src={produto.imagens[0]} alt={produto.nome} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center opacity-30 bg-zinc-50 p-2">
                      <span className="font-anton text-lg md:text-xl text-zinc-500 uppercase tracking-widest">B.SKW</span>
                      <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest mt-1 text-center hidden md:block">Sem Foto</span>
                    </div>
                  )}

                  <div className="absolute top-2 right-2 md:top-3 md:right-3 flex flex-col gap-1 md:gap-2 items-end">
                    {esgotado && <span className="bg-black text-white px-2 py-1 md:px-3 md:py-1.5 text-[8px] md:text-[9px] font-bold uppercase tracking-widest shadow-sm rounded-sm">Esgotado</span>}
                    {produto.promocao && produto.tag && !esgotado && <span className="bg-red-600 text-white px-2 py-1 md:px-3 md:py-1.5 text-[8px] md:text-[9px] font-bold uppercase tracking-widest shadow-sm rounded-sm">🔥 {produto.tag}</span>}
                  </div>
                </div>

                <div className="flex flex-col items-center text-center px-1 flex-grow">
                  <h3 className="font-bold text-[10px] md:text-sm text-zinc-900 mb-1 md:mb-1.5 uppercase line-clamp-2 md:line-clamp-1 leading-tight">{produto.nome}</h3>
                  
                  <div className="flex items-center gap-1 mb-1.5 md:mb-2">
                    <div className="flex text-amber-500">
                      {Array(5).fill(0).map((_, i) => <Star key={i} size={10} className={i < Math.round(avaliacao.media) ? "fill-amber-500" : "text-zinc-300"} />)}
                    </div>
                    <span className="text-[8px] md:text-[10px] font-bold text-zinc-400">({avaliacao.total})</span>
                  </div>

                  <div className="flex items-center gap-1.5 md:gap-2 mt-auto">
                    {produto.promocao && <span className="text-[10px] md:text-xs text-zinc-400 line-through font-medium">R${produto.precoAntigo.toFixed(0)}</span>}
                    <span className="font-bold text-sm md:text-lg text-zinc-900">R${produto.preco.toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {produtosExibidos.length === 0 && (
          <div className="py-16 md:py-24 flex flex-col items-center justify-center border border-dashed border-zinc-300 rounded-sm bg-zinc-50 mx-2">
            <h3 className="font-anton text-xl md:text-2xl uppercase text-zinc-900 mb-2 text-center">Nenhuma peça encontrada</h3>
            <p className="text-zinc-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 text-center">Tente remover alguns filtros.</p>
            <button onClick={limparFiltros} className="bg-black text-white px-6 py-3 md:px-8 md:py-4 text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors rounded-sm">
              Limpar Filtros
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
