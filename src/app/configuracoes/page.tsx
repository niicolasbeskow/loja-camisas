import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ConfiguracoesPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-[#000000] text-white py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8 border-b border-zinc-800 pb-4">
          <Link href="/perfil" className="text-zinc-500 hover:text-[#F59E0B] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </Link>
          <h1 className="text-4xl md:text-5xl font-anton uppercase tracking-wide">
            Configurações
          </h1>
        </div>

        <div className="bg-[#000000] border border-zinc-800 p-8 rounded-md shadow-2xl">
          <h2 className="text-2xl font-anton uppercase mb-6 text-white flex items-center gap-2">
            <span className="w-2 h-6 bg-[#F59E0B] inline-block"></span>
            Dados Pessoais
          </h2>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-400">Nome Completo</label>
                <input type="text" defaultValue={session.user?.name || ""} className="bg-zinc-900 border border-zinc-800 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#F59E0B] transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-400">E-mail</label>
                <input type="email" defaultValue={session.user?.email || ""} disabled className="bg-zinc-950 border border-zinc-900 rounded-md px-4 py-3 text-zinc-600 cursor-not-allowed" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-400">CPF</label>
                <input type="text" placeholder="000.000.000-00" className="bg-zinc-900 border border-zinc-800 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#F59E0B] transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-400">Telefone</label>
                <input type="text" placeholder="(00) 00000-0000" className="bg-zinc-900 border border-zinc-800 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#F59E0B] transition-colors" />
              </div>
            </div>
            <div className="pt-6 border-t border-zinc-800 flex justify-end gap-4 mt-8">
              <Link href="/perfil" className="px-6 py-3 rounded-md border border-zinc-800 text-zinc-300 hover:bg-zinc-900 transition-colors font-medium">Cancelar</Link>
              <button type="button" className="px-8 py-3 rounded-md bg-[#F59E0B] text-[#000000] font-bold uppercase hover:bg-amber-400 transition-colors">Salvar Alterações</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}