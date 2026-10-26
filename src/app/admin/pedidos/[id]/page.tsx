import { prisma } from '@/lib/prisma';

export default async function OrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const orderId = params.id;

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        }
      },
      items: {
        include: {
          product: {
            include: {
              artista: {
                select: {
                  nome: true,
                }
              }
            }
          }
        }
      }
    }
  });

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Pedido não encontrado
          </h1>
          <p className="text-gray-500">
            O pedido com ID {orderId} não foi encontrado.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Detalhes do Pedido
        </h1>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6">
          <div className="space-y-4">
            <div className="text-lg font-medium text-gray-900">
              Informações do Pedido
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">ID do Pedido:</p>
                <p className="font-medium">{order.id}</p>
              </div>
              <div>
                <p className="text-gray-500">Cliente:</p>
                <p className="font-medium">
                  {order.user?.name || order.user?.email || 'Não identificado'}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Data:</p>
                <p className="font-medium">
                  {new Date(order.createdAt).toLocaleString('pt-BR')}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Status:</p>
                <p className={`font-medium px-2 py-0.5 rounded ${
                  order.status === 'PENDING'
                    ? 'bg-yellow-100 text-yellow-800'
                    : order.status === 'PROCESSING'
                    ? 'bg-blue-100 text-blue-800'
                    : order.status === 'SHIPPED'
                    ? 'bg-indigo-100 text-indigo-800'
                    : order.status === 'DELIVERED'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {order.status === 'PENDING' ? 'Pendente' :
                    order.status === 'PROCESSING' ? 'Processando' :
                    order.status === 'SHIPPED' ? 'Enviado' :
                    order.status === 'DELIVERED' ? 'Entregue' : 'Cancelado'}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Total:</p>
                <p className="font-medium text-amber-600">
                  R$ {order.total.toFixed(2).replace('.', ',')}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Referência Externa:</p>
                <p className="font-medium">{order.externalReference || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {order.items.length > 0 && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="p-6">
            <div className="mb-4">
              <h2 className="text-lg font-medium text-gray-900">
                Itens do Pedido ({order.items.length})
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Produto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Artista
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Quantidade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Preço Unitário
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.product?.nome || 'Produto não disponível'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                        {item.product?.artista?.nome || 'Artista não identificado'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-amber-600">
                        R$ {item.price.toFixed(2).replace('.', ',')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-amber-600">
                        R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}