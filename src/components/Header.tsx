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
      {/* Navbar Preta, Fixa e Hover Âmbar */}
      <nav className="sticky top-0 z-50 w-full bg-[#000000] py-6 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            {/* Logo */}
            <div className="mb-4">
              <Link href="/" className="text-white font-bold text-xl tracking-tight">
                B.SKW
              </Link>
            </div>

            {/* Category Bar - Center */}
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 w-full">
              {/* PROMOÇÕES 🔥 with amber text */}
              <Link
                href="#"
                className="text-[#F59E0B] bg-transparent p-2 transition-colors hover:bg-[#F59E0B] hover:text-[#000000]"
              >
                PROMOÇÕES 🔥
              </Link>
              {/* Collab (em breve) with gray text */}
              <Link
                href="#"
                className="text-[#9A9A9A] bg-transparent p-2 transition-colors hover:bg-[#F59E0B] hover:text-[#000000]"
              >
                Collab (em breve)
              </Link>
              {/* Other categories with white text */}
              <Link
                href="#"
                className="text-white bg-transparent p-2 transition-colors hover:bg-[#F59E0B] hover:text-[#000000]"
              >
                Kits
              </Link>
              <Link
                href="#"
                className="text-white bg-transparent p-2 transition-colors hover:bg-[#F59E0B] hover:text-[#000000]"
              >
                Camiseta Básica
              </Link>
              <Link
                href="#"
                className="text-white bg-transparent p-2 transition-colors hover:bg-[#F59E0B] hover:text-[#000000]"
              >
                Camiseta Oversized
              </Link>
              <Link
                href="#"
                className="text-white bg-transparent p-2 transition-colors hover:bg-[#F59E0B] hover:text-[#000000]"
              >
                Camiseta Suedine
              </Link>
              <Link
                href="#"
                className="text-white bg-transparent p-2 transition-colors hover:bg-[#F59E0B] hover:text-[#000000]"
              >
                Camiseta Boxy
              </Link>
              <Link
                href="#"
                className="text-white bg-transparent p-2 transition-colors hover:bg-[#F59E0B] hover:text-[#000000]"
              >
                Camiseta Poliamida
              </Link>
              <Link
                href="#"
                className="text-white bg-transparent p-2 transition-colors hover:bg-[#F59E0B] hover:text-[#000000]"
              >
                Manga Longa
              </Link>
              <Link
                href="#"
                className="text-white bg-transparent p-2 transition-colors hover:bg-[#F59E0B] hover:text-[#000000]"
              >
                Feminino
              </Link>
              <Link
                href="#"
                className="text-white bg-transparent p-2 transition-colors hover:bg-[#F59E0B] hover:text-[#000000]"
              >
                Moletom
              </Link>
              <Link
                href="#"
                className="text-white bg-transparent p-2 transition-colors hover:bg-[#F59E0B] hover:text-[#000000]"
              >
                Regata Oversized
              </Link>
              <Link
                href="#"
                className="text-white bg-transparent p-2 transition-colors hover:bg-[#F59E0B] hover:text-[#000000]"
              >
                Shorts
              </Link>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-3 mt-4">
              {/* Search Icon / Input */}
              {searchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onBlur={() => setSearchOpen(false)}
                    className="bg-white text-black placeholder-black/50 border-2 border-amber px-2 py-1 rounded-none focus:outline-none focus:ring-2 focus:ring-amber-200"
                    placeholder="Buscar..."
                  />
                  <button
                    type="submit"
                    className="text-white bg-transparent p-2 transition-colors hover:bg-[#F59E0B] hover:text-[#000000]"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="text-white bg-transparent p-2 transition-colors hover:bg-[#F59E0B] hover:text-[#000000]"
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
                      className="text-white bg-transparent p-2 transition-colors hover:bg-[#F59E0B] hover:text-[#000000]"
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
                    className="text-white bg-transparent p-2 transition-colors hover:bg-[#F59E0B] hover:text-[#000000]"
                  >
                    <User className="h-5 w-5" />
                  </button>
                )}
              </div>

              {/* Shopping Cart */}
              <button onClick={toggleCart} className="text-white bg-transparent p-2 transition-colors hover:bg-[#F59E0B] hover:text-[#000000] relative">
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