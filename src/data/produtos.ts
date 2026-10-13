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
  estoque: Record<Tamanho, number>; // Controle exato de estoque
}

export const produtos: Produto[] = [
  {
    id: 'basica-preta',
    nome: 'Camiseta Básica B.SKW Preto',
    cor: 'Preto',
    hex: '#000000',
    preco: 78.90,
    precoOriginal: 99.90,
    categoria: 'camiseta-basica',
    tag: '200 g/m² Fio 26.1',
    imagens: ['/basica-preta.png'], // Ajustaremos os caminhos depois
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'],
    estoque: { P: 3, M: 3, G: 3, GG: 3, G1: 0, G2: 0 }
  },
  {
    id: 'basica-branca',
    nome: 'Camiseta Básica B.SKW Branca',
    cor: 'Branca',
    hex: '#FFFFFF',
    preco: 83.90,
    precoOriginal: 109.90,
    categoria: 'camiseta-basica',
    tag: '200 g/m² Fio 26.1',
    imagens: ['/basica-branca.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'],
    estoque: { P: 3, M: 3, G: 3, GG: 3, G1: 0, G2: 0 }
  },
  {
    id: 'basica-azul-envelhecido',
    nome: 'Camiseta Básica B.SKW Azul Envelhecido',
    cor: 'Azul Envelhecido',
    hex: '#2c3e50',
    preco: 89.90,
    precoOriginal: 119.90,
    categoria: 'camiseta-basica',
    tag: '200 g/m² Fio 26.1',
    imagens: ['/basica-azul.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'],
    estoque: { P: 3, M: 3, G: 3, GG: 3, G1: 0, G2: 0 }
  },
  {
    id: 'basica-off-white',
    nome: 'Camiseta Básica B.SKW Off White',
    cor: 'Off White',
    hex: '#f5f5f5',
    preco: 78.90,
    precoOriginal: 99.90,
    categoria: 'camiseta-basica',
    tag: '200 g/m² Fio 26.1',
    imagens: ['/basica-offwhite.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'],
    estoque: { P: 3, M: 3, G: 3, GG: 3, G1: 0, G2: 0 }
  }
];

export const getProdutoPorId = (id: string) => produtos.find(p => p.id === id);
// A mágica que resolve o problema da imagem da categoria Collab:
export const getProdutosPorCategoria = (categoriaSlug: string) => produtos.filter(p => p.categoria === categoriaSlug);
