"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { carregarProdutosStorage, produtosIniciais, Produto, Tamanho } from '@/data/produtos';
import { ShoppingCart, Truck, ShieldCheck, Star, MessageSquare, X, Camera } from 'lucide-react';
import QuickBuyCard from '@/components/QuickBuyCard';

const normalizar = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");

interface Avaliacao {
  id: string; sku: string; nome: string; nota: number; comentario: string; data: string; imagem?: string;
}

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
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [modalAvaliacaoAberto, setModalAvaliacaoAberto] = useState(false);
  const [novaAvaliacao, setNovaAvaliacao] = useState({ nome: '', nota: 5, comentario: '', imagem: '' });

  useEffect(() => {
    const produtosSalvos = carregarProdutosStorage();
    setCatalogo(produtosSalvos);
    const avaliacoesSalvas = localStorage.getItem('bskw_avaliacoes');
    if (avaliacoesSalvas) {
      try {
        const todas: Avaliacao[] = JSON.parse(avaliacoesSalvas);
        const paramClean = paramId;
        setAvaliacoes(todas.filter(a => a.sku.replace(/-/g, '').toUpperCase() === paramClean));
      } catch(e) {}
    }
  }, [paramId]);

  const produto = catalogo.find(p => p.codigo.replace(/-/g, '').toUpperCase() === paramId || p.id === rawId || normalizar(p.nome).includes(normalizar(decodeURIComponent(rawId)))) || catalogo[0];

  useEffect(() => {
    if (catalogo.length > 0) {
      const candidatos = catalogo.filter(p => p.id !== produto.id && (p.cor === 'Preto' || p.cor === 'Branco' || p.cor === 'Off-White'));
      setSugestoesInteligentes(shuffleArray(candidatos).slice(0, 4));
    }
  }, [catalogo, produto.id]);

  const [tamanhoAtivo, setTamanhoAtivo] = useState<Tamanho | ''>('');
  const [kitSelecionado, setKitSelecionado] = useState<1 | 2 | 3>(1);
  const [abaAtiva, setAbaAtiva] = useState<'descricao' | 'tecnica' | 'lavagem'>('descricao');

  const precoAtual = kitSelecionado === 3 && produto.precoKit3 ? produto.precoKit3 : kitSelecionado === 2 && produto.precoKit2 ? produto.precoKit2 : produto.preco;
  const precoTotal = precoAtual * kitSelecionado;
  const precoRiscadoTotal = produto.precoAntigo * kitSelecionado;
  const parcela = (precoTotal / 3).toFixed(2).replace('.', ',');
  const variacoesDaMesmaCategoria = catalogo.filter(p => p.categoria === produto.categoria);
  const formataTexto = (txt: string) => txt.replace(/-/g, '•');
  const mediaAvaliacoes = avaliacoes.length > 0 ? (avaliacoes.reduce((acc, curr) => acc + curr.nota, 0) / avaliacoes.length).toFixed(1) : '0.0';

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

  const renderEstrelas = (nota: number, size = 14) => Array(5).fill(0).map((_, i) => <Star key={i} size={size} className={i < nota ? "text-amber-500 fill-amber-500" : "text-zinc-300"} />);

  return (
    // IMPORTANTE: pb-32 no mobile para o conteúdo não ficar por baixo do botão fixo
    <main className="min-h-screen bg-white font-outfit pb-32 md:pb-24">
      
      {modalAvaliacaoAberto && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-sm shadow-2xl relative flex flex-col max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden">
            <button onClick={() => setModalAvaliacaoAberto(false)} className="absolute top-4 right-4 text-zinc-400 hover:text-black z-10 bg-white rounded-full p-1"><X size={24} /></button>
            <div className="p-6 md:p-8 border-b border-zinc-100">
              <h3 className="font-anton text-2xl uppercase tracking-wide text-zinc-900">Deixe a sua opinião</h3>
              <p className="text-zinc-500 text-xs font-medium mt-1">Como foi a sua experiência com a peça <strong className="text-black">{produto.nome}</strong>?</p>
            </div>
            <form onSubmit={salvarAvaliacao} className="p-6 md:p-8 flex flex-col gap-6">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-700 block mb-3">A sua nota</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(estrela => (
                    <button key={estrela} type="button" onClick={() => setNovaAvaliacao({...novaAvaliacao, nota: estrela})} className="focus:outline-none transition-transform hover:scale-110">
                      <Star size={32} className={estrela <= novaAvaliacao.nota ? "text-amber-500 fill-amber-500" : "text-zinc-200"} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-700 block mb-2">O seu nome</label>
                <input type="text" required value={novaAvaliacao.nome} onChange={e => setNovaAvaliacao({...novaAvaliacao, nome: e.target.value})} className="w-full border-2 border-zinc-200 p-3 text-sm focus:border-black outline-none" placeholder="Como quer ser identificado?" />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-700 block mb-2">Comentário sobre a peça</label>
                <textarea required rows={3} value={novaAvaliacao.comentario} onChange={e => setNovaAvaliacao({...novaAvaliacao, comentario: e.target.value})} className="w-full border-2 border-zinc-200 p-3 text-sm focus:border-black outline-none resize-none" placeholder="Fale sobre o caimento, a qualidade do tecido..." ></textarea>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-700 block mb-2">Adicionar Foto (Opcional)</label>
                {novaAvaliacao.imagem ? (
                  <div className="relative w-32 h-32 rounded-sm border border-zinc-200 overflow-hidden group">
                    <img src={novaAvaliacao.imagem} alt="Preview" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => setNovaAvaliacao({...novaAvaliacao, imagem: ''})} className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><X size={24} /></button>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-zinc-300 rounded-sm p-6 flex flex-col items-center justify-center bg-zinc-50 hover:bg-zinc-100 cursor-pointer group">
                    <Camera size={24} className="text-zinc-400 group-hover:text-black mb-2" />
                    <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest text-center">Tirar foto ou escolher</p>
                    <input type="file" accept="image/*" onChange={handleFotoAvaliacao} className="hidden" />
                  </label>
                )}
              </div>
              <button type="submit" className="w-full bg-black text-white h-14 mt-2 font-bold text-xs uppercase tracking-widest hover:bg-zinc-800 transition-colors">Publicar Avaliação</button>
            </form>
          </div>
        </div>
      )}

      <div className="bg-zinc-50 border-b border-zinc-200 hidden md:block">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-4 flex justify-between items-center text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-400">
          <div className="flex gap-2">
            <Link href="/" className="hover:text-black transition-colors">Home</Link><span>/</span>
            <Link href={`/categoria/${produto.categoria}`} className="hover:text-black transition-colors">{produto.categoria.replace(/-/g, ' ')}</Link><span>/</span>
            <span className="text-black">{produto.nome}</span>
          </div>
          <span className="font-mono text-zinc-400 hidden sm:inline">SKU: {produto.codigo.replace(/-/g, '')}</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-6 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20">
          
          <div className="relative aspect-[4/5] bg-zinc-100/80 rounded-sm overflow-hidden flex items-center justify-center border border-zinc-200 w-full">
            {produto.imagens && produto.imagens.length > 0 ? (
               <img src={produto.imagens[0]} alt={produto.nome} className="absolute inset-0 w-full h-full object-cover object-center" />
            ) : (
               <div className="flex flex-col items-center opacity-30">
                 <span className="text-zinc-500 font-anton text-2xl uppercase tracking-widest">B.SKW</span>
                 <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-2">Aguardando Foto Oficial</span>
               </div>
            )}
            {produto.tags && produto.tags.length > 0 && (
              <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                {produto.tags.map(tag => <span key={tag} className="bg-black text-white px-3 py-1.5 md:px-4 md:py-2 text-[9px] md:text-[10px] font-bold uppercase tracking-widest shadow-md border border-zinc-800">{tag}</span>)}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 mb-2 block">CÓD: {produto.codigo.replace(/-/g, '')}</span>
            <h1 className="text-3xl md:text-5xl font-anton uppercase text-zinc-900 tracking-wide mb-3 md:mb-4 leading-none">{produto.nome}</h1>
            
            <div className="flex items-center gap-2 mb-6 md:mb-8">
              <div className="flex text-zinc-900">{renderEstrelas(Number(mediaAvaliacoes), 14)}</div>
              <a href="#avaliacoes" className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-black underline decoration-zinc-300 underline-offset-4">
                ({avaliacoes.length}) Avaliações
              </a>
            </div>

            <div className="mb-6 md:mb-8 p-4 md:p-6 bg-zinc-50 border border-zinc-200 rounded-sm">
              <div className="flex flex-col mb-1 md:mb-2">
                {produto.precoAntigo > 0 && <span className="text-sm md:text-lg text-zinc-400 line-through font-medium mb-0.5">R$ {precoRiscadoTotal.toFixed(2).replace('.', ',')}</span>}
                <span className="text-3xl md:text-4xl font-anton tracking-wide text-zinc-900">R$ {precoTotal.toFixed(2).replace('.', ',')}</span>
              </div>
              <p className="text-[10px] md:text-xs text-zinc-600 font-bold uppercase tracking-widest mt-1 md:mt-2">em até <strong className="text-black">3x de R$ {parcela}</strong> s/ juros</p>
            </div>

            <div className="mb-6 md:mb-8">
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-zinc-500 block border-l-2 border-black pl-3">{produto.especificacaoTecnica}</span>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-end mb-3">
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-900">Quantidade / Kits</span>
                {produto.precoKit2 > 0 && <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-green-600 bg-green-50 px-2 py-1 border border-green-200">Desconto Progressivo</span>}
              </div>
              {/* LAYOUT KITS MOBILE: Grelha compacta */}
              <div className="grid grid-cols-3 gap-2 md:gap-3">
                <button onClick={() => setKitSelecionado(1)} className={`border-2 py-3 md:py-4 flex flex-col items-center justify-center transition-all rounded-sm ${kitSelecionado === 1 ? 'border-black bg-black text-white' : 'border-zinc-200 text-zinc-600 hover:border-black'}`}>
                  <span className="font-bold text-xs md:text-sm whitespace-nowrap">1 un</span>
                  <span className={`text-[8px] md:text-[10px] mt-1 font-medium ${kitSelecionado === 1 ? 'text-zinc-300' : 'text-zinc-400'}`}>R${produto.preco.toFixed(0)}/un</span>
                </button>
                {produto.precoKit2 > 0 && (
                  <button onClick={() => setKitSelecionado(2)} className={`border-2 py-3 md:py-4 flex flex-col items-center justify-center transition-all rounded-sm ${kitSelecionado === 2 ? 'border-black bg-black text-white' : 'border-zinc-200 text-zinc-600 hover:border-black'}`}>
                    <span className="font-bold text-xs md:text-sm whitespace-nowrap">Kit 2</span>
                    <span className={`text-[8px] md:text-[10px] mt-1 font-medium ${kitSelecionado === 2 ? 'text-zinc-300' : 'text-zinc-400'}`}>R${produto.precoKit2.toFixed(0)}/un</span>
                  </button>
                )}
                {produto.precoKit3 > 0 && (
                  <button onClick={() => setKitSelecionado(3)} className={`border-2 py-3 md:py-4 flex flex-col items-center justify-center transition-all rounded-sm ${kitSelecionado === 3 ? 'border-black bg-black text-white' : 'border-zinc-200 text-zinc-600 hover:border-black'}`}>
                    <span className="font-bold text-xs md:text-sm whitespace-nowrap">Kit 3</span>
                    <span className={`text-[8px] md:text-[10px] mt-1 font-medium ${kitSelecionado === 3 ? 'text-zinc-300' : 'text-zinc-400'}`}>R${produto.precoKit3.toFixed(0)}/un</span>
                  </button>
                )}
              </div>
            </div>

            <div className="mb-8">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-900 mb-3 block">Cor: <span className="font-medium text-zinc-600">{produto.cor}</span></span>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {variacoesDaMesmaCategoria.map(variacao => (
                  <button key={variacao.codigo} onClick={() => router.push(`/produto/${variacao.codigo.replace(/-/g, '')}`)} className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 transition-all shadow-sm ${produto.codigo === variacao.codigo ? 'border-black scale-110 ring-2 ring-offset-2 ring-black' : 'border-zinc-300 hover:scale-105'} ${coresHex[variacao.cor] || 'bg-zinc-200'}`} title={variacao.cor} />
                ))}
              </div>
            </div>

            <div className="mb-8 md:mb-10">
              <div className="flex justify-between items-end mb-3">
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-900">Tamanho</span>
                <button className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-black underline decoration-zinc-300 underline-offset-4">Guia de Medidas</button>
              </div>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {(['P', 'M', 'G', 'GG', 'XG', 'G1', 'G2'] as Tamanho[]).map(tam => {
                  const qtdDisponivel = produto.estoque[tam] || 0;
                  const esgotado = qtdDisponivel === 0;
                  return (
                    <button key={tam} disabled={esgotado} onClick={() => setTamanhoAtivo(tam)} className={`w-12 h-12 md:w-14 md:h-14 border-2 flex items-center justify-center font-bold text-sm transition-all rounded-sm ${esgotado ? 'border-zinc-100 text-zinc-300 cursor-not-allowed bg-zinc-50' : tamanhoAtivo === tam ? 'border-black bg-black text-white' : 'border-zinc-200 text-zinc-900 hover:border-black'}`}>
                      {tam}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* BOTÃO COMPRAR DESKTOP */}
            <button className="hidden md:flex w-full bg-black text-white h-16 items-center justify-center gap-3 font-bold text-sm uppercase tracking-widest hover:bg-amber-500 hover:text-black transition-colors rounded-sm shadow-xl shadow-black/10">
              <ShoppingCart size={18} /> Adicionar ao Carrinho
            </button>

            <div className="grid grid-cols-2 gap-4 mt-6 md:mt-8 pt-6 md:pt-8 border-t border-zinc-200">
              <div className="flex items-center gap-2 md:gap-3 text-zinc-600">
                <ShieldCheck size={18} className="text-black" />
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest">Compra 100% Segura</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3 text-zinc-600">
                <Truck size={18} className="text-black" />
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest">Troca Facilitada</span>
              </div>
            </div>
          </div>
        </div>

        {/* ABAS */}
        <div className="mt-16 md:mt-24 pt-8 md:pt-12 border-t border-zinc-200 max-w-4xl">
          <div className="flex gap-6 md:gap-12 border-b border-zinc-200 mb-6 md:mb-8 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            <button onClick={() => setAbaAtiva('descricao')} className={`pb-4 text-[10px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors border-b-2 ${abaAtiva === 'descricao' ? 'border-black text-black' : 'border-transparent text-zinc-400'}`}>A Peça</button>
            <button onClick={() => setAbaAtiva('tecnica')} className={`pb-4 text-[10px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors border-b-2 ${abaAtiva === 'tecnica' ? 'border-black text-black' : 'border-transparent text-zinc-400'}`}>Info Técnica</button>
            <button onClick={() => setAbaAtiva('lavagem')} className={`pb-4 text-[10px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors border-b-2 ${abaAtiva === 'lavagem' ? 'border-black text-black' : 'border-transparent text-zinc-400'}`}>Cuidados</button>
          </div>
          <div className="text-xs md:text-sm text-zinc-600 leading-relaxed font-medium">
            {abaAtiva === 'descricao' && <div className="whitespace-pre-line">{formataTexto(produto.descricao)}</div>}
            {abaAtiva === 'tecnica' && <div className="whitespace-pre-line">{formataTexto(produto.informacoesTecnicas)}</div>}
            {abaAtiva === 'lavagem' && <div className="whitespace-pre-line">{formataTexto(produto.lavagem)}</div>}
          </div>
        </div>

        {/* AVALIAÇÕES */}
        <div id="avaliacoes" className="mt-16 md:mt-24 pt-12 md:pt-16 border-t border-zinc-200 scroll-mt-20">
          <h2 className="text-2xl md:text-4xl font-anton uppercase tracking-wide text-zinc-900 mb-6 md:mb-8">Avaliações</h2>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-8 md:mb-12">
            <div className="md:w-1/3 bg-zinc-50 p-6 md:p-8 rounded-sm border border-zinc-200 text-center flex flex-col items-center justify-center">
              <div className="text-5xl md:text-6xl font-anton text-zinc-900 mb-2">{mediaAvaliacoes}</div>
              <div className="flex text-zinc-300 mb-3">{renderEstrelas(Number(mediaAvaliacoes), 18)}</div>
              <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-zinc-500">{avaliacoes.length === 0 ? "Nenhuma avaliação" : `${avaliacoes.length} avaliação(ões)`}</p>
            </div>
            <div className="md:w-2/3 border border-zinc-200 rounded-sm p-6 md:p-8 flex flex-col items-center justify-center text-center bg-white min-h-[180px]">
              <MessageSquare className="text-zinc-200 mb-3 md:mb-4" size={32} />
              <h3 className="font-bold text-xs md:text-sm text-zinc-900 uppercase tracking-widest mb-2">{avaliacoes.length === 0 ? "Seja o primeiro a avaliar" : "Deixe a sua opinião"}</h3>
              <p className="text-xs md:text-sm text-zinc-500 font-medium mb-4 md:mb-6">Compre esta peça e deixe a sua opinião para ajudar outros clientes.</p>
              <button onClick={() => setModalAvaliacaoAberto(true)} className="w-full md:w-auto border-2 border-black text-black px-6 py-3 text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                Escrever Avaliação
              </button>
            </div>
          </div>
          {avaliacoes.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {avaliacoes.map(aval => (
                <div key={aval.id} className="p-5 md:p-6 border border-zinc-200 rounded-sm bg-white flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-3 md:mb-4">
                      <div className="flex text-zinc-300">{renderEstrelas(aval.nota, 12)}</div>
                      <span className="text-[9px] md:text-[10px] font-bold text-zinc-400">{aval.data}</span>
                    </div>
                    <h4 className="font-bold text-xs md:text-sm text-zinc-900 mb-2">{aval.nome}</h4>
                    <p className="text-xs md:text-sm text-zinc-600 font-medium mb-4">"{aval.comentario}"</p>
                    {aval.imagem && (
                      <div className="mt-3 mb-3 rounded-sm overflow-hidden border border-zinc-200 w-24 h-24 md:w-32 md:h-32 cursor-pointer">
                        <img src={aval.imagem} alt="Foto Cliente" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-green-600 bg-green-50 px-2 py-1 w-fit rounded-sm">
                    <ShieldCheck size={10} /> Comprador Verificado
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {sugestoesInteligentes.length > 0 && (
        <section className="bg-zinc-50 border-t border-zinc-200 py-12 md:py-24 mt-8 md:mt-12">
          <div className="max-w-[1400px] mx-auto px-4 md:px-6">
            <div className="mb-8 md:mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl md:text-4xl font-anton uppercase tracking-wide text-zinc-900">Completa o teu Kit</h2>
                <p className="text-zinc-500 text-[10px] md:text-xs mt-1 md:mt-2 font-bold uppercase tracking-widest">Peças coringas para o teu setup</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {sugestoesInteligentes.map(sugestao => (
                <QuickBuyCard key={sugestao.id} tituloGrupo={sugestao.nome} produtosDoGrupo={[sugestao]} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BOTÃO FIXO (STICKY BOTTOM BAR) EXCLUSIVO PARA MOBILE */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white border-t border-zinc-200 z-40 md:hidden shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <button className="w-full bg-black text-white h-12 flex items-center justify-center gap-2 font-bold text-[11px] uppercase tracking-widest rounded-sm active:bg-zinc-800 transition-colors">
          <ShoppingCart size={14} /> Adicionar <span className="font-medium opacity-80">(R$ {precoTotal.toFixed(0)})</span>
        </button>
      </div>

    </main>
  );
}
