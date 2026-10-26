"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package, LayoutDashboard, ShoppingCart, Settings, Store } from 'lucide-react';
import LogoutButton from '@/components/LogoutButton';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Descobre em que ecrã estamos agora

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col md:flex-row font-outfit">
      
      <aside className="w-full md:w-64 bg-zinc-900 text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-zinc-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-amber-500 text-black font-anton flex items-center justify-center text-xl pt-1">B</div>
          <span className="font-bold tracking-widest uppercase text-sm">Admin Panel</span>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-2">
          {/* Botão DASHBOARD (Laranja se a rota for exatamente /admin) */}
          <Link 
            href="/admin" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
              pathname === '/admin' 
                ? 'bg-zinc-800 text-amber-500' 
                : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
            }`}
          >
            <LayoutDashboard size={16} /> Dashboard
          </Link>

          {/* Botão PRODUTOS (Laranja se a rota começar por /admin/produtos) */}
          <Link 
            href="/admin/produtos" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
              pathname?.startsWith('/admin/produtos') 
                ? 'bg-zinc-800 text-amber-500' 
                : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
            }`}
          >
            <Package size={16} /> Produtos
          </Link>

          {/* Botão PEDIDOS */}
          <Link 
            href="/admin/pedidos" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
              pathname?.startsWith('/admin/pedidos') 
                ? 'bg-zinc-800 text-amber-500' 
                : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
            }`}
          >
            <ShoppingCart size={16} /> Pedidos
          </Link>

          {/* Botão CONFIGURAÇÕES */}
          <Link 
            href="/admin/configuracoes" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
              pathname?.startsWith('/admin/configuracoes') 
                ? 'bg-zinc-800 text-amber-500' 
                : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
            }`}
          >
            <Settings size={16} /> Configurações
          </Link>
        </nav>
        
        <div className="p-4 border-t border-zinc-800 flex flex-col gap-2">
          <Link href="/" target="_blank" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:bg-zinc-800 hover:text-white rounded-lg transition-colors text-xs font-bold uppercase tracking-wider">
            <Store size={16} /> Ver Loja Aberta
          </Link>
          <LogoutButton />
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-8 lg:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
