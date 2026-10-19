import Link from 'next/link';
import { produtos } from '@/data/produtos';
import { Edit, Trash2, Plus } from 'lucide-react';

export default function ProdutosAdmin() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-anton uppercase text-zinc-900 tracking-wide">Gestão de Produtos</h1>
          <p className="text-zinc-500 text-sm mt-1 font-medium">Controle o seu catálogo e estoque de camisas.</p>
        </div>
        <Link href="/admin/produtos/novo" className="bg-amber-500 text-black px-6 py-3 font-bold text-xs uppercase tracking-widest hover:bg-amber-400 transition-colors flex items-center gap-2">
          <Plus size={16} /> Novo Produto
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-100 border-b border-zinc-200 text-xs uppercase tracking-wider text-zinc-500 font-bold">
                <th className="p-4">Produto</th>
                <th className="p-4">Categoria</th>
                <th className="p-4">Preço</th>
                <th className="p-4">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {produtos.map(p => (
                <tr key={p.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-zinc-200 rounded overflow-hidden shrink-0">
                       <img src={p.imagens[0]} alt={p.nome} className="w-full h-full object-cover" />
                    </div>
                    <span className="font-bold text-sm text-zinc-900">{p.nome}</span>
                  </td>
                  <td className="p-4 text-sm text-zinc-600 capitalize">{p.categoria.replace('camiseta-', '')}</td>
                  <td className="p-4 text-sm font-bold text-zinc-900">R$ {p.preco.toFixed(2)}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="p-2 text-zinc-400 hover:text-black transition-colors" title="Editar"><Edit size={16} /></button>
                      <button className="p-2 text-zinc-400 hover:text-red-500 transition-colors" title="Excluir"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
