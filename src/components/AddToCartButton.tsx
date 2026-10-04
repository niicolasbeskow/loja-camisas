'use client';

import { useCartStore } from '@/store/cartStore';

interface AddToCartButtonProps {
  id: number;
  name: string;
  price: number;
}

export default function AddToCartButton({ id, name, price }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button
      onClick={() => {
        addItem({ id, name, price }); // quantity will be handled in addItem
      }}
      className="w-full bg-gray-700 text-gray-200 py-2 px-4 rounded hover:bg-gray-600 transition-colors"
    >
      Adicionar ao Carrinho
    </button>
  );
}