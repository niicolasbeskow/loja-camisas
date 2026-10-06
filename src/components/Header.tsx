'use client';

import { useCartStore } from '@/store/cartStore';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Search, User, ShoppingCart } from 'lucide-react';

export default function Header() {
  const totalItems = useCartStore((state) => state.totalItems);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-40 bg-breu border-b border-[1px] border-[rgba(255,255,255,0.1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-white font-bold text-xl tracking-tight">
              B.SKW
            </Link>
          </div>

          {/* Category Bar */}
          <div className="flex-1 flex items-center overflow-x-auto whitespace-nowrap scrollbar-hide pt-2 pb-2">
            <span className="text-amber font-sans font-medium text-[13px] uppercase tracking-[0.12em]">
              PROMOÇÕES 🔥
            </span>
            <span className="ml-4 text-concreto font-sans font-medium text-[13px] uppercase tracking-[0.12em]">
              Collab (em breve)
            </span>
            {/* Categories list */}
            <div className="ml-4 flex space-x-4">
              {[
                'Kits',
                'Camiseta Básica',
                'Camiseta Oversized',
                'Camiseta Suedine',
                'Camiseta Boxy',
                'Camiseta Poliamida',
                'Manga Longa',
                'Feminino',
                'Moletom',
                'Regata Oversized',
                'Shorts'
              ].map((cat, idx) => (
                <span
                  key={idx}
                  className={`text-white font-sans font-medium text-[13px] uppercase tracking-[0.12em] hover:text-amber transition-colors`}
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button className="text-[rgba(255,255,255,0.6)] hover:text-white transition-colors">
              <Search className="h-5 w-5" />
            </button>

            {/* User / Auth */}
            <div className="relative">
              {status === 'loading' ? (
                <span className="px-2 py-1 bg-gray-600/50 text-xs rounded">Carregando...</span>
              ) : session ? (
                <>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex items-center text-[rgba(255,255,255,0.6)] hover:text-white transition-colors"
                  >
                    <User className="h-5 w-5" />
                    {totalItems > 0 && (
                      <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center bg-amber-500 text-[10px] font-bold text-black rounded-full">
                        {totalItems}
                      </span>
                    )}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => signIn(undefined, { callbackUrl: '/' })}
                  className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold text-xs rounded"
                >
                  <User className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Shopping Cart */}
            <button onClick={toggleCart} className="relative flex items-center text-[rgba(255,255,255,0.6)] hover:text-white transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center bg-amber-500 text-[10px] font-bold text-black rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}