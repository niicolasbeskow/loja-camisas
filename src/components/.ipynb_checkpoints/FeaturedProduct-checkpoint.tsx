'use client';

import { prisma } from '@/lib/prisma';
import { useState, useEffect } from 'react';
import AddToCartButton from '@/components/AddToCartButton';
import { useCartStore } from '@/store/cartStore';

interface Product {
  id: number;
  nome: string;
  preco: number;
  tipo: string;
  artista: {
    nome: string;
    imagem_perfil?: string;
  };
}

export default function FeaturedProduct() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch a featured product (we'll use the first product for now)
  useEffect(() => {
    const fetchFeaturedProduct = async () => {
      try {
        setLoading(true);
        const data = await prisma.product.findFirst({
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
        setProduct(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch featured product:', err);
        setError('Falha ao carregar produto em destaque');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProduct();
  }, []);

  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.nome,
        price: product.preco,
      });
    }
  };

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
          <p className="mt-2 text-gray-500">Carregando produto em destaque...</p>
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

  if (!product) {
    return (
      <div className="min-h-[600px] flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-center">Nenhum produto em destaque disponível</p>
      </div>
    );
  }

  return (
    <section className="bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2 items-start">
          {/* Product Image */}
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-600 rounded-lg overflow-hidden shadow-lg">
            {product.artista?.imagem_perfil ? (
              <img
                src={product.artista.imagem_perfil}
                alt={`${product.artista.nome} - ${product.nome}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-600">
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
            <p className="text-2xl font-bold text-amber-600">
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
              Camiseta premium de algodão com modelagem confortável e estilo streetwear único.
            </p>
            <AddToCartButton
              id={product.id}
              name={product.nome}
              price={product.preco}
              className="w-full bg-amber-500 text-black font-bold uppercase tracking-wider py-3 hover:bg-amber-600 transition-colors"
            />
          </div>
        </div>
      </div>
    </section>
  );
}