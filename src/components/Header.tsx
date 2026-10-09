"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import UserDropdown from "./UserDropdown";

export default function Header() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      router.push(`/busca?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-[#000000] py-4 shadow-md border-b border-zinc-900">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 w-full">

          {/* ================= DESKTOP LAYOUT ================= */}
          <div className="hidden md:flex items-start justify-between w-full">
            <Link href="/" className="flex-shrink-0 mt-1 transition-opacity hover:opacity-80">
              <img src="/files/BSKW_horizontal_cor-branco-ambar.png" alt="B.SKW" className="h-10 w-auto object-contain" />
            </Link>

            <div className="flex-1 flex flex-wrap justify-center gap-x-6 gap-y-3 px-8">
              <Link href="/categoria/promocoes" className="text-sm font-bold text-[#F59E0B] hover:text-amber-400 transition-colors uppercase tracking-wide">Promoções 🔥</Link>
              <Link href="/categoria/collab" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">Collab (em breve)</Link>
              <Link href="/categoria/kits" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">Kits</Link>
              <Link href="/categoria/camiseta-basica" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">Camiseta Básica</Link>
              <Link href="/categoria/camiseta-oversized" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">Camiseta Oversized</Link>
              <Link href="/categoria/camiseta-suedine" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">Camiseta Suedine</Link>
              <Link href="/categoria/camiseta-boxy" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">Camiseta Boxy</Link>
              <Link href="/categoria/camiseta-poliamida" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">Camiseta Poliamida</Link>
              <Link href="/categoria/manga-longa" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">Manga Longa</Link>
              <Link href="/categoria/feminino" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">Feminino</Link>
              <Link href="/categoria/moletom" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">Moletom</Link>
              <Link href="/categoria/regata-oversized" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">Regata Oversized</Link>
              <Link href="/categoria/shorts" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">Shorts</Link>
            </div>

            <div className="flex flex-shrink-0 items-center gap-6 mt-1">
              <button onClick={() => setIsSearchOpen(true)} className="text-white hover:text-[#F59E0B] transition-colors" aria-label="Pesquisar">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </button>
              <UserDropdown session={session} />
              <button onClick={() => setIsCartOpen(true)} className="text-white hover:text-[#F59E0B] transition-colors relative" aria-label="Carrinho">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                <span className="absolute -top-2 -right-2 bg-[#F59E0B] text-[#000000] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
              </button>
            </div>
          </div>

          {/* ================= MOBILE LAYOUT ================= */}
          <div className="flex md:hidden items-center justify-between w-full">
            <button onClick={() => setIsMobileMenuOpen(true)} className="text-white hover:text-[#F59E0B] p-2 -ml-2 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </button>

            <Link href="/" className="absolute left-1/2 -translate-x-1/2 transition-opacity hover:opacity-80">
              <img src="/files/BSKW_horizontal_cor-branco-ambar.png" alt="B.SKW" className="h-8 w-auto object-contain" />
            </Link>

            <div className="flex items-center gap-4">
              <button onClick={() => setIsSearchOpen(true)} className="text-white hover:text-[#F59E0B] transition-colors" aria-label="Pesquisar">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </button>
              <UserDropdown session={session} />
              <button onClick={() => setIsCartOpen(true)} className="text-white hover:text-[#F59E0B] transition-colors relative" aria-label="Carrinho">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                <span className="absolute -top-2 -right-2 bg-[#F59E0B] text-[#000000] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ================= DRAWER MENU MOBILE ================= */}
      <div className={`md:hidden fixed inset-0 z-[100] transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
         <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
         <div className={`absolute inset-y-0 left-0 w-[80%] max-w-sm bg-[#000000] border-r border-zinc-800 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex items-center justify-between p-5 border-b border-zinc-800">
              <span className="font-anton text-2xl tracking-wide text-white uppercase">Categorias</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-400 hover:text-[#F59E0B] p-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            </div>
            <div className="flex flex-col p-5 space-y-6 overflow-y-auto pb-10">
              <Link href="/categoria/promocoes" onClick={() => setIsMobileMenuOpen(false)} className="text-lg text-[#F59E0B] font-bold tracking-wide">Promoções 🔥</Link>
              <Link href="/categoria/collab" onClick={() => setIsMobileMenuOpen(false)} className="text-lg text-zinc-300 hover:text-white transition-colors">Collab (em breve)</Link>
              <Link href="/categoria/kits" onClick={() => setIsMobileMenuOpen(false)} className="text-lg text-zinc-300 hover:text-white transition-colors">Kits</Link>
              <Link href="/categoria/camiseta-basica" onClick={() => setIsMobileMenuOpen(false)} className="text-lg text-zinc-300 hover:text-white transition-colors">Camiseta Básica</Link>
              <Link href="/categoria/camiseta-oversized" onClick={() => setIsMobileMenuOpen(false)} className="text-lg text-zinc-300 hover:text-white transition-colors">Camiseta Oversized</Link>
              <Link href="/categoria/camiseta-suedine" onClick={() => setIsMobileMenuOpen(false)} className="text-lg text-zinc-300 hover:text-white transition-colors">Camiseta Suedine</Link>
              <Link href="/categoria/camiseta-boxy" onClick={() => setIsMobileMenuOpen(false)} className="text-lg text-zinc-300 hover:text-white transition-colors">Camiseta Boxy</Link>
              <Link href="/categoria/camiseta-poliamida" onClick={() => setIsMobileMenuOpen(false)} className="text-lg text-zinc-300 hover:text-white transition-colors">Camiseta Poliamida</Link>
              <Link href="/categoria/manga-longa" onClick={() => setIsMobileMenuOpen(false)} className="text-lg text-zinc-300 hover:text-white transition-colors">Manga Longa</Link>
              <Link href="/categoria/feminino" onClick={() => setIsMobileMenuOpen(false)} className="text-lg text-zinc-300 hover:text-white transition-colors">Feminino</Link>
              <Link href="/categoria/moletom" onClick={() => setIsMobileMenuOpen(false)} className="text-lg text-zinc-300 hover:text-white transition-colors">Moletom</Link>
              <Link href="/categoria/regata-oversized" onClick={() => setIsMobileMenuOpen(false)} className="text-lg text-zinc-300 hover:text-white transition-colors">Regata Oversized</Link>
              <Link href="/categoria/shorts" onClick={() => setIsMobileMenuOpen(false)} className="text-lg text-zinc-300 hover:text-white transition-colors">Shorts</Link>
            </div>
         </div>
      </div>

      {/* ================= DRAWER DO CARRINHO ================= */}
      <div className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
         <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
         <div className={`absolute inset-y-0 right-0 w-full sm:w-[400px] bg-[#000000] border-l border-zinc-800 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex items-center justify-between p-5 border-b border-zinc-800">
              <span className="font-anton text-2xl tracking-wide text-white uppercase">Seu Carrinho</span>
              <button onClick={() => setIsCartOpen(false)} className="text-zinc-400 hover:text-[#F59E0B] p-1 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-6"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
              <h2 className="text-2xl font-anton uppercase tracking-wide text-white mb-2">Carrinho Vazio</h2>
              <p className="text-zinc-400 text-sm mb-8">Você ainda não selecionou nenhuma armadura para forjar.</p>
              <button onClick={() => setIsCartOpen(false)} className="w-full bg-[#F59E0B] text-[#000000] font-bold uppercase tracking-wide py-4 rounded-md hover:bg-amber-400 transition-colors">
                Continuar Comprando
              </button>
            </div>
         </div>
      </div>

      {/* ================= MODAL DE BUSCA ================= */}
      <div className={`fixed inset-0 z-[120] transition-opacity duration-300 flex items-start justify-center pt-24 md:pt-32 ${isSearchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
         <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsSearchOpen(false)} />
         <div className={`relative w-full max-w-3xl mx-4 transform transition-transform duration-300 ${isSearchOpen ? 'translate-y-0' : '-translate-y-10'}`}>
           <form onSubmit={handleSearch} className="relative flex items-center">
             <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="O que você está procurando?" autoFocus={isSearchOpen} className="w-full bg-[#111111] border border-zinc-700 text-white text-xl md:text-2xl px-6 py-5 md:py-6 rounded-md focus:outline-none focus:border-[#F59E0B] shadow-2xl placeholder:text-zinc-600" />
             <button type="submit" className="absolute right-6 text-zinc-400 hover:text-[#F59E0B] transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
             </button>
           </form>
           <button onClick={() => setIsSearchOpen(false)} className="absolute -top-10 right-0 text-zinc-400 hover:text-white flex items-center gap-2 text-sm uppercase tracking-widest transition-colors">
             Fechar <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
           </button>
         </div>
      </div>
    </>
  );
}