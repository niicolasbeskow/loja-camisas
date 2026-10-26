export default function ReembolsoPage() {
  return (
    <main className="min-h-screen bg-[#000000] text-white py-24 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-anton uppercase mb-8 border-b border-zinc-800 pb-4 text-[#F59E0B]">Política de Reembolso</h1>
        <div className="space-y-6 text-zinc-300 text-lg leading-relaxed">
          <p>Garantir a sua satisfação com a armadura B.SKW é nossa prioridade. Atendemos integralmente ao Código de Defesa do Consumidor.</p>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">Direito de Arrependimento</h2>
          <p>Você tem até <strong className="text-white">7 dias corridos</strong> após o recebimento do produto para solicitar a devolução e o reembolso integral do valor pago.</p>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">Condições para Estorno</h2>
          <p>A peça deve ser devolvida na embalagem original, com as etiquetas intactas e sem qualquer indício de uso, odor ou lavagem. O estorno é processado via PIX ou cartão de crédito após a análise rigorosa da peça em nosso centro de distribuição.</p>
        </div>
      </div>
    </main>
  );
}