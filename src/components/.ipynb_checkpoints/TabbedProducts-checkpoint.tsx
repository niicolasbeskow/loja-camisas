'use client';

import { useState, useEffect } from 'react';
import { prisma } from '@/lib/prisma';
import AddToCartButton from '@/components/AddToCartButton';
import { useCartStore } from '@/store/cartStore';

interface Product {
  id: number;
  nome: string;
  preco: number;
  tipo: string; // Tag or Colecao
  artista: {
    nome: string;
    imagem_perfil?: string;
  };
}

export default function TabbedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<'todos' | 'kits' | 'estampadas' | 'algodao' | 'conjuntos' | 'basicas' | 'treinar'>('todos');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await prisma.product.findMany({
          include: {
            artista: {
              select: {
                nome: true,
                imagem_perfil: true,
              },
            },
          },
          orderBy: {
            nome: 'asc',
          },
        });
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Falha ao carregar produtos');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on active tab
  const filteredProducts = products.filter((product) => {
    if (activeTab === 'todos') return true;

    // Map our tabs to product types or other criteria
    // For now, we'll simulate different collections based on product tipo or id
    // In a real app, you'd have a collection field in your product model
    if (activeTab === 'kits') return product.id % 7 === 0; // Simulate kits
    if (activeTab === 'estampadas') return product.id % 7 === 1; // Simulate estampadas
    if (activeTab === 'algodao') return product.id % 7 === 2; // Simulate algodão mais grosso
    if (activeTab === 'conjuntos') return product.id % 7 === 3; // Simulate conjuntos
    if (activeTab === 'basicas') return product.id % 7 === 4; // Simulate básicas
    if (activeTab === 'treinar') return product.id % 7 === 5; // Simular para treinar

    return true;
  });

  // Format price to BRL
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-[600px] flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
          <p className="mt-2 text-gray-500">Carregando produtos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[600px] flex items-center justify-center bg-gray-50">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800">
      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
          <button
            onClick={() => setActiveTab('todos')}
            className={`
              px-4 py-2 text-sm font-medium
              ${activeTab === 'todos'
                ? 'border-b-2 border-amber-500 text-amber-600'
                : 'text-gray-500 hover:text-gray-700'}
              transition-colors
            `}
          >
            Todos
          </button>
          <button
            onClick={() => setActiveTab('kits')}
            className={`
              px-4 py-2 text-sm font-medium ml-1
              ${activeTab === 'kits'
                ? 'border-b-2 border-amber-500 text-amber-600'
                : 'text-gray-500 hover:text-gray-700'}
              transition-colors
            `}
          >
            Kits
          </button>
          <button
            onClick={() => setActiveTab('estampadas')}
            className={`
              px-4 py-2 text-sm font-medium ml-1
              ${activeTab === 'estampadas'
                ? 'border-b-2 border-amber-500 text-amber-600'
                : 'text-gray-500 hover:text-gray-700'}
              transition-colors
            `}
          >
            Estampadas
          </button>
          <button
            onClick={() => setActiveTab('algodao')}
            className={`
              px-4 py-2 text-sm font-medium ml-1
              ${activeTab === 'algodao'
                ? 'border-b-2 border-amber-500 text-amber-600'
                : 'text-gray-500 hover:text-gray-700'}
              transition-colors
            `}
          >
            Algodão mais Grosso
          </button>
          <button
            onClick={() => setActiveTab('conjuntos')}
            className={`
              px-4 py-2 text-sm font-medium ml-1
              ${activeTab === 'conjuntos'
                ? 'border-b-2 border-amber-500 text-amber-600'
                : 'text-gray-500 hover:text-gray-700'}
              transition-colors
            `}
          >
            Conjuntos
          </button>
          <button
            onClick={() => setActiveTab('basicas')}
            className={`
              px-4 py-2 text-sm font-medium ml-1
              ${activeTab === 'basicas'
                ? 'border-b-2 border-amber-500 text-amber-600'
                : 'text-gray-500 hover:text-gray-700'}
              transition-colors
            `}
          >
            Básicas
          </button>
          <button
            onClick={() => setActiveTab('treinar')}
            className={`
              px-4 py-2 text-sm font-medium ml-1
              ${activeTab === 'treinar'
                ? 'border-b-2 border-amber-500 text-amber-600'
                : 'text-gray-500 hover:text-gray-700'}
              transition-colors
            `}
          >
            Para Treinar
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Product Image */}
                <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-600">
                  {product.artista?.imagem_perfil ? (
                    <img
                      src={product.artista.imagem_perfil}
                      alt={`${product.artista.nome} - ${product.nome}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="text-gray-400 dark:text-gray-500">Sem imagem</span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {product.nome}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    por {product.artista?.nome}
                  </p>
                  <p className="text-lg font-bold text-amber-600 mb-4">
                    {formatPrice(product.preco)}
                  </p>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full
                      ${product.tipo === 'Tag'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'}
                    `}>
                      {product.tipo}
                    </span>
                  </div>
                  <AddToCartButton
                    id={product.id}
                    name={product.nome}
                    price={product.preco}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                Nenhum produto encontrado para esta categoria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}