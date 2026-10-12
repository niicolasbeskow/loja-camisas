import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();
const WPP_NUMBER = "5548991243958";

export default async function PedidosPage() {
  const session = await getServerSession();
  if (!session || !session.user?.email) redirect("/login");

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) redirect("/login");

  const pedidos = await prisma.order.findMany({
    where: { userId: user.id },
    include: { items: true },
    orderBy: { createdAt: 'desc' }
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDENTE': return <span className="bg-zinc-200 text-zinc-600 px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider">Aguardando Pagamento</span>;
      case 'PROCESSANDO': return <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider">Analisando Pagamento</span>;
      case 'ENVIADO': return <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider">Pago & Enviado</span>;
      case 'ENTREGUE': return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider">Pedido Entregue</span>;
      default: return <span className="bg-zinc-200 text-zinc-600 px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider">{status}</span>;
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

        {pedidos.length === 0 ? (
          <div className="text-center py-12 bg-white border border-zinc-200 rounded-sm">
            <h2 className="font-anton text-2xl uppercase mb-4">Você ainda não tem pedidos</h2>
            <Link href="/" className="bg-black text-white px-6 py-3 font-bold uppercase text-sm hover:bg-[#F59E0B] hover:text-black transition-colors">Ver Coleção</Link>
          </div>
        ) : (
          <div className="space-y-6">
            {pedidos.map((pedido) => (
              <div key={pedido.id} className="bg-white border border-zinc-200 rounded-sm overflow-hidden shadow-sm">
                <div className="bg-zinc-50 px-6 py-4 border-b border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex gap-6">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-zinc-500 mb-1">Data</p>
                      <p className="text-sm font-medium text-black">{pedido.createdAt.toLocaleDateString('pt-BR')}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-zinc-500 mb-1">Total</p>
                      <p className="text-sm font-medium text-black">R$ {pedido.total.toFixed(2).replace('.', ',')}</p>
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-[10px] uppercase font-bold text-zinc-500 mb-1">Nº do Pedido</p>
                      <p className="text-sm font-medium text-black">{pedido.id.substring(0,8).toUpperCase()}</p>
                    </div>
                  </div>
                  <div>{getStatusBadge(pedido.status)}</div>
                </div>

                <div className="px-6 py-6 flex flex-col sm:flex-row justify-between gap-6">
                  <div className="flex-1 space-y-4">
                    <h3 className="font-bold text-zinc-900 uppercase text-sm mb-3 border-b border-zinc-100 pb-2">Itens</h3>
                    {pedido.items.map((item) => (
                      <div key={item.id} className="flex flex-col">
                        <span className="font-bold text-sm text-black uppercase">{item.nome}</span>
                        <span className="text-zinc-500 text-xs">Cor: {item.cor || 'N/A'} | Tam: {item.tamanho || 'N/A'} | Qtd: {item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="sm:w-64 flex flex-col justify-center border-t sm:border-t-0 sm:border-l border-zinc-100 pt-4 sm:pt-0 sm:pl-6">
                    {pedido.status === 'PENDENTE' && (
                      <>
                        <p className="text-xs text-zinc-500 mb-3 text-center sm:text-left">Finalize o pagamento para garantirmos o seu estoque.</p>
                        {pedido.paymentUrl && (
                          <Link href={pedido.paymentUrl} className="w-full text-center bg-[#F59E0B] text-black font-bold uppercase py-3 text-xs tracking-wider rounded-sm hover:bg-amber-400 transition-colors block">
                            Pagar Agora
                          </Link>
                        )}
                      </>
                    )}
                    
                    {pedido.status === 'PROCESSANDO' && (
                      <>
                        <p className="text-sm text-zinc-600 font-medium text-center sm:text-left mb-3">Aguardando confirmação...</p>
                        <a href={`https://wa.me/${WPP_NUMBER}?text=Olá Nicolas, preciso de ajuda com o meu pedido ${pedido.id.substring(0,8).toUpperCase()}`} target="_blank" className="w-full text-center bg-black text-white font-bold uppercase py-2 text-xs tracking-wider rounded-sm hover:bg-zinc-800 transition-colors block">Falar com Suporte</a>
                      </>
                    )}

                    {pedido.status === 'ENVIADO' && pedido.trackingCode && (
                      <>
                        <p className="text-xs font-bold uppercase text-zinc-500 mb-2">Código de Rastreio</p>
                        <div className="bg-zinc-100 border border-zinc-200 text-center py-2 px-3 rounded-sm font-mono text-sm text-black tracking-widest mb-3">{pedido.trackingCode}</div>
                        <a href={`https://rastreamento.correios.com.br/app/index.php?codigo=${pedido.trackingCode}`} target="_blank" className="w-full text-center bg-black text-white font-bold uppercase py-2 text-xs tracking-wider rounded-sm hover:bg-[#F59E0B] hover:text-black transition-colors block">Rastrear Correios</a>
                      </>
                    )}

                    {pedido.status === 'ENTREGUE' && (
                      <>
                        <p className="text-sm text-green-600 font-bold text-center sm:text-left mb-3">Pedido Entregue! ✓</p>
                        <a href={`https://wa.me/${WPP_NUMBER}?text=Olá Nicolas, tive um problema com o pedido ${pedido.id.substring(0,8).toUpperCase()}`} target="_blank" className="w-full text-center border-2 border-black text-black font-bold uppercase py-2 text-xs tracking-wider rounded-sm hover:bg-black hover:text-white transition-colors block">Relatar um Problema</a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
