"use client";

import Link from 'next/link';
import { produtos } from '@/data/produtos';
import { 
  DollarSign, TrendingUp, ShoppingBag, 
  AlertCircle, Download, FileSpreadsheet, Database,
  Package, BarChart3, CreditCard, Activity 
} from 'lucide-react';

export default function AdminDashboard() {
  // ==========================================
  // DADOS REAIS DA OPERAÇÃO (FASE ZERO)
  // ==========================================
  
  const metricas = {
    faturacao: 0,
    pedidos: 0,
    ticketMedio: 0,
    taxaConversao: 0,
    visitantes: 0,
    carrinhos: 0,
    checkouts: 0
  };

  const vendasSemana = [
    { dia: 'Seg', valor: 0, altura: 'h-[0%]' },
    { dia: 'Ter', valor: 0, altura: 'h-[0%]' },
    { dia: 'Qua', valor: 0, altura: 'h-[0%]' },
    { dia: 'Qui', valor: 0, altura: 'h-[0%]' },
    { dia: 'Sex', valor: 0, altura: 'h-[0%]' },
    { dia: 'Sáb', valor: 0, altura: 'h-[0%]' },
    { dia: 'Dom', valor: 0, altura: 'h-[0%]' },
  ];

  // Algoritmo Real que varre o seu DB e encontra falhas de estoque
  const alertasEstoque = [];
  produtos.forEach(p => {
    Object.entries(p.estoque).forEach(([tamanho, qtd]) => {
      if (qtd === 0) {
        alertasEstoque.push({ nome: p.nome, tamanho, qtd, status: 'Esgotado', cor: 'bg-red-100 text-red-600' });
      } else if (qtd <= 2) {
        alertasEstoque.push({ nome: p.nome, tamanho, qtd, status: 'Crítico', cor: 'bg-orange-100 text-orange-600' });
      }
    });
  });

  // ==========================================
  // FUNÇÕES DE EXPORTAÇÃO DE DADOS (BI)
  // ==========================================

  const exportarCSV = () => {
    const headers = "ID,SKU,Nome,Categoria,Preco,Cor,Estoque_P,Estoque_M,Estoque_G,Estoque_GG,Estoque_XG\n";
    const rows = produtos.map(p => 
      `${p.id},${p.codigo},"${p.nome}",${p.categoria},${p.preco},${p.cor},${p.estoque.P},${p.estoque.M},${p.estoque.G},${p.estoque.GG},${p.estoque.XG}`
    ).join("\n");
    
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bskw_catalogo_produtos.csv';
    a.click();
  };

  const exportarSQL = () => {
    const tableDef = `CREATE TABLE IF NOT EXISTS produtos (id VARCHAR(50), codigo VARCHAR(50), nome VARCHAR(255), categoria VARCHAR(100), preco DECIMAL(10,2), cor VARCHAR(50));\n\n`;
    const inserts = produtos.map(p => 
      `INSERT INTO produtos (id, codigo, nome, categoria, preco, cor) VALUES ('${p.id}', '${p.codigo}', '${p.nome}', '${p.categoria}', ${p.preco}, '${p.cor}');`
    ).join("\n");
    
    const blob = new Blob([tableDef + inserts], { type: 'text/sql;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bskw_database_dump.sql';
    a.click();
  };

  return (
    <div className="max-w-7xl mx-auto pb-12 font-outfit">
      
      <header className="mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-anton uppercase text-zinc-900 tracking-wide">Data Analytics</h1>
          <p className="text-zinc-500 text-sm mt-1 font-medium">Extração de dados e performance operacional.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={exportarCSV} className="bg-white border-2 border-zinc-200 text-zinc-700 px-4 py-2 font-bold text-[10px] uppercase tracking-widest hover:border-black hover:text-black transition-colors flex items-center gap-2">
            <FileSpreadsheet size={14} /> Baixar CSV
          </button>
          <button onClick={exportarSQL} className="bg-white border-2 border-zinc-200 text-zinc-700 px-4 py-2 font-bold text-[10px] uppercase tracking-widest hover:border-black hover:text-black transition-colors flex items-center gap-2">
            <Database size={14} /> Dump SQL
          </button>
        </div>
      </header>

      {/* 1. KPIs PRINCIPAIS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase">Faturação (Mês)</h3>
            <div className="p-2 bg-zinc-100 text-zinc-600 rounded"><DollarSign size={16} /></div>
          </div>
          <p className="text-3xl font-bold text-zinc-900 mb-2">R$ 0,00</p>
          <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            Aguardando Vendas
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase">Pedidos Concluídos</h3>
            <div className="p-2 bg-zinc-100 text-zinc-600 rounded"><ShoppingBag size={16} /></div>
          </div>
          <p className="text-3xl font-bold text-zinc-900 mb-2">0</p>
          <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            Aguardando Vendas
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase">Ticket Médio (AOV)</h3>
            <div className="p-2 bg-zinc-100 text-zinc-600 rounded"><CreditCard size={16} /></div>
          </div>
          <p className="text-3xl font-bold text-zinc-900 mb-2">R$ 0,00</p>
          <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            Sem Dados Relativos
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase">Taxa de Conversão</h3>
            <div className="p-2 bg-zinc-100 text-zinc-600 rounded"><Activity size={16} /></div>
          </div>
          <p className="text-3xl font-bold text-zinc-900 mb-2">0.0%</p>
          <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            Aguardando Tráfego
          </div>
        </div>
      </div>

      {/* 2. GRÁFICOS E FUNIL */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8">
        
        <div className="bg-white p-6 md:p-8 rounded-xl border border-zinc-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-2">
              <BarChart3 size={20} className="text-zinc-400" /> Receita (Últimos 7 Dias)
            </h2>
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Total: R$ 0,00</span>
          </div>
          
          <div className="h-48 flex items-end justify-between gap-2 mt-4 relative border-b border-zinc-100">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Sem movimentação recente</span>
            </div>
            {vendasSemana.map((dia) => (
              <div key={dia.dia} className="flex flex-col items-center gap-2 w-full z-10 opacity-50">
                <div className="relative w-full flex justify-center items-end h-full">
                  <div className={`w-full max-w-[40px] bg-zinc-200 rounded-t-sm ${dia.altura}`}></div>
                </div>
                <span className="text-[10px] font-bold text-zinc-500 uppercase">{dia.dia}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-xl border border-zinc-200 shadow-sm">
          <h2 className="text-lg font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-2 mb-8">
            <TrendingUp size={20} className="text-zinc-400" /> Funil de Conversão
          </h2>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                <span className="text-zinc-600">1. Visitantes Únicos</span>
                <span className="text-zinc-900">0</span>
              </div>
              <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden"></div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                <span className="text-zinc-600">2. Adições ao Carrinho</span>
                <span className="text-zinc-900">0 <span className="text-zinc-400 text-[10px] ml-1">(0%)</span></span>
              </div>
              <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden"></div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                <span className="text-zinc-600">3. Checkouts Iniciados</span>
                <span className="text-zinc-900">0 <span className="text-zinc-400 text-[10px] ml-1">(0%)</span></span>
              </div>
              <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden"></div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                <span className="text-green-600">4. Compras Finalizadas</span>
                <span className="text-green-600">0 <span className="text-green-600/50 text-[10px] ml-1">(0%)</span></span>
              </div>
              <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden"></div>
            </div>
          </div>
        </div>

      </div>

      {/* 3. TABELAS DE PRODUTOS E ESTOQUE */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
        
        <div className="xl:col-span-2 bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 border-b border-zinc-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-2">
              <Package size={20} className="text-zinc-400" /> Curva ABC - Top Produtos
            </h2>
          </div>
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <Package size={32} className="text-zinc-300 mb-3" />
            <p className="text-zinc-500 font-bold text-sm uppercase tracking-wider">Aguardando Primeiras Vendas</p>
            <p className="text-zinc-400 text-xs mt-1">Os produtos mais vendidos aparecerão aqui.</p>
          </div>
        </div>

        {/* ALERTAS REAIS DE ESTOQUE */}
        <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 md:p-8 border-b border-zinc-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-2">
              <AlertCircle size={20} className="text-red-500" /> Alertas Reais
            </h2>
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-[10px] font-bold">{alertasEstoque.length}</span>
          </div>
          
          <div className="p-6 flex-1 overflow-y-auto max-h-[300px] space-y-3">
            {alertasEstoque.length > 0 ? alertasEstoque.map((alerta, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border border-zinc-200 rounded bg-zinc-50">
                <div>
                  <p className="text-[10px] font-bold text-zinc-900 mb-0.5 line-clamp-1">{alerta.nome}</p>
                  <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">
                    Tam: <span className="text-black">{alerta.tamanho}</span> • Restam: {alerta.qtd}
                  </p>
                </div>
                <div className={`px-2 py-1 text-[8px] font-bold uppercase tracking-widest rounded ${alerta.cor}`}>
                  {alerta.status}
                </div>
              </div>
            )) : (
              <div className="text-center text-zinc-400 text-xs font-bold uppercase py-8">
                Estoque Saudável
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
