"use client";
import Link from 'next/link';
import { ArrowLeft, Save, UploadCloud } from 'lucide-react';

export default function NovoProduto() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/admin/produtos" className="inline-flex items-center gap-2 text-zinc-500 hover:text-black text-xs font-bold uppercase tracking-widest transition-colors mb-4">
          <ArrowLeft size={14} /> Voltar para Produtos
        </Link>
        <h1 className="text-3xl font-anton uppercase text-zinc-900 tracking-wide">Cadastrar Produto</h1>
      </div>

      <form className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6 md:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-700">Nome da Peça</label>
            <input type="text" placeholder="Ex: Camiseta Oversized Heavy" className="w-full border-2 border-zinc-200 p-3 font-medium text-sm focus:border-black outline-none transition-colors" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-700">Preço Venda (R$)</label>
            <input type="number" placeholder="0.00" className="w-full border-2 border-zinc-200 p-3 font-medium text-sm focus:border-black outline-none transition-colors" />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-700">Categoria / Coleção</label>
          <select className="w-full border-2 border-zinc-200 p-3 font-medium text-sm focus:border-black outline-none transition-colors bg-white">
            <option>Camiseta Básica</option>
            <option>Oversized</option>
            <option>Boxy</option>
            <option>Moletom</option>
            <option>Shorts</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-700">Fotos do Produto</label>
          <div className="border-2 border-dashed border-zinc-300 rounded-lg p-12 flex flex-col items-center justify-center bg-zinc-50 hover:bg-zinc-100 transition-colors cursor-pointer group">
            <UploadCloud size={32} className="text-zinc-400 group-hover:text-black mb-3 transition-colors" />
            <p className="text-zinc-800 text-sm font-bold">Clique para fazer upload</p>
            <p className="text-zinc-500 text-xs mt-1">Arraste as fotos no formato JPG ou PNG</p>
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-200 flex justify-end">
          <button type="button" className="bg-black text-white px-8 py-4 font-bold text-xs uppercase tracking-widest hover:bg-zinc-800 transition-colors flex items-center gap-2">
            <Save size={16} /> Salvar e Publicar
          </button>
        </div>
      </form>
    </div>
  );
}
