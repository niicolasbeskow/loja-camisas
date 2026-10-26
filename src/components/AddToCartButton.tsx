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
      className="w-full bg-ambar text-breu font-sans font-semibold py-2 px-4 rounded transition-colors hover:bg-amber-600"
    >
      Adicionar ao Carrinho
    </button>
  );
}