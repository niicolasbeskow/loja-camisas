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

// FUNÇÃO DE PRECIFICAÇÃO E ARREDONDAMENTO B.SKW
// Arredonda para o final 4,90 ou 9,90 mais próximo.
const arredondar = (valor: number): number => {
  return Math.round(valor / 5) * 5 - 0.10;
};

// DADOS BRUTOS DA PIONERA (Preço Normal / Preço Atacado)
const dadosBrutos = [
  // BÁSICAS
  { cat: 'camiseta-basica', nome: 'Camiseta Básica B.SKW Preto', cor: 'Preto', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'BAS-PRT-01', hex: '#18181b', n: 48.90, a: 34.90 },
  { cat: 'camiseta-basica', nome: 'Camiseta Básica B.SKW Off White', cor: 'Off-White', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'BAS-OFF-01', hex: '#F5F5F0', n: 48.90, a: 34.90 },
  { cat: 'camiseta-basica', nome: 'Camiseta Básica B.SKW Marrom', cor: 'Marrom', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'BAS-MRM-01', hex: '#4A3728', n: 53.90, a: 39.90 },
  { cat: 'camiseta-basica', nome: 'Camiseta Básica B.SKW Branca', cor: 'Branco', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'BAS-BCO-01', hex: '#FFFFFF', n: 51.90, a: 36.90 },
  { cat: 'camiseta-basica', nome: 'Camiseta Básica B.SKW Azul Marinho', cor: 'Azul Marinho', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'BAS-AZM-01', hex: '#1e3a8a', n: 53.90, a: 39.90 },
  { cat: 'camiseta-basica', nome: 'Camiseta Básica B.SKW Cinza Envelhecido', cor: 'Cinza Envelhecido', espec: '180 g/m² Fio 26.1 • 100% Algodão', sku: 'BAS-CZE-01', hex: '#71717a', n: 63.90, a: 49.90 },
  { cat: 'camiseta-basica', nome: 'Camiseta Básica B.SKW Preto Estonado', cor: 'Preto Estonado', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'BAS-PRE-01', hex: '#27272a', n: 63.90, a: 49.90 },
  { cat: 'camiseta-basica', nome: 'Camiseta Básica B.SKW Verde Claro', cor: 'Verde Claro', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'BAS-VDC-01', hex: '#a3e635', n: 53.90, a: 39.90 },
  { cat: 'camiseta-basica', nome: 'Camiseta Básica B.SKW Bordô', cor: 'Bordô', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'BAS-BRD-01', hex: '#7f1d1d', n: 53.90, a: 39.90 },
  { cat: 'camiseta-basica', nome: 'Camiseta Básica B.SKW Verde Militar', cor: 'Verde Militar', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'BAS-VDM-01', hex: '#3f6212', n: 53.90, a: 39.90 },
  { cat: 'camiseta-basica', nome: 'Camiseta Básica B.SKW Roxo', cor: 'Roxo', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'BAS-ROX-01', hex: '#581c87', n: 53.90, a: 39.90 },
  { cat: 'camiseta-basica', nome: 'Camiseta Básica B.SKW Azul Envelhecido', cor: 'Azul Envelhecido', espec: '180 g/m² Fio 26.1 • 100% Algodão', sku: 'BAS-AZE-01', hex: '#3b82f6', n: 68.90, a: 54.90 },

  // OVERSIZED
  { cat: 'camiseta-oversized', nome: 'Camiseta Oversized B.SKW Preto', cor: 'Preto', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'OVS-PRT-01', hex: '#18181b', n: 59.90, a: 43.90 },
  { cat: 'camiseta-oversized', nome: 'Camiseta Oversized B.SKW Off White', cor: 'Off-White', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'OVS-OFF-01', hex: '#F5F5F0', n: 59.90, a: 43.90 },
  { cat: 'camiseta-oversized', nome: 'Camiseta Oversized B.SKW Branca', cor: 'Branco', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'OVS-BCO-01', hex: '#FFFFFF', n: 61.90, a: 45.90 },
  { cat: 'camiseta-oversized', nome: 'Camiseta Oversized B.SKW Marrom', cor: 'Marrom', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'OVS-MRM-01', hex: '#4A3728', n: 63.90, a: 47.90 },
  { cat: 'camiseta-oversized', nome: 'Camiseta Oversized B.SKW Preto Estonado', cor: 'Preto Estonado', espec: '180 g/m² Fio 26.1 • 100% Algodão', sku: 'OVS-PRE-01', hex: '#27272a', n: 83.90, a: 67.90 },
  { cat: 'camiseta-oversized', nome: 'Camiseta Oversized B.SKW Azul Marinho', cor: 'Azul Marinho', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'OVS-AZM-01', hex: '#1e3a8a', n: 63.90, a: 47.90 },
  { cat: 'camiseta-oversized', nome: 'Camiseta Oversized B.SKW Destroyed', cor: 'Destroyed', espec: '180 g/m² Fio 26.1 • 100% Algodão', sku: 'OVS-DES-01', hex: '#3f3f46', n: 83.90, a: 67.90 },
  { cat: 'camiseta-oversized', nome: 'Camiseta Oversized B.SKW Azul Estonado', cor: 'Azul Estonado', espec: '180 g/m² Fio 26.1 • 100% Algodão', sku: 'OVS-AZE-01', hex: '#3b82f6', n: 83.90, a: 67.90 },
  { cat: 'camiseta-oversized', nome: 'Camiseta Oversized B.SKW Verde Claro', cor: 'Verde Claro', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'OVS-VDC-01', hex: '#a3e635', n: 63.90, a: 47.90 },
  { cat: 'camiseta-oversized', nome: 'Camiseta Oversized B.SKW Cinza Envelhecido', cor: 'Cinza Envelhecido', espec: '180 g/m² Fio 26.1 • 100% Algodão', sku: 'OVS-CZE-01', hex: '#71717a', n: 83.90, a: 67.90 },
  { cat: 'camiseta-oversized', nome: 'Camiseta Oversized B.SKW Roxo', cor: 'Roxo', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'OVS-ROX-01', hex: '#581c87', n: 63.90, a: 47.90 },
  { cat: 'camiseta-oversized', nome: 'Camiseta Oversized B.SKW Verde Militar', cor: 'Verde Militar', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'OVS-VDM-01', hex: '#3f6212', n: 63.90, a: 47.90 },
  { cat: 'camiseta-oversized', nome: 'Camiseta Oversized B.SKW Bordô', cor: 'Bordô', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'OVS-BRD-01', hex: '#7f1d1d', n: 63.90, a: 47.90 },
  { cat: 'camiseta-oversized', nome: 'Camiseta Oversized B.SKW Azul Envelhecido', cor: 'Azul Envelhecido', espec: '180 g/m² Fio 26.1 • 100% Algodão', sku: 'OVS-AZV-01', hex: '#1e40af', n: 83.90, a: 67.90 },

  // SUEDINE
  { cat: 'camiseta-suedine', nome: 'Camiseta Suedine B.SKW Preta', cor: 'Preto', espec: '250 g/m² Fio 40.1 • 100% Algodão', sku: 'SUE-PRT-01', hex: '#18181b', n: 84.90, a: 69.90 },
  { cat: 'camiseta-suedine', nome: 'Camiseta Suedine B.SKW Off White', cor: 'Off-White', espec: '250 g/m² Fio 40.1 • 100% Algodão', sku: 'SUE-OFF-01', hex: '#F5F5F0', n: 84.90, a: 69.90 },
  { cat: 'camiseta-suedine', nome: 'Camiseta Suedine B.SKW Marrom', cor: 'Marrom', espec: '250 g/m² Fio 40.1 • 100% Algodão', sku: 'SUE-MRM-01', hex: '#4A3728', n: 84.90, a: 69.90 },
  { cat: 'camiseta-suedine', nome: 'Camiseta Suedine B.SKW Cinza', cor: 'Cinza', espec: '230 g/m² Fio 40.1 • 100% Algodão', sku: 'SUE-CZA-01', hex: '#a1a1aa', n: 99.90, a: 89.90 },

  // BOXY
  { cat: 'camiseta-boxy', nome: 'Camiseta Boxy B.SKW Preto', cor: 'Preto', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'BOX-PRT-01', hex: '#18181b', n: 54.90, a: 39.90 },
  { cat: 'camiseta-boxy', nome: 'Camiseta Boxy B.SKW Off White', cor: 'Off-White', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'BOX-OFF-01', hex: '#F5F5F0', n: 54.90, a: 39.90 },
  { cat: 'camiseta-boxy', nome: 'Camiseta Boxy B.SKW Azul Marinho', cor: 'Azul Marinho', espec: '200 g/m² Fio 26.1 • 100% Algodão', sku: 'BOX-AZM-01', hex: '#1e3a8a', n: 54.90, a: 39.90 },

  // POLIAMIDA
  { cat: 'camiseta-poliamida', nome: 'Camiseta Ultra Tech B.SKW Preto', cor: 'Preto', espec: '122g/m² • 100% Poliamida', sku: 'POL-PRT-01', hex: '#18181b', n: 59.90, a: 44.90 },
  { cat: 'camiseta-poliamida', nome: 'Camiseta Ultra Tech B.SKW Branca', cor: 'Branco', espec: '122g/m² • 100% Poliamida', sku: 'POL-BCO-01', hex: '#FFFFFF', n: 59.90, a: 44.90 },

  // MANGA LONGA
  { cat: 'manga-longa', nome: 'Manga Longa B.SKW Azul Estonado', cor: 'Azul Estonado', espec: '180 g/m² Fio 26.1 • 100% Algodão', sku: 'MLG-AZE-01', hex: '#3b82f6', n: 99.90, a: 79.90 },
  { cat: 'manga-longa', nome: 'Manga Longa B.SKW Preto Vintage', cor: 'Preto Vintage', espec: '180 g/m² Fio 26.1 • 100% Algodão', sku: 'MLG-PRV-01', hex: '#27272a', n: 99.90, a: 79.90 },

  // FEMININO
  { cat: 'feminino', nome: 'Baby Look B.SKW Preta', cor: 'Preto', espec: '190g/m² Fio 26.1 • 96% Algodão', sku: 'FEM-BBP-01', hex: '#18181b', n: 43.90, a: 29.90 },
  { cat: 'feminino', nome: 'Baby Look B.SKW Off White', cor: 'Off-White', espec: '190g/m² Fio 26.1 • 96% Algodão', sku: 'FEM-BBO-01', hex: '#F5F5F0', n: 43.90, a: 29.90 },
  { cat: 'feminino', nome: 'Baby Look B.SKW Verde Militar', cor: 'Verde Militar', espec: '190g/m² Fio 26.1 • 96% Algodão', sku: 'FEM-BBV-01', hex: '#3f6212', n: 43.90, a: 29.90 },
  { cat: 'feminino', nome: 'Cropped Oversized Suedine B.SKW Preto', cor: 'Preto', espec: '250 g/m² Fio 40.1 • 100% Algodão', sku: 'FEM-CRP-01', hex: '#18181b', n: 59.90, a: 49.90 },
  { cat: 'feminino', nome: 'Cropped Oversized Suedine B.SKW Off White', cor: 'Off-White', espec: '250 g/m² Fio 40.1 • 100% Algodão', sku: 'FEM-CRO-01', hex: '#F5F5F0', n: 59.90, a: 49.90 },
  { cat: 'feminino', nome: 'Cropped Oversized Suedine B.SKW Marrom', cor: 'Marrom', espec: '250 g/m² Fio 40.1 • 100% Algodão', sku: 'FEM-CRM-01', hex: '#4A3728', n: 59.90, a: 49.90 },

  // MOLETOM
  { cat: 'moletom', nome: 'Moletom Oversized B.SKW Preto', cor: 'Preto', espec: '300 g/m² • 75% Algodão 25% Poliéster', sku: 'MOL-OVP-01', hex: '#18181b', n: 99.90, a: 79.90 },
  { cat: 'moletom', nome: 'Moletom Oversized B.SKW Off White', cor: 'Off-White', espec: '300 g/m² • 75% Algodão 25% Poliéster', sku: 'MOL-OVO-01', hex: '#F5F5F0', n: 99.90, a: 79.90 },
  { cat: 'moletom', nome: 'Moletom Canguru com Capuz B.SKW Preto', cor: 'Preto', espec: '320 g/m² • 50% Algodão 50% Poliéster', sku: 'MOL-CAP-01', hex: '#18181b', n: 189.90, a: 129.90 },
  { cat: 'moletom', nome: 'Moletom Canguru com Capuz B.SKW Marrom', cor: 'Marrom', espec: '320 g/m² • 50% Algodão 50% Poliéster', sku: 'MOL-CAM-01', hex: '#4A3728', n: 189.90, a: 129.90 },
  { cat: 'moletom', nome: 'Calça Moletom Comfort B.SKW Preta', cor: 'Preto', espec: '320 g/m² • 50% Algodão 50% Poliéster', sku: 'CAL-MOP-01', hex: '#18181b', n: 169.90, a: 119.90 },
  { cat: 'moletom', nome: 'Calça Moletom Comfort B.SKW Marrom', cor: 'Marrom', espec: '320 g/m² • 50% Algodão 50% Poliéster', sku: 'CAL-MOM-01', hex: '#4A3728', n: 169.90, a: 119.90 },

  // REGATA
  { cat: 'regata-oversized', nome: 'Regata Oversized B.SKW Preto Vintage', cor: 'Preto Vintage', espec: '180 g/m² Fio 26.1 • 100% Algodão', sku: 'REG-PRV-01', hex: '#27272a', n: 74.90, a: 57.90 },

  // SHORTS
  { cat: 'shorts', nome: 'Shorts Masculino Poliamida B.SKW Preto', cor: 'Preto', espec: '83% Poliamida 17% Elastano', sku: 'SHT-PRT-01', hex: '#18181b', n: 99.90, a: 69.90 },
  { cat: 'shorts', nome: 'Shorts Masculino Poliamida B.SKW Cinza Escuro', cor: 'Cinza Escuro', espec: '83% Poliamida 17% Elastano', sku: 'SHT-CZE-01', hex: '#3f3f46', n: 99.90, a: 69.90 },
  { cat: 'shorts', nome: 'Shorts Masculino Poliamida B.SKW Azul Marinho', cor: 'Azul Marinho', espec: '83% Poliamida 17% Elastano', sku: 'SHT-AZM-01', hex: '#1e3a8a', n: 99.90, a: 69.90 },
  { cat: 'shorts', nome: 'Shorts Masculino Poliamida B.SKW Cinza Claro', cor: 'Cinza Claro', espec: '83% Poliamida 17% Elastano', sku: 'SHT-CZC-01', hex: '#d4d4d8', n: 99.90, a: 69.90 }
];

export const produtosIniciais: Produto[] = dadosBrutos.map((d, i) => {
  // A Matemática Automática B.SKW
  const precoCalculado = arredondar(d.a * 2.25);
  const precoRiscado = arredondar(d.n * 2.25);
  const valorKit2 = arredondar(d.a * 2.00); // 100%
  const valorKit3 = arredondar(d.a * 1.90); // 90%

  return {
    id: String(i + 1),
    codigo: `BSKW-${d.sku}`,
    nome: d.nome,
    categoria: d.cat,
    preco: precoCalculado,
    precoAntigo: precoRiscado,
    precoOriginal: precoRiscado,
    precoKit2: valorKit2,
    precoKit3: valorKit3,
    precoKit: valorKit2,
    cor: d.cor,
    hex: d.hex,
    especificacaoTecnica: d.espec,
    tags: ['Lançamento'],
    tag: 'Lançamento',
    tamanhos: tamanhosPadrao,
    promocao: precoRiscado > precoCalculado,
    imagens: [],
    estoque: { ...estoqueZerado },
    descricao: `Peça oficial B.SKW desenvolvida para máxima qualidade e durabilidade. \n\n${d.espec}`,
    informacoesTecnicas: '• Modelagem premium\n• Costuras reforçadas\n• Alta durabilidade\n• Etiqueta interna B.SKW',
    lavagem: '• Lavar à máquina com água fria\n• Secar à sombra\n• Não utilizar alvejante\n• Passar a ferro em temperatura média'
  };
});

export let produtos: Produto[] = [...produtosIniciais];

const STORAGE_KEY = 'bskw_catalogo_v4'; // FORÇA A ATUALIZAÇÃO NO NAVEGADOR

export const carregarProdutosStorage = (): Produto[] => {
  if (typeof window === 'undefined') return produtos;
  const salvo = localStorage.getItem(STORAGE_KEY);
  if (salvo) {
    try {
      produtos = JSON.parse(salvo);
      return produtos;
    } catch (e) { console.error(e); }
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

  if (idx >= 0) { lista[idx] = produtoSincronizado; } else { lista.push(produtoSincronizado); }
  produtos = [...lista];
  if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, JSON.stringify(produtos));
};

export const excluirProdutoStorage = (id: string) => {
  const lista = carregarProdutosStorage().filter(p => p.id !== id);
  produtos = [...lista];
  if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, JSON.stringify(produtos));
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
