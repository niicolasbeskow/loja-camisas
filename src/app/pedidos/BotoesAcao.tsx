"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BotoesAcao({ pedidoId, status, paymentUrl, rastreio, wpp }: any) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleExcluir = async () => {
    if (!confirm("Tem certeza que deseja cancelar e excluir este pedido?")) return;
    setIsDeleting(true);
    await fetch(`/api/pedidos/${pedidoId}`, { method: 'DELETE' });
    router.refresh();
  };

  return (
    <div className="sm:w-64 flex flex-col justify-center border-t sm:border-t-0 sm:border-l border-zinc-100 pt-4 sm:pt-0 sm:pl-6">
      {status === 'PENDENTE' && (
        <>
          <p className="text-xs text-zinc-500 mb-3 text-center sm:text-left">Finalize o pagamento para garantirmos o seu estoque.</p>
          {paymentUrl && (
            <Link href={paymentUrl} className="w-full text-center bg-[#F59E0B] text-black font-bold uppercase py-3 text-xs tracking-wider rounded-sm hover:bg-amber-400 transition-colors block mb-2">
              Pagar Agora
            </Link>
          )}
          <button onClick={handleExcluir} disabled={isDeleting} className="w-full text-center text-red-500 font-bold uppercase py-2 text-xs tracking-wider hover:bg-red-50 rounded-sm transition-colors block">
            {isDeleting ? "Excluindo..." : "Cancelar Pedido"}
          </button>
        </>
      )}
      
      {status === 'PROCESSANDO' && (
        <>
          <p className="text-sm text-zinc-600 font-medium text-center sm:text-left mb-3">Aguardando confirmação ou em análise...</p>
          <a href={`https://wa.me/${wpp}?text=Olá Nicolas, preciso de ajuda com o meu pedido ${pedidoId.substring(0,8).toUpperCase()}`} target="_blank" className="w-full text-center bg-black text-white font-bold uppercase py-2 text-xs tracking-wider rounded-sm hover:bg-zinc-800 transition-colors block">Falar com Suporte</a>
        </>
      )}

      {status === 'ENVIADO' && rastreio && (
        <>
          <p className="text-xs font-bold uppercase text-zinc-500 mb-2">Código de Rastreio</p>
          <div className="bg-zinc-100 border border-zinc-200 text-center py-2 px-3 rounded-sm font-mono text-sm text-black tracking-widest mb-3">{rastreio}</div>
          <a href={`https://rastreamento.correios.com.br/app/index.php?codigo=${rastreio}`} target="_blank" className="w-full text-center bg-black text-white font-bold uppercase py-2 text-xs tracking-wider rounded-sm hover:bg-[#F59E0B] hover:text-black transition-colors block">Rastrear Correios</a>
        </>
      )}

      {status === 'ENTREGUE' && (
        <>
          <p className="text-sm text-green-600 font-bold text-center sm:text-left mb-3">Pedido Entregue! ✓</p>
          <a href={`https://wa.me/${wpp}?text=Olá Nicolas, tive um problema com o pedido ${pedidoId.substring(0,8).toUpperCase()}`} target="_blank" className="w-full text-center border-2 border-black text-black font-bold uppercase py-2 text-xs tracking-wider rounded-sm hover:bg-black hover:text-white transition-colors block">Relatar um Problema</a>
        </>
      )}
    </div>
  );
}
