"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, UploadCloud, X, Plus, Tag } from 'lucide-react';

export default function NovoProduto() {
  // Estados para gerir a interatividade do formulário
  const [imagens, setImagens] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [coresSelecionadas, setCoresSelecionadas] = useState<string[]>([]);

  // Categorias exatas do menu do site
  const categorias = [
    "Collab (Em Breve)", "Kits", "Camiseta Básica", "Camiseta Oversized", 
    "Camiseta Suedine", "Camiseta Boxy", "Camiseta Poliamida", 
    "Manga Longa", "Feminino", "Moletom", "Regata Oversized", "Shorts"
  ];

  const coresDisponiveis = ["Preto", "Branco", "Off-White", "Marrom", "Areia", "Cinza", "Azul Marinho", "Verde Militar"];
  const tamanhos = ["P", "M", "G", "GG", "XG"];

  // Função que lê os ficheiros reais do computador e cria um preview visual
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const novasImagens = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setImagens(prev => [...prev, ...novasImagens]);
    }
  };

  const removeImage = (index: number) => {
    setImagens(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim().toUpperCase()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const toggleCor = (cor: string) => {
    setCoresSelecionadas(prev => 
      prev.includes(cor) ? prev.filter(c => c !== cor) : [...prev, cor]
    );
  };

  return (
    <div className="max-w-6xl mx-auto pb-12 font-outfit">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <Link href="/admin/produtos" className="inline-flex items-center gap-2 text-zinc-500 hover:text-black text-xs font-bold uppercase tracking-widest transition-colors mb-4">
            <ArrowLeft size={14} /> Voltar para Produtos
          </Link>
          <h1 className="text-3xl font-anton uppercase text-zinc-900 tracking-wide">Cadastrar Novo Produto</h1>
        </div>
        <button type="button" className="hidden md:flex bg-amber-500 text-black px-8 py-4 font-bold text-xs uppercase tracking-widest hover:bg-amber-400 transition-colors items-center gap-2">
          <Save size={16} /> Salvar Produto
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* COLUNA ESQUERDA: INFORMAÇÕES PRINCIPAIS E ESTOQUE */}
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          
          {/* BLOCO 1: Informações Básicas */}
          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6 md:p-8 space-y-6">
            <h2 className="text-lg font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-100 pb-4">Informações Essenciais</h2>
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-700">Nome da Peça</label>
              <input type="text" placeholder="Ex: Camiseta Oversized Heavy Premium" className="w-full border-2 border-zinc-200 p-3 font-medium text-sm focus:border-black outline-none transition-colors" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-700">Categoria / Coleção</label>
                <select className="w-full border-2 border-zinc-200 p-3 font-medium text-sm focus:border-black outline-none transition-colors bg-white">
                  <option value="">Selecione uma categoria...</option>
                  {categorias.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-700">Preço de Venda (R$)</label>
                <input type="number" placeholder="0.00" className="w-full border-2 border-zinc-200 p-3 font-medium text-sm focus:border-black outline-none transition-colors" />
              </div>
              <div className="space-y-2 md:col-start-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-700 flex justify-between">
                  <span>Preço Antigo (Opcional)</span>
                  <span className="text-zinc-400">Para efeito riscado</span>
                </label>
                <input type="number" placeholder="0.00" className="w-full border-2 border-zinc-200 p-3 font-medium text-sm focus:border-amber-500 outline-none transition-colors" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-700">Descrição do Produto</label>
              <textarea rows={4} placeholder="Detalhes sobre a malha, corte, modelagem..." className="w-full border-2 border-zinc-200 p-3 font-medium text-sm focus:border-black outline-none transition-colors resize-none"></textarea>
            </div>
          </div>

          {/* BLOCO 2: Cores, Tamanhos e Estoque */}
          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6 md:p-8 space-y-6">
            <h2 className="text-lg font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-100 pb-4">Variações e Estoque</h2>
            
            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-700">Cores Disponíveis (Selecione)</label>
              <div className="flex flex-wrap gap-3">
                {coresDisponiveis.map(cor => (
                  <button 
                    key={cor}
                    type="button"
                    onClick={() => toggleCor(cor)}
                    className={`px-4 py-2 border-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                      coresSelecionadas.includes(cor) 
                        ? 'border-black bg-black text-white' 
                        : 'border-zinc-200 text-zinc-500 hover:border-zinc-300'
                    }`}
                  >
                    {cor}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-700">Controlo de Estoque por Tamanho</label>
              <div className="grid grid-cols-5 gap-2 md:gap-4">
                {tamanhos.map(tamanho => (
                  <div key={tamanho} className="space-y-2 text-center">
                    <div className="w-full bg-zinc-100 py-2 text-xs font-bold uppercase">{tamanho}</div>
                    <input type="number" placeholder="Qtd" min="0" className="w-full border-2 border-zinc-200 p-2 text-center font-medium text-sm focus:border-black outline-none transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* COLUNA DIREITA: IMAGENS E ETIQUETAS */}
        <div className="space-y-6 md:space-y-8">
          
          {/* BLOCO 3: Upload de Imagens */}
          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6 space-y-6">
            <h2 className="text-lg font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-100 pb-4">Multimídia</h2>
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-700">Fotos do Produto (Múltiplas)</label>
              
              {/* Botão de Upload Funcional */}
              <label className="border-2 border-dashed border-zinc-300 rounded-lg p-8 flex flex-col items-center justify-center bg-zinc-50 hover:bg-zinc-100 transition-colors cursor-pointer group">
                <UploadCloud size={32} className="text-zinc-400 group-hover:text-black mb-3 transition-colors" />
                <p className="text-zinc-800 text-xs font-bold text-center">Clique para procurar no PC/Drive</p>
                <p className="text-zinc-500 text-[10px] mt-1 text-center">Pode selecionar várias fotos juntas</p>
                <input 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                  className="hidden" 
                />
              </label>
            </div>

            {/* Galeria de Preview das Imagens Carregadas */}
            {imagens.length > 0 && (
              <div className="grid grid-cols-3 gap-2 pt-4">
                {imagens.map((imgUrl, idx) => (
                  <div key={idx} className="aspect-[3/4] bg-zinc-100 relative rounded overflow-hidden group border border-zinc-200">
                    <img src={imgUrl} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remover Imagem"
                    >
                      <X size={12} />
                    </button>
                    {idx === 0 && (
                      <span className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[8px] font-bold text-center py-1 uppercase tracking-widest">Capa</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* BLOCO 4: Etiquetas / Tags (Promoção, Lançamento) */}
          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6 space-y-6">
            <h2 className="text-lg font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-100 pb-4">Etiquetas Especiais</h2>
            
            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-700">Adicionar Tag (Ex: 20% OFF, NOVO)</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  placeholder="Escreva e clique em +" 
                  className="w-full border-2 border-zinc-200 p-2 font-medium text-sm focus:border-amber-500 outline-none transition-colors" 
                />
                <button type="button" onClick={handleAddTag} className="bg-zinc-900 text-white p-2 hover:bg-amber-500 hover:text-black transition-colors">
                  <Plus size={20} />
                </button>
              </div>

              {/* Lista de Tags Adicionadas */}
              <div className="flex flex-wrap gap-2 pt-2">
                {tags.map(tag => (
                  <div key={tag} className="bg-red-600 text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 flex items-center gap-2 rounded-sm shadow-sm">
                    <Tag size={10} /> {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-200"><X size={12} /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-zinc-200 flex justify-end md:hidden">
        <button type="button" className="w-full bg-amber-500 text-black px-8 py-4 font-bold text-xs uppercase tracking-widest hover:bg-amber-400 transition-colors flex items-center justify-center gap-2">
          <Save size={16} /> Salvar Produto
        </button>
      </div>

    </div>
  );
}
