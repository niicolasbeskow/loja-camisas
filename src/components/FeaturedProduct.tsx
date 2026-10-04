'use client';

import AddToCartButton from '@/components/AddToCartButton';

interface Product {
  id: number;
  nome: string;
  preco: number;
  tipo: string;
  imagem?: string;
  artista: {
    nome: string;
    imagem_perfil?: string;
  } | null;
}

export default function FeaturedProduct({ product }: { product: Product | null }) {
  // Format price to BRL
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  if (!product) {
    return (
      <div className="min-h-[600px] flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-500 text-center">Nenhum produto em destaque disponível</p>
      </div>
    );
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2 items-start">
          {/* Product Image */}
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            {product.imagem ? (
              <img
                src={product.imagem}
                alt={product.nome}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-800">
                <span className="text-gray-400 dark:text-gray-500">Sem imagem</span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {product.nome}
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              por {product.artista?.nome}
            </p>
            <p className="text-2xl font-bold text-amber-500">
              {formatPrice(product.preco)}
            </p>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-0.5 text-xs font-semibold rounded-full
                ${product.tipo === 'Tag'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'}
              `}>
                {product.tipo}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Camisa streetwear premium com encolhimento zero e máxima retenção de cor.
            </p>
            
            <AddToCartButton
              id={product.id}
              name={product.nome}
              price={product.preco}
            />
          </div>
        </div>
      </div>
    </section>
  );
}