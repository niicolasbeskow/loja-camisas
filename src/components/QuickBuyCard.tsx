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
  'Preto': 'bg-[#000000]', 'Branco': 'bg-[#FFFFFF]', 'Off-White': 'bg-[#F5F5F0]',
  'Marrom': 'bg-[#4A3728]', 'Areia': 'bg-[#E3DAC9]', 'Cinza': 'bg-[#9A9A9A]', 'Chumbo': 'bg-[#3f3f46]',
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
        imagem: produtoAtivo.imagens?.[0] || ''
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
    <div className="group relative flex flex-col bg-[#161616] border border-[#2a2a2a] hover:border-[#F59E0B] transition-colors duration-200 rounded-none font-outfit text-white select-none">
      
      <div
        className="relative aspect-[4/5] w-full overflow-hidden border-b border-[#2a2a2a]"
        style={{
          backgroundColor: '#000000',
          backgroundImage: 'repeating-linear-gradient(90deg, #1c1c1c 0 3px, transparent 3px 9px)'
        }}
      >
        <Link href={urlProduto} className="block w-full h-full">
          {produtoAtivo.imagens && produtoAtivo.imagens.length > 0 ? (
            <img
              src={produtoAtivo.imagens[0]}
              alt={produtoAtivo.nome}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
              <span className="font-anton text-3xl uppercase text-white">
                B<span className="text-[#F59E0B]">.</span>SKW
              </span>
              <span className="text-[12px] text-[#9A9A9A] mt-1">
                {produtoAtivo.cor}
              </span>
            </div>
          )}
        </Link>

        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
          {produtoAtivo.tag && (
            <span className="bg-[#000000] text-[#F59E0B] text-[11px] font-semibold uppercase tracking-[0.2em] px-2.5 py-1 border border-[#2a2a2a]">
              {produtoAtivo.tag}
            </span>
          )}
          {specPrincipal && (
            <span className="bg-[#000000]/90 text-white text-[11px] font-semibold uppercase tracking-[0.15em] px-2.5 py-1 border border-[#2a2a2a] w-fit">
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
          aria-label="Adicionar rápido"
          className="md:hidden absolute bottom-3 right-3 z-20 w-9 h-9 bg-[#000000] text-white border border-[#2a2a2a] flex items-center justify-center active:scale-90 transition-transform rounded-none"
        >
          {gavetaMobileAberta ? <X size={16} /> : <Plus size={16} className="text-[#F59E0B]" />}
        </button>

        <div
          className={`absolute inset-x-0 bottom-0 z-20 bg-[#000000]/95 backdrop-blur-md border-t border-[#2a2a2a] p-3 transition-transform duration-200 ease-out ${
            gavetaMobileAberta
              ? 'translate-y-0'
              : 'translate-y-full md:group-hover:translate-y-0'
          }`}
        >
          {tamanhoAdicionado ? (
            <div className="h-14 flex items-center justify-center gap-2 bg-[#F59E0B] text-[#000000] font-semibold text-[12px] uppercase tracking-[0.15em]">
              <Check size={16} strokeWidth={3} /> Tam. {tamanhoAdicionado} Adicionado
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white flex items-center gap-1.5">
                  <ShoppingBag size={12} className="text-[#F59E0B]" /> Compra Rápida
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
                      className={`relative h-8 border font-anton text-xs uppercase flex items-center justify-center rounded-none transition-all overflow-hidden ${
                        esgotado
                          ? 'border-[#2a2a2a] text-[#9A9A9A]/30 bg-[#000000] cursor-not-allowed after:content-[""] after:absolute after:w-[140%] after:h-[1px] after:bg-[#2a2a2a] after:-rotate-45'
                          : 'border-[#2a2a2a] bg-[#161616] text-white hover:bg-[#F59E0B] hover:text-[#000000] hover:border-[#F59E0B] active:scale-95'
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

      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
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
                      ? 'ring-1 ring-offset-1 ring-offset-[#161616] ring-[#F59E0B] border-white scale-110'
                      : 'border-[#2a2a2a] hover:border-white'
                  } ${coresHex[variante.cor] || 'bg-[#000000]'}`}
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className={`w-3 h-3 rounded-none border border-[#2a2a2a] ${
                  coresHex[produtoAtivo.cor] || 'bg-[#000000]'
                }`}
              />
              <span className="text-[12px] text-[#9A9A9A]">
                {produtoAtivo.cor}
              </span>
            </div>
          )}

          <Link href={urlProduto} className="block group-hover:text-[#F59E0B] transition-colors">
            <h3 className="font-semibold text-[13px] uppercase tracking-[0.08em] text-white line-clamp-1">
              {tituloGrupo || produtoAtivo.nome}
            </h3>
          </Link>
        </div>

        <div className="pt-3 border-t border-[#2a2a2a] flex flex-col gap-1">
          <div className="flex items-baseline gap-2.5">
            <span className="font-anton text-2xl text-white leading-none">
              R$ {produtoAtivo.preco.toFixed(2).replace('.', ',')}
            </span>
            {temDesconto && (
              <span className="text-[13px] text-[#9A9A9A] line-through">
                R$ {produtoAtivo.precoAntigo.toFixed(2).replace('.', ',')}
              </span>
            )}
          </div>

          {produtoAtivo.precoKit3 > 0 && (
            <span className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#F59E0B] mt-0.5">
              R$ {produtoAtivo.precoKit3.toFixed(2).replace('.', ',')} /un no Kit 3
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
