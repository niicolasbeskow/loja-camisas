'use client';

export default function BenefitColumns() {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-center">
          {/* Free Shipping */}
          <div className="flex flex-col items-center space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2 7.96 7.96 0 01-4.11-12 2 2 0 00-3.89 0 7.96 7.96 0 01-4.11 12A2 2 0 005 19z"></path>
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Frete Grátis</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Para compras acima de R$ 399,00
            </p>
          </div>

          {/* First Exchange Free */}
          <div className="flex flex-col items-center space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.768 0 3.42 3.42 0 001.946.806 3.42 3.42 0 014.768 0 3.42 3.42 0 001.946.806 3.42 3.42 0 014.768 0 3.42 3.42 0 001.946.806 3.42 3.42 0 014.768 0 3.42 3.42 0 001.946.806 3.42 3.42 0 014.768 0V5a1 1 0 10-2 0v1.697a3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.768 0 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.768 0 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.768 0 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.768 0V5a1 1 0 10-2 0v1.697z"></path>
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Primeira Troca Gratuita</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Sem custo adicional na primeira troca
            </p>
          </div>

          {/* Installment Payment */}
          <div className="flex flex-col items-center space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm0 12c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm0-8c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2z"></path>
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Parcelamento</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Até 6x sem juros no cartão
            </p>
          </div>

          {/* Nationwide Shipping */}
          <div className="flex flex-col items-center space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2 7.96 7.96 0 01-4.11-12 2 2 0 00-3.89 0 7.96 7.96 0 01-4.11 12A2 2 0 005 19z"></path>
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Enviamos pra todo Brasil</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Entrega rápida e segura para todo o território nacional
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}