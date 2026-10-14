export type Tamanho = 'P' | 'M' | 'G' | 'GG' | 'G1' | 'G2';

export interface Produto {
  id: string;
  nome: string;
  cor: string;
  hex: string;
  preco: number;
  precoOriginal: number;
  precoKit?: number;
  categoria: string;
  tag: string;
  imagens: string[];
  tamanhos: Tamanho[];
  estoque: Record<Tamanho, number>;
}

const estoquePadrao = { P: 3, M: 3, G: 3, GG: 3, G1: 0, G2: 0 };

export const produtos: Produto[] = [
  // ==========================================
  // CATEGORIA: CAMISETA BÁSICA
  // ==========================================
  {
    id: 'basica-preta', nome: 'Camiseta Básica B.SKW Preto', cor: 'Preto', hex: '#000000',
    preco: 109.90, precoOriginal: 129.90, precoKit: 79.90, categoria: 'camiseta-basica', tag: '200 g/m² Fio 26.1', imagens: ['/basica-preta.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'basica-off-white', nome: 'Camiseta Básica B.SKW Off White', cor: 'Off White', hex: '#FAF9F6',
    preco: 109.90, precoOriginal: 129.90, precoKit: 79.90, categoria: 'camiseta-basica', tag: '200 g/m² Fio 26.1', imagens: ['/basica-offwhite.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'basica-branca', nome: 'Camiseta Básica B.SKW Branca', cor: 'Branca', hex: '#FFFFFF',
    preco: 119.90, precoOriginal: 139.90, precoKit: 84.90, categoria: 'camiseta-basica', tag: '200 g/m² Fio 26.1', imagens: ['/basica-branca.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'basica-marrom', nome: 'Camiseta Básica B.SKW Marrom', cor: 'Marrom', hex: '#5E4B3C',
    preco: 119.90, precoOriginal: 139.90, precoKit: 89.90, categoria: 'camiseta-basica', tag: '200 g/m² Fio 26.1', imagens: ['/basica-marrom.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'basica-verde', nome: 'Camiseta Básica B.SKW Verde Militar', cor: 'Verde Militar', hex: '#4B5320',
    preco: 119.90, precoOriginal: 139.90, precoKit: 89.90, categoria: 'camiseta-basica', tag: '200 g/m² Fio 26.1', imagens: ['/basica-verde.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'basica-verde-claro', nome: 'Camiseta Básica B.SKW Verde Claro', cor: 'Verde Claro', hex: '#90EE90',
    preco: 119.90, precoOriginal: 139.90, precoKit: 89.90, categoria: 'camiseta-basica', tag: '200 g/m² Fio 26.1', imagens: ['/basica-verde-claro.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'basica-azul-marinho', nome: 'Camiseta Básica B.SKW Azul Marinho', cor: 'Azul Marinho', hex: '#000080',
    preco: 119.90, precoOriginal: 139.90, precoKit: 89.90, categoria: 'camiseta-basica', tag: '200 g/m² Fio 26.1', imagens: ['/basica-azul-marinho.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'basica-roxo', nome: 'Camiseta Básica B.SKW Roxo', cor: 'Roxo', hex: '#800080',
    preco: 119.90, precoOriginal: 139.90, precoKit: 89.90, categoria: 'camiseta-basica', tag: '200 g/m² Fio 26.1', imagens: ['/basica-roxo.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'basica-bordo', nome: 'Camiseta Básica B.SKW Bordô', cor: 'Bordô', hex: '#800000',
    preco: 119.90, precoOriginal: 139.90, precoKit: 89.90, categoria: 'camiseta-basica', tag: '200 g/m² Fio 26.1', imagens: ['/basica-bordo.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'basica-preto-estonado', nome: 'Camiseta Básica B.SKW Preto Estonado', cor: 'Preto Estonado', hex: '#2C2C2C',
    preco: 149.90, precoOriginal: 179.90, precoKit: 119.90, categoria: 'camiseta-estonada', tag: 'Estonada Premium', imagens: ['/estonada-preta.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'basica-cinza-envelhecido', nome: 'Camiseta Básica B.SKW Cinza Envelhecido', cor: 'Cinza Envelhecido', hex: '#808080',
    preco: 149.90, precoOriginal: 179.90, precoKit: 119.90, categoria: 'camiseta-estonada', tag: 'Estonada Premium', imagens: ['/estonada-cinza.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'basica-azul-envelhecido', nome: 'Básica Vintage B.SKW Azul', cor: 'Azul Envelhecido', hex: '#4682B4',
    preco: 159.90, precoOriginal: 189.90, precoKit: 129.90, categoria: 'camiseta-vintage', tag: 'Vintage Wash', imagens: ['/vintage-azul.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },

  // ==========================================
  // CATEGORIA: CAMISETA OVERSIZED
  // ==========================================
  {
    id: 'oversized-preta', nome: 'Camiseta Oversized B.SKW Preto', cor: 'Preto', hex: '#000000',
    preco: 139.90, precoOriginal: 169.90, precoKit: 99.90, categoria: 'camiseta-oversized', tag: '200 g/m² Fio 26.1', imagens: ['/oversized-preta.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'oversized-off-white', nome: 'Camiseta Oversized B.SKW Off White', cor: 'Off White', hex: '#FAF9F6',
    preco: 139.90, precoOriginal: 169.90, precoKit: 99.90, categoria: 'camiseta-oversized', tag: '200 g/m² Fio 26.1', imagens: ['/oversized-offwhite.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'oversized-branca', nome: 'Camiseta Oversized B.SKW Branca', cor: 'Branca', hex: '#FFFFFF',
    preco: 139.90, precoOriginal: 169.90, precoKit: 109.90, categoria: 'camiseta-oversized', tag: '200 g/m² Fio 26.1', imagens: ['/oversized-branca.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'oversized-marrom', nome: 'Camiseta Oversized B.SKW Marrom', cor: 'Marrom', hex: '#5E4B3C',
    preco: 149.90, precoOriginal: 179.90, precoKit: 109.90, categoria: 'camiseta-oversized', tag: '200 g/m² Fio 26.1', imagens: ['/oversized-marrom.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'oversized-azul-marinho', nome: 'Camiseta Oversized B.SKW Azul Marinho', cor: 'Azul Marinho', hex: '#000080',
    preco: 149.90, precoOriginal: 179.90, precoKit: 109.90, categoria: 'camiseta-oversized', tag: '200 g/m² Fio 26.1', imagens: ['/oversized-azul-marinho.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'oversized-verde-claro', nome: 'Camiseta Oversized B.SKW Verde Claro', cor: 'Verde Claro', hex: '#90EE90',
    preco: 149.90, precoOriginal: 179.90, precoKit: 109.90, categoria: 'camiseta-oversized', tag: '200 g/m² Fio 26.1', imagens: ['/oversized-verde-claro.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'oversized-roxo', nome: 'Camiseta Oversized B.SKW Roxo', cor: 'Roxo', hex: '#800080',
    preco: 149.90, precoOriginal: 179.90, precoKit: 109.90, categoria: 'camiseta-oversized', tag: '200 g/m² Fio 26.1', imagens: ['/oversized-roxo.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'oversized-bordo', nome: 'Camiseta Oversized B.SKW Bordô', cor: 'Bordô', hex: '#800000',
    preco: 149.90, precoOriginal: 179.90, precoKit: 109.90, categoria: 'camiseta-oversized', tag: '200 g/m² Fio 26.1', imagens: ['/oversized-bordo.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'oversized-verde-militar', nome: 'Camiseta Oversized B.SKW Verde Militar', cor: 'Verde Militar', hex: '#4B5320',
    preco: 149.90, precoOriginal: 179.90, precoKit: 109.90, categoria: 'camiseta-oversized', tag: '200 g/m² Fio 26.1', imagens: ['/oversized-verde-militar.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'oversized-preto-estonado', nome: 'Camiseta Oversized B.SKW Preto Estonado', cor: 'Preto Estonado', hex: '#2C2C2C',
    preco: 189.90, precoOriginal: 229.90, precoKit: 159.90, categoria: 'camiseta-oversized', tag: '180 g/m² Fio 26.1', imagens: ['/oversized-preto-estonado.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'oversized-destroyed', nome: 'Camiseta Oversized B.SKW Destroyed', cor: 'Destroyed', hex: '#424242',
    preco: 189.90, precoOriginal: 229.90, precoKit: 159.90, categoria: 'camiseta-oversized', tag: '180 g/m² Fio 26.1', imagens: ['/oversized-destroyed.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'oversized-azul-estonado', nome: 'Camiseta Oversized B.SKW Azul Estonado', cor: 'Azul Estonado', hex: '#3B5998',
    preco: 189.90, precoOriginal: 229.90, precoKit: 159.90, categoria: 'camiseta-oversized', tag: '180 g/m² Fio 26.1', imagens: ['/oversized-azul-estonado.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'oversized-cinza-envelhecido', nome: 'Camiseta Oversized B.SKW Cinza Envelhecido', cor: 'Cinza Envelhecido', hex: '#808080',
    preco: 189.90, precoOriginal: 229.90, precoKit: 159.90, categoria: 'camiseta-oversized', tag: '180 g/m² Fio 26.1', imagens: ['/oversized-cinza-envelhecido.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'oversized-azul-envelhecido', nome: 'Camiseta Oversized B.SKW Azul Envelhecido', cor: 'Azul Envelhecido', hex: '#4682B4',
    preco: 189.90, precoOriginal: 229.90, precoKit: 159.90, categoria: 'camiseta-oversized', tag: '180 g/m² Fio 26.1', imagens: ['/oversized-azul-envelhecido.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },

  // ==========================================
  // CATEGORIA: CAMISETA SUEDINE
  // ==========================================
  {
    id: 'suedine-preta', nome: 'Camiseta Suedine B.SKW Preto', cor: 'Preto', hex: '#000000',
    preco: 189.90, precoOriginal: 239.90, precoKit: 159.90, categoria: 'camiseta-suedine', tag: '250 g/m² Fio 40.1', imagens: ['/suedine-preta.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'suedine-off-white', nome: 'Camiseta Suedine B.SKW Off White', cor: 'Off White', hex: '#FAF9F6',
    preco: 189.90, precoOriginal: 239.90, precoKit: 159.90, categoria: 'camiseta-suedine', tag: '250 g/m² Fio 40.1', imagens: ['/suedine-off-white.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'suedine-marrom', nome: 'Camiseta Suedine B.SKW Marrom', cor: 'Marrom', hex: '#5E4B3C',
    preco: 189.90, precoOriginal: 239.90, precoKit: 159.90, categoria: 'camiseta-suedine', tag: '250 g/m² Fio 40.1', imagens: ['/suedine-marrom.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'suedine-cinza', nome: 'Camiseta Suedine B.SKW Cinza', cor: 'Cinza', hex: '#808080',
    preco: 229.90, precoOriginal: 279.90, precoKit: 199.90, categoria: 'camiseta-suedine', tag: '230 g/m² Fio 40.1', imagens: ['/suedine-cinza.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },

  // ==========================================
  // CATEGORIA: CAMISETA BOXY
  // ==========================================
  {
    id: 'boxy-preta', nome: 'Camiseta Boxy B.SKW Preto', cor: 'Preto', hex: '#000000',
    preco: 129.90, precoOriginal: 149.90, precoKit: 89.90, categoria: 'camiseta-boxy', tag: '200 g/m² Fio 26.1', imagens: ['/boxy-preta.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'boxy-off-white', nome: 'Camiseta Boxy B.SKW Off White', cor: 'Off White', hex: '#FAF9F6',
    preco: 129.90, precoOriginal: 149.90, precoKit: 89.90, categoria: 'camiseta-boxy', tag: '200 g/m² Fio 26.1', imagens: ['/boxy-off-white.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'boxy-azul-marinho', nome: 'Camiseta Boxy B.SKW Azul Marinho', cor: 'Azul Marinho', hex: '#000080',
    preco: 129.90, precoOriginal: 149.90, precoKit: 89.90, categoria: 'camiseta-boxy', tag: '200 g/m² Fio 26.1', imagens: ['/boxy-azul-marinho.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },

  // ==========================================
  // CATEGORIA: CAMISETA POLIAMIDA
  // ==========================================
  {
    id: 'poliamida-preta', nome: 'Camiseta Ultra Tech Poliamida B.SKW Preto', cor: 'Preto', hex: '#000000',
    preco: 139.90, precoOriginal: 169.90, precoKit: 99.90, categoria: 'camiseta-poliamida', tag: '122 g/m²', imagens: ['/poliamida-preta.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'poliamida-branca', nome: 'Camiseta Ultra Tech Poliamida B.SKW Branca', cor: 'Branca', hex: '#FFFFFF',
    preco: 139.90, precoOriginal: 169.90, precoKit: 99.90, categoria: 'camiseta-poliamida', tag: '122 g/m²', imagens: ['/poliamida-branca.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },

  // ==========================================
  // CATEGORIA: MANGA LONGA
  // ==========================================
  {
    id: 'manga-longa-azul-estonado', nome: 'Camiseta Manga Longa B.SKW Azul Estonado', cor: 'Azul Estonado', hex: '#3B5998',
    preco: 229.90, precoOriginal: 269.90, precoKit: 179.90, categoria: 'manga-longa', tag: '180 g/m² Fio 26.1', imagens: ['/manga-longa-azul.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'manga-longa-preto-vintage', nome: 'Camiseta Manga Longa B.SKW Preto Vintage', cor: 'Preto Vintage', hex: '#2C2C2C',
    preco: 229.90, precoOriginal: 269.90, precoKit: 179.90, categoria: 'manga-longa', tag: '180 g/m² Fio 26.1', imagens: ['/manga-longa-preto.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },

  // ==========================================
  // CATEGORIA: FEMININO
  // ==========================================
  {
    id: 'baby-look-preta', nome: 'Baby Look B.SKW Preta', cor: 'Preto', hex: '#000000',
    preco: 109.90, precoOriginal: 129.90, precoKit: 69.90, categoria: 'feminino', tag: '190 g/m² Fio 26.1', imagens: ['/baby-look-preta.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'baby-look-off-white', nome: 'Baby Look B.SKW Off White', cor: 'Off White', hex: '#FAF9F6',
    preco: 109.90, precoOriginal: 129.90, precoKit: 69.90, categoria: 'feminino', tag: '190 g/m² Fio 26.1', imagens: ['/baby-look-off-white.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'baby-look-verde-militar', nome: 'Baby Look B.SKW Verde Militar', cor: 'Verde Militar', hex: '#4B5320',
    preco: 109.90, precoOriginal: 129.90, precoKit: 69.90, categoria: 'feminino', tag: '190 g/m² Fio 26.1', imagens: ['/baby-look-verde-militar.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'cropped-suedine-preto', nome: 'Cropped Oversized Suedine B.SKW Preto', cor: 'Preto', hex: '#000000',
    preco: 139.90, precoOriginal: 169.90, precoKit: 119.90, categoria: 'feminino', tag: '250 g/m² Fio 40.1', imagens: ['/cropped-suedine-preto.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'cropped-suedine-off-white', nome: 'Cropped Oversized Suedine B.SKW Off White', cor: 'Off White', hex: '#FAF9F6',
    preco: 139.90, precoOriginal: 169.90, precoKit: 119.90, categoria: 'feminino', tag: '250 g/m² Fio 40.1', imagens: ['/cropped-suedine-off-white.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'cropped-suedine-marrom', nome: 'Cropped Oversized Suedine B.SKW Marrom', cor: 'Marrom', hex: '#5E4B3C',
    preco: 139.90, precoOriginal: 169.90, precoKit: 119.90, categoria: 'feminino', tag: '250 g/m² Fio 40.1', imagens: ['/cropped-suedine-marrom.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },

  // ==========================================
  // CATEGORIA: MOLETOM (NOVO!)
  // ==========================================
  {
    id: 'moletom-oversized-preto', nome: 'Moletom Oversized B.SKW Preto', cor: 'Preto', hex: '#000000',
    preco: 229.90, precoOriginal: 269.90, precoKit: 179.90, categoria: 'moletom', tag: '300 g/m²', imagens: ['/moletom-oversized-preto.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'moletom-oversized-off-white', nome: 'Moletom Oversized B.SKW Off White', cor: 'Off White', hex: '#FAF9F6',
    preco: 229.90, precoOriginal: 269.90, precoKit: 179.90, categoria: 'moletom', tag: '300 g/m²', imagens: ['/moletom-oversized-off-white.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'moletom-canguru-preto', nome: 'Moletom Canguru B.SKW Preto', cor: 'Preto', hex: '#000000',
    preco: 429.90, precoOriginal: 499.90, precoKit: 299.90, categoria: 'moletom', tag: '320 g/m²', imagens: ['/moletom-canguru-preto.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'moletom-canguru-marrom', nome: 'Moletom Canguru B.SKW Marrom', cor: 'Marrom', hex: '#5E4B3C',
    preco: 429.90, precoOriginal: 499.90, precoKit: 299.90, categoria: 'moletom', tag: '320 g/m²', imagens: ['/moletom-canguru-marrom.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'calca-moletom-preta', nome: 'Calça Moletom Comfort B.SKW Preta', cor: 'Preto', hex: '#000000',
    preco: 389.90, precoOriginal: 459.90, precoKit: 269.90, categoria: 'moletom', tag: '320 g/m²', imagens: ['/calca-moletom-preta.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  },
  {
    id: 'calca-moletom-marrom', nome: 'Calça Moletom Comfort B.SKW Marrom', cor: 'Marrom', hex: '#5E4B3C',
    preco: 389.90, precoOriginal: 459.90, precoKit: 269.90, categoria: 'moletom', tag: '320 g/m²', imagens: ['/calca-moletom-marrom.png'],
    tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], estoque: estoquePadrao
  }
];

export const getProdutoPorId = (id: string) => produtos.find(p => p.id === id);
export const getProdutosPorCategoria = (categoriaSlug: string) => produtos.filter(p => p.categoria === categoriaSlug);
