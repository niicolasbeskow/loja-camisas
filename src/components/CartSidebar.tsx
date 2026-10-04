'use client';

import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';

export default function CartSidebar() {
  const { items, totalItems, totalPrice, isOpen, toggleCart, clearCart, removeItem, addItem } = useCartStore();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const handleCheckout = async () => {
    // Check if user is authenticated
    if (status === 'loading') {
      // Still loading session, prevent checkout attempt
      return;
    }

    if (!session) {
      // User not authenticated, redirect to login
      await signIn({ callbackUrl: '/' });
      return;
    }

    setIsCheckoutLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment preference');
      }

      const data = await response.json();
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        throw new Error('Invalid response from payment service');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      // Optionally show error to user
      alert('Erro ao processar pagamento. Por favor, tente novamente.');
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  // Free shipping threshold
  const freeShippingThreshold = 399.00;
  const hasFreeShipping = totalPrice >= freeShippingThreshold;
  const amountMissing = hasFreeShipping ? 0 : freeShippingThreshold - totalPrice;
  const percentage = Math.min((totalPrice / freeShippingThreshold) * 100, 100);

  return (
    <aside
      className={`
        fixed inset-0 z-50 flex items-end justify-right
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        transition-transform duration-300 ease-in-out
        bg-black/50 backdrop-blur-sm
      `}
    >
      <div className="w-80 bg-[#171717] text-white p-6 h-full overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-xl font-bold">Seu Carrinho</h2>
          <button
            onClick={toggleCart}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="mb-6">
          <div className="mb-2 text-sm font-medium">
            {hasFreeShipping ? (
              <span className="text-amber-400">Você ganhou Frete Grátis!</span>
            ) : (
              <span className="text-amber-300">
                Faltam R$ {amountMissing.toFixed(2)} para Frete Grátis
              </span>
            )}
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div
              className={`bg-amber-500 h-2.5 rounded-full transition-all duration-300`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>

        {totalItems === 0 ? (
          <p className="text-center text-gray-500">Seu carrinho está vazio.</p>
        ) : (
          <>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-800 rounded flex items-center justify-center">
                    {/* Placeholder image */}
                    <span className="text-gray-500">{item.id}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-400"
                      >
                        −
                      </button>
                      <span className="w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => addItem(item)}
                        className="text-amber-500 hover:text-amber-400"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-gray-800">
              <p className="flex justify-between">
                <span className="font-medium">Subtotal:</span>
                <span className="font-medium">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(totalPrice)}
                </span>
              </p>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckoutLoading || status === 'loading' || !session}
              className={`w-full mt-6 bg-amber-500 text-black font-bold uppercase tracking-wider py-4 hover:bg-amber-600 transition-colors ${
                isCheckoutLoading ? 'opacity-50 cursor-not-allowed' :
                (status === 'loading' || !session) ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isCheckoutLoading ? 'Processando...' :
                (status === 'loading' || !session) ? 'Faça login primeiro' : 'Finalizar Pedido'}
            </button>
          </>
        )}
      </div>
    </aside>
  );
}