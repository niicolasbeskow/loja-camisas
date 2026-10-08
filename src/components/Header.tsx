"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { Search, User, ShoppingCart, Menu } from "lucide-react";
import UserDropdown from "./UserDropdown";

export default function Header() {
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-[#000000] py-4 shadow-md border-b border-zinc-900">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 w-full">

          {/* ================= DESKTOP LAYOUT ================= */}
          <div className="hidden md:flex items-start justify-between w-full">
            {/* Esquerda: Logo */}
            <Link href="/" className="flex-shrink-0 mt-1 transition-opacity hover:opacity-80">
              <img src="/files/BSKW_horizontal_cor-branco-ambar.png" alt="B.SKW" className="h-10 w-auto object-contain" />
            </Link>

            {/* Centro: Categorias com Wrap (Quebra de linha segura) */}
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

            {/* Direita: Ícones */}
            <div className="flex flex-shrink-0 items-center gap-6 mt-1">
              <button className="text-white hover:text-[#F59E0B] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </button>
              <UserDropdown session={typeof session !== 'undefined' ? session : null} />
              <button className="text-white hover:text-[#F59E0B] transition-colors relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
              </button>
            </div>
          </div>

          {/* ================= MOBILE LAYOUT ================= */}
          <div className="flex md:hidden items-center justify-between w-full">
            {/* Hambúrguer */}
            <button onClick={() => setIsMobileMenuOpen(true)} className="text-white hover:text-[#F59E0B] p-2 -ml-2 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </button>

            {/* Logo Centro */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 transition-opacity hover:opacity-80">
              <img src="/files/BSKW_horizontal_cor-branco-ambar.png" alt="B.SKW" className="h-8 w-auto object-contain" />
            </Link>

            {/* Ícones */}
            <div className="flex items-center gap-4">
              <button className="text-white hover:text-[#F59E0B]"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg></button>
              <UserDropdown session={typeof session !== 'undefined' ? session : null} />
              <button className="text-white hover:text-[#F59E0B]"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg></button>
            </div>
          </div>
        </div>
      </nav>

      {/* ================= DRAWER MOBILE (Mantido intacto) ================= */}
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
    </>
  );
}