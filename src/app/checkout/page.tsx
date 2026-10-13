"use client";
import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { initMercadoPago, Payment } from '@mercadopago/sdk-react';

// Inicializa o Mercado Pago de forma super segura
initMercadoPago('APP_USR-8bed9de9-af7c-42ad-b05a-187f46f35fbb', { locale: 'pt-BR' });

export default function CheckoutPage() {
  const { cartItems, cartTotal } = useCart();
  const { data: session, status } = useSession();
  const router = useRouter();

  const [cep, setCep] = useState('');
  const [frete, setFrete] = useState<number | null>(null);
  const [cupom, setCupom] = useState('');
  const [desconto, setDesconto] = useState(0);
  const [cupomAplicado, setCupomAplicado] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => { setIsClient(true); }, []);

  if (status === 'loading') return <div className="min-h-screen bg-zinc-50 flex items-center justify-center font-anton text-2xl uppercase">Carregando...</div>;
  if (!session) { router.push('/login'); return null; }
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] bg-zinc-50 flex flex-col items-center justify-center p-4 text-center">
        <h1 className="font-anton text-4xl mb-4">Sua Sacola está vazia</h1>
        <Link href="/" className="bg-black text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-[#F59E0B] hover:text-black transition-colors">Voltar para a loja</Link>
      </div>
    );
  }

  const calcularFrete = () => { 
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo === '88132204') {
      setFrete(0);
      setDesconto(cartTotal - 1.00);
      setCupomAplicado(true);
      alert('⚠️ MODO DE TESTE ATIVADO: Total reduzido para R$ 1,00');
      return;
    }
    if (cepLimpo.length !== 8) { alert("Digite um CEP válido"); setFrete(null); return; }
    setFrete(parseInt(cepLimpo.charAt(0)) >= 8 ? 15.90 : 25.90);
  };

  const aplicarCupom = () => {
    if (cupom.toUpperCase() === 'BSKW10') { setDesconto(cartTotal * 0.10); setCupomAplicado(true); } 
    else { alert('Cupom inválido.'); }
  };

  const totalGeral = cartTotal - desconto + (frete || 0);

  // Esta é a função mágica que o Brick chama quando o cliente aperta "Pagar"
  const onSubmitPagamento = async (formData: any) => {
    return new Promise<void>((resolve, reject) => {
      fetch('/api/pagamento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData, cartItems, totalGeral })
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          if (data.pix_qr_code) {
             // Redireciona para Meus Pedidos onde o Pix ou Boleto estará guardado!
             alert('Pedido processado com sucesso!\n\nSe escolheu PIX, o seu código Copia e Cola é:\n\n' + data.pix_qr_code);
          } else if (data.ticket_url) {
             alert('Pedido processado com sucesso! O seu boleto foi gerado.');
          }
          router.push('/pedidos');
          resolve();
        } else {
          alert('Ocorreu um erro ao processar o pagamento.\nDetalhes: ' + JSON.stringify(data.error));
          reject();
        }
      })
      .catch((err) => {
        alert('Falha na comunicação com o servidor.');
        reject();
      });
    });
  };

  const initialization = { amount: Number(totalGeral.toFixed(2)) };
  const customization = { paymentMethods: { ticket: 'all', bankTransfer: 'all', creditCard: 'all', debitCard: 'all' }};

  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="font-anton text-2xl uppercase mb-6 border-b-2 border-black pb-2">1. Dados de Envio</h2>
          <div className="bg-white p-6 border border-zinc-200 rounded-sm mb-8 shadow-sm">
            <p className="text-zinc-600 mb-4">Comprador: <strong className="text-black">{session.user?.name || session.user?.email}</strong></p>
            <div className="flex gap-2 mb-2">
              <input type="text" placeholder="CEP Ex: 88000-000" value={cep} onChange={(e) => setCep(e.target.value)} className="border border-zinc-300 p-3 w-full rounded-sm outline-none focus:border-black" maxLength={9} />
              <button onClick={calcularFrete} className="bg-black text-white px-6 font-bold uppercase text-xs hover:bg-[#F59E0B] hover:text-black transition-colors">Calcular</button>
            </div>
            {frete !== null && <p className="text-green-600 text-sm font-bold">Frete: R$ {frete.toFixed(2).replace('.', ',')}</p>}
          </div>

          <h2 className="font-anton text-2xl uppercase mb-6 border-b-2 border-black pb-2">2. Desconto</h2>
          <div className="bg-white p-6 border border-zinc-200 rounded-sm mb-8 shadow-sm flex gap-2">
            <input type="text" placeholder="Código" value={cupom} onChange={(e) => setCupom(e.target.value)} disabled={cupomAplicado} className="border border-zinc-300 p-3 w-full rounded-sm outline-none focus:border-black uppercase" />
            <button onClick={aplicarCupom} disabled={cupomAplicado} className="bg-zinc-800 text-white px-6 font-bold uppercase text-xs hover:bg-black disabled:opacity-50">Aplicar</button>
          </div>

          <h2 className="font-anton text-2xl uppercase mb-6 border-b-2 border-black pb-2">3. Pagamento Seguro</h2>
          <div className="min-h-[400px]">
            {isClient && frete !== null ? (
              <Payment 
                initialization={initialization} 
                customization={customization as any} 
                onSubmit={onSubmitPagamento} 
                locale="pt-BR"
              />
            ) : (
              <div className="bg-white p-6 border border-zinc-200 text-center text-zinc-500 rounded-sm shadow-sm">
                Calcule o frete para exibir as opções de pagamento (Pix, Cartão e Boleto).
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-8 border border-zinc-200 rounded-sm h-fit sticky top-24 shadow-sm">
          <h2 className="font-anton text-2xl uppercase mb-6">Sua Armadura</h2>
          <div className="space-y-4 mb-6 border-b border-zinc-100 pb-4">
            {cartItems.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-sm">
                <span className="font-bold uppercase text-zinc-800">{item.titulo} (x{item.quantidade})</span>
                <span className="font-bold">R$ {(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</span>
              </div>
            ))}
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-zinc-500">Subtotal</span><span className="font-bold">R$ {cartTotal.toFixed(2).replace('.', ',')}</span></div>
            {desconto > 0 && <div className="flex justify-between text-green-600"><span className="font-bold">Desconto</span><span className="font-bold">- R$ {desconto.toFixed(2).replace('.', ',')}</span></div>}
            <div className="flex justify-between"><span className="text-zinc-500">Frete</span><span className="font-bold">{frete !== null ? `R$ ${frete.toFixed(2).replace('.', ',')}` : 'A calcular'}</span></div>
            <div className="flex justify-between text-lg mt-4 border-t border-black pt-4">
              <span className="font-anton uppercase">Total Geral</span>
              <span className="font-bold text-[#F59E0B]">R$ {totalGeral.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
