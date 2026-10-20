"use client";

import { useState } from 'react';
import { 
  Save, Truck, CreditCard, Code, 
  Store, Power, Megaphone, Check 
} from 'lucide-react';

export default function ConfigAdmin() {
  // Estados para simular a interatividade das configurações
  const [avisoAtivo, setAvisoAtivo] = useState(true);
  const [manutencaoAtiva, setManutencaoAtiva] = useState(false);
  const [salvo, setSalvo] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSalvo(true);
    setTimeout(() => setSalvo(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto pb-12 font-outfit">
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-anton uppercase text-zinc-900 tracking-wide">Regras de Negócio</h1>
          <p className="text-zinc-500 text-sm mt-1 font-medium">Controlo de logística, checkout, tracking e operação do site.</p>
        </div>
        <button 
          onClick={handleSave}
          className={`flex items-center gap-2 px-8 py-4 font-bold text-xs uppercase tracking-widest transition-all ${
            salvo ? 'bg-green-500 text-white' : 'bg-amber-500 text-black hover:bg-amber-400'
          }`}
        >
          {salvo ? <><Check size={16} /> Salvo com Sucesso</> : <><Save size={16} /> Salvar Alterações</>}
        </button>
      </header>

      <form className="space-y-6 md:space-y-8" onSubmit={handleSave}>
        
        {/* BLOCO 1: Logística e Checkout */}
        <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-zinc-100 flex items-center gap-2 bg-zinc-50">
            <Truck size={18} className="text-zinc-500" />
            <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Logística & Checkout</h2>
          </div>
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-700">Gatilho de Frete Grátis (R$)</label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-zinc-400 font-medium text-sm">R$</span>
                <input type="number" defaultValue="299.00" step="0.01" className="w-full border-2 border-zinc-200 p-3 pl-10 font-bold text-sm focus:border-black outline-none transition-colors" />
              </div>
              <p className="text-[10px] text-zinc-500 font-medium mt-1">Valor mínimo no carrinho para zerar o frete.</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-700 flex items-center gap-2">
                <CreditCard size={14} /> Máximo de Parcelas Sem Juros
              </label>
              <select className="w-full border-2 border-zinc-200 p-3 font-bold text-sm focus:border-black outline-none transition-colors bg-white">
                <option value="1">Apenas à vista</option>
                <option value="2">Até 2x sem juros</option>
                <option value="3" selected>Até 3x sem juros</option>
                <option value="6">Até 6x sem juros</option>
              </select>
              <p className="text-[10px] text-zinc-500 font-medium mt-1">Afeta a exibição do preço em toda a loja.</p>
            </div>
          </div>
        </div>

        {/* BLOCO 2: Data & Tracking (BI) */}
        <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-zinc-100 flex items-center gap-2 bg-zinc-50">
            <Code size={18} className="text-zinc-500" />
            <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Data & Tracking (BI)</h2>
          </div>
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-700">Google Analytics 4 (Measurement ID)</label>
              <input type="text" placeholder="G-XXXXXXXXXX" className="w-full border-2 border-zinc-200 p-3 font-medium text-sm focus:border-black outline-none transition-colors font-mono" />
              <p className="text-[10px] text-zinc-500 font-medium mt-1">Rastreamento de visitantes e funil de conversão.</p>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-700">Meta Pixel ID (Facebook/Instagram)</label>
              <input type="text" placeholder="Ex: 123456789012345" className="w-full border-2 border-zinc-200 p-3 font-medium text-sm focus:border-black outline-none transition-colors font-mono" />
              <p className="text-[10px] text-zinc-500 font-medium mt-1">Essencial para campanhas de remarketing e tráfego pago.</p>
            </div>
          </div>
        </div>

        {/* BLOCO 3: Experiência da Loja */}
        <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-zinc-100 flex items-center gap-2 bg-zinc-50">
            <Megaphone size={18} className="text-zinc-500" />
            <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Comunicação e Loja</h2>
          </div>
          <div className="p-6 md:p-8 space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-700">Nome Oficial da Marca</label>
                <input type="text" defaultValue="B.SKW" className="w-full border-2 border-zinc-200 p-3 font-medium text-sm focus:border-black outline-none transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-700">E-mail de Suporte ao Cliente</label>
                <input type="email" defaultValue="contato@bskw.com.br" className="w-full border-2 border-zinc-200 p-3 font-medium text-sm focus:border-black outline-none transition-colors" />
              </div>
            </div>

            <div className="border-t border-zinc-100 pt-8">
              <div className="flex items-center justify-between mb-4">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-900">Barra de Aviso Superior (Topo do Site)</label>
                <button 
                  type="button"
                  onClick={() => setAvisoAtivo(!avisoAtivo)}
                  className={`w-12 h-6 rounded-full flex items-center p-1 transition-colors ${avisoAtivo ? 'bg-green-500' : 'bg-zinc-300'}`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${avisoAtivo ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </button>
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  defaultValue="PROMOÇÃO B.SKW 🔥 FRETE GRÁTIS EM COMPRAS ACIMA DE R$ 299" 
                  disabled={!avisoAtivo}
                  className={`w-full border-2 p-3 font-medium text-sm outline-none transition-colors ${avisoAtivo ? 'border-zinc-200 focus:border-black bg-white text-zinc-900' : 'border-zinc-100 bg-zinc-50 text-zinc-400 cursor-not-allowed'}`} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* BLOCO 4: Controlo de Sistema (Danger Zone) */}
        <div className="bg-white rounded-xl border border-red-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-red-100 flex items-center gap-2 bg-red-50 text-red-600">
            <Power size={18} />
            <h2 className="text-sm font-bold uppercase tracking-wider">Operação do Sistema</h2>
          </div>
          <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-sm font-bold text-zinc-900 mb-1">Modo Manutenção (Loja Fechada)</h3>
              <p className="text-xs text-zinc-500 font-medium">Impede que clientes naveguem e comprem. Útil para grandes atualizações ou antes de um "Drop" exclusivo.</p>
            </div>
            <button 
              type="button"
              onClick={() => setManutencaoAtiva(!manutencaoAtiva)}
              className={`px-6 py-3 border-2 font-bold text-xs uppercase tracking-widest whitespace-nowrap transition-colors ${
                manutencaoAtiva 
                  ? 'bg-red-600 border-red-600 text-white hover:bg-red-700' 
                  : 'bg-white border-zinc-200 text-zinc-600 hover:border-black hover:text-black'
              }`}
            >
              {manutencaoAtiva ? 'Desativar Manutenção' : 'Ativar Manutenção'}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}
