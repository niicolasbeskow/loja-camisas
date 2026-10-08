export default function CategoriaPage({ params }: { params: { slug: string } }) {
  // Formata o slug para o título (ex: 'camiseta-basica' -> 'CAMISETA BASICA')
  const titulo = params.slug.replace(/-/g, ' ').toUpperCase();

  return (
    <main className="min-h-screen bg-[#000000] text-white py-24 px-4 flex flex-col items-center justify-center mt-16">
      <h1 className="text-5xl md:text-7xl font-anton tracking-wide text-[#F59E0B] mb-6 text-center">
        {titulo}
      </h1>
      <p className="text-zinc-400 text-lg text-center max-w-md">
        A armadura perfeita está sendo forjada. Os produtos desta categoria estarão disponíveis em breve.
      </p>
    </main>
  );
}