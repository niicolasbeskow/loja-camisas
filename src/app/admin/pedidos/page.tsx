import { prisma } from '@/lib/prisma';

export default async function AdminOrders() {
  const orders = await prisma.order.findMany({
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
    },
    orderBy: {
      createdAt: 'desc',
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Gestão de Pedidos
        </h1>
      </div>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          Nenhum pedido encontrado.
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
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Itens
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id.substring(0, 8)}...
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.user?.name || order.user?.email || 'Cliente não identificado'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                    {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                    {new Date(order.createdAt).toLocaleTimeString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-amber-600">
                    R$ {order.total.toFixed(2).replace('.', ',')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded ${
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
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                    {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      href={`/admin/pedidos/${order.id}`}
                      className="text-sm text-indigo-600 hover:text-indigo-900"
                    >
                      Detalhes
                    </Link>
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

// Import Link at the top since we're using it
import Link from 'next/link';