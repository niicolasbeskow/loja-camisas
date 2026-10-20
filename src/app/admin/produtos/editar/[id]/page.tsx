"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, UploadCloud, X, Plus, Tag } from 'lucide-react';
import { produtos as produtosData } from '@/data/produtos';

export default function EditarProduto({ params }: { params: { id: string } }) {
  const router = useRouter();
  
  // Converte a URL recebida (ex: bskwbasprt01) para maiúsculas
  const paramId = params.id.toUpperCase();
  
  // Procura o produto cujo código (removendo os traços) seja igual à URL
  const produto = produtosData.find(p => p.codigo.replace(/-/g, '') === paramId || p.id === paramId);

  if (!produto) return <div className="p-12 text-center text-red-500 font-bold uppercase tracking-widest mt-20">Produto não encontrado no catálogo.</div>;

  const [imagens, setImagens] = useState<string[]>(produto.imagens || []);
  const [tags, setTags] = useState<string[]>(produto.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [coresSelecionadas, setCoresSelecionadas] = useState<string[]>([produto.cor]);

  const categorias = [
    "Collab (Em Breve)", "Kits", "Camiseta Básica", "Camiseta Oversized", 
    "Camiseta Suedine", "Camiseta Boxy", "Camiseta Poliamida", 
    "Manga Longa", "Feminino", "Moletom", "Regata Oversized", "Shorts"
  ];

  const coresDisponiveis = [
    "Preto", "Branco", "Off-White", "Marrom", "Areia", "Cinza", "Chumbo", 
    "Azul Marinho", "Verde Militar", "Verde Musgo", "Bordô", "Rosa Pastel", "Azul Bebê"
  ];
  const tamanhos = ["P", "M", "G", "GG", "XG", "G1", "G2"];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const novasImagens = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setImagens(prev => [...prev, ...novasImagens]);
    }
  };

  const handleSave = () => {
    alert(`As alterações do SKU ${produto.codigo} foram salvas com sucesso!`);
    router.push('/admin/produtos');
  };

  return (
    <div className="max-w-6xl mx-auto pb-12 font-outfit">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <Link href="/admin/produtos" className="inline-flex items-center gap-2 text-zinc-500 hover:text-black text-xs font-bold uppercase tracking-widest transition-colors mb-4">
            <ArrowLeft size={14} /> Voltar para Produtos
          </Link>
          <h1 className="text-3xl font-anton uppercase text-zinc-900 tracking-wide">Editar Produto</h1>
          <p className="text-zinc-500 text-sm mt-1 font-medium">Editando o SKU: <strong className="text-black">{produto.codigo}</strong></p>
        </div>
        <button onClick={handleSave} className="hidden md:flex bg-amber-500 text-black px-8 py-4 font-bold text-xs uppercase tracking-widest hover:bg-amber-400 transition-colors items-center gap-2">
          <Save size={16} /> Salvar Alterações
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          
          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6 md:p-8 space-y-6">
            <h2 className="text-lg font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-100 pb-4">Identificação</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-700">Nome da Peça</label>
                <input type="text" defaultValue={produto.nome} className="w-full border-2 border-zinc-200 p-3 font-medium text-sm focus:border-black outline-none transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-700">Código (SKU)</label>
                <input type="text" defaultValue={produto.codigo} disabled className="w-full border-2 border-zinc-100 bg-zinc-50 p-3 font-medium text-sm text-zinc-400 cursor-not-allowed uppercase" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-700">Categoria / Coleção</label>
              <select defaultValue={produto.categoria} className="w-full border-2 border-zinc-200 p-3 font-medium text-sm focus:border-black outline-none transition-colors bg-white">
                {categorias.map(cat => <option key={cat} value={cat.toLowerCase().replace(' ', '-')}>{cat}</option>)}
              </select>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6 md:p-8 space-y-6">
            <h2 className="text-lg font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-100 pb-4">Precificação e Kits</h2>
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-700">Preço Principal</label>
                <input type="number" defaultValue={produto.preco} className="w-full border-2 border-zinc-200 p-3 font-bold text-sm focus:border-black outline-none transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-700 text-zinc-400">Preço Riscado</label>
                <input type="number" defaultValue={produto.precoAntigo} className="w-full border-2 border-zinc-100 p-3 font-medium text-sm focus:border-zinc-300 outline-none transition-colors" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6 md:p-8 space-y-6">
            <h2 className="text-lg font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-100 pb-4">Detalhamento</h2>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-700">Descrição Geral</label>
              <textarea rows={3} defaultValue={produto.descricao} className="w-full border-2 border-zinc-200 p-3 font-medium text-sm focus:border-black outline-none resize-none"></textarea>
            </div>
          </div>
        </div>

        <div className="space-y-6 md:space-y-8">
          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6 space-y-6">
            <h2 className="text-lg font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-100 pb-4">Etiquetas</h2>
            <div className="flex flex-wrap gap-2 pt-2">
              {tags.map(tag => (
                <div key={tag} className="bg-red-600 text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 flex items-center gap-2 rounded-sm shadow-sm">
                  <Tag size={10} /> {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
