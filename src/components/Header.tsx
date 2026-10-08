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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        <div className="max-w-[1600px] mx-auto w-full px-4 relative">
          <div className="flex items-center justify-between h-16 md:h-20 w-full">

            {/* ESQUERDA: Hambúrguer (Apenas Mobile) */}
            <div className="flex-1 flex md:hidden justify-start">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-[#F59E0B] transition-colors p-2 -ml-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
              </button>
            </div>

            {/* CENTRO: Logo (No mobile ao centro, no desktop à esquerda) */}
            <div className="flex-1 md:flex-none flex justify-center md:justify-start">
              <Link href="/" className="transition-opacity hover:opacity-80">
                <img src="/files/BSKW_horizontal_cor-branco-ambar.png" alt="B.SKW" className="h-8 md:h-10 w-auto object-contain" />
              </Link>
            </div>

            {/* CENTRO-DIREITA: Menu Desktop (Apenas Desktop) */}
            <div className="hidden md:flex flex-1 justify-center items-center gap-6">
              {/* Coloque aqui os Links de categorias do desktop (Promoções, Básica, Oversized, etc) */}
              <Link href="/categoria/promocoes" className="text-[#F59E0B] transition-colors hover:text-[#000000]">PROMOÇÕES 🔥</Link>
              <Link href="/categoria/collab" className="text-[#9A9A9A] transition-colors hover:text-[#F59E0B] hover:text-[#000000]">Collab (em breve)</Link>
              <Link href="/categoria/kits" className="text-white transition-colors hover:text-[#F59E0B] hover:text-[#000000]">Kits</Link>
              <Link href="/categoria/basica" className="text-white transition-colors hover:text-[#F59E0B] hover:text-[#000000]">Camiseta Básica</Link>
              <Link href="/categoria/oversized" className="text-white transition-colors hover:text-[#F59E0B] hover:text-[#000000]">Camiseta Oversized</Link>
              <Link href="/categoria/suedine" className="text-white transition-colors hover:text-[#F59E0B] hover:text-[#000000]">Camiseta Suedine</Link>
              <Link href="/categoria/boxy" className="text-white transition-colors hover:text-[#F59E0B] hover:text-[#000000]">Camiseta Boxy</Link>
              <Link href="/categoria/poliamida" className="text-white transition-colors hover:text-[#F59E0B] hover:text-[#000000]">Camiseta Poliamida</Link>
              <Link href="/categoria/manga-longa" className="text-white transition-colors hover:text-[#F59E0B] hover:text-[#000000]">Manga Longa</Link>
              <Link href="/categoria/feminino" className="text-white transition-colors hover:text-[#F59E0B] hover:text-[#000000]">Feminino</Link>
              <Link href="/categoria/moletom" className="text-white transition-colors hover:text-[#F59E0B] hover:text-[#000000]">Moletom</Link>
              <Link href="/categoria/regata" className="text-white transition-colors hover:text-[#F59E0B] hover:text-[#000000]">Regata Oversized</Link>
              <Link href="/categoria/shorts" className="text-white transition-colors hover:text-[#F59E0B] hover:text-[#000000]">Shorts</Link>
            </div>

            {/* DIREITA: Ícones (Mobile e Desktop) */}
            <div className="flex-1 flex justify-end items-center gap-3 md:gap-6">
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                  </button>
                </form>
              ) : (
                <>
                  <button
                    onClick={() => setSearchOpen(!searchOpen)}
                    className="text-white hover:text-[#F59E0B] transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                  </button>
                  <UserDropdown session={typeof session !== 'undefined' ? session : null} />
                  <button className="text-white hover:text-[#F59E0B] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                  </button>
                </>
              )}
            </div>

          </div>
        </div>
      </nav>

      {/* DROPDOWN DO MENU MOBILE */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#000000] border-t border-zinc-800 shadow-2xl z-40">
          <div className="flex flex-col px-4 py-4 space-y-4">
            {/* Coloque aqui os mesmos links de categorias para o Mobile */}
            <Link href="/categoria/promocoes" className="text-white hover:text-[#F59E0B] font-medium block py-2">Promoções 🔥</Link>
            <Link href="/categoria/basica" className="text-zinc-300 hover:text-[#F59E0B] block py-2">Camiseta Básica</Link>
            <Link href="/categoria/oversized" className="text-zinc-300 hover:text-[#F59E0B] block py-2">Camiseta Oversized</Link>
            <Link href="/categoria/moletom" className="text-zinc-300 hover:text-[#F59E0B] block py-2">Moletons</Link>
            {/* Adicione outras categorias conforme necessário */}
          </div>
        </div>
      )}
    </>
  );
}