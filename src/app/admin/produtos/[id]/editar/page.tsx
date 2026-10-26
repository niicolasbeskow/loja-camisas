import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import EditProductForm from '@/components/admin/EditProductForm';

export default async function EditarProduto({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const productId = parseInt(id);

  // Fetch the product
  const product = await prisma.product.findUnique({
    where: { id: productId }
  });

  if (!product) return notFound();

  // Fetch all artists for the dropdown
  const artists = await prisma.artist.findMany({
    orderBy: {
      nome: 'asc',
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      <div className="max-w-2xl mx-auto">
        <EditProductForm
          artists={artists}
          product={{
            ...product,
            imagem: product.imagem || ''
          }}
        />
      </div>
    </div>
  );
}