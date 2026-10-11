"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Home, Minus, Plus, Truck, CreditCard, Package, ShieldCheck, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { Product, mockProducts } from '@/lib/data';

export default function ClientProdutoUI({ produto }: { produto: Product }) {
  const [quantidade, setQuantidade] = useState(1);
  const [tamanho, setTamanho] = useState('G');
  const [abaAtiva, setAbaAtiva] = useState('descricao');
  const tamanhos = ['PP', 'P', 'M', 'G', 'GG', 'G1', 'G2'];

  const toggleAba = (aba: string) => setAbaAtiva(abaAtiva === aba ? '' : aba);

  // Pega 4 produtos diferentes para a vitrine de relacionados
  const relacionados = mockProducts.filter(p => p.id !== produto.id).slice(0, 4);

  const handleAddToCart = () => {
    window.dispatchEvent(new CustomEvent('adicionarAoCarrinho', {
      detail: {
        titulo: produto.name,
        preco: produto.price,
        cor: produto.colors && produto.colors.length > 0 ? 'Padrão' : 'Única',
        tamanho: tamanho,
        quantidade: quantidade
      }
    }));
  };

  return (
    <main className="min-h-screen bg-white text-black pb-24 mt-16">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 pt-8">
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-8">
          <Link href="/" className="hover:text-[#F59E0B] transition-colors"><Home className="w-3 h-3" /></Link>
          <span>/</span>
          <Link href="/produtos" className="hover:text-[#F59E0B] transition-colors">Produtos</Link>
          <span>/</span>
          <span className="text-black font-medium">{produto.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 mb-20">
          {/* ESQUERDA: Galeria */}
          <div className="w-full lg:w-3/5 flex flex-col gap-4">
            <div className="w-full aspect-[4/5] md:aspect-square bg-zinc-100 rounded-md flex items-center justify-center border border-zinc-200">
              <span className="text-zinc-400 font-medium text-lg text-center px-4">Imagem {produto.name} <br/>(Aguardando Foto)</span>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="aspect-square bg-zinc-100 rounded-md flex items-center justify-center border border-zinc-200 cursor-pointer hover:border-[#F59E0B] transition-colors">
                  <span className="text-zinc-400 text-xs">Foto {item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* DIREITA: Info do Produto */}
          <div className="w-full lg:w-2/5 flex flex-col">
            <h1 className="text-3xl md:text-4xl font-anton uppercase mb-4 text-zinc-900">{produto.name}</h1>
            <div className="mb-6">
              <div className="flex items-end gap-3 mb-2">
                <span className="text-3xl font-bold text-black">R$ {produto.price.toFixed(2).replace('.', ',')}</span>
                {produto.originalPrice && (
                  <span className="text-lg text-zinc-400 line-through mb-1">R$ {produto.originalPrice.toFixed(2).replace('.', ',')}</span>
                )}
              </div>
              <div className="inline-block bg-green-100 text-green-800 font-bold text-sm px-3 py-1 rounded-sm border border-green-200">
                🚚 FRETE GRÁTIS em compras acima de R$ 299
              </div>
            </div>

            <div className="flex gap-2 mb-8">
              {produto.tag && <span className="bg-zinc-100 text-zinc-600 text-xs font-bold px-3 py-1.5 rounded-full">{produto.tag}</span>}
              <span className="bg-zinc-100 text-zinc-600 text-xs font-bold px-3 py-1.5 rounded-full">100% Algodão</span>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-bold text-zinc-900 uppercase tracking-wide">Tamanho: <span className="text-[#F59E0B] ml-1">{tamanho}</span></span>
                <button className="text-xs text-zinc-500 underline hover:text-black">Tabela de Medidas</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tamanhos.map((t) => (
                  <button key={t} onClick={() => setTamanho(t)} className={`w-12 h-12 flex items-center justify-center font-bold text-sm border rounded-sm transition-all ${tamanho === t ? 'border-black bg-black text-white' : 'border-zinc-300 text-zinc-600 hover:border-black'}`}>{t}</button>
                ))}
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              <div className="flex items-center border border-zinc-300 rounded-sm h-14 w-32">
                <button onClick={() => setQuantidade(Math.max(1, quantidade - 1))} className="flex-1 flex justify-center text-zinc-500 hover:text-black"><Minus className="w-4 h-4" /></button>
                <span className="w-10 text-center font-bold">{quantidade}</span>
                <button onClick={() => setQuantidade(quantidade + 1)} className="flex-1 flex justify-center text-zinc-500 hover:text-black"><Plus className="w-4 h-4" /></button>
              </div>
              <button onClick={handleAddToCart}
                className="flex-1 bg-black text-white font-bold uppercase tracking-widest text-sm rounded-sm hover:bg-[#F59E0B] hover:text-black transition-colors h-14"
              >
                Adicionar ao Carrinho
              </button>
            </div>

            <div className="mb-10">
              <span className="block text-sm font-bold text-zinc-900 uppercase tracking-wide mb-3">Calcule o Frete</span>
              <div className="flex gap-2">
                <input type="text" placeholder="Digite seu CEP" className="flex-1 border border-zinc-300 rounded-sm px-4 h-12 focus:outline-none focus:border-[#F59E0B]" />
                <button className="bg-zinc-900 text-white font-bold text-sm px-6 rounded-sm hover:bg-zinc-800 transition-colors h-12">Consultar</button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-10">
              <div className="border border-zinc-200 rounded-sm p-4 flex flex-col items-center justify-center text-center gap-2 bg-zinc-50"><Package className="w-5 h-5 text-zinc-600" /><span className="text-xs font-bold text-zinc-600 uppercase">Envio Imediato</span></div>
              <div className="border border-zinc-200 rounded-sm p-4 flex flex-col items-center justify-center text-center gap-2 bg-zinc-50"><CreditCard className="w-5 h-5 text-zinc-600" /><span className="text-xs font-bold text-zinc-600 uppercase">Até 12x no Cartão</span></div>
              <div className="border border-zinc-200 rounded-sm p-4 flex flex-col items-center justify-center text-center gap-2 bg-zinc-50"><Truck className="w-5 h-5 text-zinc-600" /><span className="text-xs font-bold text-zinc-600 uppercase">Enviamos p/ Todo Brasil</span></div>
              <div className="border border-zinc-200 rounded-sm p-4 flex flex-col items-center justify-center text-center gap-2 bg-zinc-50"><ShieldCheck className="w-5 h-5 text-zinc-600" /><span className="text-xs font-bold text-zinc-600 uppercase">Qualidade Garantida</span></div>
            </div>

            {/* Accordions */}
            <div className="border-t border-zinc-200">
              <div className="border-b border-zinc-200">
                <button onClick={() => toggleAba('descricao')} className="w-full py-5 flex justify-between items-center text-left focus:outline-none">
                  <span className="font-bold text-zinc-900">Descrição</span>
                  {abaAtiva === 'descricao' ? <ChevronUp className="w-5 h-5 text-zinc-400" /> : <ChevronDown className="w-5 h-5 text-zinc-400" />}
                </button>
                {abaAtiva === 'descricao' && (
                  <div className="pb-5 text-sm text-zinc-600 leading-relaxed space-y-3">
                    <p>A {produto.name} Zero Encolhimento é produzida com modelagem exclusiva streetwear e acabamento de extrema qualidade.</p>
                    <p>Nossas peças passam porum rigoroso processo de pré-encolhimento, o que garante que a peça não encolhe mais nas próximas lavagens.</p>
                    <p>As nossas peças possuem toque conforto, não são transparentes e podem ser personalizadas com a sua estampa. Ideal para quem busca qualidade, conforto e custo-benefício!</p>
                  </div>
                )}
              </div>
              <div className="border-b border-zinc-200">
                <button onClick={() => toggleAba('tecnica')} className="w-full py-5 flex justify-between items-center text-left focus:outline-none">
                  <span className="font-bold text-zinc-900">Informações Técnicas</span>
                  {abaAtiva === 'tecnica' ? <ChevronUp className="w-5 h-5 text-zinc-400" /> : <ChevronDown className="w-5 h-5 text-zinc-400" />}
                </button>
                {abaAtiva === 'tecnica' && (
                  <ul className="pb-5 text-sm text-zinc-600 leading-relaxed space-y-2 list-disc pl-5">
                    <li>Fabricada com algodão sustentável BCI (Better Cotton Initiative).</li>
                    <li>100% algodão.</li>
                    <li>{produto.tag || 'Gramatura 200g/m²'}.</li>
                    <li>Fio 26.1 penteado.</li>
                    <li>Peças pré-encolhidas.</li>
                  </ul>
                )}
              </div>
              <div className="border-b border-zinc-200">
                <button onClick={() => toggleAba('lavagem')} className="w-full py-5 flex justify-between items-center text-left focus:outline-none">
                  <span className="font-bold text-zinc-900">Recomendações de Lavagem</span>
                  {abaAtiva === 'lavagem' ? <ChevronUp className="w-5 h-5 text-zinc-400" /> : <ChevronDown className="w-5 h-5 text-vinc-400" />}
                </button>
                {abaAtiva === 'lavagem' && (
                  <ul className="pb-5 text-sm text-zinc-600 leading-relaxed space-y-2 list-disc pl-5">
                    <li>Lavar à mão ou em ciclo delicado.</li>
                    <li>Não usar alvejantes.</li>
                    <li>Secar à sombra para preservar a tonalidade.</li>
                    <li>Passar com ferro em temperatura baixa.</li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ================= SEÇÃO: VOCÊ TAMBÉM PODE GOSTAR ================= */}
        <div className="border-t border-zinc-200 pt-16">
          <h2 className="text-3xl font-anton uppercase text-zinc-900 mb-10 text-center">Você também pode gostar...</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-12">
            {relacionados.map((rel) => (
              <Link href={`/produto/${rel.id}`} key={rel.id} className="group flex flex-col items-center text-center cursor-pointer">
                <div className="w-full aspect-[4/5] bg-zinc-100 relative mb-4 overflow-hidden rounded-md flex items-center justify-center hover:shadow-lg transition-shadow">
                  {rel.tag && <span className="absolute top-2 left-2 bg-[#F59E0B] text-[#000000] text-[10px] font-bold px-2 py-1 rounded-sm z-10">{rel.tag}</span>}
                  <span className="text-zinc-400 text-sm font-medium">Ver Produto</span>
                </div>
                <h3 className="text-sm font-medium text-zinc-900 mb-1 line-clamp-1">{rel.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  {rel.originalPrice && <span className="text-xs text-zinc-400 line-through">R$ {rel.originalPrice.toFixed(2).replace('.', ',')}</span>}
                  <span className="text-sm font-bold text-black">R$ {rel.price.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  {rel.colors.map((color, idx) => <div key={idx} className="w-4 h-4 rounded-full border border-zinc-300 shadow-sm" style={{ backgroundColor: color }} />)}
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}