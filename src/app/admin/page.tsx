import Link from 'next/link';
import { 
  DollarSign, TrendingUp, ShoppingBag, Users, 
  AlertCircle, ArrowUpRight, ArrowDownRight, 
  Package, BarChart3, CreditCard, Activity 
} from 'lucide-react';

export default function AdminDashboard() {
  // ==========================================
  // MOCK DATA: DADOS SIMULADOS PARA O DASHBOARD
  // ==========================================
  
  const vendasSemana = [
    { dia: 'Seg', valor: 1200, altura: 'h-[30%]' },
    { dia: 'Ter', valor: 1800, altura: 'h-[45%]' },
    { dia: 'Qua', valor: 2400, altura: 'h-[60%]' },
    { dia: 'Qui', valor: 1500, altura: 'h-[40%]' },
    { dia: 'Sex', valor: 3200, altura: 'h-[80%]' },
    { dia: 'Sáb', valor: 4500, altura: 'h-[100%]' },
    { dia: 'Dom', valor: 3800, altura: 'h-[85%]' },
  ];

  const topProdutos = [
    { nome: 'Camiseta Básica B.SKW Preto', vendas: 124, receita: 'R$ 10.900' },
    { nome: 'Camiseta Oversized Preto', vendas: 98, receita: 'R$ 10.966' },
    { nome: 'Camiseta Boxy Areia', vendas: 65, receita: 'R$ 6.883' },
    { nome: 'Camiseta Poliamida Branco', vendas: 54, receita: 'R$ 4.314' },
  ];

  const alertasEstoque = [
    { nome: 'Camiseta Boxy Areia', tamanho: 'XG', qtd: 0, status: 'Esgotado' },
    { nome: 'Camiseta Básica Preto', tamanho: 'P', qtd: 2, status: 'Crítico' },
    { nome: 'Camiseta Poliamida Branco', tamanho: 'GG', qtd: 3, status: 'Aviso' },
  ];

  return (
    <div className="max-w-7xl mx-auto pb-12 font-outfit">
      
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-anton uppercase text-zinc-900 tracking-wide">Data Analytics</h1>
          <p className="text-zinc-500 text-sm mt-1 font-medium">Performance de vendas, tráfego e saúde do estoque.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/produtos/novo" className="bg-black text-white px-6 py-3 font-bold text-xs uppercase tracking-widest hover:bg-zinc-800 transition-colors">
            + Novo Produto
          </Link>
        </div>
      </header>

      {/* 1. KPIs PRINCIPAIS (Métricas de Topo) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        
        {/* KPI 1: Faturação */}
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase">Faturação (Mês)</h3>
            <div className="p-2 bg-green-50 text-green-600 rounded">
              <DollarSign size={16} />
            </div>
          </div>
          <p className="text-3xl font-bold text-zinc-900 mb-2">R$ 45.890</p>
          <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-green-600">
            <ArrowUpRight size={14} /> <span>+14.5% vs Mês Anterior</span>
          </div>
        </div>

        {/* KPI 2: Pedidos */}
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase">Pedidos Concluídos</h3>
            <div className="p-2 bg-blue-50 text-blue-600 rounded">
              <ShoppingBag size={16} />
            </div>
          </div>
          <p className="text-3xl font-bold text-zinc-900 mb-2">214</p>
          <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-green-600">
            <ArrowUpRight size={14} /> <span>+5.2% vs Mês Anterior</span>
          </div>
        </div>

        {/* KPI 3: Ticket Médio */}
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase">Ticket Médio (AOV)</h3>
            <div className="p-2 bg-amber-50 text-amber-600 rounded">
              <CreditCard size={16} />
            </div>
          </div>
          <p className="text-3xl font-bold text-zinc-900 mb-2">R$ 214,43</p>
          <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-red-500">
            <ArrowDownRight size={14} /> <span>-2.1% vs Mês Anterior</span>
          </div>
        </div>

        {/* KPI 4: Taxa de Conversão */}
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase">Taxa de Conversão</h3>
            <div className="p-2 bg-purple-50 text-purple-600 rounded">
              <Activity size={16} />
            </div>
          </div>
          <p className="text-3xl font-bold text-zinc-900 mb-2">3.2%</p>
          <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-green-600">
            <ArrowUpRight size={14} /> <span>+0.4% vs Mês Anterior</span>
          </div>
        </div>

      </div>

      {/* 2. GRÁFICOS E FUNIL */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8">
        
        {/* Gráfico de Vendas (7 Dias) */}
        <div className="bg-white p-6 md:p-8 rounded-xl border border-zinc-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-2">
              <BarChart3 size={20} className="text-zinc-400" /> Receita (Últimos 7 Dias)
            </h2>
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Total: R$ 18.400</span>
          </div>
          
          {/* Barras Desenhadas em Tailwind */}
          <div className="h-48 flex items-end justify-between gap-2 mt-4">
            {vendasSemana.map((dia) => (
              <div key={dia.dia} className="flex flex-col items-center gap-2 w-full group">
                <div className="relative w-full flex justify-center items-end h-full">
                  {/* Tooltip Hover */}
                  <div className="absolute -top-8 bg-zinc-900 text-white text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    R$ {dia.valor}
                  </div>
                  {/* Barra */}
                  <div className={`w-full max-w-[40px] bg-zinc-200 group-hover:bg-amber-500 transition-colors rounded-t-sm ${dia.altura}`}></div>
                </div>
                <span className="text-[10px] font-bold text-zinc-500 uppercase">{dia.dia}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Funil de Conversão */}
        <div className="bg-white p-6 md:p-8 rounded-xl border border-zinc-200 shadow-sm">
          <h2 className="text-lg font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-2 mb-8">
            <TrendingUp size={20} className="text-zinc-400" /> Funil de Conversão
          </h2>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                <span className="text-zinc-600">1. Visitantes Únicos</span>
                <span className="text-zinc-900">15.420</span>
              </div>
              <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                <div className="bg-zinc-800 h-full w-[100%] rounded-full"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                <span className="text-zinc-600">2. Adições ao Carrinho</span>
                <span className="text-zinc-900">1.240 <span className="text-zinc-400 text-[10px] ml-1">(8%)</span></span>
              </div>
              <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full w-[8%] rounded-full"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                <span className="text-zinc-600">3. Checkouts Iniciados</span>
                <span className="text-zinc-900">650 <span className="text-zinc-400 text-[10px] ml-1">(4.2%)</span></span>
              </div>
              <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full w-[4.2%] rounded-full"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                <span className="text-green-600">4. Compras Finalizadas</span>
                <span className="text-green-600">214 <span className="text-green-600/50 text-[10px] ml-1">(1.3%)</span></span>
              </div>
              <div className="w-full bg-green-50 h-2 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full w-[1.3%] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 3. TABELAS DE PRODUTOS E ESTOQUE */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
        
        {/* Tabela de Top Produtos (Ocupa 2 colunas no desktop) */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 border-b border-zinc-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-2">
              <Package size={20} className="text-zinc-400" /> Curva ABC - Top Produtos
            </h2>
            <Link href="/admin/produtos" className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest hover:text-black">Ver Todos</Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200 text-[10px] uppercase tracking-wider text-zinc-500 font-bold">
                  <th className="p-4 pl-6 md:pl-8">Produto</th>
                  <th className="p-4">Un. Vendidas</th>
                  <th className="p-4 pr-6 md:pr-8 text-right">Receita Gerada</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {topProdutos.map((p, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50 transition-colors">
                    <td className="p-4 pl-6 md:pl-8 font-bold text-xs text-zinc-900">{p.nome}</td>
                    <td className="p-4 text-xs font-medium text-zinc-600">{p.vendas} un</td>
                    <td className="p-4 pr-6 md:pr-8 text-xs font-bold text-zinc-900 text-right">{p.receita}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alertas de Estoque */}
        <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 border-b border-zinc-100">
            <h2 className="text-lg font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-2">
              <AlertCircle size={20} className="text-red-500" /> Alertas de Estoque
            </h2>
          </div>
          
          <div className="p-6 md:p-8 space-y-4">
            {alertasEstoque.map((alerta, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border border-zinc-200 rounded bg-zinc-50">
                <div>
                  <p className="text-xs font-bold text-zinc-900 mb-1">{alerta.nome}</p>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                    Tamanho: <span className="text-black">{alerta.tamanho}</span> • Restam: {alerta.qtd}
                  </p>
                </div>
                <div className={`px-2 py-1 text-[8px] font-bold uppercase tracking-widest rounded ${
                  alerta.status === 'Esgotado' ? 'bg-red-100 text-red-600' : 
                  alerta.status === 'Crítico' ? 'bg-orange-100 text-orange-600' : 
                  'bg-amber-100 text-amber-600'
                }`}>
                  {alerta.status}
                </div>
              </div>
            ))}
            
            <button className="w-full py-3 mt-4 border-2 border-zinc-200 text-[10px] font-bold text-zinc-600 uppercase tracking-widest hover:border-black hover:text-black transition-colors rounded">
              Gerar Relatório de Reposição
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
