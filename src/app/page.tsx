import { produtos } from '@/data/produtos';
import QuickBuyCard from '@/components/QuickBuyCard';

export default async function Home() {
  // Pega apenas as Camisetas Básicas (as 4 primeiras cadastradas no nosso arquivo data/produtos.ts)
  const destaques = produtos.slice(0, 4);

  return (
    <main className="min-h-screen">
      <section className="bg-[#9A9A9A] bg-[url('/files/textura.png')] bg-cover bg-center bg-blend-multiply py-32 md:py-40 px-4 flex justify-center w-full">
        <img
          src="/files/BSKW_empilhado_cor-branco-ambar.png"
          alt="B.SKW Logo"
          className="max-w-[250px] md:max-w-[400px] w-full object-contain mx-auto pointer-events-none select-none"
        />
      </section>

      <section className="max-w-[1600px] mx-auto px-4 md:px-6 py-16">
        <h2 className="text-4xl md:text-5xl font-anton uppercase text-center mb-12 tracking-wide text-zinc-900">
          Destaques B<span className="text-[#F59E0B]">.</span>SKW
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {destaques.map(produto => (
             <QuickBuyCard key={produto.id} produto={produto} />
          ))}
        </div>
      </section>
    </main>
  );
}
