'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [tipo, setTipo] = useState('');
  const [imagem, setImagem] = useState('');
  const [artistaId, setArtistaId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Fetch product data on initial load
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      setInitialLoading(true);
      try {
        const response = await fetch(`/api/produtos/${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }

        const product = await response.json();
        setNome(product.nome);
        setPreco(product.preco.toString());
        setTipo(product.tipo);
        setImagem(product.imagem);
        setArtistaId(product.artista_id.toString());
      } catch (err) {
        setError('Erro ao carregar produto. Por favor, tente novamente.');
        console.error('Error fetching product:', err);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`/api/produtos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          preco: parseFloat(preco),
          tipo,
          imagem,
          artistaId: parseInt(artistaId),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update product');
      }

      // Success
      alert('Produto atualizado com sucesso!');
      router.push('/admin/produtos');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      alert('Erro ao atualizar produto. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Carregando produto...</h1>
          <p className="text-gray-500">Por favor, aguarde enquanto carregamos os dados do produto.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Editar Produto</h1>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preço (R$)
            </label>
            <input
              type="number"
              step="0.01"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo
            </label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="">Selecione o tipo</option>
              <option value="Tag">Tag</option>
              <option value="Colecao">Coleção</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL da Imagem
            </label>
            <input
              type="text"
              value={imagem}
              onChange={(e) => setImagem(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="https://exemplo.com/imagem.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Artista ID
            </label>
            <input
              type="number"
              value={artistaId}
              onChange={(e) => setArtistaId(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-md transition-colors ${
              loading ? 'opacity-70' : ''
            }`}
          >
            {loading ? 'Atualizando...' : 'Atualizar Produto'}
          </button>
        </form>
      </div>
    </div>
  );
}