'use client';

export default function RastreioPage() {
  return (
    <main className="min-h-screen bg-[#000000] text-white py-24 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-anton uppercase mb-6 text-[#F59E0B]">Rastreie seu Pedido</h1>
        <p className="text-zinc-400 mb-10 text-lg">Acompanhe a chegada da sua armadura. Insira o código enviado para o seu e-mail.</p>

        <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Ex: BR123456789BR"
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-md px-6 py-4 text-white focus:outline-none focus:ring-1 focus:ring-[#F59E0B] tracking-widest text-center md:text-left"
          />
          <button
            type="submit"
            className="bg-[#F59E0B] text-[#000000] font-anton text-xl px-8 py-4 rounded-md hover:bg-amber-400 transition-colors uppercase"
          >
            Rastrear
          </button>
        </form>
      </div>
    </main>
  );
}