import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function EditarProduto({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) }
  });

  if (!product) return notFound();

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Modo de Edição Ativado</h1>
      <div className="bg-white p-6 rounded shadow border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Produto: {product.nome}</h2>
        <p className="text-gray-500">O erro 404 foi aniquilado. A rota dinâmica [id] está a funcionar perfeitamente na Vercel.</p>
      </div>
    </div>
  );
}
