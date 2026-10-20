"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { carregarProdutosStorage, excluirProdutoStorage, Produto, Estoque } from '@/data/produtos';
import { Edit, Trash2, Plus, Box } from 'lucide-react';

export default function ProdutosAdmin() {
  const [produtosLista, setProdutosLista] = useState<Produto[]>([]);

  useEffect(() => {
    setProdutosLista(carregarProdutosStorage());
  }, []);

  const calcularEstoqueTotal = (estoque: Estoque) => {
    return Object.values(estoque).reduce((total, qtd) => total + (qtd || 0), 0);
  };

  const handleExcluir = (id: string, nome: string) => {
    if (window.confirm(`Tem a certeza que deseja excluir o SKU "${nome}"?`)) {
      const novaLista = excluirProdutoStorage(id);
      setProdutosLista(novaLista);
    }
  };

  return (
    <div className="max-w-7xl mx-auto font-outfit pb-12">
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-anton uppercase text-zinc-900 tracking-wide">Gestão de SKUs</h1>
          <p className="text-zinc-500 text-sm mt-1 font-medium">Controlo absoluto do seu catálogo. Cada variação de cor é um código único.</p>
        </div>
        <Link href="/admin/produtos/novo" className="bg-amber-500 text-black px-6 py-3 font-bold text-xs uppercase tracking-widest hover:bg-amber-400 transition-colors flex items-center gap-2">
          <Plus size={16} /> Novo Produto (SKU)
        </Link>
      </header>

      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200 text-[10px] uppercase tracking-wider text-zinc-500 font-bold">
                <th className="p-4 pl-6 md:pl-8">Identificação (SKU)</th>
                <th className="p-4">Categoria</th>
                <th className="p-4">Cor</th>
                <th className="p-4">Estoque (Soma)</th>
                <th className="p-4">Preço (1 un)</th>
                <th className="p-4 pr-6 md:pr-8 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {produtosLista.map(p => {
                const estoqueTotal = calcularEstoqueTotal(p.estoque);
                const statusEstoque = estoqueTotal === 0 ? 'text-red-500' : estoqueTotal < 10 ? 'text-amber-500' : 'text-green-600';
                const codigoUrl = p.codigo.replace(/-/g, '');

                return (
                  <tr key={p.id} className="hover:bg-zinc-50 transition-colors">
                    <td className="p-4 pl-6 md:pl-8 flex items-center gap-4">
                      <div className="w-12 h-16 bg-zinc-100 rounded overflow-hidden shrink-0 border border-zinc-200">
                        {p.imagens && p.imagens.length > 0 ? (
                          <img src={p.imagens[0]} alt={p.nome} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-zinc-300"><Box size={16} /></div>
                        )}
                      </div>
                      <div>
                        <span className="font-bold text-xs md:text-sm text-zinc-900 block mb-1">{p.nome}</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 font-mono bg-zinc-100 px-2 py-1 rounded border border-zinc-200 shadow-sm">{p.codigo}</span>
                      </div>
                    </td>
                    <td className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">{p.categoria.replace('camiseta-', '')}</td>
                    <td className="p-4"><span className="text-[10px] font-bold uppercase tracking-widest text-zinc-700 bg-zinc-100 border border-zinc-200 px-2 py-1 rounded shadow-sm">{p.cor}</span></td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className={`text-sm font-bold ${statusEstoque}`}>{estoqueTotal} un</span>
                        <span className="text-[9px] text-zinc-400 uppercase tracking-widest mt-0.5">em {Object.keys(p.estoque).length} tamanhos</span>
                      </div>
                    </td>
                    <td className="p-4 text-xs font-bold text-zinc-900">R$ {p.preco.toFixed(2).replace('.', ',')}</td>
                    <td className="p-4 pr-6 md:pr-8">
                      <div className="flex gap-2 justify-end">
                        <Link href={`/admin/produtos/editar/${codigoUrl}`} className="p-2 text-zinc-400 hover:text-black hover:bg-zinc-100 rounded transition-colors" title="Editar SKU">
                          <Edit size={16} />
                        </Link>
                        <button onClick={() => handleExcluir(p.id, p.nome)} className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors" title="Excluir SKU">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
