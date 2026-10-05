import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import EditArtistForm from '@/components/admin/EditArtistForm';

export default async function EditarArtista({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const artistId = parseInt(id);

  // Fetch the artist
  const artist = await prisma.artist.findUnique({
    where: { id: artistId }
  });

  if (!artist) return notFound();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      <div className="max-w-2xl mx-auto">
        <EditArtistForm artist={artist} />
      </div>
    </div>
  );
}
