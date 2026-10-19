import Link from 'next/link';
import { Package, LayoutDashboard, ShoppingCart, Settings, LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col md:flex-row font-outfit">
      
      {/* Sidebar (Menu Lateral) */}
      <aside className="w-full md:w-64 bg-zinc-900 text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-zinc-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-amber-500 text-black font-anton flex items-center justify-center text-xl pt-1">B</div>
          <span className="font-bold tracking-widest uppercase text-sm">Admin Panel</span>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 bg-zinc-800 rounded-lg text-amber-500 hover:bg-zinc-700 transition-colors text-xs font-bold uppercase tracking-wider">
            <LayoutDashboard size={16} /> Dashboard
          </Link>
          <Link href="/admin/produtos" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:bg-zinc-800 hover:text-white rounded-lg transition-colors text-xs font-bold uppercase tracking-wider">
            <Package size={16} /> Produtos
          </Link>
          <Link href="/admin/pedidos" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:bg-zinc-800 hover:text-white rounded-lg transition-colors text-xs font-bold uppercase tracking-wider">
            <ShoppingCart size={16} /> Pedidos
          </Link>
          <Link href="/admin/configuracoes" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:bg-zinc-800 hover:text-white rounded-lg transition-colors text-xs font-bold uppercase tracking-wider">
            <Settings size={16} /> Configurações
          </Link>
        </nav>
        
        <div className="p-4 border-t border-zinc-800">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider">
            <LogOut size={16} /> Ver Loja
          </Link>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-6 md:p-8 lg:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
