"use client";

import { useState } from 'react';
import { Search, Clock, Package, Truck, Eye, ArrowRight, CheckCircle, Barcode, Check } from 'lucide-react';

type StatusPedido = 'Pendente' | 'Separacao' | 'ProntoEnvio' | 'Enviado';

interface Pedido {
  id: string;
  cliente: string;
  data: string;
  total: number;
  itens: number;
  status: StatusPedido;
  rastreio?: string;
}

export default function PedidosAdmin() {
  // BASE DE DADOS REAL ZERADA PARA PRODUÇÃO (GO-LIVE)
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  // Controlo para a caixa de input do código de rastreio
  const [inputRastreioAberto, setInputRastreioAberto] = useState<string | null>(null);
  const [codigoRastreio, setCodigoRastreio] = useState('');

  const moverPedido = (id: string, novoStatus: StatusPedido) => {
    setPedidos(prev => prev.map(p => p.id === id ? { ...p, status: novoStatus } : p));
  };

  const confirmarRastreio = (id: string) => {
    if (!codigoRastreio.trim()) return;
    setPedidos(prev => prev.map(p => p.id === id ? { ...p, status: 'Enviado', rastreio: codigoRastreio.trim().toUpperCase() } : p));
    setInputRastreioAberto(null);
    setCodigoRastreio('');
  };

  const renderColuna = (titulo: string, status: StatusPedido, icone: React.ReactNode, corBg: string, corBorda: string) => {
    const pedidosColuna = pedidos.filter(p => p.status === status);

    return (
      <div className="flex flex-col bg-zinc-50/50 rounded-xl border border-zinc-200 overflow-hidden h-[600px] shadow-sm">
        <div className={`p-4 border-b border-zinc-200 flex items-center justify-between ${corBg}`}>
          <div className="flex items-center gap-2">
            {icone}
            <h3 className="font-bold text-[10px] uppercase tracking-widest text-zinc-900">{titulo}</h3>
          </div>
          <span className="bg-white text-zinc-900 font-bold text-[10px] px-2 py-1 rounded shadow-sm">
            {pedidosColuna.length}
          </span>
        </div>
        
        <div className="p-3 flex-1 overflow-y-auto space-y-3 [&::-webkit-scrollbar]:hidden">
          {pedidosColuna.map(pedido => (
            <div key={pedido.id} className={`bg-white p-4 rounded-lg border-l-4 shadow-sm ${corBorda} border-y border-r border-zinc-200 transition-all hover:shadow-md`}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                    #{pedido.id} • {pedido.data}
                  </span>
                  <h4 className="font-bold text-xs text-zinc-900 leading-none">{pedido.cliente}</h4>
                </div>
                <button className="text-zinc-400 hover:text-amber-500 transition-colors" title="Ver Detalhes">
                  <Eye size={16} />
                </button>
              </div>
              
              <div className="flex flex-col gap-3 mt-4 pt-3 border-t border-zinc-100">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[9px] text-zinc-500 font-medium uppercase tracking-wider mb-0.5">{pedido.itens} {pedido.itens > 1 ? 'itens' : 'item'}</p>
                    <p className="font-bold text-zinc-900 text-xs">R$ {pedido.total.toFixed(2).replace('.', ',')}</p>
                  </div>
                  
                  {/* BOTÕES DINÂMICOS DE AÇÃO */}
                  {status === 'Pendente' && (
                    <button onClick={() => moverPedido(pedido.id, 'Separacao')} className="flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-widest bg-zinc-900 text-white px-3 py-2 rounded hover:bg-amber-500 hover:text-black transition-colors">
                      Separar <ArrowRight size={10} />
                    </button>
                  )}
                  
                  {status === 'Separacao' && (
                    <button onClick={() => moverPedido(pedido.id, 'ProntoEnvio')} className="flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-widest bg-zinc-900 text-white px-3 py-2 rounded hover:bg-amber-500 hover:text-black transition-colors">
                      Embalar <ArrowRight size={10} />
                    </button>
                  )}

                  {status === 'ProntoEnvio' && inputRastreioAberto !== pedido.id && (
                    <button onClick={() => setInputRastreioAberto(pedido.id)} className="flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-widest bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition-colors">
                      <Barcode size={10} /> Inserir Rastreio
                    </button>
                  )}
                  
                  {status === 'Enviado' && (
                    <span className="text-[9px] font-bold text-green-600 uppercase tracking-widest flex items-center gap-1">
                      <CheckCircle size={12} /> Despachado
                    </span>
                  )}
                </div>

                {/* CAIXA DE INPUT DE RASTREIO (Aparece no passo 3) */}
                {status === 'ProntoEnvio' && inputRastreioAberto === pedido.id && (
                  <div className="flex gap-2 mt-2 pt-2 border-t border-dashed border-zinc-200 animate-in fade-in slide-in-from-top-2">
                    <input 
                      type="text" 
                      placeholder="Cod. Rastreio..." 
                      autoFocus
                      value={codigoRastreio}
                      onChange={(e) => setCodigoRastreio(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && confirmarRastreio(pedido.id)}
                      className="w-full border border-zinc-200 p-2 text-[10px] font-bold uppercase focus:border-blue-500 outline-none rounded"
                    />
                    <button onClick={() => confirmarRastreio(pedido.id)} className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition-colors">
                      <Check size={12} />
                    </button>
                  </div>
                )}

                {/* EXIBIR O CÓDIGO DE RASTREIO NO FINAL */}
                {status === 'Enviado' && pedido.rastreio && (
                  <div className="bg-zinc-100 p-2 rounded flex items-center justify-between mt-1">
                    <span className="text-[9px] font-medium text-zinc-500 uppercase tracking-wider">Rastreio:</span>
                    <span className="text-[10px] font-bold text-zinc-900 tracking-widest">{pedido.rastreio}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {pedidosColuna.length === 0 && (
            <div className="h-full flex flex-col gap-2 items-center justify-center pb-12 opacity-50">
              <Package size={24} className="text-zinc-300" />
              <span className="text-zinc-400 text-[9px] uppercase font-bold tracking-widest">Nenhum Pedido</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-[1600px] mx-auto pb-12 font-outfit">
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-anton uppercase text-zinc-900 tracking-wide">Operação de Pedidos</h1>
          <p className="text-zinc-500 text-sm mt-1 font-medium">Aguardando novos pedidos entrarem no sistema.</p>
        </div>
        <div className="relative w-full md:w-72">
          <input 
            type="text" 
            placeholder="Buscar por cliente ou ID..." 
            className="w-full border-2 border-zinc-200 p-3 pl-10 font-medium text-sm focus:border-black outline-none transition-colors rounded-lg bg-white" 
          />
          <Search size={16} className="absolute left-4 top-3.5 text-zinc-400" />
        </div>
      </header>

      {/* GRELHA DE 4 COLUNAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        
        {/* Passo 1 */}
        {renderColuna(
          '1. Pagos', 
          'Pendente', 
          <Clock size={16} className="text-red-500" />, 
          'bg-red-50 border-b-red-100', 
          'border-l-red-500'
        )}
        
        {/* Passo 2 */}
        {renderColuna(
          '2. Em Separação', 
          'Separacao', 
          <Package size={16} className="text-amber-500" />, 
          'bg-amber-50 border-b-amber-100', 
          'border-l-amber-500'
        )}

        {/* Passo 3 (Com input de Rastreio) */}
        {renderColuna(
          '3. Aguardando Envio', 
          'ProntoEnvio', 
          <Barcode size={16} className="text-blue-500" />, 
          'bg-blue-50 border-b-blue-100', 
          'border-l-blue-500'
        )}
        
        {/* Passo 4 */}
        {renderColuna(
          '4. Enviados', 
          'Enviado', 
          <Truck size={16} className="text-green-500" />, 
          'bg-green-50 border-b-green-100', 
          'border-l-green-500'
        )}
      </div>
    </div>
  );
}
