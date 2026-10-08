'use client';

import { useCartStore } from '@/store/cartStore';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Search, User, ShoppingCart, Menu } from 'lucide-react';
import { useState } from 'react';
import UserDropdown from './UserDropdown';

export default function Header() {
  const totalItems = useCartStore((state) => state.totalItems);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const { data: session, status } = useSession();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        <div className="w-full flex flex-col md:flex-row items-center justify-between px-4">

          {/* LOGO ESQUERDA */}
          <div className="flex-shrink-0">
            <Link className="flex-shrink-0 cursor-pointer transition-opacity hover:opacity-80" href="/"><img src="/files/BSKW_horizontal_cor-branco-ambar.png" alt="B.SKW" className="h-8 md:h-10 w-auto object-contain" /></Link>
          </div>

          {/* HAMBURGER MENU - Mobile only */}
          <div className="md:hidden flex-shrink-0">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white hover:text-[#F59E0B] transition-colors">
              <Menu className="h-5 w-5" />
            </button>
          </div>

          {/* CENTRO: Categorias com Scroll Horizontal */}
          <div className={`hidden md:flex ${mobileMenuOpen && 'block'} md:flex-1 flex-1 mt-4 md:mt-0`}>
            <div className={`flex ${mobileMenuOpen && 'flex-col' } flex-nowrap md:flex-wrap justify-start md:justify-center items-center gap-x-4 gap-y-4 w-full md:w-auto mx-auto pb-1 md:pb-0 ${mobileMenuOpen && 'mt-4'}`}>
              <Link href="/categoria/promocoes" className={`text-[#F59E0B] bg-transparent p-2 transition-colors hover:text-[#000000] ${mobileMenuOpen ? 'block text-center w-full border-b border-zinc-800' : 'whitespace-nowrap'}`}>PROMOÇÕES 🔥</Link>
              <Link href="/categoria/collab" className={`text-[#9A9A9A] bg-transparent p-2 transition-colors hover:text-[#F59E0B] hover:text-[#000000] ${mobileMenuOpen ? 'block text-center w-full border-b border-zinc-800' : 'whitespace-nowrap'}`}>Collab (em breve)</Link>
              <Link href="/categoria/kits" className={`text-white bg-transparent p-2 transition-colors hover:text-[#F59E0B] hover:text-[#000000] ${mobileMenuOpen ? 'block text-center w-full border-b border-zinc-800' : 'whitespace-nowrap'}`}>Kits</Link>
              <Link href="/categoria/basica" className={`text-white bg-transparent p-2 transition-colors hover:text-[#F59E0B] hover:text-[#000000] ${mobileMenuOpen ? 'block text-center w-full border-b border-zinc-800' : 'whitespace-nowrap'}`}>Camiseta Básica</Link>
              <Link href="/categoria/oversized" className={`text-white bg-transparent p-2 transition-colors hover:text-[#F59E0B] hover:text-[#000000] ${mobileMenuOpen ? 'block text-center w-full border-b border-zinc-800' : 'whitespace-nowrap'}`}>Camiseta Oversized</Link>
              <Link href="/categoria/suedine" className={`text-white bg-transparent p-2 transition-colors hover:text-[#F59E0B] hover:text-[#000000] ${mobileMenuOpen ? 'block text-center w-full border-b border-zinc-800' : 'whitespace-nowrap'}`}>Camiseta Suedine</Link>
              <Link href="/categoria/boxy" className={`text-white bg-transparent p-2 transition-colors hover:text-[#F59E0B] hover:text-[#000000] ${mobileMenuOpen ? 'block text-center w-full border-b border-zinc-800' : 'whitespace-nowrap'}`}>Camiseta Boxy</Link>
              <Link href="/categoria/poliamida" className={`text-white bg-transparent p-2 transition-colors hover:text-[#F59E0B] hover:text-[#000000] ${mobileMenuOpen ? 'block text-center w-full border-b border-zinc-800' : 'whitespace-nowrap'}`}>Camiseta Poliamida</Link>
              <Link href="/categoria/manga-longa" className={`text-white bg-transparent p-2 transition-colors hover:text-[#F59E0B] hover:text-[#000000] ${mobileMenuOpen ? 'block text-center w-full border-b border-zinc-800' : 'whitespace-nowrap'}`}>Manga Longa</Link>
              <Link href="/categoria/feminino" className={`text-white bg-transparent p-2 transition-colors hover:text-[#F59E0B] hover:text-[#000000] ${mobileMenuOpen ? 'block text-center w-full border-b border-zinc-800' : 'whitespace-nowrap'}`}>Feminino</Link>
              <Link href="/categoria/moletom" className={`text-white bg-transparent p-2 transition-colors hover:text-[#F59E0B] hover:text-[#000000] ${mobileMenuOpen ? 'block text-center w-full border-b border-zinc-800' : 'whitespace-nowrap'}`}>Moletom</Link>
              <Link href="/categoria/regata" className={`text-white bg-transparent p-2 transition-colors hover:text-[#F59E0B] hover:text-[#000000] ${mobileMenuOpen ? 'block text-center w-full border-b border-zinc-800' : 'whitespace-nowrap'}`}>Regata Oversized</Link>
              <Link href="/categoria/shorts" className={`text-white bg-transparent p-2 transition-colors hover:text-[#F59E0B] hover:text-[#000000] ${mobileMenuOpen ? 'block text-center w-full border-b border-zinc-800' : 'whitespace-nowrap'}`}>Shorts</Link>
            </div>
          </div>

          {/* ÚNICO: Ícones (Search, User, ShoppingCart) */}
          <div className="flex flex-shrink-0 flex-row items-center gap-3 md:gap-6">
            {/* Icons: Search, User, ShoppingCart */}
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
              <>
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="text-white hover:text-[#F59E0B] transition-colors"
                >
                  <Search className="h-5 w-5" />
                </button>
                <UserDropdown session={typeof session !== 'undefined' ? session : null} />
                <button onClick={toggleCart} className="text-white hover:text-[#F59E0B] transition-colors relative">
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center bg-amber-500 text-[10px] font-bold text-black rounded-full">
                      {totalItems}
                    </span>
                  )}
                </button>
              </>
            )}
          </div>

        </div>
      </nav>
    </>
  );
}