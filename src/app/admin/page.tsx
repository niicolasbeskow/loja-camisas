import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-anton uppercase text-zinc-900 tracking-wide">Visão Geral</h1>
        <p className="text-zinc-500 text-sm mt-1 font-medium">Controlo central da operação B.SKW.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
          <h3 className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase mb-2">Faturação (Hoje)</h3>
          <p className="text-3xl font-bold text-zinc-900">R$ 0,00</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
          <h3 className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase mb-2">Pedidos Pendentes</h3>
          <p className="text-3xl font-bold text-zinc-900">0</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
          <h3 className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase mb-2">Avisos de Estoque</h3>
          <p className="text-3xl font-bold text-amber-500">2 items</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6 md:p-8">
        <h2 className="text-lg font-bold text-zinc-900 mb-6 uppercase tracking-wider">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/admin/produtos/novo" className="bg-black text-white border-2 border-black py-4 px-6 font-bold text-xs uppercase tracking-widest hover:bg-transparent hover:text-black transition-colors text-left flex justify-between items-center group">
            Cadastrar Produto <span className="group-hover:translate-x-1 transition-transform">+</span>
          </Link>
          <Link href="/admin/pedidos" className="bg-white text-black border-2 border-zinc-300 py-4 px-6 font-bold text-xs uppercase tracking-widest hover:border-black transition-colors text-left flex justify-between items-center group">
            Processar Pedidos <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
