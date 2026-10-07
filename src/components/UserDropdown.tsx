"use client";

import { useState, useRef, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { User } from 'lucide-react';

export default function UserDropdown({ session }: { session: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden border border-transparent hover:border-[#F59E0B] transition-colors focus:outline-none"
      >
        {session?.user?.image ? (
          <img src={session.user.image} alt="Perfil" className="w-full h-full object-cover" />
        ) : (
          <User className="w-6 h-6 text-white hover:text-[#F59E0B] transition-colors" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-48 bg-[#000000] border border-zinc-800 rounded-md shadow-xl z-50 overflow-hidden flex flex-col">
          {session?.user ? (
            <>
              <div className="px-4 py-3 border-b border-zinc-800">
                <p className="text-sm font-medium text-white truncate">{session.user.name}</p>
                <p className="text-xs text-zinc-400 truncate">{session.user.email}</p>
              </div>
              <Link href="/perfil" onClick={() => setIsOpen(false)} className="px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-900 hover:text-[#F59E0B] transition-colors">Perfil</Link>
              <Link href="/configuracoes" onClick={() => setIsOpen(false)} className="px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-900 hover:text-[#F59E0B] transition-colors">Configuração</Link>
              <button onClick={() => { setIsOpen(false); signOut({ callbackUrl: '/' }); }} className="px-4 py-2 text-sm text-left text-zinc-300 hover:bg-zinc-900 hover:text-red-500 transition-colors">
                Sair
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setIsOpen(false)} className="px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-900 hover:text-[#F59E0B] transition-colors">Entrar</Link>
              <Link href="/cadastro" onClick={() => setIsOpen(false)} className="px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-900 hover:text-[#F59E0B] transition-colors">Cadastro</Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}