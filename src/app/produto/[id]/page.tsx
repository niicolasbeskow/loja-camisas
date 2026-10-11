import { mockProducts } from '@/lib/data';
import { notFound } from 'next/navigation';
import ClientProdutoUI from './ClientProdutoUI';

export default async function ProdutoPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const produto = mockProducts.find(p => p.id === resolvedParams.id);

  if (!produto) {
    notFound();
  }

  return <ClientProdutoUI produto={produto} />;
}