"use client";
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cartItems, cartTotal } = useCart();
  const { data: session, status } = useSession();
  const router = useRouter();

  const [cep, setCep] = useState('');
  const [frete, setFrete] = useState<number | null>(null);
  const [cupom, setCupom] = useState('');
  const [desconto, setDesconto] = useState(0);
  const [cupomAplicado, setCupomAplicado] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (status === 'loading') return <div className="min-h-screen bg-zinc-50 flex items-center justify-center font-anton text-2xl uppercase">Carregando...</div>;
  if (!session) { router.push('/login'); return null; }
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] bg-zinc-50 flex flex-col items-center justify-center p-4 text-center">
        <h1 className="font-anton text-4xl uppercase mb-4">Sua Sacola está vazia</h1>
        <Link href="/" className="bg-black text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-[#F59E0B] hover:text-black transition-colors">Voltar para a loja</Link>
      </div>
    );
  }

  const calcularFrete = () => { 
    const cepLimpo = cep.replace(/\D/g, '');
    
    // HACK PARA 1 REAL (O Mercado Pago rejeita pagamentos de centavos)
    if (cepLimpo === '88132204') {
      setFrete(0);
      setDesconto(cartTotal - 1.00);
      setCupomAplicado(true);
      alert('⚠️ MODO DE TESTE ATIVADO: Total reduzido para R$ 1,00');
      return;
    }

    if (cepLimpo.length !== 8) {
      alert("Digite um CEP válido com 8 dígitos.");
      setFrete(null);
      return;
    }
    const primeiraLetra = parseInt(cepLimpo.charAt(0));
    setFrete(primeiraLetra >= 8 ? 15.90 : 25.90);
  };

  const aplicarCupom = () => {
    if (cupom.toUpperCase() === 'BSKW10') {
      setDesconto(cartTotal * 0.10);
      setCupomAplicado(true);
      alert('Cupom de 10% aplicado!');
    } else {
      setDesconto(0);
      setCupomAplicado(false);
      alert('Cupom inválido.');
    }
  };

  const totalGeral = cartTotal - desconto + (frete || 0);

  const handlePagamento = async () => {
    if (frete === null) {
      alert('Você precisa calcular o frete para finalizar a compra.');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems, frete, desconto, totalGeral })
      });
      
      const data = await res.json();
      
      if (data.url) {
        window.location.href = data.url; 
      } else {
        // ALERTA DEDURO! Vai mostrar exatamente o que o Mercado Pago reclamar
        alert('ERRO DO SISTEMA:\n\n' + JSON.stringify(data, null, 2));
        setIsProcessing(false);
      }
    } catch (error) {
      alert('Erro de conexão com o servidor.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="font-anton text-2xl uppercase mb-6 border-b-2 border-black pb-2">1. Dados de Envio</h2>
          <div className="bg-white p-6 border border-zinc-200 rounded-sm mb-8 shadow-sm">
            <p className="text-zinc-600 mb-4">Comprador: <strong className="text-black">{session.user?.name || session.user?.email}</strong></p>
            <label className="block text-sm font-bold uppercase text-zinc-500 mb-2">Calcular Frete (CEP) *</label>
            <div className="flex gap-2 mb-2">
              <input type="text" placeholder="Ex: 88000-000" value={cep} onChange={(e) => setCep(e.target.value)} className="border border-zinc-300 p-3 w-full rounded-sm outline-none focus:border-black" maxLength={9} />
              <button onClick={calcularFrete} className="bg-black text-white px-6 font-bold uppercase text-xs hover:bg-[#F59E0B] hover:text-black transition-colors">Calcular</button>
            </div>
            {frete !== null && <p className="text-green-600 text-sm font-bold">Frete calculado: R$ {frete.toFixed(2).replace('.', ',')}</p>}
          </div>

          <h2 className="font-anton text-2xl uppercase mb-6 border-b-2 border-black pb-2">2. Cupom de Desconto</h2>
          <div className="bg-white p-6 border border-zinc-200 rounded-sm mb-8 shadow-sm">
            <div className="flex gap-2">
              <input type="text" placeholder="Código do Cupom" value={cupom} onChange={(e) => setCupom(e.target.value)} disabled={cupomAplicado} className="border border-zinc-300 p-3 w-full rounded-sm outline-none focus:border-black uppercase" />
              <button onClick={aplicarCupom} disabled={cupomAplicado} className="bg-zinc-800 text-white px-6 font-bold uppercase text-xs hover:bg-black disabled:opacity-50">Aplicar</button>
            </div>
          </div>

          <h2 className="font-anton text-2xl uppercase mb-6 border-b-2 border-black pb-2">3. Pagamento</h2>
          <button 
            onClick={handlePagamento} 
            disabled={frete === null || isProcessing} 
            className={`w-full py-5 flex items-center justify-center font-anton text-xl uppercase tracking-wider transition-colors ${frete !== null && !isProcessing ? 'bg-[#F59E0B] text-black hover:bg-amber-400' : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'}`}
          >
            {isProcessing ? 'Conectando ao banco...' : frete !== null ? 'Ir para Mercado Pago' : 'Calcule o frete para prosseguir'}
          </button>
        </div>

        <div className="bg-white p-8 border border-zinc-200 rounded-sm h-fit sticky top-24 shadow-sm">
          <h2 className="font-anton text-2xl uppercase mb-6">Resumo da Compra</h2>
          <div className="space-y-4 mb-6">
            {cartItems.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-sm border-b border-zinc-100 pb-4">
                <div className="flex flex-col">
                  <span className="font-bold uppercase text-zinc-800">{item.titulo}</span>
                  <span className="text-zinc-500">Cor: {item.cor} | Tam: {item.tamanho} | Qtd: {item.quantidade}</span>
                </div>
                <span className="font-bold text-black">R$ {(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</span>
              </div>
            ))}
          </div>
          <div className="space-y-3 text-sm border-t border-zinc-200 pt-6">
            <div className="flex justify-between"><span className="text-zinc-500">Subtotal</span><span className="font-bold">R$ {cartTotal.toFixed(2).replace('.', ',')}</span></div>
            {desconto > 0 && <div className="flex justify-between text-green-600"><span className="font-bold">Desconto / Ajuste</span><span className="font-bold">- R$ {desconto.toFixed(2).replace('.', ',')}</span></div>}
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
