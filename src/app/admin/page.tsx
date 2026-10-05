import { prisma } from '@/lib/prisma';

export default async function AdminDashboard() {
  // Fetch counts
  const [totalProducts, totalArtists] = await Promise.all([
    prisma.product.count(),
    prisma.artist.count(),
  ]);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">
        Dashboard
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Products Card */}
        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-600">
                Total de Produtos
              </h3>
              <p className="mt-2 text-4xl font-bold text-gray-900">
                {totalProducts}
              </p>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m2 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Artists Card */}
        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-600">
                Total de Artistas
              </h3>
              <p className="mt-2 text-4xl font-bold text-gray-900">
                {totalArtists}
              </p>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112-0v1zm0 0h6v-2a6 6 0 00-6-6H9a6 6 0 00-6 6v2z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}