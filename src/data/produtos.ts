export type Tamanho = 'P' | 'M' | 'G' | 'GG' | 'G1' | 'G2';

export interface Produto {
  id: string;
  nome: string;
  cor: string;
  hex: string;
  preco: number;
  precoOriginal: number;
  categoria: string;
  tag: string;
  imagens: string[];
  tamanhos: Tamanho[];
  estoque: Record<Tamanho, number>;
}

const estoquePadrao = { P: 3, M: 3, G: 3, GG: 3, G1: 0, G2: 0 };

export const produtos: Produto[] = [
  // GRUPO: BÁSICA ESSENCIAIS (R$ 78,90)
  {
    id: 'basica-preta', nome: 'Camiseta Básica B.SKW Preto', cor: 'Preto', hex: '#000000',
    preco: 78.90, precoOriginal: 99.90, categoria: 'camiseta-basica', tag: '200 g/m² Fio 26.1', imagens: ['/basica-preta.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'basica-off-white', nome: 'Camiseta Básica B.SKW Off White', cor: 'Off White', hex: '#FAF9F6',
    preco: 78.90, precoOriginal: 99.90, categoria: 'camiseta-basica', tag: '200 g/m² Fio 26.1', imagens: ['/basica-offwhite.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  
  // GRUPO: BÁSICA CORES (R$ 89,90)
  {
    id: 'basica-marrom', nome: 'Camiseta Básica B.SKW Marrom', cor: 'Marrom', hex: '#5E4B3C',
    preco: 89.90, precoOriginal: 109.90, categoria: 'camiseta-basica', tag: '200 g/m² Fio 26.1', imagens: ['/basica-marrom.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'basica-verde', nome: 'Camiseta Básica B.SKW Verde Militar', cor: 'Verde Militar', hex: '#4B5320',
    preco: 89.90, precoOriginal: 109.90, categoria: 'camiseta-basica', tag: '200 g/m² Fio 26.1', imagens: ['/basica-verde.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'basica-azul-marinho', nome: 'Camiseta Básica B.SKW Azul Marinho', cor: 'Azul Marinho', hex: '#000080',
    preco: 89.90, precoOriginal: 109.90, categoria: 'camiseta-basica', tag: '200 g/m² Fio 26.1', imagens: ['/basica-azul-marinho.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'basica-bordo', nome: 'Camiseta Básica B.SKW Bordô', cor: 'Bordô', hex: '#800000',
    preco: 89.90, precoOriginal: 109.90, categoria: 'camiseta-basica', tag: '200 g/m² Fio 26.1', imagens: ['/basica-bordo.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },

  // GRUPO: BÁSICA ESTONADA (R$ 112,90)
  {
    id: 'basica-preto-estonado', nome: 'Camiseta Básica B.SKW Preto Estonado', cor: 'Preto Estonado', hex: '#2C2C2C',
    preco: 112.90, precoOriginal: 139.90, categoria: 'camiseta-estonada', tag: 'Estonada Premium', imagens: ['/estonada-preta.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'basica-cinza-envelhecido', nome: 'Camiseta Básica B.SKW Cinza Envelhecido', cor: 'Cinza Envelhecido', hex: '#808080',
    preco: 112.90, precoOriginal: 139.90, categoria: 'camiseta-estonada', tag: 'Estonada Premium', imagens: ['/estonada-cinza.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },

  // GRUPO: BÁSICA VINTAGE (R$ 123,90)
  {
    id: 'basica-azul-envelhecido', nome: 'Básica Vintage B.SKW Azul', cor: 'Azul Envelhecido', hex: '#4682B4',
    preco: 123.90, precoOriginal: 149.90, categoria: 'camiseta-vintage', tag: 'Vintage Wash', imagens: ['/vintage-azul.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  }
];

export const getProdutoPorId = (id: string) => produtos.find(p => p.id === id);
export const getProdutosPorCategoria = (categoriaSlug: string) => produtos.filter(p => p.categoria === categoriaSlug);
