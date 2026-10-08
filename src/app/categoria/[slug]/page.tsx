import { categories, mockProducts } from '@/lib/data';
import { Home, SlidersHorizontal, ChevronDown, Star } from 'lucide-react';
import Link from 'next/link';

export default async function CategoriaPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const fallbackName = slug.replace(/-/g, ' ').toUpperCase();
  const category = categories.find(c => c.slug === slug) || { name: fallbackName, slug: slug };

  return (
    <main className="min-h-screen bg-white text-black pb-24">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 pt-8 mt-16">

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
          <Link href="/" className="hover:text-[#F59E0B] transition-colors"><Home className="w-3 h-3" /></Link>
          <span>/</span>
          <Link href="#" className="hover:text-[#F59E0B] transition-colors">Coleções</Link>
          <span>/</span>
          <span className="text-black font-medium">{category.name}</span>
        </div>

        {/* Título da Categoria */}
        <h1 className="text-4xl md:text-5xl font-anton uppercase mb-8">{category.name}</h1>

        {/* Header de Filtros */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div className="flex gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 border border-zinc-300 rounded-full px-5 py-2 text-sm font-medium hover:border-black transition-colors">
              <SlidersHorizontal className="w-4 h-4" /> Mostrar filtros
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 border border-zinc-300 rounded-full px-5 py-2 text-sm font-medium hover:border-black transition-colors">
              Ordenar <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-12">
          {mockProducts.map((produto) => (
            <Link href={`/produto/${produto.id}`} key={produto.id} className="group flex flex-col items-center text-center cursor-pointer">

              {/* Quadrado Vazio (Placeholder) e Tag flutuante */}
              <div className="w-full aspect-[4/5] bg-zinc-100 relative mb-4 overflow-hidden rounded-md flex items-center justify-center">
                {produto.tag && (
                  <span className="absolute top-2 left-2 md:top-3 md:right-3 md:left-auto bg-[#F59E0B] text-[#000000] text-[10px] font-bold px-2 py-1 rounded-sm z-10">
                    {produto.tag}
                  </span>
                )}
                <span className="text-zinc-400 text-sm font-medium">Produto em breve</span>
              </div>

              {/* Título */}
              <h3 className="text-sm font-medium text-zinc-900 mb-1">{produto.name}</h3>

              {/* Estrelas B.SKW */}
              <div className="flex items-center gap-1 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
                  ))}
                </div>
                <span className="text-xs text-zinc-500">({produto.reviews})</span>
              </div>

              {/* Preços */}
              <div className="flex items-center gap-2 mb-3">
                {produto.originalPrice && (
                  <span className="text-xs text-zinc-400 line-through">
                    R$ {produto.originalPrice.toFixed(2).replace('.', ',')}
                  </span>
                )}
                <span className="text-sm font-bold text-black">
                  R$ {produto.price.toFixed(2).replace('.', ',')}
                </span>
              </div>

              {/* Bolinhas de Cores */}
              <div className="flex items-center justify-center gap-1.5">
                {produto.colors.map((color, idx) => (
                  <div
                    key={idx}
                    className="w-4 h-4 rounded-full border border-zinc-300 shadow-sm"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}