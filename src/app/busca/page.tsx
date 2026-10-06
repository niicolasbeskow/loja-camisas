import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Busca - B.SKW',
  description: 'Resultados da busca',
};

export default function BuscaPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] };
}) {
  const query = Array.isArray(searchParams.q)
    ? searchParams.q[0]
    : (searchParams.q ?? '');

  return (
    <main className="min-h-screen bg-concreto text-breu py-12">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="font-display text-4xl mb-6">Busca</h1>
        <p className="text-xl">
          Buscando por: <span className="font-amber">{query || 'nenhum termo'}</span>
        </p>
        {/* TODO: exibir resultados */}
      </div>
    </main>
  );
}