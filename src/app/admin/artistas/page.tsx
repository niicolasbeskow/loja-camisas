'use client';

import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminArtists() {
  const artistas = await prisma.artist.findMany({
    orderBy: {
      nome: 'asc',
    },
    include: {
      products: true
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Gestão de Artistas
        </h1>
        <Link href="/admin/artistas/novo" className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-md">
          Novo Artista
        </Link>
      </div>

      {artistas.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          Nenhum artista encontrado. <Link href="/admin/artistas/novo" className="text-amber-600 hover:underline">Adicione o primeiro artista</Link>.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Slug
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Produtos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {artistas.map((artist) => (
                <tr key={artist.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {artist.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {artist.nome}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                    {artist.slug}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                    {artist.categoria_arte}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                    {artist.products.length}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <Link
                        href={`/admin/artistas/${artist.id}/editar`}
                        className="text-sm text-indigo-600 hover:text-indigo-900"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => {
                          if (window.confirm('Tem certeza que deseja excluir este artista?')) {
                            // Call the DELETE API
                            fetch(`/api/artistas/${artist.id}`, {
                              method: 'DELETE',
                            })
                            .then(async (response) => {
                              if (response.ok) {
                                alert('Artista excluído com sucesso!');
                                // Reload the page to reflect the change
                                window.location.reload();
                              } else {
                                const errorData = await response.json();
                                alert('Erro ao excluir artista: ' + (errorData.error || 'Erro desconhecido'));
                              }
                            })
                            .catch((error) => {
                              console.error('Error:', error);
                              alert('Erro ao excluir artista. Por favor, tente novamente.');
                            });
                          }
                        }}
                        className="text-sm text-red-600 hover:text-red-900"
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}