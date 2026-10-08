export default function FaqPage() {
  return (
    <main className="min-h-screen bg-[#000000] text-white py-24 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-anton uppercase mb-8 border-b border-zinc-800 pb-4 text-[#F59E0B]">Dúvidas Frequentes</h1>
        <div className="space-y-8">
          <div className="bg-zinc-900/50 p-6 rounded-md border border-zinc-800">
            <h3 className="text-xl font-bold mb-2 text-white">As peças encolhem após a lavagem?</h3>
            <p className="text-zinc-400">Não. Nossas malhas passam por um rigoroso processo de lavanderia, garantindo encolhimento zero.</p>
          </div>
          <div className="bg-zinc-900/50 p-6 rounded-md border border-zinc-800">
            <h3 className="text-xl font-bold mb-2 text-white">Qual é o prazo de entrega?</h3>
            <p className="text-zinc-400">O prazo varia de acordo com o seu CEP. A estimativa exata é calculada no carrinho.</p>
          </div>
        </div>
      </div>
    </main>
  );
}