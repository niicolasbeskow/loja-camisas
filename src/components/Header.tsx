'use client';

import { useCartStore } from '@/store/cartStore';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Search, User, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const totalItems = useCartStore((state) => state.totalItems);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const { data: session, status } = useSession();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/busca?q=${encodeURIComponent(searchTerm.trim())}`;
    }
    setSearchOpen(false);
    setSearchTerm('');
  };

  return (
    <>
      {/* Navbar Preta e Texto Branco: forçar bg-[#000000] text-white w-full z-50 */}
      <nav className="bg-[#000000] text-white w-full z-50 min-h-[3rem] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-[3rem] items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-white font-bold text-xl tracking-tight">
                B.SKW
              </Link>
            </div>

            {/* Category Bar - Center */}
            <div className="flex-1 flex flex-wrap justify-center gap-x-4 gap-y-2">
              <Link
                href="#"
                className="text-amber p-2 transition-colors hover:bg-ambar hover:text-[#000000]"
              >
                PROMOÇÕES 🔥
              </Link>
              <Link
                href="#"
                className="text-concreto p-2 transition-colors hover:bg-ambar hover:text-[#000000]"
              >
                Collab (em breve)
              </Link>
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
                <Link
                  key={idx}
                  href="#"
                  className={`text-white p-2 transition-colors hover:bg-ambar hover:text-[#000000]`}
                >
                  {cat}
                </Link>
              ))}
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-3">
              {/* Search Icon / Input */}
              {searchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onBlur={() => setSearchOpen(false)}
                    className="bg-white text-black placeholder-black/50 border-2 border-amber p-2 w-[200px] rounded-none focus:outline-none focus:ring-2 focus:ring-amber-200"
                    placeholder="Buscar..."
                  />
                  <button
                    type="submit"
                    className="p-2 transition-colors hover:bg-ambar hover:text-[#000000]"
                  >
                    <Search className="h-4 w-4" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 transition-colors hover:bg-ambar hover:text-[#000000]"
                >
                  <Search className="h-5 w-5" />
                </button>
              )}

              {/* User / Auth */}
              <div className="relative">
                {status === 'loading' ? (
                  <span className="px-2 py-1 bg-gray-600/50 text-xs rounded">Carregando...</span>
                ) : session ? (
                  <>
                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="p-2 transition-colors hover:bg-ambar hover:text-[#000000]"
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
              <button onClick={toggleCart} className="relative p-2 transition-colors hover:bg-ambar hover:text-[#000000]">
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
      </nav>
    </>
  );
}