'use client';

import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { useEffect } from 'react'

export default function Sucesso() {
  const clearCart = useCartStore((state) => state.clearCart)

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <div className="text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6">
          <svg className="h-8 w-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Pagamento Aprovado!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Obrigado pela sua compra.
        </p>
        <Link href="/" className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center justify-center gap-2">
          Voltar à Loja
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
        </Link>
      </div>
    </div>
  )
}