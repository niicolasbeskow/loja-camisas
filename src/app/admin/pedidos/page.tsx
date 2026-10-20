"use client";

import { useState } from 'react';
import { Search, Clock, Package, Truck, Eye, ArrowRight } from 'lucide-react';

type StatusPedido = 'Pendente' | 'Preparação' | 'Enviado';

interface Pedido {
  id: string;
  cliente: string;
  data: string;
  total: number;
  itens: number;
  status: StatusPedido;
}

export default function PedidosAdmin() {
  // Dados simulados para testar o fluxo operacional
  const [pedidos, setPedidos] = useState<Pedido[]>([
    { id: '1024', cliente: 'João Silva', data: 'Hoje, 14:32', total: 214.90, itens: 2, status: 'Pendente' },
    { id: '1023', cliente: 'Marina Costa', data: 'Hoje, 11:05', total: 87.90, itens: 1, status: 'Pendente' },
    { id: '1022', cliente: 'Lucas Fernandes', data: 'Ontem, 16:40', total: 325.80, itens: 4, status: 'Preparação' },
    { id: '1021', cliente: 'Amanda Reis', data: '17/10/2026', total: 111.90, itens: 1, status: 'Enviado' },
  ]);

  // Função para avançar o pedido na linha de montagem
  const moverPedido = (id: string, novoStatus: StatusPedido) => {
    setPedidos(prev => prev.map(p => p.id === id ? { ...p, status: novoStatus } : p));
  };

  const renderColuna = (titulo: string, status: StatusPedido, icone: React.ReactNode, corBg: string, corBorda: string) => {
    const pedidosColuna = pedidos.filter(p => p.status === status);

    return (
      <div className="flex flex-col bg-zinc-50/50 rounded-xl border border-zinc-200 overflow-hidden h-[600px] shadow-sm">
        <div className={`p-4 border-b border-zinc-200 flex items-center justify-between ${corBg}`}>
          <div className="flex items-center gap-2">
            {icone}
            <h3 className="font-bold text-xs uppercase tracking-widest text-zinc-900">{titulo}</h3>
          </div>
          <span className="bg-white/60 text-zinc-900 font-bold text-[10px] px-2 py-1 rounded">
            {pedidosColuna.length}
          </span>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto space-y-4 [&::-webkit-scrollbar]:hidden">
          {pedidosColuna.map(pedido => (
            <div key={pedido.id} className={`bg-white p-4 rounded-lg border-l-4 shadow-sm ${corBorda} border-y border-r border-zinc-200 transition-all hover:shadow-md`}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                    Pedido #{pedido.id} • {pedido.data}
                  </span>
                  <h4 className="font-bold text-sm text-zinc-900 leading-none">{pedido.cliente}</h4>
                </div>
                <button className="text-zinc-400 hover:text-amber-500 transition-colors" title="Ver Detalhes">
                  <Eye size={18} />
                </button>
              </div>
              
              <div className="flex justify-between items-end mt-4 pt-4 border-t border-zinc-100">
                <div>
                  <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider mb-0.5">{pedido.itens} {pedido.itens > 1 ? 'itens' : 'item'}</p>
                  <p className="font-bold text-zinc-900 text-sm">R$ {pedido.total.toFixed(2).replace('.', ',')}</p>
                </div>
                
                {/* Botões de Ação Dinâmicos */}
                {status === 'Pendente' && (
                  <button 
                    onClick={() => moverPedido(pedido.id, 'Preparação')} 
                    className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest bg-zinc-900 text-white px-4 py-2 rounded hover:bg-amber-500 hover:text-black transition-colors"
                  >
                    Separar <ArrowRight size={12} />
                  </button>
                )}
                {status === 'Preparação' && (
                  <button 
                    onClick={() => moverPedido(pedido.id, 'Enviado')} 
                    className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest bg-zinc-900 text-white px-4 py-2 rounded hover:bg-green-500 hover:text-white transition-colors"
                  >
                    Despachar <ArrowRight size={12} />
                  </button>
                )}
                {status === 'Enviado' && (
                  <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest flex items-center gap-1">
                    Concluído
                  </span>
                )}
              </div>
            </div>
          ))}
          
          {pedidosColuna.length === 0 && (
            <div className="h-full flex items-center justify-center">
              <span className="text-zinc-400 text-[10px] uppercase font-bold tracking-widest">Coluna Vazia</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto pb-12 font-outfit">
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-anton uppercase text-zinc-900 tracking-wide">Operação de Pedidos</h1>
          <p className="text-zinc-500 text-sm mt-1 font-medium">Fluxo Kanban de aprovação, embalagem e expedição.</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna 1: Pagamento Aprovado */}
        {renderColuna(
          'Pagos (Pendentes)', 
          'Pendente', 
          <Clock size={16} className="text-red-500" />, 
          'bg-red-50 border-b-red-100', 
          'border-l-red-500'
        )}
        
        {/* Coluna 2: Mesa de Embalagem */}
        {renderColuna(
          'Em Separação', 
          'Preparação', 
          <Package size={16} className="text-amber-500" />, 
          'bg-amber-50 border-b-amber-100', 
          'border-l-amber-500'
        )}
        
        {/* Coluna 3: Correios / Transportadora */}
        {renderColuna(
          'Enviados', 
          'Enviado', 
          <Truck size={16} className="text-green-500" />, 
          'bg-green-50 border-b-green-100', 
          'border-l-green-500'
        )}
      </div>
    </div>
  );
}
