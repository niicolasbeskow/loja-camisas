"use client";
import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { initMercadoPago, Payment } from '@mercadopago/sdk-react';

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

  // Estados do Modal PIX
  const [showPixModal, setShowPixModal] = useState(false);
  const [pixData, setPixData] = useState({ qr_code: '', qr_code_base64: '' });
  const [timeLeft, setTimeLeft] = useState(120);
  
  // Estado para o botão de Redirecionamento do Mercado Pago
  const [isRedirectingMP, setIsRedirectingMP] = useState(false);

  useEffect(() => { setIsClient(true); }, []);

  useEffect(() => {
    if (showPixModal && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && showPixModal) {
      fecharModalPix();
    }
  }, [timeLeft, showPixModal]);

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
      setFrete(0); setDesconto(cartTotal - 1.00); setCupomAplicado(true);
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

  // PAGAMENTO VIA CONTA MERCADO PAGO (Redirecionamento)
  const pagarComContaMercadoPago = async () => {
    setIsRedirectingMP(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems, frete: frete || 0, desconto, totalGeral })
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // Leva o cliente para a tela azul com segurança
      } else {
        alert('Erro ao gerar o link do Mercado Pago.');
        setIsRedirectingMP(false);
      }
    } catch (error) {
      alert('Falha na comunicação.');
      setIsRedirectingMP(false);
    }
  };

  // PAGAMENTO TRANSPARENTE (Cartão, PIX Nativo)
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
             setPixData({ qr_code: data.pix_qr_code, qr_code_base64: data.pix_qr_code_base64 });
             setShowPixModal(true);
             setTimeLeft(120);
          } else if (data.ticket_url) {
             alert('Pedido gerado! O seu boleto está pronto.');
             router.push('/pedidos');
          } else {
             router.push('/sucesso');
          }
          resolve();
        } else {
          alert('Erro no pagamento.\nDetalhes: ' + JSON.stringify(data.error));
          reject();
        }
      })
      .catch(() => {
        alert('Falha na comunicação com o servidor.');
        reject();
      });
    });
  };

  const copiarPix = () => {
    navigator.clipboard.writeText(pixData.qr_code);
    alert('Código Pix copiado! Cole no app do seu banco.');
  };

  const fecharModalPix = () => {
    setShowPixModal(false);
    router.push('/pedidos');
  };

  const initialization = { 
    amount: Number(totalGeral.toFixed(2)),
    payer: { email: session.user?.email || '' }
  };
  
  const customization = { paymentMethods: { ticket: 'all', bankTransfer: 'all', creditCard: 'all', debitCard: 'all' }};

  return (
    <div className="min-h-screen bg-zinc-50 py-12 relative">
      
      {/* MODAL PIX (iFood Style) */}
      {showPixModal && (
        <div className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm">
           <div className="bg-white max-w-sm w-full rounded-md p-8 relative flex flex-col items-center text-center shadow-2xl animate-fade-in-up">
              <button onClick={fecharModalPix} className="absolute top-4 right-4 text-zinc-400 hover:text-black font-bold text-xl">&times;</button>
              
              <h2 className="font-anton text-2xl uppercase mb-1">Pague com PIX</h2>
              <p className="text-zinc-500 text-sm mb-6">
                O código expira em: <span className="font-bold text-red-500">{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</span>
              </p>

              {pixData.qr_code_base64 && (
                  <img src={`data:image/png;base64,${pixData.qr_code_base64}`} alt="QR Code Pix" className="w-48 h-48 mb-6 border-4 border-zinc-100 rounded-lg shadow-sm" />
              )}

              <p className="text-xs text-zinc-500 mb-2 font-bold uppercase">Ou copie o código abaixo:</p>
              <div className="flex w-full gap-2 mb-6">
                 <input type="text" value={pixData.qr_code} readOnly className="border border-zinc-300 text-xs p-3 w-full rounded-sm outline-none bg-zinc-50 text-zinc-500 truncate" />
                 <button onClick={copiarPix} className="bg-black text-white px-4 text-xs font-bold uppercase hover:bg-[#F59E0B] hover:text-black transition-colors whitespace-nowrap">Copiar</button>
              </div>

              <button onClick={fecharModalPix} className="text-xs font-bold uppercase underline text-zinc-400 hover:text-black">
                Já paguei / Fechar
              </button>
           </div>
        </div>
      )}

      <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="font-anton text-2xl uppercase mb-6 border-b-2 border-black pb-2">1. Dados de Envio</h2>
          <div className="bg-white p-6 border border-zinc-200 rounded-sm mb-8 shadow-sm">
            <div className="flex gap-2 mb-2">
              <input type="text" placeholder="CEP Ex: 88000-000" value={cep} onChange={(e) => setCep(e.target.value)} className="border border-zinc-300 p-3 w-full rounded-sm outline-none focus:border-black" maxLength={9} />
              <button onClick={calcularFrete} className="bg-black text-white px-6 font-bold uppercase text-xs hover:bg-[#F59E0B] hover:text-black transition-colors">Calcular</button>
            </div>
            {frete !== null && <p className="text-green-600 text-sm font-bold">Frete: R$ {frete.toFixed(2).replace('.', ',')}</p>}
          </div>

          <h2 className="font-anton text-2xl uppercase mb-6 border-b-2 border-black pb-2">2. Pagamento Seguro</h2>
          <div className="min-h-[400px]">
            {isClient && frete !== null ? (
              <div className="animate-fade-in-up">
                
                {/* BOTÃO AZUL MERCADO PAGO */}
                <button 
                  onClick={pagarComContaMercadoPago} 
                  disabled={isRedirectingMP}
                  className="w-full bg-[#009EE3] hover:bg-[#008ACA] text-white py-4 rounded-md font-bold flex items-center justify-center gap-3 transition-colors mb-6 disabled:opacity-70 shadow-sm"
                >
                  {isRedirectingMP ? 'A redirecionar...' : (
                    <>
                      {/* Ícone das mãos do Mercado Pago */}
                      <svg viewBox="0 0 100 100" className="w-8 h-8 fill-current">
                        <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm21.5 68.6L60.2 79.9c-2.3 2.3-6.1 2.3-8.5 0l-5.6-5.6c-2.3-2.3-2.3-6.1 0-8.5l11.3-11.3L46.1 43.1 34.8 54.4c-2.3 2.3-6.1 2.3-8.5 0L15 43.1c-2.3-2.3-2.3-6.1 0-8.5l11.3-11.3c2.3-2.3 6.1-2.3 8.5 0l5.6 5.6c2.3 2.3 2.3 6.1 0 8.5L29.1 48.7l11.3 11.3 11.3-11.3c2.3-2.3 6.1-2.3 8.5 0l11.3 11.3c2.3 2.3 2.3 6.1 0 8.5z"/>
                      </svg>
                      Pagar com sua conta Mercado Pago
                    </>
                  )}
                </button>

                {/* DIVISÓRIA */}
                <div className="flex items-center gap-4 mb-6">
                   <div className="h-px bg-zinc-200 flex-1"></div>
                   <span className="text-zinc-400 text-xs font-bold uppercase">Ou pague direto na tela</span>
                   <div className="h-px bg-zinc-200 flex-1"></div>
                </div>

                {/* FORMULÁRIO TRANSPARENTE (PIX E CARTÃO) */}
                <Payment initialization={initialization} customization={customization as any} onSubmit={onSubmitPagamento} locale="pt-BR" />
              </div>
            ) : (
              <div className="bg-white p-6 border border-zinc-200 text-center text-zinc-500 rounded-sm shadow-sm">
                Calcule o frete para exibir as opções de pagamento.
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-8 border border-zinc-200 rounded-sm h-fit sticky top-24 shadow-sm">
          <h2 className="font-anton text-2xl uppercase mb-6">Resumo</h2>
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
