'use client';

import { useCartStore } from '@/store/cartStore';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Header() {
  const totalItems = useCartStore((state) => state.totalItems);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-40 bg-[#111] border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-white font-bold text-xl tracking-tight">
              LOJA
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">
              Início
            </Link>
            <Link href="/artistas" className="text-gray-300 hover:text-white transition-colors">
              Artistas
            </Link>
            <Link href="/produtos" className="text-gray-300 hover:text-white transition-colors">
              Produtos
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button className="text-gray-300 hover:text-white transition-colors">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M10.5 10.5a3 3 0 100-6 3 3 0 000 6z"></path>
              </svg>
            </button>

            {/* Cart Button */}
            <button onClick={toggleCart} className="relative flex items-center text-gray-300 hover:text-white transition-colors">
              {/* Cart Icon */}
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.737 1.707h10.293a2 2 0 002-2l-.305-1.223a.5.5 0 00-.62-.372z"></path>
              </svg>
              {/* Badge with item count */}
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center bg-amber-500 text-[10px] font-bold text-black rounded-full">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Auth Section */}
            <div className="flex items-center space-x-2">
              {status === 'loading' ? (
                <span className="px-2 py-1 bg-gray-600/50 text-xs rounded">Carregando...</span>
              ) : session ? (
                <>
                  <span className="text-sm text-amber-200">Olá, {session.user?.name ?? 'Usuário'}</span>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="ml-2 text-sm text-amber-300 hover:text-amber-200 underline"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <button
                  onClick={() => signIn(undefined, { callbackUrl: '/' })}
                  className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold text-xs rounded"
                >
                  LOGIN
                </button>
              )}
            </div>
          </div>

          {/* Menu Button (for mobile) */}
          <button className="md:hidden text-gray-300 hover:text-white transition-colors">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}