import { prisma } from '@/lib/prisma';
import TabbedProducts from '@/components/TabbedProducts';
import FeaturedProduct from '@/components/FeaturedProduct';

export default async function Home() {
  // Fazemos uma única busca segura no servidor
  const allProducts = await prisma.product.findMany({
    include: {
      artista: true,
    },
    orderBy: {
      nome: 'asc',
    },
  });

  // O primeiro produto será o nosso destaque
  const featuredProduct = allProducts.length > 0 ? allProducts[0] : null;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 1. Secção de Destaque (recebe apenas 1 produto) */}
      <FeaturedProduct product={featuredProduct} />

      {/* 2. Galeria com Abas (recebe todos os produtos) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <TabbedProducts products={allProducts} />
      </div>
    </main>
  );
}