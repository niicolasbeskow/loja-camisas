export type Tamanho = 'P' | 'M' | 'G' | 'GG' | 'XG' | 'G1' | 'G2';

export interface Estoque {
  P: number; M: number; G: number; GG: number; XG: number; G1: number; G2: number;
}

export interface Produto {
  id: string; codigo: string; nome: string; categoria: string; preco: number;
  precoAntigo: number; precoKit2: number; precoKit3: number; tags: string[];
  especificacaoTecnica: string; precoOriginal: number; precoKit: number; 
  hex: string; tag: string; tamanhos: Tamanho[]; cor: string; promocao: boolean;
  imagens: string[]; estoque: Estoque; descricao: string; informacoesTecnicas: string; lavagem: string;
}

const estoqueZerado: Estoque = { P: 0, M: 0, G: 0, GG: 0, XG: 0, G1: 0, G2: 0 };
const tamanhosPadrao: Tamanho[] = ['P', 'M', 'G', 'GG', 'XG', 'G1', 'G2'];

// Mapas base de preços para manter a sua marca com posicionamento premium (você pode editar depois no Admin)
const precosBase: Record<string, { preco: number; antigo: number }> = {
  'camiseta-basica': { preco: 87.90, antigo: 129.90 },
  'camiseta-oversized': { preco: 111.90, antigo: 169.90 },
  'camiseta-suedine': { preco: 119.90, antigo: 159.90 },
  'camiseta-boxy': { preco: 105.90, antigo: 139.90 },
  'camiseta-poliamida': { preco: 79.90, antigo: 99.90 },
  'manga-longa': { preco: 119.90, antigo: 149.90 },
  'feminino': { preco: 79.90, antigo: 99.90 },
  'moletom': { preco: 219.90, antigo: 289.90 },
  'regata-oversized': { preco: 84.90, antigo: 109.90 },
  'shorts': { preco: 129.90, antigo: 169.90 }
};

const dadosBrutos = [
  // BÁSICAS (12)
  { cat: 'camiseta-basica', nome: 'Camiseta Básica B.SKW Preto', cor: 'Preto', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'BAS-PRT-01', hex: '#18181b' },
  { cat: 'camiseta-basica', nome: 'Camiseta Básica B.SKW Off White', cor: 'Off-White', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'BAS-OFF-01', hex: '#F5F5F0' },
  { cat: 'camiseta-basica', nome: 'Camiseta Básica B.SKW Marrom', cor: 'Marrom', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'BAS-MRM-01', hex: '#4A3728' },
  { cat: 'camiseta-basica', nome: 'Camiseta Básica B.SKW Branca', cor: 'Branco', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'BAS-BCO-01', hex: '#FFFFFF' },
  { cat: 'camiseta-basica', nome: 'Camiseta Básica B.SKW Azul Marinho', cor: 'Azul Marinho', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'BAS-AZM-01', hex: '#1e3a8a' },
  { cat: 'camiseta-basica', nome: 'Camiseta Básica B.SKW Cinza Envelhecido', cor: 'Cinza', espec: '180 g/m² Fio 26.1 • 100% Algodão', sku: 'BAS-CZE-01', hex: '#71717a' },
  { cat: 'camiseta-basica', nome: 'Camiseta Básica B.SKW Preto Estonado', cor: 'Preto Estonado', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'BAS-PRE-01', hex: '#27272a' },
  { cat: 'camiseta-basica', nome: 'Camiseta Básica B.SKW Verde Claro', cor: 'Verde Claro', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'BAS-VDC-01', hex: '#a3e635' },
  { cat: 'camiseta-basica', nome: 'Camiseta Básica B.SKW Bordô', cor: 'Bordô', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'BAS-BRD-01', hex: '#7f1d1d' },
  { cat: 'camiseta-basica', nome: 'Camiseta Básica B.SKW Verde Militar', cor: 'Verde Militar', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'BAS-VDM-01', hex: '#3f6212' },
  { cat: 'camiseta-basica', nome: 'Camiseta Básica B.SKW Roxo', cor: 'Roxo', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'BAS-ROX-01', hex: '#581c87' },
  { cat: 'camiseta-basica', nome: 'Camiseta Básica B.SKW Azul Envelhecido', cor: 'Azul Envelhecido', espec: '180 g/m² Fio 26.1 • 100% Algodão', sku: 'BAS-AZE-01', hex: '#3b82f6' },

  // OVERSIZED (14)
  { cat: 'camiseta-oversized', nome: 'Camiseta Oversized B.SKW Preto', cor: 'Preto', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'OVS-PRT-01', hex: '#18181b' },
  { cat: 'camiseta-oversized', nome: 'Camiseta Oversized B.SKW Off White', cor: 'Off-White', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'OVS-OFF-01', hex: '#F5F5F0' },
  { cat: 'camiseta-oversized', nome: 'Camiseta Oversized B.SKW Branca', cor: 'Branco', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'OVS-BCO-01', hex: '#FFFFFF' },
  { cat: 'camiseta-oversized', nome: 'Camiseta Oversized B.SKW Marrom', cor: 'Marrom', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'OVS-MRM-01', hex: '#4A3728' },
  { cat: 'camiseta-oversized', nome: 'Camiseta Oversized B.SKW Preto Estonado', cor: 'Preto Estonado', espec: '180 g/m² Fio 26.1 • 100% Algodão', sku: 'OVS-PRE-01', hex: '#27272a' },
  { cat: 'camiseta-oversized', nome: 'Camiseta Oversized B.SKW Azul Marinho', cor: 'Azul Marinho', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'OVS-AZM-01', hex: '#1e3a8a' },
  { cat: 'camiseta-oversized', nome: 'Camiseta Oversized B.SKW Destroyed', cor: 'Preto', espec: '180 g/m² Fio 26.1 • 100% Algodão', sku: 'OVS-DES-01', hex: '#3f3f46' },
  { cat: 'camiseta-oversized', nome: 'Camiseta Oversized B.SKW Azul Estonado', cor: 'Azul Estonado', espec: '180 g/m² Fio 26.1 • 100% Algodão', sku: 'OVS-AZE-01', hex: '#3b82f6' },
  { cat: 'camiseta-oversized', nome: 'Camiseta Oversized B.SKW Verde Claro', cor: 'Verde Claro', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'OVS-VDC-01', hex: '#a3e635' },
  { cat: 'camiseta-oversized', nome: 'Camiseta Oversized B.SKW Cinza Envelhecido', cor: 'Cinza', espec: '180 g/m² Fio 26.1 • 100% Algodão', sku: 'OVS-CZE-01', hex: '#71717a' },
  { cat: 'camiseta-oversized', nome: 'Camiseta Oversized B.SKW Roxo', cor: 'Roxo', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'OVS-ROX-01', hex: '#581c87' },
  { cat: 'camiseta-oversized', nome: 'Camiseta Oversized B.SKW Verde Militar', cor: 'Verde Militar', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'OVS-VDM-01', hex: '#3f6212' },
  { cat: 'camiseta-oversized', nome: 'Camiseta Oversized B.SKW Bordô', cor: 'Bordô', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'OVS-BRD-01', hex: '#7f1d1d' },
  { cat: 'camiseta-oversized', nome: 'Camiseta Oversized B.SKW Azul Envelhecido', cor: 'Azul Envelhecido', espec: '180 g/m² Fio 26.1 • 100% Algodão', sku: 'OVS-AZV-01', hex: '#1e40af' },

  // SUEDINE (4)
  { cat: 'camiseta-suedine', nome: 'Camiseta Suedine B.SKW Preta', cor: 'Preto', espec: '250 g/m² Fio 40.1 • 100% Algodão', sku: 'SUE-PRT-01', hex: '#18181b' },
  { cat: 'camiseta-suedine', nome: 'Camiseta Suedine B.SKW Off White', cor: 'Off-White', espec: '250 g/m² Fio 40.1 • 100% Algodão', sku: 'SUE-OFF-01', hex: '#F5F5F0' },
  { cat: 'camiseta-suedine', nome: 'Camiseta Suedine B.SKW Marrom', cor: 'Marrom', espec: '250 g/m² Fio 40.1 • 100% Algodão', sku: 'SUE-MRM-01', hex: '#4A3728' },
  { cat: 'camiseta-suedine', nome: 'Camiseta Suedine B.SKW Cinza', cor: 'Cinza', espec: '230 g/m² Fio 40.1 • 100% Algodão', sku: 'SUE-CZA-01', hex: '#a1a1aa' },

  // BOXY (3)
  { cat: 'camiseta-boxy', nome: 'Camiseta Boxy B.SKW Preto', cor: 'Preto', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'BOX-PRT-01', hex: '#18181b' },
  { cat: 'camiseta-boxy', nome: 'Camiseta Boxy B.SKW Off White', cor: 'Off-White', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'BOX-OFF-01', hex: '#F5F5F0' },
  { cat: 'camiseta-boxy', nome: 'Camiseta Boxy B.SKW Azul Marinho', cor: 'Azul Marinho', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'BOX-AZM-01', hex: '#1e3a8a' },

  // POLIAMIDA (2)
  { cat: 'camiseta-poliamida', nome: 'Camiseta Ultra Tech B.SKW Preto', cor: 'Preto', espec: '122g/m² • 100% Poliamida', sku: 'POL-PRT-01', hex: '#18181b' },
  { cat: 'camiseta-poliamida', nome: 'Camiseta Ultra Tech B.SKW Branca', cor: 'Branco', espec: '122g/m² • 100% Poliamida', sku: 'POL-BCO-01', hex: '#FFFFFF' },

  // MANGA LONGA (2)
  { cat: 'manga-longa', nome: 'Manga Longa B.SKW Azul Estonado', cor: 'Azul Estonado', espec: '180 g/m² Fio 26.1 • 100% Algodão', sku: 'MLG-AZE-01', hex: '#3b82f6' },
  { cat: 'manga-longa', nome: 'Manga Longa B.SKW Preto Vintage', cor: 'Preto Vintage', espec: '180 g/m² Fio 26.1 • 100% Algodão', sku: 'MLG-PRV-01', hex: '#27272a' },

  // FEMININO (6)
  { cat: 'feminino', nome: 'Baby Look B.SKW Preta', cor: 'Preto', espec: '190g/m² Fio 26.1 • 96% Algodão 4% Elastano', sku: 'FEM-BBP-01', hex: '#18181b' },
  { cat: 'feminino', nome: 'Baby Look B.SKW Off White', cor: 'Off-White', espec: '190g/m² Fio 26.1 • 96% Algodão 4% Elastano', sku: 'FEM-BBO-01', hex: '#F5F5F0' },
  { cat: 'feminino', nome: 'Baby Look B.SKW Verde Militar', cor: 'Verde Militar', espec: '190g/m² Fio 26.1 • 96% Algodão 4% Elastano', sku: 'FEM-BBV-01', hex: '#3f6212' },
  { cat: 'feminino', nome: 'Cropped Oversized Suedine B.SKW Preto', cor: 'Preto', espec: '250 g/m² Fio 40.1 • 100% Algodão', sku: 'FEM-CRP-01', hex: '#18181b' },
  { cat: 'feminino', nome: 'Cropped Oversized Suedine B.SKW Off White', cor: 'Off-White', espec: '250 g/m² Fio 40.1 • 100% Algodão', sku: 'FEM-CRO-01', hex: '#F5F5F0' },
  { cat: 'feminino', nome: 'Cropped Oversized Suedine B.SKW Marrom', cor: 'Marrom', espec: '250 g/m² Fio 40.1 • 100% Algodão', sku: 'FEM-CRM-01', hex: '#4A3728' },

  // MOLETOM (6)
  { cat: 'moletom', nome: 'Moletom Oversized B.SKW Preto', cor: 'Preto', espec: '300 g/m² • 75% Algodão 25% Poliéster', sku: 'MOL-OVP-01', hex: '#18181b' },
  { cat: 'moletom', nome: 'Moletom Oversized B.SKW Off White', cor: 'Off-White', espec: '300 g/m² • 75% Algodão 25% Poliéster', sku: 'MOL-OVO-01', hex: '#F5F5F0' },
  { cat: 'moletom', nome: 'Moletom Canguru com Capuz B.SKW Preto', cor: 'Preto', espec: '320 g/m² • 50% Algodão 50% Poliéster', capuz: true, sku: 'MOL-CAP-01', hex: '#18181b' },
  { cat: 'moletom', nome: 'Moletom Canguru com Capuz B.SKW Marrom', cor: 'Marrom', espec: '320 g/m² • 50% Algodão 50% Poliéster', capuz: true, sku: 'MOL-CAM-01', hex: '#4A3728' },
  { cat: 'moletom', nome: 'Calça Moletom Comfort B.SKW Preta', cor: 'Preto', espec: '320 g/m² • 50% Algodão 50% Poliéster', calca: true, sku: 'CAL-MOP-01', hex: '#18181b' },
  { cat: 'moletom', nome: 'Calça Moletom Comfort B.SKW Marrom', cor: 'Marrom', espec: '320 g/m² • 50% Algodão 50% Poliéster', calca: true, sku: 'CAL-MOM-01', hex: '#4A3728' },

  // REGATA OVERSIZED (1)
  { cat: 'regata-oversized', nome: 'Regata Oversized B.SKW Preto Vintage', cor: 'Preto Vintage', espec: '180 g/m² Fio 26.1 • 100% Algodão', sku: 'REG-PRV-01', hex: '#27272a' },

  // SHORTS (4)
  { cat: 'shorts', nome: 'Shorts Masculino Poliamida B.SKW Preto', cor: 'Preto', espec: '83% Poliamida 17% Elastano', sku: 'SHT-PRT-01', hex: '#18181b' },
  { cat: 'shorts', nome: 'Shorts Masculino Poliamida B.SKW Cinza Escuro', cor: 'Cinza Escuro', espec: '83% Poliamida 17% Elastano', sku: 'SHT-CZE-01', hex: '#3f3f46' },
  { cat: 'shorts', nome: 'Shorts Masculino Poliamida B.SKW Azul Marinho', cor: 'Azul Marinho', espec: '83% Poliamida 17% Elastano', sku: 'SHT-AZM-01', hex: '#1e3a8a' },
  { cat: 'shorts', nome: 'Shorts Masculino Poliamida B.SKW Cinza Claro', cor: 'Cinza Claro', espec: '83% Poliamida 17% Elastano', sku: 'SHT-CZC-01', hex: '#d4d4d8' }
];

export const produtosIniciais: Produto[] = dadosBrutos.map((d, i) => {
  const pBase = precosBase[d.cat] || { preco: 89.90, antigo: 129.90 };
  return {
    id: String(i + 1),
    codigo: `BSKW-${d.sku}`,
    nome: d.nome,
    categoria: d.cat,
    preco: pBase.preco,
    precoAntigo: pBase.antigo,
    precoOriginal: pBase.antigo,
    precoKit2: pBase.preco * 0.9, 
    precoKit3: pBase.preco * 0.85, 
    precoKit: pBase.preco * 0.9,
    cor: d.cor,
    hex: d.hex,
    especificacaoTecnica: d.espec,
    tags: ['Lançamento'],
    tag: 'Lançamento',
    tamanhos: tamanhosPadrao,
    promocao: true,
    imagens: [], // Sem imagens conforme solicitado
    estoque: { ...estoqueZerado }, // 100% Zerado conforme solicitado
    descricao: `Peça oficial B.SKW desenvolvida para máxima qualidade e durabilidade. \n\n${d.espec}`,
    informacoesTecnicas: '• Modelagem premium\n• Costuras reforçadas\n• Alta durabilidade\n• Etiqueta interna B.SKW',
    lavagem: '• Lavar à máquina com água fria\n• Secar à sombra\n• Não utilizar alvejante\n• Passar a ferro em temperatura média'
  };
});

export let produtos: Produto[] = [...produtosIniciais];

const STORAGE_KEY = 'bskw_catalogo_v3'; // <--- CHAVE V3 OBRIGA O NAVEGADOR A CARREGAR OS 54 ITENS NOVOS

export const carregarProdutosStorage = (): Produto[] => {
  if (typeof window === 'undefined') return produtos;
  const salvo = localStorage.getItem(STORAGE_KEY);
  if (salvo) {
    try {
      produtos = JSON.parse(salvo);
      return produtos;
    } catch (e) {
      console.error(e);
    }
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(produtosIniciais));
  }
  return produtos;
};

export const atualizarProdutoStorage = (produtoEditado: Produto) => {
  const lista = carregarProdutosStorage();
  const idx = lista.findIndex(p => p.id === produtoEditado.id || p.codigo.replace(/-/g, '').toUpperCase() === produtoEditado.codigo.replace(/-/g, '').toUpperCase());
  
  const produtoSincronizado: Produto = {
    ...produtoEditado,
    precoOriginal: produtoEditado.precoAntigo,
    precoKit: produtoEditado.precoKit2,
    tag: produtoEditado.tags[0] || '',
    promocao: produtoEditado.precoAntigo > produtoEditado.preco
  };

  if (idx >= 0) {
    lista[idx] = produtoSincronizado;
  } else {
    lista.push(produtoSincronizado);
  }
  produtos = [...lista];
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(produtos));
  }
};

export const excluirProdutoStorage = (id: string) => {
  const lista = carregarProdutosStorage().filter(p => p.id !== id);
  produtos = [...lista];
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(produtos));
  }
  return produtos;
};

export const getProdutoPorId = (id: string) => {
  const lista = carregarProdutosStorage();
  const limpo = id.replace(/-/g, '').toUpperCase();
  return lista.find(p => p.id === id || p.codigo.replace(/-/g, '').toUpperCase() === limpo);
};

export const getProdutosPorCategoria = (categoria: string) => {
  const lista = carregarProdutosStorage();
  return lista.filter(p => p.categoria === categoria);
};
