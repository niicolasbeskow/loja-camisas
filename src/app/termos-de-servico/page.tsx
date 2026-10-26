export default function TermosPage() {
  return (
    <main className="min-h-screen bg-[#000000] text-white py-24 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-anton uppercase mb-8 border-b border-zinc-800 pb-4 text-[#F59E0B]">Termos de Serviço</h1>
        <div className="space-y-6 text-zinc-300 text-lg leading-relaxed">
          <p>Ao acessar e realizar compras na <strong className="text-white">B.SKW Store</strong>, você concorda com os nossos Termos de Serviço.</p>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">Propriedade Intelectual</h2>
          <p>Todo o conteúdo deste site, incluindo logotipos, imagens, textos e design da marca B.SKW, é de nossa propriedade exclusiva e protegido por leis de direitos autorais. Cópias não autorizadas estão sujeitas a medidas legais.</p>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">Disponibilidade e Preços</h2>
          <p>Os produtos estão sujeitos à disponibilidade de estoque. Reservamo-nos o direito de alterar os preços a qualquer momento sem aviso prévio, mas honraremos rigorosamente o preço vigente no momento da finalização do seu carrinho.</p>
        </div>
      </div>
    </main>
  );
}