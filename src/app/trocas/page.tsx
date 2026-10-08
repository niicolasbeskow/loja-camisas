export default function TrocasPage() {
  return (
    <main className="min-h-screen bg-[#000000] text-white py-24 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-anton uppercase mb-8 border-b border-zinc-800 pb-4 text-[#F59E0B]">Trocas e Devoluções</h1>
        <div className="space-y-6 text-zinc-300 text-lg">
          <p>Garantimos a sua satisfação. Caso a sua armadura não sirva como esperado, o processo é simples e direto.</p>
          <ul className="list-disc pl-6 space-y-4 mt-4">
            <li>Você tem até <strong className="text-white">7 dias corridos</strong> após o recebimento para solicitar a devolução.</li>
            <li>A primeira troca é por nossa conta.</li>
            <li>As peças devem estar com as etiquetas originais, sem marcas de uso ou lavagem.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}