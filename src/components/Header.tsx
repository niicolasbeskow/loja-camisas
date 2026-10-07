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
      <nav className="sticky top-0 z-50 w-full bg-[#000000] py-3 md:py-4 shadow-md">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between">

          {/* TOPO MOBILE: Logo na esquerda, Ícones na direita */}
          <div className="w-full md:w-auto flex flex-row justify-between items-center px-4 md:px-6">
            <div className="flex-shrink-0">
              <Link className="flex-shrink-0 cursor-pointer transition-opacity hover:opacity-80" href="/"><img src="/files/BSKW_horizontal_cor-branco-ambar.png" alt="B.SKW" className="h-8 md:h-10 w-auto object-contain" /></Link>
            </div>
            <div className="flex flex-row items-center gap-2 md:hidden">
              {/* Mobile Icons: Search, User, ShoppingCart */}
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

          {/* CENTRO: Categorias com Scroll Horizontal no Mobile */}
          <div className="w-full md:flex-1 overflow-x-auto hide-scrollbar mt-3 md:mt-0 px-4 md:px-8">
            <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center items-center gap-x-4 gap-y-4 w-max md:w-auto mx-auto pb-1 md:pb-0">
              <Link href="/categoria/promocoes" className="text-[#F59E0B] bg-transparent p-2 transition-colors hover:text-[#000000] whitespace-nowrap">PROMOÇÕES 🔥</Link>
              <Link href="/categoria/collab" className="text-[#9A9A9A] bg-transparent p-2 transition-colors hover:text-[#F59E0B] hover:text-[#000000] whitespace-nowrap">Collab (em breve)</Link>
              <Link href="/categoria/kits" className="text-white bg-transparent p-2 transition-colors hover:text-[#F59E0B] hover:text-[#000000] whitespace-nowrap">Kits</Link>
              <Link href="/categoria/basica" className="text-white bg-transparent p-2 transition-colors hover:text-[#F59E0B] hover:text-[#000000] whitespace-nowrap">Camiseta Básica</Link>
              <Link href="/categoria/oversized" className="text-white bg-transparent p-2 transition-colors hover:text-[#F59E0B] hover:text-[#000000] whitespace-nowrap">Camiseta Oversized</Link>
              <Link href="/categoria/suedine" className="text-white bg-transparent p-2 transition-colors hover:text-[#F59E0B] hover:text-[#000000] whitespace-nowrap">Camiseta Suedine</Link>
              <Link href="/categoria/boxy" className="text-white bg-transparent p-2 transition-colors hover:text-[#F59E0B] hover:text-[#000000] whitespace-nowrap">Camiseta Boxy</Link>
              <Link href="/categoria/poliamida" className="text-white bg-transparent p-2 transition-colors hover:text-[#F59E0B] hover:text-[#000000] whitespace-nowrap">Camiseta Poliamida</Link>
              <Link href="/categoria/manga-longa" className="text-white bg-transparent p-2 transition-colors hover:text-[#F59E0B] hover:text-[#000000] whitespace-nowrap">Manga Longa</Link>
              <Link href="/categoria/feminino" className="text-white bg-transparent p-2 transition-colors hover:text-[#F59E0B] hover:text-[#000000] whitespace-nowrap">Feminino</Link>
              <Link href="/categoria/moletom" className="text-white bg-transparent p-2 transition-colors hover:text-[#F59E0B] hover:text-[#000000] whitespace-nowrap">Moletom</Link>
              <Link href="/categoria/regata" className="text-white bg-transparent p-2 transition-colors hover:text-[#F59E0B] hover:text-[#000000] whitespace-nowrap">Regata Oversized</Link>
              <Link href="/categoria/shorts" className="text-white bg-transparent p-2 transition-colors hover:text-[#F59E0B] hover:text-[#000000] whitespace-nowrap">Shorts</Link>
            </div>
          </div>

          {/* DIREITA DESKTOP: Ícones */}
          <div className="hidden md:flex flex-shrink-0 flex-row items-center gap-2 px-6">
            {/* Desktop Icons: Search, User, ShoppingCart */}
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
      </nav>
    </>
  );
}