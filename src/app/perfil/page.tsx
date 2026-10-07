import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function PerfilPage() {
  // Tenta ler a sessão; se falhar ou se quiser usar a configuração específica, importe o authOptions
  const session = await getServerSession();

  // Proteção de rota: se não houver sessão, expulsa para o login
  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-[#000000] text-white py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-anton uppercase mb-8 tracking-wide border-b border-zinc-800 pb-4">
          Minha Conta
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Coluna Esquerda: Cartão de Perfil */}
          <div className="bg-[#000000] border border-zinc-800 p-6 rounded-md col-span-1 h-fit shadow-2xl">
            <div className="flex flex-col items-center text-center">
              {session.user?.image ? (
                <img
                  src={session.user.image}
                  alt="Avatar"
                  className="w-28 h-28 rounded-full border-2 border-[#F59E0B] mb-4 object-cover"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-zinc-900 flex items-center justify-center border-2 border-zinc-700 mb-4">
                  <span className="text-4xl font-anton text-zinc-500">
                    {session.user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
              )}
              <h2 className="text-2xl font-bold tracking-tight">{session.user?.name}</h2>
              <p className="text-zinc-400 text-sm mb-6">{session.user?.email}</p>

              <button className="w-full bg-zinc-900 border border-zinc-800 hover:border-[#F59E0B] text-white py-3 rounded transition-colors text-sm uppercase font-bold tracking-wider">
                Editar Dados
              </button>
            </div>
          </div>

          {/* Coluna Direita: Pedidos e Endereços */}
          <div className="col-span-1 lg:col-span-2 space-y-6">

            {/* Meus Pedidos */}
            <div className="bg-[#000000] border border-zinc-800 p-6 rounded-md shadow-2xl">
              <h3 className="text-2xl font-anton uppercase mb-6 text-white flex items-center gap-2">
                <span className="w-2 h-6 bg-[#F59E0B] inline-block"></span>
                Meus Pedidos
              </h3>
              <div className="border border-dashed border-zinc-800 rounded-md p-10 flex flex-col items-center justify-center text-center bg-zinc-950/30">
                <p className="text-zinc-500 mb-4">Você ainda não forjou nenhuma armadura.</p>
                <Link
                  href="/"
                  className="bg-[#F59E0B] text-[#000000] font-bold uppercase py-3 px-8 rounded hover:bg-amber-400 transition-colors"
                >
                  Ir para a Loja
                </Link>
              </div>
            </div>

            {/* Endereços */}
            <div className="bg-[#000000] border border-zinc-800 p-6 rounded-md shadow-2xl">
              <h3 className="text-2xl font-anton uppercase mb-6 text-white flex items-center gap-2">
                <span className="w-2 h-6 bg-zinc-700 inline-block"></span>
                Endereços de Entrega
              </h3>
              <p className="text-zinc-500 text-sm mb-4">Nenhum endereço cadastrado.</p>
              <button className="text-[#F59E0B] hover:text-amber-400 transition-colors text-sm font-bold uppercase tracking-wide">
                + Adicionar novo endereço
              </button>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}