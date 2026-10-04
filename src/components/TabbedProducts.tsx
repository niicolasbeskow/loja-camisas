'use client';

import { useState } from 'react';
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

export default function TabbedProducts({ products }: { products: Product[] }) {
  const [activeTab, setActiveTab] = useState('Todos');

  // Format price to BRL
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  // Filter products based on active tab
  const filteredProducts = products.filter((product) => {
    if (activeTab === 'Todos') return true;
    return product.tipo === activeTab;
  });

  return (
    <div>
      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-8">
        {['Todos', 'Tag', 'Colecao'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full font-bold transition-colors ${
              activeTab === tab
                ? 'bg-amber-500 text-black'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {tab === 'Colecao' ? 'Coleção' : tab}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden flex flex-col">
            <div className="aspect-w-1 aspect-h-1 bg-gray-200 dark:bg-gray-700 relative">
              {product.imagem ? (
                <img
                  src={product.imagem}
                  alt={product.nome}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center h-48 bg-gray-200 dark:bg-gray-700">
                  <span className="text-gray-400">Sem imagem</span>
                </div>
              )}
              <span className="absolute top-2 left-2 px-2 py-1 text-xs font-bold bg-amber-500 text-black rounded">
                {product.tipo}
              </span>
            </div>
            
            <div className="p-4 flex flex-col grow">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{product.nome}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">por {product.artista?.nome}</p>
              <p className="text-xl font-bold text-amber-500 mb-4 mt-auto">
                {formatPrice(product.preco)}
              </p>
              
              <AddToCartButton
                id={product.id}
                name={product.nome}
                price={product.preco}
              />
            </div>
          </div>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">Nenhum produto encontrado nesta categoria.</p>
        </div>
      )}
    </div>
  );
}
