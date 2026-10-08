export default function PrivacidadePage() {
  return (
    <main className="min-h-screen bg-[#000000] text-white py-24 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-anton uppercase mb-8 border-b border-zinc-800 pb-4 text-[#F59E0B]">Política de Privacidade</h1>
        <div className="space-y-6 text-zinc-300 text-lg leading-relaxed">
          <p>A <strong className="text-white">B.SKW</strong> valoriza a privacidade dos seus dados. Esta política descreve como coletamos, usamos e protegemos as suas informações pessoais ao utilizar a nossa plataforma.</p>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Coleta de Dados</h2>
          <p>Coletamos informações básicas como nome, e-mail (via Google Login) e endereço (via ViaCEP) exclusivamente para o processamento, envio das suas armaduras e comunicação sobre o seu pedido.</p>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Segurança</h2>
          <p>Seus dados são armazenados de forma segura e não são compartilhados com terceiros, exceto quando estritamente necessário para a logística de entrega ou processamento seguro de pagamentos.</p>
        </div>
      </div>
    </main>
  );
}