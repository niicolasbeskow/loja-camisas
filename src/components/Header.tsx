"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import UserDropdown from "./UserDropdown";

export default function Header({ session }: { session: any }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('@bskw-cart');
    if (savedCart) {
      try { setCartItems(JSON.parse(savedCart)); } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('@bskw-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const handleAddToCart = (e: any) => {
      const newItem = e.detail;
      setCartItems(prev => {
        const exists = prev.find(item => item.titulo === newItem.titulo && item.cor === newItem.cor && item.tamanho === newItem.tamanho);
        if (exists) {
           return prev.map(item => item === exists ? { ...item, quantidade: item.quantidade + 1 } : item);
        }
        return [...prev, newItem];
      });
      setIsCartOpen(true);
    };

    // BYPASS no TypeScript: forçamos o tipo any no window para aceitar o CustomEvent
    (window as any).addEventListener('adicionarAoCarrinho', handleAddToCart);
    return () => (window as any).removeEventListener('adicionarAoCarrinho', handleAddToCart);
  }, []);

  const router = useRouter();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      router.push(`/busca?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantidade, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);

  const removerItem = (titulo: string, cor: string, tamanho: string) => {
    setCartItems(prev => prev.filter(item => !(item.titulo === titulo && item.cor === cor && item.tamanho === tamanho)));
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-[#000000] py-4 shadow-md border-b border-zinc-900">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 w-full">
          
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
                {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-[#F59E0B] text-[#000000] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>}
              </button>
            </div>
          </div>

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
                {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-[#F59E0B] text-[#000000] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* DRAWER MENU MOBILE */}
      <div className={
cat << 'EOF' > src/components/Header.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import UserDropdown from "./UserDropdown";

export default function Header({ session }: { session: any }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('@bskw-cart');
    if (savedCart) {
      try { setCartItems(JSON.parse(savedCart)); } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('@bskw-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const handleAddToCart = (e: any) => {
      const newItem = e.detail;
      setCartItems(prev => {
        const exists = prev.find(item => item.titulo === newItem.titulo && item.cor === newItem.cor && item.tamanho === newItem.tamanho);
        if (exists) {
           return prev.map(item => item === exists ? { ...item, quantidade: item.quantidade + 1 } : item);
        }
        return [...prev, newItem];
      });
      setIsCartOpen(true);
    };

    // BYPASS no TypeScript: forçamos o tipo any no window para aceitar o CustomEvent
    (window as any).addEventListener('adicionarAoCarrinho', handleAddToCart);
    return () => (window as any).removeEventListener('adicionarAoCarrinho', handleAddToCart);
  }, []);

  const router = useRouter();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      router.push(`/busca?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantidade, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);

  const removerItem = (titulo: string, cor: string, tamanho: string) => {
    setCartItems(prev => prev.filter(item => !(item.titulo === titulo && item.cor === cor && item.tamanho === tamanho)));
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-[#000000] py-4 shadow-md border-b border-zinc-900">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 w-full">
          
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
                {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-[#F59E0B] text-[#000000] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>}
              </button>
            </div>
          </div>

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
                {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-[#F59E0B] text-[#000000] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* DRAWER MENU MOBILE */}
      <div className={

