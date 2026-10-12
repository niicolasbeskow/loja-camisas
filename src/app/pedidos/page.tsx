"use client";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// STATUS POSSÍVEIS (Regras de Negócio B.SKW)
// 1. PENDENTE: Feito mas não finalizado/pago
// 2. PROCESSANDO: Finalizado mas aguardando aprovação do MercadoPago
// 3. ENVIADO: Pago e com rastreio / aguardando rastreio
// 4. ENTREGUE: Recebido pelo cliente

const MOCK_PEDIDOS = [
  {
    id: "BSKW-1004",
    data: "14/10/2026",
    total: 315.80,
    status: "ENVIADO",
    rastreio: "BR123456789BR",
    itens: [
      { nome: "Camiseta Oversized", cor: "Off White", tamanho: "G", qtd: 2 },
      { nome: "Camiseta Básica", cor: "Preto", tamanho: "M", qtd: 1 }
    ]
  },
  {
    id: "BSKW-1005",
    data: "15/10/2026",
    total: 104.80,
    status: "PROCESSANDO",
    rastreio: null,
    itens: [
      { nome: "Camiseta Suedine", cor: "Bordô", tamanho: "P", qtd: 1 }
    ]
  },
  {
    id: "BSKW-1006",
    data: "16/10/2026",
    total: 89.90,
    status: "PENDENTE",
    rastreio: null,
    itens: [
      { nome: "Regata Oversized", cor: "Branco", tamanho: "GG", qtd: 1 }
    ]
  },
  {
    id: "BSKW-1001",
    data: "01/09/2026",
    total: 157.80,
    status: "ENTREGUE",
    rastreio: "BR987654321BR",
    itens: [
      { nome: "Camiseta Boxy", cor: "Areia", tamanho: "M", qtd: 2 }
    ]
  }
];

export default function PedidosPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') return <div className="min-h-screen bg-zinc-50 flex items-center justify-center font-anton text-2xl uppercase">Carregando...</div>;
  if (!session) { router.push('/login'); return null; }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDENTE':
        return <span className="bg-zinc-200 text-zinc-600 px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider">Aguardando Pagamento</span>;
      case 'PROCESSANDO':
        return <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider">Analisando Pagamento</span>;
      case 'ENVIADO':
        return <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider">Pago & Enviado</span>;
      case 'ENTREGUE':
        return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider">Pedido Entregue</span>;
      default:
        return <span className="bg-zinc-200 text-zinc-600 px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="max-w-[1000px] mx-auto px-4">
        
        <div className="flex items-end justify-between mb-8 border-b-2 border-black pb-4">
          <div>
            <h1 className="font-anton text-4xl uppercase text-black">Meus Pedidos</h1>
            <p className="text-zinc-500 mt-2">Acompanhe o status da sua armadura B.SKW.</p>
          </div>
          <Link href="/" className="text-sm font-bold text-zinc-500 hover:text-black uppercase hidden sm:block">Voltar para loja</Link>
        </div>

        <div className="space-y-6">
          {MOCK_PEDIDOS.map((pedido) => (
            <div key={pedido.id} className="bg-white border border-zinc-200 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              
              {/* CABEÇALHO DO PEDIDO */}
              <div className="bg-zinc-50 px-6 py-4 border-b border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex gap-6">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-zinc-500 mb-1">Pedido efetuado</p>
                    <p className="text-sm font-medium text-black">{pedido.data}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-zinc-500 mb-1">Total</p>
                    <p className="text-sm font-medium text-black">R$ {pedido.total.toFixed(2).replace('.', ',')}</p>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-[10px] uppercase font-bold text-zinc-500 mb-1">Nº do Pedido</p>
                    <p className="text-sm font-medium text-black">{pedido.id}</p>
                  </div>
                </div>
                <div>{getStatusBadge(pedido.status)}</div>
              </div>

              {/* CORPO DO PEDIDO */}
              <div className="px-6 py-6 flex flex-col sm:flex-row justify-between gap-6">
                <div className="flex-1 space-y-4">
                  <h3 className="font-bold text-zinc-900 uppercase text-sm mb-3 border-b border-zinc-100 pb-2">Itens</h3>
                  {pedido.itens.map((item, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="font-bold text-sm text-black uppercase">{item.nome}</span>
                      <span className="text-zinc-500 text-xs">Cor: {item.cor} | Tam: {item.tamanho} | Qtd: {item.qtd}</span>
                    </div>
                  ))}
                </div>

                {/* ÁREA DE AÇÃO / RASTREIO */}
                <div className="sm:w-64 flex flex-col justify-center border-t sm:border-t-0 sm:border-l border-zinc-100 pt-4 sm:pt-0 sm:pl-6">
                  {pedido.status === 'PENDENTE' && (
                    <>
                      <p className="text-xs text-zinc-500 mb-3 text-center sm:text-left">Finalize o pagamento para garantirmos o seu estoque.</p>
                      <button className="w-full bg-[#F59E0B] text-black font-bold uppercase py-3 text-xs tracking-wider rounded-sm hover:bg-amber-400 transition-colors">
                        Pagar Agora
                      </button>
                    </>
                  )}
                  
                  {pedido.status === 'PROCESSANDO' && (
                    <p className="text-sm text-zinc-600 font-medium text-center sm:text-left">Aguardando confirmação do MercadoPago...</p>
                  )}

                  {(pedido.status === 'ENVIADO' || pedido.status === 'ENTREGUE') && pedido.rastreio && (
                    <>
                      <p className="text-xs font-bold uppercase text-zinc-500 mb-2">Código de Rastreio</p>
                      <div className="bg-zinc-100 border border-zinc-200 text-center py-2 px-3 rounded-sm font-mono text-sm text-black tracking-widest mb-3">
                        {pedido.rastreio}
                      </div>
                      <button className="w-full bg-black text-white font-bold uppercase py-2 text-xs tracking-wider rounded-sm hover:bg-[#F59E0B] hover:text-black transition-colors">
                        Rastrear Correios
                      </button>
                    </>
                  )}
                  
                  {(pedido.status === 'ENVIADO' && !pedido.rastreio) && (
                    <p className="text-sm text-zinc-600 font-medium text-center sm:text-left">Preparando pacote para envio...</p>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
