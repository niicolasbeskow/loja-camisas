'use client';

export default function CollectionSection() {
  const collections = [
    {
      id: 1,
      title: 'Kits',
      description: 'Conjuntos perfeitos para você',
      imageUrl: '/placeholder-collection-1.jpg',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20'
    },
    {
      id: 2,
      title: 'Estampadas',
      description: 'Estampas exclusivas e autorais',
      imageUrl: '/placeholder-collection-2.jpg',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      id: 3,
      title: 'Algodão mais Grosso',
      description: 'Qualidade superior e durabilidade',
      imageUrl: '/placeholder-collection-3.jpg',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      id: 4,
      title: 'Conjuntos',
      description: 'Looks completos prontos para usar',
      imageUrl: '/placeholder-collection-4.jpg',
      bgColor: 'bg-pink-50 dark:bg-pink-900/20'
    }
  ];

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
          Nossa Coleção
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map(collection => (
            <div key={collection.id} className="group">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-600 rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <img
                  src={collection.imageUrl}
                  alt={collection.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <h3 className="text-white text-lg font-bold">{collection.title}</h3>
                </div>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                {collection.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {collection.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}