import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminProducts() {
  const products = await prisma.product.findMany({
    include: {
      artista: {
        select: {
          nome: true,
        }
      }
    },
    orderBy: {
      id: 'desc',
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Gestão de Produtos
        </h1>
        <Link href="/admin/produtos/novo" className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-md">
          Novo Produto
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          Nenhum produto encontrado. <Link href="/admin/produtos/novo" className="text-amber-600 hover:underline">Adicione o primeiro produto</Link>.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Imagem
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Preço
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Artista
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      {product.imagem ? (
                        <img
                          src={product.imagem}
                          alt={product.nome}
                          className="h-10 w-10 object-cover rounded"
                        />
                      ) : (
                        <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-xs text-gray-500">Sem imagem</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.nome}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-amber-600">
                    R$ {product.preco.toFixed(2).replace('.', ',')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded ${
                      product.tipo === 'Tag'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {product.tipo === 'Tag' ? 'Tag' : 'Coleção'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {product.artista?.nome || 'Sem artista'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <Link
                        href={`/admin/produtos/${product.id}/editar`}
                        className="text-sm text-indigo-600 hover:text-indigo-900"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => {
                          if (window.confirm('Tem certeza que deseja excluir este produto?')) {
                            // Call the DELETE API
                            fetch(`/api/produtos/${product.id}`, {
                              method: 'DELETE',
                            })
                            .then(async (response) => {
                              if (response.ok) {
                                alert('Produto excluído com sucesso!');
                                // Reload the page to reflect the change
                                window.location.reload();
                              } else {
                                const errorData = await response.json();
                                alert('Erro ao excluir produto: ' + (errorData.error || 'Erro desconhecido'));
                              }
                            })
                            .catch((error) => {
                              console.error('Error:', error);
                              alert('Erro ao excluir produto. Por favor, tente novamente.');
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