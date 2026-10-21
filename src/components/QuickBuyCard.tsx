"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Produto, Tamanho } from '@/data/produtos';
import { ShoppingBag, Check, Plus, X } from 'lucide-react';

interface QuickBuyCardProps {
  tituloGrupo?: string;
  produtosDoGrupo: Produto[];
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

const listaTamanhos: Tamanho[] = ['P', 'M', 'G', 'GG', 'XG', 'G1', 'G2'];

export default function QuickBuyCard({ tituloGrupo, produtosDoGrupo }: QuickBuyCardProps) {
  const [indiceAtivo, setIndiceAtivo] = useState(0);
  const [gavetaMobileAberta, setGavetaMobileAberta] = useState(false);
  const [tamanhoAdicionado, setTamanhoAdicionado] = useState<Tamanho | null>(null);

  if (!produtosDoGrupo || produtosDoGrupo.length === 0) return null;

  const produtoAtivo = produtosDoGrupo[indiceAtivo] || produtosDoGrupo[0];
  const urlProduto = `/produto/${produtoAtivo.codigo.replace(/-/g, '')}`;

  const specPrincipal = produtoAtivo.especificacaoTecnica
    ? produtoAtivo.especificacaoTecnica.split('•')[0].trim()
    : '';

  const temDesconto = produtoAtivo.precoAntigo > produtoAtivo.preco;
  const porcentagemOff = temDesconto
    ? Math.round(((produtoAtivo.precoAntigo - produtoAtivo.preco) / produtoAtivo.precoAntigo) * 100)
    : 0;

  const handleQuickBuy = (e: React.MouseEvent, tam: Tamanho) => {
    e.preventDefault();
    e.stopPropagation();

    setTamanhoAdicionado(tam);

    try {
      const carrinhoAtual = JSON.parse(localStorage.getItem('bskw_carrinho') || '[]');
      carrinhoAtual.push({
        sku: produtoAtivo.codigo,
        nome: produtoAtivo.nome,
        preco: produtoAtivo.preco,
        tamanho: tam,
        cor: produtoAtivo.cor,
        quantidade: 1,
        adicionadoEm: new Date().toISOString()
      });
      localStorage.setItem('bskw_carrinho', JSON.stringify(carrinhoAtual));
      window.dispatchEvent(new Event('storage'));
    } catch (err) {}

    setTimeout(() => {
      setTamanhoAdicionado(null);
      setGavetaMobileAberta(false);
    }, 1400);
  };

  return (
    <div className="group relative flex flex-col bg-white border border-zinc-200 hover:border-zinc-900 transition-colors duration-200 rounded-none font-outfit select-none">
      
      <div className="relative aspect-[4/5] w-full bg-zinc-100 overflow-hidden border-b border-zinc-200">
        
        <Link href={urlProduto} className="block w-full h-full">
          {produtoAtivo.imagens && produtoAtivo.imagens.length > 0 ? (
            <img
              src={produtoAtivo.imagens[0]}
              alt={produtoAtivo.nome}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center opacity-30 p-4 text-center">
              <span className="font-anton text-2xl md:text-3xl uppercase tracking-widest text-zinc-600">
                B.SKW
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mt-1">
                {produtoAtivo.cor}
              </span>
            </div>
          )}
        </Link>

        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1.5 pointer-events-none">
          {produtoAtivo.tag ? (
            <span className="bg-black text-white font-mono text-[10px] font-bold uppercase px-2 py-0.5 tracking-widest border border-zinc-800">
              {produtoAtivo.tag}
            </span>
          ) : temDesconto && porcentagemOff >= 15 ? (
            <span className="bg-black text-[#a3e635] font-mono text-[10px] font-bold uppercase px-2 py-0.5 tracking-widest">
              -{porcentagemOff}%
            </span>
          ) : null}

          {specPrincipal && (
            <span className="bg-white/90 backdrop-blur-xs text-zinc-900 font-mono text-[9px] md:text-[10px] font-bold uppercase px-2 py-0.5 tracking-wider border border-zinc-300 w-fit">
              {specPrincipal}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setGavetaMobileAberta(!gavetaMobileAberta);
          }}
          aria-label="Compra rápida"
          className="md:hidden absolute bottom-2.5 right-2.5 z-20 w-9 h-9 bg-black text-white border border-zinc-700 flex items-center justify-center active:scale-90 transition-transform rounded-none shadow-md"
        >
          {gavetaMobileAberta ? <X size={15} /> : <Plus size={16} />}
        </button>

        <div
          className={`absolute inset-x-0 bottom-0 z-20 bg-white/95 backdrop-blur-md border-t border-zinc-900 p-2.5 md:p-3 transition-transform duration-200 ease-out ${
            gavetaMobileAberta
              ? 'translate-y-0'
              : 'translate-y-full md:group-hover:translate-y-0'
          }`}
        >
          {tamanhoAdicionado ? (
            <div className="h-14 flex items-center justify-center gap-2 bg-[#a3e635] text-black border border-black font-mono text-[11px] font-bold uppercase tracking-widest animate-in fade-in duration-150">
              <Check size={15} strokeWidth={3} /> Tam. {tamanhoAdicionado} Adicionado
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-900 flex items-center gap-1.5">
                  <ShoppingBag size={11} /> Quick Add:
                </span>
                <span className="font-mono text-[9px] uppercase text-zinc-400">
                  Toque no tamanho
                </span>
              </div>

              <div className="grid grid-cols-7 gap-1">
                {listaTamanhos.map((tam) => {
                  const qtd = produtoAtivo.estoque ? produtoAtivo.estoque[tam] || 0 : 1;
                  const todosZerados = Object.values(produtoAtivo.estoque || {}).every(v => v === 0);
                  const esgotado = !todosZerados && qtd === 0;

                  return (
                    <button
                      key={tam}
                      type="button"
                      disabled={esgotado}
                      onClick={(e) => handleQuickBuy(e, tam)}
                      className={`relative h-7 md:h-8 border font-mono text-[10px] font-bold uppercase flex items-center justify-center rounded-none transition-all overflow-hidden ${
                        esgotado
                          ? 'border-zinc-200 text-zinc-300 bg-zinc-50 cursor-not-allowed after:content-[""] after:absolute after:w-[140%] after:h-[1px] after:bg-zinc-300 after:-rotate-45'
                          : 'border-zinc-300 bg-white text-zinc-900 hover:bg-black hover:text-white hover:border-black active:scale-95'
                      }`}
                    >
                      {tam}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-3 md:p-4 flex flex-col flex-1 justify-between gap-2">
        
        <div>
          {produtosDoGrupo.length > 1 ? (
            <div className="flex items-center gap-1.5 mb-2">
              {produtosDoGrupo.slice(0, 6).map((variante, idx) => (
                <button
                  key={variante.id}
                  type="button"
                  onClick={() => setIndiceAtivo(idx)}
                  title={variante.cor}
                  className={`w-4 h-4 rounded-none border transition-transform ${
                    idx === indiceAtivo
                      ? 'ring-1 ring-offset-1 ring-black border-black scale-110'
                      : 'border-zinc-300 hover:border-black'
                  } ${coresHex[variante.cor] || 'bg-zinc-300'}`}
                />
              ))}
              {produtosDoGrupo.length > 6 && (
                <span className="font-mono text-[10px] text-zinc-400 ml-1">
                  +{produtosDoGrupo.length - 6}
                </span>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 mb-1.5">
              <span
                className={`w-3 h-3 rounded-none border border-zinc-300 ${
                  coresHex[produtoAtivo.cor] || 'bg-zinc-800'
                }`}
              />
              <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                {produtoAtivo.cor}
              </span>
            </div>
          )}

          <Link href={urlProduto} className="block group-hover:underline decoration-zinc-900 underline-offset-4">
            <h3 className="font-bold text-xs md:text-sm uppercase tracking-wider text-zinc-900 line-clamp-1">
              {tituloGrupo || produtoAtivo.nome}
            </h3>
          </Link>
        </div>

        <div className="pt-2 border-t border-zinc-100 flex flex-col gap-1">
          <div className="flex items-baseline gap-2">
            <span className="font-anton text-lg md:text-xl tracking-wide text-zinc-900">
              R$ {produtoAtivo.preco.toFixed(2).replace('.', ',')}
            </span>
            {temDesconto && (
              <span className="font-mono text-[11px] text-zinc-400 line-through">
                R$ {produtoAtivo.precoAntigo.toFixed(2).replace('.', ',')}
              </span>
            )}
          </div>

          {produtoAtivo.precoKit3 > 0 && (
            <div className="flex items-center">
              <span className="bg-zinc-900 text-[#a3e635] font-mono text-[10px] font-bold uppercase px-1.5 py-0.5 tracking-wider">
                R$ {produtoAtivo.precoKit3.toFixed(2).replace('.', ',')} /un no Kit 3
              </span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
