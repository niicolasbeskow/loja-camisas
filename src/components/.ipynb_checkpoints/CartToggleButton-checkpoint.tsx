'use client';

import { useCartStore } from '@/store/cartStore';

export default function CartToggleButton() {
  const toggleCart = useCartStore((state) => state.toggleCart);
  const totalItems = useCartStore((state) => state.totalItems);

  return (
    <button
      onClick={toggleCart}
      className="fixed top-4 right-4 z-50 p-2 bg-gray-700 text-gray-200 rounded hover:bg-gray-600 transition-colors"
    >
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 w-2 h-2 bg-red-500 rounded-full"></span>
      )}
      🛒
    </button>
  );
}