"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import UserDropdown from "./UserDropdown";
import { useCart } from "@/contexts/CartContext";
import { useSession } from "next-auth/react";

const CATEGORIAS = [
  { nome: "Promoções 🔥", slug: "promocoes", class: "text-[#F59E0B] hover:text-amber-400" },
  { nome: "Collab (em breve)", slug: "collab", class: "text-zinc-300 hover:text-white" },
  { nome: "Kits", slug: "kits", class: "text-zinc-300 hover:text-white" },
  { nome: "Camiseta Básica", slug: "camiseta-basica", class: "text-zinc-300 hover:text-white" },
  { nome: "Camiseta Oversized", slug: "camiseta-oversized", class: "text-zinc-300 hover:text-white" },
  { nome: "Camiseta Suedine", slug: "camiseta-suedine", class: "text-zinc-300 hover:text-white" },
  { nome: "Camiseta Boxy", slug: "camiseta-boxy", class: "text-zinc-300 hover:text-white" },
  { nome: "Camiseta Poliamida", slug: "camiseta-poliamida", class: "text-zinc-300 hover:text-white" },
  { nome: "Manga Longa", slug: "manga-longa", class: "text-zinc-300 hover:text-white" },
  { nome: "Feminino", slug: "feminino", class: "text-zinc-300 hover:text-white" },
  { nome: "Moletom", slug: "moletom", class: "text-zinc-300 hover:text-white" },
  { nome: "Regata Oversized", slug: "regata-oversized", class: "text-zinc-300 hover:text-white" },
  { nome: "Shorts", slug: "shorts", class: "text-zinc-300 hover:text-white" },
];

export default function Header({ session: _propSession }: { session?: any }) {
  // A SESSÃO REAL É BUSCADA AQUI (IGNORA O NULL DO LAYOUT)
  const { data: session } = useSession(); 
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { cartItems, cartCount, cartTotal, removeFromCart, isCartOpen, setIsCartOpen } = useCart();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      router.push(`/busca?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleCartClick = () => {
    if (!session) {
      alert('Você precisa estar logado para abrir a sua armadura.');
      router.push('/login');
      return;
    }
    setIsCartOpen(true);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-[#000000] py-4 shadow-md border-b border-zinc-900">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 w-full">
          <div className="hidden lg:flex items-start justify-between w-full">
            <Link href="/" className="flex-shrink-0 mt-1 transition-opacity hover:opacity-80">
              <img src="/files/BSKW_horizontal_cor-branco-ambar.png" alt="B.SKW" className="h-10 w-auto object-contain" />
            </Link>
            
            {/* AS 13 CATEGORIAS RESTAURADAS! */}
            <div className="flex-1 flex flex-wrap justify-center gap-x-4 gap-y-2 px-6">
              {CATEGORIAS.map(cat => (
                <Link key={cat.slug} href={`/categoria/${cat.slug}`} className={`text-[11px] font-medium uppercase tracking-widest ${cat.class}`}>
                  {cat.nome}
                </Link>
              ))}
            </div>

            <div className="flex flex-shrink-0 items-center gap-6 mt-1">
              <button onClick={() => setIsSearchOpen(true)} className="text-white hover:text-[#F59E0B] transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg></button>
              <UserDropdown session={session} />
              <button onClick={handleCartClick} className="text-white hover:text-[#F59E0B] relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-[#F59E0B] text-[#000000] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>}
              </button>
            </div>
          </div>

          <div className="flex lg:hidden items-center justify-between w-full">
            <button onClick={() => setIsMobileMenuOpen(true)} className="text-white hover:text-[#F59E0B] p-2 -ml-2"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg></button>
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 hover:opacity-80"><img src="/files/BSKW_horizontal_cor-branco-ambar.png" alt="B.SKW" className="h-8 w-auto object-contain" /></Link>
            <div className="flex items-center gap-4">
              <UserDropdown session={session} />
              <button onClick={handleCartClick} className="text-white hover:text-[#F59E0B] relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-[#F59E0B] text-[#000000] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* DRAWER DO CARRINHO */}
      <div className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
         <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
         <div className={`absolute inset-y-0 right-0 w-full sm:w-[400px] bg-[#000000] border-l border-zinc-800 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex items-center justify-between p-5 border-b border-zinc-800">
              <span className="font-anton text-2xl tracking-wide text-white uppercase">Seu Carrinho</span>
              <button onClick={() => setIsCartOpen(false)} className="text-zinc-400 hover:text-[#F59E0B] p-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            </div>
            <div className="flex-1 flex flex-col p-6 overflow-y-auto">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <h2 className="text-2xl font-anton uppercase tracking-wide text-white mb-2">Carrinho Vazio</h2>
                  <button onClick={() => setIsCartOpen(false)} className="w-full bg-[#F59E0B] text-[#000000] font-bold uppercase tracking-wide py-4 rounded-md hover:bg-amber-400 mt-8">Continuar Comprando</button>
                </div>
              ) : (
                <div className="flex flex-col gap-6 h-full">
                  <div className="flex-1 overflow-y-auto pr-2 space-y-6">
                    {cartItems.map((item, idx) => (
                      <div key={idx} className="flex gap-4 border-b border-zinc-800 pb-4">
                        <div className="flex-1 flex flex-col">
                          <div className="flex justify-between items-start">
                            <h4 className="text-white font-bold text-sm uppercase line-clamp-2 pr-2">{item.titulo}</h4>
                            <button onClick={() => removeFromCart(item.titulo, item.cor, item.tamanho)} className="text-zinc-500 hover:text-red-500">Excluir</button>
                          </div>
                          <p className="text-zinc-400 text-xs mt-1">Cor: {item.cor} | Tam: {item.tamanho}</p>
                          <div className="mt-auto flex justify-between items-center pt-2">
                            <span className="text-[#F59E0B] font-bold">R$ {item.preco.toFixed(2).replace('.', ',')}</span>
                            <span className="text-zinc-400 text-xs bg-zinc-900 px-2 py-1 rounded-sm">Qtd: {item.quantidade}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto pt-4 border-t border-zinc-800">
                     <div className="flex justify-between text-white font-bold mb-2"><span>Subtotal</span><span className="text-[#F59E0B]">R$ {cartTotal.toFixed(2).replace('.', ',')}</span></div>
                     <button onClick={() => { setIsCartOpen(false); router.push('/checkout'); }} className="w-full bg-[#F59E0B] text-[#000000] font-bold uppercase tracking-wide py-4 rounded-md hover:bg-amber-400 mt-4">Finalizar Compra</button>
                  </div>
                </div>
              )}
            </div>
         </div>
      </div>
    </>
  );
}
