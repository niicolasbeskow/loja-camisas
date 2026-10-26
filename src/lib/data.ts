export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  categorySlug: string;
  image: string;
  tag?: string;
  rating: number;
  reviews: number;
  colors: string[];
};

export const categories = [
  { id: 'promocoes', name: 'PROMOÇÕES 🔥', slug: 'promocoes' },
  { id: 'collab', name: 'Collab', slug: 'collab' },
  { id: 'kits', name: 'Kits', slug: 'kits' },
  { id: 'basica', name: 'Camiseta Básica', slug: 'basica' },
  { id: 'oversized', name: 'Camiseta Oversized', slug: 'oversized' },
  { id: 'suedine', name: 'Camiseta Suedine', slug: 'suedine' },
  { id: 'boxy', name: 'Camiseta Boxy', slug: 'boxy' },
  { id: 'poliamida', name: 'Camiseta Poliamida', slug: 'poliamida' },
  { id: 'manga-longa', name: 'Manga Longa', slug: 'manga-longa' },
  { id: 'feminino', name: 'Feminino', slug: 'feminino' },
  { id: 'moletom', name: 'Moletom', slug: 'moletom' },
  { id: 'regata', name: 'Regata Oversized', slug: 'regata' },
  { id: 'shorts', name: 'Shorts', slug: 'shorts' },
];

export const mockProducts: Product[] = [
  { id: 'basica-offwhite', name: 'Camiseta Básica B.SKW Off White', price: 78.90, originalPrice: 99.90, categorySlug: 'basica', image: '', tag: '200 g/m² Fio 26.1', rating: 5, reviews: 142, colors: ['#FAF9F6'] },
  { id: 'basica-preta', name: 'Camiseta Básica B.SKW Preto', price: 78.90, originalPrice: 99.90, categorySlug: 'basica', image: '', tag: '200 g/m² Fio 26.1', rating: 5, reviews: 256, colors: ['#000000'] },
  { id: 'basica-branca', name: 'Camiseta Básica B.SKW Branca', price: 83.90, originalPrice: 109.90, categorySlug: 'basica', image: '', tag: '200 g/m² Fio 26.1', rating: 5, reviews: 98, colors: ['#FFFFFF'] },
  { id: 'basica-azulmarinho', name: 'Camiseta Básica B.SKW Azul Marinho', price: 89.90, originalPrice: 119.90, categorySlug: 'basica', image: '', tag: '200 g/m² Fio 26.1', rating: 5, reviews: 112, colors: ['#000080'] },
  { id: 'basica-bordo', name: 'Camiseta Básica B.SKW Bordô', price: 89.90, originalPrice: 119.90, categorySlug: 'basica', image: '', tag: '200 g/m² Fio 26.1', rating: 5, reviews: 87, colors: ['#800000'] },
  { id: 'basica-marrom', name: 'Camiseta Básica B.SKW Marrom', price: 89.90, originalPrice: 119.90, categorySlug: 'basica', image: '', tag: '200 g/m² Fio 26.1', rating: 5, reviews: 76, colors: ['#5E4B3C'] },
  { id: 'basica-roxo', name: 'Camiseta Básica B.SKW Roxo', price: 89.90, originalPrice: 119.90, categorySlug: 'basica', image: '', tag: '200 g/m² Fio 26.1', rating: 5, reviews: 45, colors: ['#4B0082'] },
  { id: 'basica-verdemilitar', name: 'Camiseta Básica B.SKW Verde Militar', price: 89.90, originalPrice: 119.90, categorySlug: 'basica', image: '', tag: '200 g/m² Fio 26.1', rating: 5, reviews: 134, colors: ['#4B5320'] },
  { id: 'basica-verdeclaro', name: 'Camiseta Básica B.SKW Verde Claro', price: 89.90, originalPrice: 119.90, categorySlug: 'basica', image: '', tag: '200 g/m² Fio 26.1', rating: 5, reviews: 62, colors: ['#90EE90'] },
  { id: 'basica-pretoestonado', name: 'Camiseta Básica B.SKW Preto Estonado', price: 112.90, originalPrice: 149.90, categorySlug: 'basica', image: '', tag: '200 g/m² Fio 26.1', rating: 5, reviews: 189, colors: ['#2C2C2C'] },
  { id: 'basica-cinzaenvelhecido', name: 'Camiseta Básica B.SKW Cinza Envelhecido', price: 112.90, originalPrice: 149.90, categorySlug: 'basica', image: '', tag: '180 g/m² Fio 26.1', rating: 5, reviews: 105, colors: ['#808080'] },
  { id: 'basica-azulenvelhecido', name: 'Camiseta Básica B.SKW Azul Envelhecido', price: 123.90, originalPrice: 159.90, categorySlug: 'basica', image: '', tag: '180 g/m² Fio 26.1', rating: 5, reviews: 73, colors: ['#4682B4'] }
];