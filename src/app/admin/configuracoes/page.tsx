import { Save } from 'lucide-react';

export default function ConfigAdmin() {
  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-anton uppercase text-zinc-900 tracking-wide">Configurações Gerais</h1>
        <p className="text-zinc-500 text-sm mt-1 font-medium">Ajuste os detalhes de contacto e informações da loja B.SKW.</p>
      </header>

      <form className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6 md:p-8 space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-700">Nome Oficial da Marca</label>
          <input type="text" defaultValue="B.SKW" className="w-full border-2 border-zinc-200 p-3 font-medium text-sm focus:border-black outline-none transition-colors" />
        </div>
        
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-700">E-mail de Suporte / Contacto</label>
          <input type="email" defaultValue="contato@bskw.com.br" className="w-full border-2 border-zinc-200 p-3 font-medium text-sm focus:border-black outline-none transition-colors" />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-700">Aviso da Barra Superior (Topo do Site)</label>
          <input type="text" defaultValue="PROMOÇÃO B.SKW 🔥 FRETE GRÁTIS EM COMPRAS ACIMA DE R$ 300" className="w-full border-2 border-zinc-200 p-3 font-medium text-sm focus:border-black outline-none transition-colors" />
        </div>

        <div className="pt-6 border-t border-zinc-200 flex justify-end">
          <button type="button" className="bg-amber-500 text-black px-8 py-4 font-bold text-xs uppercase tracking-widest hover:bg-amber-400 transition-colors flex items-center gap-2">
            <Save size={16} /> Guardar Alterações
          </button>
        </div>
      </form>
    </div>
  );
}
