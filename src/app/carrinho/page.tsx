import Link from "next/link";

export default function CarrinhoPage() {
  return (
    <main className="min-h-screen bg-[#000000] text-white py-24 px-4 flex flex-col items-center justify-center mt-16">
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-6"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
      <h1 className="text-4xl font-anton uppercase tracking-wide text-white mb-4 text-center">Seu carrinho está vazio</h1>
      <p className="text-zinc-400 text-lg text-center max-w-md mb-8">
        Você ainda não selecionou nenhuma armadura para forjar.
      </p>
      <Link href="/" className="bg-[#F59E0B] text-[#000000] font-bold uppercase tracking-wide px-8 py-4 rounded-md hover:bg-amber-400 transition-colors">
        Continuar Comprando
      </Link>
    </main>
  );
}