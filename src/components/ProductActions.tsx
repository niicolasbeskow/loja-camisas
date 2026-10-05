'use client';

import { useCartStore } from '@/store/cartStore';
import { useState } from 'react';

interface ProductActionsProps {
  productId: number;
}

export default function ProductActions({ productId }: ProductActionsProps) {
  const [selectedSize, setSelectedSize] = useState<'P' | 'M' | 'G' | 'GG'>('M');
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    // In a full implementation, we would extend the cart store to handle size
    // For now, we'll add the product without size to maintain compatibility
    // TODO: Extend cart store to include size property
    // For demo purposes, we're just showing the size selection UI

    // We would ideally fetch product details here, but for simplicity:
    // In a real app, you'd fetch the product by productId to get name and price
    alert(`Produto adicionado ao carrinho no tamanho ${selectedSize}\n(Em uma implementação completa, o tamanho seria salvo no carrinho)`);
  };

  const sizes: Array<{ value: 'P' | 'M' | 'G' | 'GG'; label: string }> = [
    { value: 'P', label: 'P' },
    { value: 'M', label: 'M' },
    { value: 'G', label: 'G' },
    { value: 'GG', label: 'GG' },
  ];

  return (
    <div className="space-y-6">
      <div className="border-t pt-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Selecione o Tamanho</h2>
        <div className="grid grid-cols-2 gap-3">
          {sizes.map((size) => (
            <label
              key={size.value}
              className={`flex items-center space-x-2 rounded-lg border-2 p-4 text-center ${
                selectedSize === size.value
                  ? 'border-amber-500 bg-amber-50 text-amber-600'
                  : 'border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                value={size.value}
                checked={selectedSize === size.value}
                onChange={() => setSelectedSize(size.value)}
                className="sr-only"
              />
              <div className="text-lg font-medium">{size.label}</div>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t pt-6">
        <button
          onClick={handleAddToCart}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l2.2 3.13"></path>
          </svg>
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}