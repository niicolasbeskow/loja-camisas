'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface EditArtistFormProps {
  artist: {
    id: number;
    nome: string;
    slug: string;
    categoria_arte: string;
    bio: string | null;
    imagem_perfil: string | null;
  };
}

export default function EditArtistForm({ artist }: EditArtistFormProps) {
  const [nome, setNome] = useState(artist.nome);
  const [slug, setSlug] = useState(artist.slug);
  const [categoria_arte, setCategoriaArte] = useState(artist.categoria_arte);
  const [bio, setBio] = useState(artist.bio ?? '');
  const [imagem_perfil, setImagemPerfil] = useState(artist.imagem_perfil ?? '');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`/api/artistas/${artist.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          slug,
          categoria_arte,
          bio: bio || null,
          imagem_perfil: imagem_perfil || null,
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
