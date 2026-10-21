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
  
  // ESTADOS DA UI (Filtros e Ordenação)
  const [menuFiltrosAberto, setMenuFiltrosAberto] = useState(false);
  const [menuOrdenarAberto, setMenuOrdenarAberto] = useState(false);
  
  // ESTADOS DOS FILTROS
  const [coresSelecionadas, setCoresSelecionadas] = useState<string[]>([]);
  const [tamanhosSelecionados, setTamanhosSelecionados] = useState<Tamanho[]>([]);
  const [apenasDisponiveis, setApenasDisponiveis] = useState(false);
  const [ordenacao, setOrdenacao] = useState('recentes');

  useEffect(() => {
    const catalogo = carregarProdutosStorage();
    const produtosDaCategoria = catalogo.filter(p => p.categoria === rawSlug);
    setTodosProdutos(produtosDaCategoria);
  }, [rawSlug]);

  useEffect(() => {
    let resultado = [...todosProdutos];

    // 1. Filtrar por Cores
    if (coresSelecionadas.length > 0) {
      resultado = resultado.filter(p => coresSelecionadas.includes(p.cor));
    }

    // 2. Filtrar por Tamanho (A peça tem de ter estoque > 0 no tamanho selecionado)
    if (tamanhosSelecionados.length > 0) {
      resultado = resultado.filter(p => tamanhosSelecionados.some(t => (p.estoque[t] || 0) > 0));
    }

    // 3. Filtrar Disponibilidade
    if (apenasDisponiveis) {
      resultado = resultado.filter(p => Object.values(p.estoque).some(qtd => (qtd || 0) > 0));
    }

    // 4. Ordenar
    if (ordenacao === 'menor-preco') resultado.sort((a, b) => a.preco - b.preco);
    if (ordenacao === 'maior-preco') resultado.sort((a, b) => b.preco - a.preco);
    if (ordenacao === 'az') resultado.sort((a, b) => a.nome.localeCompare(b.nome));

    setProdutosExibidos(resultado);
  }, [todosProdutos, coresSelecionadas, tamanhosSelecionados, apenasDisponiveis, ordenacao]);

  const tituloCategoria = rawSlug.replace(/-/g, ' ');

  // Extrair cores únicas disponíveis nesta categoria para o menu de filtros
  const coresUnicas = Array.from(new Set(todosProdutos.map(p => p.cor)));
  const tamanhosDisponiveis: Tamanho[] = ['P', 'M', 'G', 'GG', 'XG', 'G1', 'G2'];

  const toggleCor = (cor: string) => {
    setCoresSelecionadas(prev => prev.includes(cor) ? prev.filter(c => c !== cor) : [...prev, cor]);
  };

  const toggleTamanho = (tam: Tamanho) => {
    setTamanhosSelecionados(prev => prev.includes(tam) ? prev.filter(t => t !== tam) : [...prev, tam]);
  };

  const limparFiltros = () => {
    setCoresSelecionadas([]);
    setTamanhosSelecionados([]);
    setApenasDisponiveis(false);
  };

  // Função para pegar a avaliação real da peça no LocalStorage
  const getAvaliacao = (sku: string) => {
    if (typeof window === 'undefined') return { media: 0, total: 0 };
    const avaliacoes = JSON.parse(localStorage.getItem('bskw_avaliacoes') || '[]');
    const doProduto = avaliacoes.filter((a: any) => a.sku.replace(/-/g, '') === sku.replace(/-/g, ''));
    if (doProduto.length === 0) return { media: 0, total: 0 };
    const media = doProduto.reduce((acc: number, curr: any) => acc + curr.nota, 0) / doProduto.length;
    return { media: Number(media.toFixed(1)), total: doProduto.length };
  };

  return (
    <main className="min-h-screen bg-white font-outfit pb-24 relative">
      
      {/* OVERLAY E GAVETA DE FILTROS */}
      {menuFiltrosAberto && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-sm h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-zinc-200 flex justify-between items-center">
              <h3 className="font-anton text-2xl uppercase tracking-wide text-zinc-900">Filtros</h3>
              <button onClick={() => setMenuFiltrosAberto(false)} className="text-zinc-400 hover:text-black transition-colors"><X size={24} /></button>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto space-y-8">
              {/* DISPONIBILIDADE */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Disponibilidade</h4>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 border-2 rounded-sm flex items-center justify-center transition-colors ${apenasDisponiveis ? 'border-black bg-black' : 'border-zinc-300 group-hover:border-black'}`}>
                    {apenasDisponiveis && <Check size={12} className="text-white" />}
                  </div>
                  <span className="text-sm font-bold text-zinc-900 uppercase tracking-widest">Apenas em Estoque</span>
                </label>
              </div>

              {/* CORES */}
              <div className="space-y-4 pt-4 border-t border-zinc-100">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Cores Disponíveis</h4>
                <div className="grid grid-cols-5 gap-3">
                  {coresUnicas.map(cor => (
                    <button 
                      key={cor} 
                      onClick={() => toggleCor(cor)}
                      title={cor}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${coresSelecionadas.includes(cor) ? 'border-black scale-110 ring-2 ring-offset-2 ring-black' : 'border-zinc-200 hover:scale-105'} ${coresHex[cor] || 'bg-zinc-200'}`}
                    />
                  ))}
                </div>
              </div>

              {/* TAMANHOS */}
              <div className="space-y-4 pt-4 border-t border-zinc-100">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Tamanhos</h4>
                <div className="flex flex-wrap gap-2">
                  {tamanhosDisponiveis.map(tam => (
                    <button 
                      key={tam} 
                      onClick={() => toggleTamanho(tam)}
                      className={`w-12 h-12 border-2 flex items-center justify-center font-bold text-sm transition-all rounded-sm ${tamanhosSelecionados.includes(tam) ? 'border-black bg-black text-white' : 'border-zinc-200 text-zinc-900 hover:border-black'}`}
                    >
                      {tam}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-zinc-200 flex flex-col gap-3">
              <button onClick={() => setMenuFiltrosAberto(false)} className="w-full bg-black text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors">
                Ver {produtosExibidos.length} Produtos
              </button>
              <button onClick={limparFiltros} className="w-full bg-white text-zinc-500 py-3 text-[10px] font-bold uppercase tracking-widest hover:text-black transition-colors underline underline-offset-4 decoration-zinc-300">
                Limpar Filtros
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER DA CATEGORIA */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 pt-12 md:pt-16 pb-8">
        <h1 className="text-4xl md:text-5xl font-anton uppercase text-zinc-900 tracking-wide mb-8">
          {tituloCategoria}
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-200 pb-6">
          <button 
            onClick={() => setMenuFiltrosAberto(true)}
            className="flex items-center gap-2 border-2 border-zinc-200 px-6 py-3 rounded-sm font-bold text-xs uppercase tracking-widest hover:border-black transition-colors"
          >
            <SlidersHorizontal size={14} /> 
            Mostrar Filtros
            {(coresSelecionadas.length > 0 || tamanhosSelecionados.length > 0 || apenasDisponiveis) && (
              <span className="bg-amber-500 text-black w-5 h-5 rounded-full flex items-center justify-center text-[9px] ml-1">!</span>
            )}
          </button>

          <div className="relative">
            <button 
              onClick={() => setMenuOrdenarAberto(!menuOrdenarAberto)}
              className="flex items-center gap-2 border-2 border-zinc-200 px-6 py-3 rounded-sm font-bold text-xs uppercase tracking-widest hover:border-black transition-colors bg-white w-[200px] justify-between"
            >
              {ordenacao === 'recentes' ? 'Recentes' : ordenacao === 'menor-preco' ? 'Menor Preço' : ordenacao === 'maior-preco' ? 'Maior Preço' : 'Nome A-Z'}
              <ChevronDown size={14} className={`transition-transform ${menuOrdenarAberto ? 'rotate-180' : ''}`} />
            </button>

            {menuOrdenarAberto && (
              <div className="absolute top-full mt-2 w-[200px] bg-white border border-zinc-200 shadow-xl rounded-sm z-20 flex flex-col py-2 animate-in fade-in slide-in-from-top-2">
                {[
                  { id: 'recentes', label: 'Mais Recentes' },
                  { id: 'menor-preco', label: 'Menor Preço' },
                  { id: 'maior-preco', label: 'Maior Preço' },
                  { id: 'az', label: 'Ordem Alfabética' }
                ].map(op => (
                  <button 
                    key={op.id}
                    onClick={() => { setOrdenacao(op.id); setMenuOrdenarAberto(false); }}
                    className={`text-left px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${ordenacao === op.id ? 'bg-zinc-50 text-amber-600' : 'text-zinc-600 hover:bg-zinc-50 hover:text-black'}`}
                  >
                    {op.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* VITRINE DE PRODUTOS */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-6">
          Mostrando {produtosExibidos.length} produtos
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {produtosExibidos.map(produto => {
            const estoqueTotal = Object.values(produto.estoque).reduce((acc, curr) => acc + (curr || 0), 0);
            const esgotado = estoqueTotal === 0;
            const avaliacao = getAvaliacao(produto.codigo);

            return (
              <Link href={`/produto/${produto.codigo.replace(/-/g, '')}`} key={produto.id} className="group block">
                <div className="relative aspect-[4/5] bg-zinc-100 rounded-sm overflow-hidden mb-4 border border-zinc-200">
                  {produto.imagens && produto.imagens.length > 0 ? (
                    <img src={produto.imagens[0]} alt={produto.nome} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-400 text-xs font-bold uppercase tracking-widest bg-zinc-50">
                      Aguardando Foto
                    </div>
                  )}

                  {/* LABELS SUPERIORES */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
                    {esgotado && (
                      <span className="bg-black text-white px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest shadow-sm">
                        Esgotado
                      </span>
                    )}
                    {produto.promocao && produto.tag && !esgotado && (
                      <span className="bg-red-600 text-white px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest shadow-sm flex items-center gap-1">
                        🔥 {produto.tag}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-center text-center px-2">
                  <h3 className="font-bold text-sm md:text-base text-zinc-900 mb-1 uppercase line-clamp-1">{produto.nome}</h3>
                  
                  {/* ESTRELAS REAIS */}
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-amber-500">
                      {Array(5).fill(0).map((_, i) => (
                        <Star key={i} size={12} className={i < Math.round(avaliacao.media) ? "fill-amber-500" : "text-zinc-300"} />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-zinc-400">({avaliacao.total})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {produto.promocao && (
                      <span className="text-xs text-zinc-400 line-through font-medium">R$ {produto.precoAntigo.toFixed(2).replace('.', ',')}</span>
                    )}
                    <span className="font-bold text-lg text-zinc-900">R$ {produto.preco.toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {produtosExibidos.length === 0 && (
          <div className="py-24 flex flex-col items-center justify-center border border-dashed border-zinc-300 rounded-sm bg-zinc-50">
            <h3 className="font-anton text-2xl uppercase text-zinc-900 mb-2">Nenhuma peça encontrada</h3>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-6">Tente remover alguns filtros para ver mais resultados.</p>
            <button onClick={limparFiltros} className="bg-black text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors">
              Limpar Filtros
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
