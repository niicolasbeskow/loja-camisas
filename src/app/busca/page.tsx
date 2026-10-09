import { mockProducts } from '@/lib/data';
import Link from 'next/link';
import { Star } from 'lucide-react';

export default async function BuscaPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || '';

  const resultados = mockProducts.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    (p.tag && p.tag.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <main className="min-h-screen bg-white text-black pb-24 mt-16">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 pt-12">
        <h1 className="text-3xl md:text-5xl font-anton uppercase mb-2">
          Resultados para: <span className="text-[#F59E0B]">"{query}"</span>
        </h1>
        <p className="text-zinc-500 mb-10">{resultados.length} produtos encontrados</p>

        {resultados.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-12">
            {resultados.map((produto) => (
              <Link href={`/produto/${produto.id}`} key={produto.id} className="group flex flex-col items-center text-center cursor-pointer">
                <div className="w-full aspect-[4/5] bg-zinc-100 relative mb-4 overflow-hidden rounded-md flex items-center justify-center">
                  {produto.tag && <span className="absolute top-2 left-2 md:top-3 md:right-3 md:left-auto bg-[#F59E0B] text-[#000000] text-[10px] font-bold px-2 py-1 rounded-sm z-10">{produto.tag}</span>}
                  <span className="text-zinc-400 text-sm font-medium">Produto em breve</span>
                </div>
                <h3 className="text-sm font-medium text-zinc-900 mb-1">{produto.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />)}</div>
                  <span className="text-xs text-zinc-500">({produto.reviews})</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  {produto.originalPrice && <span className="text-xs text-zinc-400 line-through">R$ {produto.originalPrice.toFixed(2).replace('.', ',')}</span>}
                  <span className="text-sm font-bold text-black">R$ {produto.price.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  {produto.colors.map((color, idx) => <div key={idx} className="w-4 h-4 rounded-full border border-zinc-300 shadow-sm" style={{ backgroundColor: color }} />)}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#e4e4e7" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-6"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <h2 className="text-2xl font-anton uppercase text-zinc-400 mb-4">Nenhuma armadura encontrada</h2>
            <p className="text-zinc-500 mb-8 max-w-md">Não encontramos nenhum produto correspondente à sua busca. Tente palavras como "Oversized" ou "Algodão".</p>
            <Link href="/" className="bg-[#000000] text-white font-bold uppercase tracking-wide px-8 py-4 rounded-md hover:bg-[#F59E0B] hover:text-[#000000] transition-colors">
              Voltar ao Início
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}