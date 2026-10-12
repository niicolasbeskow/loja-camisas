"use client";
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { signIn, signOut } from 'next-auth/react';

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
        {session?.user?.image ? (
          <img src={session.user.image} alt="Perfil" className="w-8 h-8 rounded-full border-2 border-zinc-700 hover:border-[#F59E0B] transition-colors object-cover" />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-sm shadow-xl z-50 overflow-hidden border border-zinc-200">
          {session ? (
            <div className="flex flex-col">
              <div className="px-4 py-4 border-b border-zinc-100 bg-zinc-50 flex items-center gap-3">
                {session.user?.image && <img src={session.user.image} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />}
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-black truncate">{session.user?.name}</p>
                  <p className="text-xs text-zinc-500 truncate">{session.user?.email}</p>
                </div>
              </div>
              <Link href="/perfil" onClick={() => setIsOpen(false)} className="px-4 py-3 text-sm text-zinc-700 hover:bg-zinc-100 font-medium">Meu Perfil / Endereços</Link>
              <Link href="/pedidos" onClick={() => setIsOpen(false)} className="px-4 py-3 text-sm text-zinc-700 hover:bg-zinc-100 font-medium border-t border-zinc-100">Meus Pedidos</Link>
              <button onClick={() => { setIsOpen(false); signOut({ callbackUrl: '/' }); }} className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 font-bold border-t border-zinc-100 uppercase">Sair da Conta</button>
            </div>
          ) : (
            <div className="flex flex-col p-4 gap-3">
              <p className="text-sm font-bold text-black uppercase mb-1">Acesse sua conta</p>
              <button 
                onClick={() => { setIsOpen(false); signIn('google', { callbackUrl: '/' }); }}
                className="w-full flex items-center justify-center gap-3 bg-white border border-zinc-300 text-zinc-700 font-bold py-2.5 rounded-sm hover:bg-zinc-50 transition-colors text-sm"
              >
                <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Entrar com Google
              </button>
              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-zinc-200"></div>
                <span className="flex-shrink-0 mx-2 text-zinc-400 text-[10px] uppercase font-bold">Ou</span>
                <div className="flex-grow border-t border-zinc-200"></div>
              </div>
              <Link href="/login" onClick={() => setIsOpen(false)} className="w-full text-center bg-black text-white font-bold py-2.5 rounded-sm hover:bg-[#F59E0B] hover:text-black transition-colors text-sm uppercase">
                Login com Email
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
