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

export const mockProducts: Product[] = Array(8).fill(null).map((_, i) => ({
  id: `prod-${i}`,
  name: 'Camiseta B.SKW Premium Lisa',
  price: 139.00,
  originalPrice: i % 2 === 0 ? 159.00 : undefined,
  categorySlug: 'oversized',
  image: '',
  tag: i === 0 ? '100% Algodão' : i === 3 ? 'Tecido Encorpado' : undefined,
  rating: 5,
  reviews: Math.floor(Math.random() * 150) + 10,
  colors: ['#000000', '#FFFFFF', '#1C2938', '#5E4B3C']
}));