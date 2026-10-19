import { PackageX } from 'lucide-react';

export default function PedidosAdmin() {
  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-anton uppercase text-zinc-900 tracking-wide">Pedidos e Entregas</h1>
        <p className="text-zinc-500 text-sm mt-1 font-medium">Faça a gestão dos envios e acompanhe as vendas.</p>
      </header>
      
      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-16 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-400 mb-4">
          <PackageX size={32} />
        </div>
        <h3 className="text-lg font-bold text-zinc-900 mb-2">Sem pedidos no momento</h3>
        <p className="text-zinc-500 text-sm max-w-md">Assim que a sua loja B.SKW for divulgada e receber a primeira compra, ela aparecerá aqui para ser processada.</p>
      </div>
    </div>
  );
}
