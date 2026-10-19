"use client";

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // Destrói o cookie definindo uma data no passado
    document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push('/login');
    router.refresh();
  };

  return (
    <button onClick={handleLogout} className="flex w-full items-center gap-3 px-4 py-3 text-red-400 hover:bg-zinc-800 hover:text-red-300 rounded-lg transition-colors text-xs font-bold uppercase tracking-wider text-left">
      <LogOut size={16} /> Sair do Painel
    </button>
  );
}
