'use client';

export default function ImageComparison() {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
          Qualidade que Você Pode Sentir
        </h2>
        <div className="relative overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-600">
          <div className="flex h-96">
            {/* Before Image */}
            <div className="w-1/2 flex items-center justify-center bg-gray-300 dark:bg-gray-500">
              <span className="text-gray-600 dark:text-gray-400">Antes</span>
            </div>
            {/* After Image */}
            <div className="w-1/2 flex items-center justify-center bg-amber-500">
              <span className="text-black font-semibold">Depois</span>
            </div>
            {/* Drawer */}
            <div className="absolute left-1/2 top-0 h-full w-0.5 bg-black/50 cursor-ew-resize" />
          </div>
          <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
            Arraste para ver a diferença na qualidade do nosso algodão premium
          </div>
        </div>
      </div>
    </section>
  );
}