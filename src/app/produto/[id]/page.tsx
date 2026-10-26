"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { carregarProdutosStorage, produtosIniciais, Produto, Tamanho } from '@/data/produtos';
import { ShoppingCart, Truck, ShieldCheck, Star, MessageSquare, X, Camera, Check, Ruler } from 'lucide-react';
import QuickBuyCard from '@/components/QuickBuyCard';
import SizeGuideModal from '@/components/SizeGuideModal';

const normalizar = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");

interface Avaliacao {
  id: string; sku: string; nome: string; nota: number; comentario: string; data: string; imagem?: string;
}

const coresHex: Record<string, string> = {
  'Preto': 'bg-[#000000]', 'Branco': 'bg-[#FFFFFF]', 'Off-White': 'bg-[#F5F5F0]',
  'Marrom': 'bg-[#4A3728]', 'Areia': 'bg-[#E3DAC9]', 'Cinza': 'bg-[#9A9A9A]', 'Chumbo': 'bg-[#3f3f46]',
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
  const [guiaMedidasAberto, setGuiaMedidasAberto] = useState(false);
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

  const precoUnitarioAtual = kitSelecionado === 3 && produto.precoKit3 ? produto.precoKit3 : kitSelecionado === 2 && produto.precoKit2 ? produto.precoKit2 : produto.preco;
  const precoTotal = precoUnitarioAtual * kitSelecionado;
  const precoBaseComparacao = (produto.precoAntigo > produto.preco ? produto.precoAntigo : produto.preco) * kitSelecionado;
  const economiaTotal = precoBaseComparacao - precoTotal;
  const parcela = (precoTotal / 3).toFixed(2).replace('.', ',');

  const variacoesDaMesmaCategoria = catalogo.filter(p => p.categoria === produto.categoria);
  const specsPills = produto.especificacaoTecnica ? produto.especificacaoTecnica.split('•').map(s => s.trim()) : [];
  const formataTexto = (txt: string) => txt.replace(/-/g, '·');
  const mediaAvaliacoes = avaliacoes.length > 0 ? (avaliacoes.reduce((acc, curr) => acc + curr.nota, 0) / avaliacoes.length).toFixed(1) : '5.0';

  const handleComprar = () => {
    if (!tamanhoAtivo) {
      setErroTamanho(true);
      seletorTamanhoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => setErroTamanho(false), 2500);
      return;
    }

    try {
      const carrinhoAtual = JSON.parse(localStorage.getItem('bskw_carrinho') || '[]');
      carrinhoAtual.push({
        sku: produto.codigo,
        nome: produto.nome,
        preco: precoUnitarioAtual,
        tamanho: tamanhoAtivo,
        cor: produto.cor,
        quantidade: kitSelecionado,
        imagem: produto.imagens?.[0] || ''
      });
      localStorage.setItem('bskw_carrinho', JSON.stringify(carrinhoAtual));
      window.dispatchEvent(new Event('storage'));
    } catch (err) {}

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
    <Star key={i} size={size} className={i < nota ? "text-[#F59E0B] fill-[#F59E0B]" : "text-[#2a2a2a]"} />
  ));

  return (
    <main className="min-h-screen bg-[#000000] text-white font-outfit pb-36 md:pb-24">
      
      <SizeGuideModal
        aberto={guiaMedidasAberto}
        aoFechar={() => setGuiaMedidasAberto(false)}
        categoriaAtual={produto.categoria}
        aoSelecionarTamanho={(tam) => {
          setTamanhoAtivo(tam);
          setErroTamanho(false);
        }}
      />

      {modalAvaliacaoAberto && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#000000]/85 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-[#161616] w-full max-w-lg rounded-none border border-[#2a2a2a] shadow-2xl relative flex flex-col max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden">
            <button onClick={() => setModalAvaliacaoAberto(false)} className="absolute top-5 right-5 text-[#9A9A9A] hover:text-white z-10 p-1.5 transition-colors">
              <X size={24} />
            </button>
            <div className="p-6 md:p-8 border-b border-[#2a2a2a] bg-[#000000]">
              <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#F59E0B] block mb-2">
                Registro de Cliente
              </span>
              <h3 className="font-anton text-[28px] leading-[32px] uppercase text-white">
                Avaliar Armadura
              </h3>
              <p className="text-[#9A9A9A] text-[13px] mt-1">{produto.nome}</p>
            </div>
            <form onSubmit={salvarAvaliacao} className="p-6 md:p-8 flex flex-col gap-6">
              <div>
                <label className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#9A9A9A] block mb-3">
                  Sua Nota
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(estrela => (
                    <button key={estrela} type="button" onClick={() => setNovaAvaliacao({ ...novaAvaliacao, nota: estrela })} className="focus:outline-none transition-transform active:scale-90 hover:scale-110">
                      <Star size={30} className={estrela <= novaAvaliacao.nota ? "text-[#F59E0B] fill-[#F59E0B]" : "text-[#2a2a2a]"} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#9A9A9A] block mb-2">
                  Seu Nome
                </label>
                <input
                  type="text"
                  required
                  value={novaAvaliacao.nome}
                  onChange={e => setNovaAvaliacao({ ...novaAvaliacao, nome: e.target.value })}
                  className="w-full bg-[#000000] border border-[#2a2a2a] text-white rounded-none p-3.5 text-base md:text-sm focus:border-[#F59E0B] outline-none placeholder:text-[#9A9A9A]"
                  placeholder="Como quer ser identificado?"
                />
              </div>
              <div>
                <label className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#9A9A9A] block mb-2">
                  Relato sobre o tecido e caimento
                </label>
                <textarea
                  required
                  rows={3}
                  value={novaAvaliacao.comentario}
                  onChange={e => setNovaAvaliacao({ ...novaAvaliacao, comentario: e.target.value })}
                  className="w-full bg-[#000000] border border-[#2a2a2a] text-white rounded-none p-3.5 text-base md:text-sm focus:border-[#F59E0B] outline-none resize-none placeholder:text-[#9A9A9A]"
                  placeholder="Fale sobre o peso do tecido, a gola canelada de 3 cm..."
                />
              </div>
              <div>
                <label className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#9A9A9A] block mb-2">
                  Foto da Peça (Opcional)
                </label>
                {novaAvaliacao.imagem ? (
                  <div className="relative w-32 h-32 rounded-none border border-[#2a2a2a] overflow-hidden group">
                    <img src={novaAvaliacao.imagem} alt="Preview" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => setNovaAvaliacao({ ...novaAvaliacao, imagem: '' })} className="absolute inset-0 bg-[#000000]/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <X size={24} />
                    </button>
                  </div>
                ) : (
                  <label className="border border-dashed border-[#555555] rounded-none p-6 flex flex-col items-center justify-center bg-[#0d0d0d] hover:border-[#F59E0B] transition-colors cursor-pointer group">
                    <Camera size={24} className="text-[#9A9A9A] group-hover:text-[#F59E0B] mb-2 transition-colors" />
                    <p className="text-[#9A9A9A] text-[12px] font-semibold uppercase tracking-[0.2em] text-center">
                      Anexar registro fotográfico
                    </p>
                    <input type="file" accept="image/*" onChange={handleFotoAvaliacao} className="hidden" />
                  </label>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-[#F59E0B] text-[#000000] h-14 mt-2 font-semibold text-[13px] uppercase tracking-[0.08em] hover:brightness-110 active:scale-[0.98] transition-all rounded-none"
              >
                Publicar Avaliação
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="bg-[#161616] border-b border-[#2a2a2a] hidden md:block">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-3.5 flex justify-between items-center text-[12px] font-semibold uppercase tracking-[0.2em] text-[#9A9A9A]">
          <div className="flex gap-2.5 items-center">
            <Link href="/" className="hover:text-white transition-colors">B.SKW</Link>
            <span>·</span>
            <Link href={`/categoria/${produto.categoria}`} className="hover:text-white transition-colors">
              {produto.categoria.replace(/-/g, ' ')}
            </Link>
            <span>·</span>
            <span className="text-white">{produto.nome}</span>
          </div>
          <span className="text-[#9A9A9A]">REF · {produto.codigo.replace(/-/g, '')}</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          <div className="lg:col-span-7 lg:sticky lg:top-28">
            <div
              className="relative aspect-[4/5] rounded-none overflow-hidden flex items-center justify-center border border-[#2a2a2a] w-full"
              style={{
                backgroundColor: '#000000',
                backgroundImage: 'repeating-linear-gradient(90deg, #1c1c1c 0 3px, transparent 3px 9px)'
              }}
            >
              {produto.imagens && produto.imagens.length > 0 ? (
                <img src={produto.imagens[0]} alt={produto.nome} className="absolute inset-0 w-full h-full object-cover object-center" />
              ) : (
                <div className="bg-[#0d0d0d] border border-dashed border-[#555555] p-8 flex flex-col items-center justify-center text-center max-w-xs">
                  <span className="font-anton text-4xl uppercase text-white mb-2">
                    B<span className="text-[#F59E0B]">.</span>SKW
                  </span>
                  <span className="text-[13px] text-[#9A9A9A]">
                    FOTO 4:5 · Close do tecido, luz lateral dura
                  </span>
                </div>
              )}

              {produto.tags && produto.tags.length > 0 && (
                <div className="absolute top-5 left-5 flex flex-col gap-2 z-10">
                  {produto.tags.map(tag => (
                    <span key={tag} className="bg-[#000000] text-[#F59E0B] px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.2em] border border-[#2a2a2a]">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <p className="text-[13px] text-[#9A9A9A] mt-3">
              {produto.nome} em {produto.cor}, trama de alta gramatura vista de perto.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col">
            
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#F59E0B]">
                EDIÇÃO AUTORAL · {produto.codigo.replace(/-/g, '')}
              </span>
              <a href="#avaliacoes" className="flex items-center gap-2 group">
                <div className="flex">{renderEstrelas(Number(mediaAvaliacoes), 13)}</div>
                <span className="text-[13px] text-[#9A9A9A] group-hover:text-white underline decoration-[#2a2a2a] underline-offset-4 transition-colors">
                  ({avaliacoes.length})
                </span>
              </a>
            </div>

            <h1 className="text-4xl md:text-[56px] md:leading-[60px] font-anton uppercase text-white tracking-normal mb-5 leading-none">
              {produto.nome}
            </h1>
            
            {specsPills.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {specsPills.map((spec, idx) => (
                  <span key={idx} className="bg-[#161616] text-white text-[12px] font-semibold uppercase tracking-[0.2em] px-3.5 py-1.5 border border-[#2a2a2a]">
                    {spec}
                  </span>
                ))}
              </div>
            )}

            <div className="mb-8 p-6 bg-[#161616] border border-[#2a2a2a]">
              <div className="flex items-baseline justify-between gap-2 mb-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl md:text-5xl font-anton text-white leading-none">
                    R$ {precoUnitarioAtual.toFixed(2).replace('.', ',')}
                  </span>
                  {kitSelecionado > 1 && (
                    <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#9A9A9A]">
                      / cada
                    </span>
                  )}
                </div>

                {economiaTotal > 0 && (
                  <span className="bg-[#000000] text-[#F59E0B] text-[12px] font-semibold uppercase tracking-[0.15em] px-3 py-1 border border-[#2a2a2a]">
- R$ {economiaTotal.toFixed(2).replace('.', ',')}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#2a2a2a] mt-3 text-[13px] text-[#9A9A9A]">
                <p>
                  {kitSelecionado > 1 ? (
                    <>Total Kit {kitSelecionado}: <strong className="text-white font-semibold">R$ {precoTotal.toFixed(2).replace('.', ',')}</strong></>
                  ) : (
                    produto.precoAntigo > produto.preco && (
                      <>Valor original: <span className="line-through">R$ {produto.precoAntigo.toFixed(2).replace('.', ',')}</span></>
                    )
                  )}
                </p>
                <p>
                  até <strong className="text-white font-semibold">3x de R$ {parcela}</strong> s/ juros
                </p>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white">
                  01 · Quantidade / Kits
                </span>
                {produto.precoKit2 > 0 && (
                  <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#9A9A9A]">
                    Desconto Progressivo
                  </span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setKitSelecionado(1)}
                  className={`border py-4 px-2 flex flex-col items-center justify-center transition-all rounded-none active:scale-[0.98] ${
                    kitSelecionado === 1
                      ? 'border-[#F59E0B] bg-[#161616] text-white'
                      : 'border-[#2a2a2a] bg-[#000000] text-[#9A9A9A] hover:border-white hover:text-white'
                  }`}
                >
                  <span className="font-anton text-xl uppercase">1 Peça</span>
                  <span className="text-[13px] text-[#9A9A9A] mt-1">
                    R$ {produto.preco.toFixed(0)}/un
                  </span>
                </button>

                {produto.precoKit2 > 0 && (
                  <button
                    type="button"
                    onClick={() => setKitSelecionado(2)}
                    className={`border py-4 px-2 flex flex-col items-center justify-center transition-all rounded-none active:scale-[0.98] ${
                      kitSelecionado === 2
                        ? 'border-[#F59E0B] bg-[#161616] text-white'
                        : 'border-[#2a2a2a] bg-[#000000] text-[#9A9A9A] hover:border-white hover:text-white'
                    }`}
                  >
                    <span className="font-anton text-xl uppercase">Kit 2</span>
                    <span className="text-[13px] text-[#9A9A9A] mt-1">
                      R$ {produto.precoKit2.toFixed(0)}/un
                    </span>
                  </button>
                )}

                {produto.precoKit3 > 0 && (
                  <button
                    type="button"
                    onClick={() => setKitSelecionado(3)}
                    className={`relative border py-4 px-2 flex flex-col items-center justify-center transition-all rounded-none active:scale-[0.98] ${
                      kitSelecionado === 3
                        ? 'border-[#F59E0B] bg-[#161616] text-white'
                        : 'border-[#2a2a2a] bg-[#000000] text-[#9A9A9A] hover:border-white hover:text-white'
                    }`}
                  >
                    <span className="absolute -top-2.5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] bg-[#F59E0B] text-[#000000]">
                      Destaque
                    </span>
                    <span className="font-anton text-xl uppercase">Kit 3</span>
                    <span className={`text-[13px] mt-1 ${kitSelecionado === 3 ? 'text-[#F59E0B] font-semibold' : 'text-[#9A9A9A]'}`}>
                      R$ {produto.precoKit3.toFixed(0)}/un
                    </span>
                  </button>
                )}
              </div>
            </div>

            <div className="mb-8">
              <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white mb-3 block">
                02 · Tonalidade: <span className="text-[#9A9A9A]">{produto.cor}</span>
              </span>
              <div className="flex flex-wrap gap-2.5">
                {variacoesDaMesmaCategoria.map(variacao => {
                  const selecionado = produto.codigo === variacao.codigo;
                  return (
                    <button
                      key={variacao.codigo}
                      type="button"
                      onClick={() => router.push(`/produto/${variacao.codigo.replace(/-/g, '')}`)}
                      className={`w-10 h-10 rounded-none border transition-all duration-150 active:scale-95 ${
                        selecionado
                          ? 'ring-2 ring-offset-2 ring-offset-[#000000] ring-[#F59E0B] border-white scale-105'
                          : 'border-[#2a2a2a] hover:border-white'
                      } ${coresHex[variacao.cor] || 'bg-[#161616]'}`}
                      title={variacao.cor}
                      aria-label={`Cor ${variacao.cor}`}
                    />
                  );
                })}
              </div>
            </div>

            <div
              ref={seletorTamanhoRef}
              className={`mb-8 p-3 -mx-3 transition-colors duration-300 ${
                erroTamanho ? 'bg-[#161616] border border-[#F59E0B]' : 'border border-transparent'
              }`}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white">
                  03 · Tamanho {tamanhoAtivo && <span className="text-[#F59E0B]">· {tamanhoAtivo}</span>}
                </span>
                <button
                  type="button"
                  onClick={() => setGuiaMedidasAberto(true)}
                  className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#9A9A9A] hover:text-[#F59E0B] flex items-center gap-1.5 underline decoration-[#2a2a2a] underline-offset-4 transition-colors"
                >
                  <Ruler size={13} /> Guia de Medidas
                </button>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {(['P', 'M', 'G', 'GG', 'XG', 'G1', 'G2'] as Tamanho[]).map(tam => {
                  const qtdDisponivel = produto.estoque[tam] || 0;
                  const todosZerados = Object.values(produto.estoque || {}).every(v => v === 0);
                  const esgotado = !todosZerados && qtdDisponivel === 0;
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
                      className={`relative h-13 md:h-14 border flex items-center justify-center font-anton text-base tracking-wide transition-all duration-150 rounded-none overflow-hidden ${
                        esgotado
                          ? 'border-[#2a2a2a] text-[#9A9A9A]/30 cursor-not-allowed bg-[#000000] after:content-[""] after:absolute after:w-[150%] after:h-[1px] after:bg-[#2a2a2a] after:-rotate-45'
                          : ativo
                            ? 'border-[#F59E0B] bg-[#F59E0B] text-[#000000]'
                            : 'border-[#2a2a2a] bg-[#161616] text-white hover:border-white active:scale-95'
                      }`}
                    >
                      {tam}
                    </button>
                  );
                })}
              </div>

              {erroTamanho && (
                <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#F59E0B] mt-3">
                  ↑ Selecione o tamanho da peça para continuar
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={handleComprar}
              className="hidden md:flex w-full h-16 bg-[#F59E0B] text-[#000000] items-center justify-center gap-3 font-semibold text-[14px] uppercase tracking-[0.08em] hover:brightness-110 transition-all duration-150 rounded-none active:scale-[0.99]"
            >
              {adicionadoFeedback ? (
                <>
                  <Check size={18} strokeWidth={3} /> Peça Adicionada
                </>
              ) : (
                <>
                  <ShoppingCart size={18} /> Garantir a Sua · R$ {precoTotal.toFixed(2).replace('.', ',')}
                </>
              )}
            </button>

            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-[#2a2a2a]">
              <div className="flex items-center gap-3 text-[#9A9A9A]">
                <ShieldCheck size={18} className="text-white shrink-0" />
                <span className="text-[12px] font-semibold uppercase tracking-[0.15em]">Zero Encolhimento</span>
              </div>
              <div className="flex items-center gap-3 text-[#9A9A9A]">
                <Truck size={18} className="text-white shrink-0" />
                <span className="text-[12px] font-semibold uppercase tracking-[0.15em]">Troca Garantida</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 md:mt-28 pt-12 border-t border-[#2a2a2a] max-w-4xl">
          <div className="flex gap-8 md:gap-12 border-b border-[#2a2a2a] mb-8 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {[
              { id: 'descricao', label: '01 · A Armadura' },
              { id: 'tecnica', label: '02 · Construção' },
              { id: 'lavagem', label: '03 · Conservação' }
            ].map(aba => (
              <button
                key={aba.id}
                onClick={() => setAbaAtiva(aba.id as 'descricao' | 'tecnica' | 'lavagem')}
                className={`pb-4 text-[12px] font-semibold uppercase tracking-[0.2em] whitespace-nowrap transition-colors border-b-2 ${
                  abaAtiva === aba.id ? 'border-[#F59E0B] text-[#F59E0B]' : 'border-transparent text-[#9A9A9A] hover:text-white'
                }`}
              >
                {aba.label}
              </button>
            ))}
          </div>
          <div className="text-[17px] leading-[28px] font-normal text-white bg-[#161616] p-6 md:p-8 border border-[#2a2a2a]">
            {abaAtiva === 'descricao' && <div className="whitespace-pre-line max-w-[68ch]">{formataTexto(produto.descricao)}</div>}
            {abaAtiva === 'tecnica' && <div className="whitespace-pre-line max-w-[68ch]">{formataTexto(produto.informacoesTecnicas)}</div>}
            {abaAtiva === 'lavagem' && <div className="whitespace-pre-line max-w-[68ch]">{formataTexto(produto.lavagem)}</div>}
          </div>
        </div>

        <div id="avaliacoes" className="mt-20 md:mt-28 pt-14 border-t border-[#2a2a2a] scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#F59E0B] block mb-2">
                Quem Veste a Rua
              </span>
              <h2 className="text-4xl md:text-[56px] md:leading-[60px] font-anton uppercase text-white">
                Avaliações
              </h2>
            </div>
            <button
              onClick={() => setModalAvaliacaoAberto(true)}
              className="w-full md:w-auto bg-[#161616] border border-[#2a2a2a] hover:border-[#F59E0B] text-white px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] transition-all rounded-none"
            >
              Registrar Avaliação
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div
              className="md:w-1/3 p-8 rounded-none border border-[#2a2a2a] text-center flex flex-col items-center justify-center"
              style={{
                backgroundColor: '#000000',
                backgroundImage: 'repeating-linear-gradient(90deg, #1c1c1c 0 3px, transparent 3px 9px)'
              }}
            >
              <div className="text-6xl font-anton text-white mb-2">{mediaAvaliacoes}</div>
              <div className="flex mb-3">{renderEstrelas(Number(mediaAvaliacoes), 18)}</div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#9A9A9A]">
                {avaliacoes.length === 0 ? "Sem registros ainda" : `${avaliacoes.length} registro(s)`}
              </p>
            </div>

            {avaliacoes.length === 0 ? (
              <div className="md:w-2/3 border border-[#2a2a2a] rounded-none p-8 flex flex-col items-center justify-center text-center bg-[#161616]">
                <MessageSquare className="text-[#9A9A9A] mb-3" size={28} />
                <h3 className="font-anton text-2xl text-white uppercase mb-2">Primeiro Registro</h3>
                <p className="text-[13px] text-[#9A9A9A] max-w-md">
                  Compartilhe sua percepção sobre o peso do Heavy Suedine e o acabamento da gola canelada de 3 cm.
                </p>
              </div>
            ) : (
              <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
                {avaliacoes.map(aval => (
                  <div key={aval.id} className="p-6 border border-[#2a2a2a] rounded-none bg-[#161616] flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex">{renderEstrelas(aval.nota, 13)}</div>
                        <span className="text-[13px] text-[#9A9A9A]">{aval.data}</span>
                      </div>
                      <h4 className="font-anton text-lg uppercase text-white mb-2">{aval.nome}</h4>
                      <p className="text-[15px] text-white leading-relaxed mb-4">"{aval.comentario}"</p>
                      {aval.imagem && (
                        <div className="mt-3 mb-3 rounded-none overflow-hidden border border-[#2a2a2a] w-24 h-24">
                          <img src={aval.imagem} alt="Foto Cliente" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                    <div className="mt-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#9A9A9A]">
                      · Comprador Verificado
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {sugestoesInteligentes.length > 0 && (
        <section className="bg-[#000000] border-t border-[#2a2a2a] py-16 md:py-24 mt-12">
          <div className="max-w-[1400px] mx-auto px-4 md:px-6">
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#F59E0B] block mb-2">
                  Curadoria B.SKW
                </span>
                <h2 className="text-4xl md:text-[56px] md:leading-[60px] font-anton uppercase text-white">
                  Complete a Armadura
                </h2>
              </div>
              <p className="text-[#9A9A9A] text-[13px]">
                Peças essenciais em preto profundo, branco e off-white.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {sugestoesInteligentes.map(sugestao => (
                <QuickBuyCard key={sugestao.id} tituloGrupo={sugestao.nome} produtosDoGrupo={[sugestao]} />
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="fixed bottom-0 left-0 right-0 p-3 bg-[#161616]/95 backdrop-blur-md border-t border-[#2a2a2a] z-40 md:hidden">
        <div className="flex items-center gap-3">
          <div className="flex flex-col justify-center px-1 min-w-[95px]">
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#9A9A9A]">
              {kitSelecionado > 1 ? `Kit ${kitSelecionado}` : '1 Peça'} {tamanhoAtivo ? `· ${tamanhoAtivo}` : ''}
            </span>
            <span className="text-xl font-anton text-white leading-tight">
              R$ {precoTotal.toFixed(2).replace('.', ',')}
            </span>
          </div>

          <button
            type="button"
            onClick={handleComprar}
            className="flex-1 h-12 bg-[#F59E0B] text-[#000000] flex items-center justify-center gap-2 font-semibold text-[12px] uppercase tracking-[0.08em] rounded-none active:scale-[0.98] transition-all"
          >
            {adicionadoFeedback ? (
              <>
                <Check size={16} strokeWidth={3} /> Adicionado
              </>
            ) : !tamanhoAtivo ? (
              <>Selecionar Tamanho</>
            ) : (
              <>
                <ShoppingCart size={15} /> Garantir a Sua
              </>
            )}
          </button>
        </div>
      </div>

    </main>
  );
}
