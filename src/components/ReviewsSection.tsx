'use client';

export default function ReviewsSection() {
  const reviews = [
    {
      id: 1,
      name: 'Ana Silva',
      rating: 5,
      comment: 'Camisetas de qualidade superior! O algodão é muito macio e o caimento perfeito. Comprei três e já quero mais!',
      date: '15/03/2026'
    },
    {
      id: 2,
      name: 'Carlos Mendes',
      rating: 4,
      comment: 'Adorei o design exclusivo. As estampas são únicas e não desbotam depois de várias lavagens.',
      date: '10/03/2026'
    },
    {
      id: 3,
      name: 'Laura Costa',
      rating: 5,
      comment: 'Frete rápido e atendimento excelente. A primeira troca foi gratuita e super fácil.',
      date: '05/03/2026'
    }
  ];

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
          O que nossos clientes dizem
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map(review => (
            <div key={review.id} className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-3">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <svg key={star} className="h-4 w-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.956 1.053l4.583 1.506a1 1 0 001.057-.954l1.298-4.002a1 1 0 00-.552-1.402l-2.77-2.01a1 1 0 00-1.123 0l-2.77 2.01a1 1 0 00-.552 1.402l1.298 4.002a1 1 0 001.057.954l4.583 1.506a1 1 0 001.057-.954l1.519-4.674z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                "{review.comment}"
              </p>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/profile-1687311234567-abcdefg"
                    alt={`${review.name} foto`}
                    className="h-10 w-10 rounded-full"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">{review.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Cliente verificado</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}