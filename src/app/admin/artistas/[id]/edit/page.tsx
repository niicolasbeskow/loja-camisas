'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export default function EditArtistPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [slug, setSlug] = useState('');
  const [categoria_arte, setCategoriaArte] = useState('');
  const [bio, setBio] = useState('');
  const [imagem_perfil, setImagemPerfil] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Fetch artist data on initial load
  useEffect(() => {
    const fetchArtist = async () => {
      if (!id) return;

      setInitialLoading(true);
      try {
        const response = await fetch(`/api/artistas/${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch artist');
        }

        const artist = await response.json();
        setNome(artist.nome);
        setSlug(artist.slug);
        setCategoriaArte(artist.categoria_arte);
        setBio(artist.bio || '');
        setImagemPerfil(artist.imagem_perfil || '');
      } catch (err) {
        setError('Erro ao carregar artista. Por favor, tente novamente.');
        console.error('Error fetching artist:', err);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchArtist();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`/api/artistas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          slug,
          categoria_arte,
          bio: bio || undefined,
          imagem_perfil: imagem_perfil || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update artist');
      }

      // Success
      alert('Artista atualizado com sucesso!');
      router.push('/admin/artistas');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      alert('Erro ao atualizar artista. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Carregando artista...</h1>
          <p className="text-gray-500">Por favor, aguarde enquanto carregamos os dados do artista.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Editar Artista</h1>

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
              Slug (URL amigável)
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="ex: joao-silva"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoria de Arte
            </label>
            <input
              type="text"
              value={categoria_arte}
              onChange={(e) => setCategoriaArte(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Biografia (opcional)
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL da Imagem de Perfil (opcional)
            </label>
            <input
              type="text"
              value={imagem_perfil}
              onChange={(e) => setImagemPerfil(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="https://exemplo.com/imagem.jpg"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-md transition-colors ${
              loading ? 'opacity-70' : ''
            }`}
          >
            {loading ? 'Atualizando...' : 'Atualizar Artista'}
          </button>
        </form>
      </div>
    </div>
  );
}