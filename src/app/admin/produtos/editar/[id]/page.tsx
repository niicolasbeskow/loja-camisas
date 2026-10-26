"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, UploadCloud, X, Plus, Tag } from 'lucide-react';
import { carregarProdutosStorage, atualizarProdutoStorage, Produto, Tamanho, Estoque } from '@/data/produtos';

export default function EditarProduto() {
  const router = useRouter();
  const params = useParams();
  const rawId = typeof params?.id === 'string' ? params.id : '';
  const paramId = decodeURIComponent(rawId).replace(/-/g, '').toUpperCase();

  const [produto, setProduto] = useState<Produto | null>(null);
  const [carregando, setCarregando] = useState(true);

  // Estados controlados para salvar de verdade
  const [nome, setNome] = useState('');
  const [codigo, setCodigo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [preco, setPreco] = useState(0);
  const [precoAntigo, setPrecoAntigo] = useState(0);
  const [precoKit2, setPrecoKit2] = useState(0);
  const [precoKit3, setPrecoKit3] = useState(0);
  const [especificacaoTecnica, setEspecificacaoTecnica] = useState('');
  const [descricao, setDescricao] = useState('');
  const [informacoesTecnicas, setInformacoesTecnicas] = useState('');
  const [lavagem, setLavagem] = useState('');
  const [corSelecionada, setCorSelecionada] = useState('Preto');
  const [estoque, setEstoque] = useState<Estoque>({ P: 0, M: 0, G: 0, GG: 0, XG: 0, G1: 0, G2: 0 });
  const [imagens, setImagens] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    const lista = carregarProdutosStorage();
    const encontrado = lista.find(p => 
      p.codigo.replace(/-/g, '').toUpperCase() === paramId || p.id === rawId
    );
    if (encontrado) {
      setProduto(encontrado);
      setNome(encontrado.nome);
      setCodigo(encontrado.codigo);
      setCategoria(encontrado.categoria);
      setPreco(encontrado.preco);
      setPrecoAntigo(encontrado.precoAntigo || 0);
      setPrecoKit2(encontrado.precoKit2 || 0);
      setPrecoKit3(encontrado.precoKit3 || 0);
      setEspecificacaoTecnica(encontrado.especificacaoTecnica || '');
      setDescricao(encontrado.descricao || '');
      setInformacoesTecnicas(encontrado.informacoesTecnicas || '');
      setLavagem(encontrado.lavagem || '');
      setCorSelecionada(encontrado.cor || 'Preto');
      setEstoque({ ...encontrado.estoque });
      setImagens(encontrado.imagens || []);
      setTags(encontrado.tags || []);
    }
    setCarregando(false);
  }, [paramId, rawId]);

  if (carregando) {
    return <div className="p-12 text-center font-bold uppercase tracking-widest text-xs text-zinc-400">Carregando dados do SKU...</div>;
  }

  if (!produto) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center font-outfit mt-12 bg-white rounded-xl border border-zinc-200">
        <p className="text-red-500 font-bold uppercase tracking-widest mb-4">SKU "{paramId}" não encontrado no catálogo.</p>
        <Link href="/admin/produtos" className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 text-xs font-bold uppercase tracking-widest rounded">
          <ArrowLeft size={14} /> Voltar para Gestão de SKUs
        </Link>
      </div>
    );
  }

  const categorias = [
    { label: "Collab (Em Breve)", value: "collab" },
    { label: "Kits", value: "kits" },
    { label: "Camiseta Básica", value: "camiseta-basica" },
    { label: "Camiseta Oversized", value: "camiseta-oversized" },
    { label: "Camiseta Suedine", value: "camiseta-suedine" },
    { label: "Camiseta Boxy", value: "camiseta-boxy" },
    { label: "Camiseta Poliamida", value: "camiseta-poliamida" },
    { label: "Manga Longa", value: "manga-longa" },
    { label: "Feminino", value: "feminino" },
    { label: "Moletom", value: "moletom" },
    { label: "Regata Oversized", value: "regata-oversized" },
    { label: "Shorts", value: "shorts" }
  ];

  const coresDisponiveis = [
    'Areia', 'Azul Bebê', 'Azul Envelhecido', 'Azul Estonado', 'Azul Marinho', 
    'Bordô', 'Branco', 'Chumbo', 'Cinza', 'Cinza Claro', 'Cinza Envelhecido', 
    'Cinza Escuro', 'Destroyed', 'Marrom', 'Off-White', 'Preto', 'Preto Estonado', 
    'Preto Vintage', 'Rosa Pastel', 'Roxo', 'Verde Claro', 'Verde Militar', 'Verde Musgo'
  ];
  
  const tamanhos: Tamanho[] = ["P", "M", "G", "GG", "XG", "G1", "G2"];

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
    if (tagInput.trim() && !tags.includes(tagInput.trim().toUpperCase())) {
      setTags([...tags, tagInput.trim().toUpperCase()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleEstoqueChange = (tam: Tamanho, valor: string) => {
    const qtd = parseInt(valor, 10);
    setEstoque(prev => ({ ...prev, [tam]: isNaN(qtd) ? 0 : qtd }));
  };

  const handleSave = () => {
    const produtoAtualizado: Produto = {
      ...produto,
      nome,
      codigo: codigo.toUpperCase(),
      categoria,
      preco: Number(preco) || 0,
      precoAntigo: Number(precoAntigo) || 0,
      precoKit2: Number(precoKit2) || 0,
      precoKit3: Number(precoKit3) || 0,
      especificacaoTecnica,
      descricao,
      informacoesTecnicas,
      lavagem,
      cor: corSelecionada,
      estoque,
      imagens,
      tags
    };

    atualizarProdutoStorage(produtoAtualizado);
    router.push('/admin/produtos');
  };

  return (
    <div className="max-w-6xl mx-auto pb-12 font-outfit">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <Link href="/admin/produtos" className="inline-flex items-center gap-2 text-zinc-500 hover:text-black text-xs font-bold uppercase tracking-widest transition-colors mb-4">
            <ArrowLeft size={14} /> Voltar para Produtos
          </Link>
          <h1 className="text-3xl font-anton uppercase text-zinc-900 tracking-wide">Editar Produto (SKU)</h1>
          <p className="text-zinc-500 text-sm mt-1 font-medium">
            Código URL: <strong className="text-black font-mono">{codigo.replace(/-/g, '')}</strong> • SKU Interno: <strong className="text-black font-mono">{codigo}</strong>
          </p>
        </div>
        <button type="button" onClick={handleSave} className="hidden md:flex bg-amber-500 text-black px-8 py-4 font-bold text-xs uppercase tracking-widest hover:bg-amber-400 transition-colors items-center gap-2 cursor-pointer">
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
                <input type="text" value={nome} onChange={e => setNome(e.target.value)} className="w-full border-2 border-zinc-200 p-3 font-medium text-sm focus:border-black outline-none transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-700">Código (SKU)</label>
                <input type="text" value={codigo} onChange={e => setCodigo(e.target.value)} className="w-full border-2 border-zinc-200 p-3 font-mono font-bold text-sm focus:border-amber-500 outline-none transition-colors uppercase" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-700">Categoria / Coleção</label>
              <select value={categoria} onChange={e => setCategoria(e.target.value)} className="w-full border-2 border-zinc-200 p-3 font-medium text-sm focus:border-black outline-none transition-colors bg-white">
                {categorias.map(cat => <option key={cat.value} value={cat.value}>{cat.label}</option>)}
              </select>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6 md:p-8 space-y-6">
            <h2 className="text-lg font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-100 pb-4">Precificação e Kits</h2>
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-700">Preço Principal (1 un)</label>
                <input type="number" step="0.01" value={preco} onChange={e => setPreco( parseFloat(e.target.value) || 0 )} className="w-full border-2 border-zinc-200 p-3 font-bold text-sm focus:border-black outline-none transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Preço Riscado (Antigo)</label>
                <input type="number" step="0.01" value={precoAntigo} onChange={e => setPrecoAntigo( parseFloat(e.target.value) || 0 )} className="w-full border-2 border-zinc-100 p-3 font-medium text-sm focus:border-zinc-300 outline-none transition-colors text-zinc-500" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Preço unit. (Kit c/ 2)</label>
                <input type="number" step="0.01" value={precoKit2} onChange={e => setPrecoKit2( parseFloat(e.target.value) || 0 )} className="w-full border-2 border-amber-100 bg-amber-50/30 p-3 font-bold text-sm focus:border-amber-400 outline-none transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Preço unit. (Kit c/ 3)</label>
                <input type="number" step="0.01" value={precoKit3} onChange={e => setPrecoKit3( parseFloat(e.target.value) || 0 )} className="w-full border-2 border-amber-100 bg-amber-50/30 p-3 font-bold text-sm focus:border-amber-400 outline-none transition-colors" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6 md:p-8 space-y-6">
            <h2 className="text-lg font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-100 pb-4">Detalhamento da Peça</h2>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-700">Especificação Técnica (Malha / Fio)</label>
              <input type="text" value={especificacaoTecnica} onChange={e => setEspecificacaoTecnica(e.target.value)} className="w-full border-2 border-zinc-200 p-3 font-medium text-sm focus:border-black outline-none transition-colors uppercase" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-700">Descrição Geral</label>
              <textarea rows={4} value={descricao} onChange={e => setDescricao(e.target.value)} className="w-full border-2 border-zinc-200 p-3 font-medium text-sm focus:border-black outline-none transition-colors resize-none"></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-700">Informações Técnicas</label>
                <textarea rows={4} value={informacoesTecnicas} onChange={e => setInformacoesTecnicas(e.target.value)} className="w-full border-2 border-zinc-200 p-3 font-medium text-sm focus:border-black outline-none transition-colors resize-none"></textarea>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-700">Instruções de Lavagem</label>
                <textarea rows={4} value={lavagem} onChange={e => setLavagem(e.target.value)} className="w-full border-2 border-zinc-200 p-3 font-medium text-sm focus:border-black outline-none transition-colors resize-none"></textarea>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6 md:p-8 space-y-6">
            <h2 className="text-lg font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-100 pb-4">Cor e Estoque deste SKU</h2>
            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-700">Cor da Peça</label>
              <div className="flex flex-wrap gap-2">
                {coresDisponiveis.map(cor => (
                  <button 
                    key={cor}
                    type="button"
                    onClick={() => setCorSelecionada(cor)}
                    className={`px-3 py-1.5 border-2 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                      corSelecionada === cor 
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
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-700">Estoque por Tamanho</label>
              <div className="grid grid-cols-4 md:grid-cols-7 gap-2 md:gap-3">
                {tamanhos.map(tamanho => (
                  <div key={tamanho} className="space-y-1 text-center">
                    <div className="w-full bg-zinc-100 py-1.5 text-xs font-bold uppercase">{tamanho}</div>
                    <input 
                      type="number" 
                      value={estoque[tamanho] ?? 0} 
                      onChange={e => handleEstoqueChange(tamanho, e.target.value)}
                      min="0" 
                      className="w-full border-2 border-zinc-200 p-2 text-center font-medium text-sm focus:border-black outline-none transition-colors" 
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        <div className="space-y-6 md:space-y-8">
          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6 space-y-6">
            <h2 className="text-lg font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-100 pb-4">Multimídia</h2>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-700">Fotos do Produto</label>
              <label className="border-2 border-dashed border-zinc-300 rounded-lg p-6 flex flex-col items-center justify-center bg-zinc-50 hover:bg-zinc-100 transition-colors cursor-pointer group">
                <UploadCloud size={28} className="text-zinc-400 group-hover:text-black mb-2 transition-colors" />
                <p className="text-zinc-800 text-xs font-bold text-center">Adicionar mais fotos</p>
                <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>

            {imagens.length > 0 && (
              <div className="grid grid-cols-2 gap-2 pt-2">
                {imagens.map((imgUrl, idx) => (
                  <div key={idx} className="aspect-[3/4] bg-zinc-100 relative rounded overflow-hidden group border border-zinc-200">
                    <img src={imgUrl} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                    <button type="button" onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      <X size={12} />
                    </button>
                    {idx === 0 && <span className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[8px] font-bold text-center py-1 uppercase tracking-widest">Capa</span>}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6 space-y-6">
            <h2 className="text-lg font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-100 pb-4">Etiquetas</h2>
            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-700">Tag de Promoção / Novo</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  placeholder="Ex: 20% OFF" 
                  className="w-full border-2 border-zinc-200 p-2 font-medium text-sm focus:border-amber-500 outline-none transition-colors uppercase" 
                />
                <button type="button" onClick={handleAddTag} className="bg-zinc-900 text-white p-2 hover:bg-amber-500 hover:text-black transition-colors">
                  <Plus size={20} />
                </button>
              </div>
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
        <button type="button" onClick={handleSave} className="w-full bg-amber-500 text-black px-8 py-4 font-bold text-xs uppercase tracking-widest hover:bg-amber-400 transition-colors flex items-center justify-center gap-2">
          <Save size={16} /> Salvar Alterações
        </button>
      </div>
    </div>
  );
}
