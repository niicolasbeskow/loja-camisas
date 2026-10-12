"use client";
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

export default function UserDropdown({ session }: { session: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-[#F59E0B] transition-colors flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-sm shadow-xl z-50 overflow-hidden border border-zinc-200">
          {session ? (
            <div className="flex flex-col">
              <div className="px-4 py-3 border-b border-zinc-100 bg-zinc-50">
                <p className="text-sm font-bold text-black truncate">{session.user?.name}</p>
                <p className="text-xs text-zinc-500 truncate">{session.user?.email}</p>
              </div>
              <Link href="/perfil" onClick={() => setIsOpen(false)} className="px-4 py-3 text-sm text-zinc-700 hover:bg-zinc-100 font-medium">Meu Perfil / Endereços</Link>
              <Link href="/pedidos" onClick={() => setIsOpen(false)} className="px-4 py-3 text-sm text-zinc-700 hover:bg-zinc-100 font-medium border-t border-zinc-100">Meus Pedidos</Link>
              <button onClick={() => { setIsOpen(false); signOut(); }} className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 font-bold border-t border-zinc-100 uppercase">Sair da Conta</button>
            </div>
          ) : (
            <div className="flex flex-col">
              <Link href="/login" onClick={() => setIsOpen(false)} className="px-4 py-4 text-sm text-black hover:bg-zinc-100 font-bold uppercase border-b border-zinc-100 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                Entrar (Login)
              </Link>
              <Link href="/cadastro" onClick={() => setIsOpen(false)} className="px-4 py-3 text-xs text-zinc-500 hover:text-black hover:bg-zinc-50 font-medium text-center">Ainda não tem conta? <strong className="underline">Criar Cadastro</strong></Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
