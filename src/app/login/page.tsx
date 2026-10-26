"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // A SENHA DEFINIDA PARA O MVP É: bskw2026
    if (senha === 'bskw2026') { 
      document.cookie = "admin_session=true; path=/; max-age=86400"; // Dura 24 horas
      router.push('/admin');
      router.refresh();
    } else {
      setErro(true);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center font-outfit px-4 relative overflow-hidden">
      {/* Fundo levemente texturizado / Efeito visual */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-zinc-900 to-zinc-900"></div>

      <Link href="/" className="mb-10 hover:opacity-80 transition-opacity relative z-10">
        <img src="/files/BSKW_empilhado_cor-branco-ambar.png" alt="B.SKW" className="w-28 object-contain" />
      </Link>
      
      <div className="bg-white p-8 md:p-12 max-w-sm w-full rounded-none shadow-2xl relative z-10 border-t-4 border-amber-500">
        <h1 className="text-2xl font-anton uppercase text-center text-zinc-900 mb-1">Acesso Restrito</h1>
        <p className="text-zinc-500 text-center text-[10px] mb-8 uppercase tracking-widest font-bold">Painel de Controlo</p>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <input 
              type="password" 
              placeholder="Palavra-passe de Admin" 
              value={senha}
              onChange={(e) => { setSenha(e.target.value); setErro(false); }}
              className={`w-full border-2 p-4 text-sm font-medium focus:outline-none transition-colors ${erro ? 'border-red-500 focus:border-red-600' : 'border-zinc-200 focus:border-black'}`}
            />
            {erro && <p className="text-red-600 text-[10px] uppercase font-bold mt-2 tracking-wider">Acesso negado. Tente novamente.</p>}
          </div>
          <button type="submit" className="w-full bg-black text-white p-4 font-bold text-xs uppercase tracking-widest hover:bg-zinc-800 transition-colors mt-2">
            Entrar no Sistema
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <Link href="/" className="text-zinc-400 hover:text-black text-[10px] uppercase font-bold tracking-wider transition-colors">
            ← Voltar para a Loja
          </Link>
        </div>
      </div>
    </div>
  );
}
