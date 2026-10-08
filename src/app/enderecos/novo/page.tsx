import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function NovoEnderecoPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-[#000000] text-white py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-3xl mx-auto">
        {/* Cabeçalho */}
        <div className="flex items-center gap-4 mb-8 border-b border-zinc-800 pb-4">
          <Link href="/perfil" className="text-zinc-500 hover:text-[#F59E0B] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </Link>
          <h1 className="text-4xl md:text-5xl font-anton uppercase tracking-wide">
            Novo Endereço
          </h1>
        </div>

        <div className="bg-[#000000] border border-zinc-800 p-8 rounded-md shadow-2xl">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-400">CEP</label>
                <input type="text" placeholder="00000-000" className="bg-zinc-900 border border-zinc-800 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#F59E0B] transition-colors" />
              </div>
              <div className="hidden md:block"></div> {/* Espaçador */}

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-medium text-zinc-400">Rua / Logradouro</label>
                <input type="text" placeholder="Ex: Avenida Paulista" className="bg-zinc-900 border border-zinc-800 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#F59E0B] transition-colors" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-400">Número</label>
                <input type="text" placeholder="Ex: 100" className="bg-zinc-900 border border-zinc-800 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#F59E0B] transition-colors" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-400">Complemento</label>
                <input type="text" placeholder="Apto, Bloco, etc. (Opcional)" className="bg-zinc-900 border border-zinc-800 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#F59E0B] transition-colors" />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-medium text-zinc-400">Bairro</label>
                <input type="text" placeholder="Seu bairro" className="bg-zinc-900 border border-zinc-800 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#F59E0B] transition-colors" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-400">Cidade</label>
                <input type="text" placeholder="Sua cidade" className="bg-zinc-900 border border-zinc-800 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#F59E0B] transition-colors" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-400">Estado</label>
                <select className="bg-zinc-900 border border-zinc-800 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#F59E0B] transition-colors">
                  <option value="">Selecione...</option>
                  <option value="SC">Santa Catarina (SC)</option>
                  <option value="SP">São Paulo (SP)</option>
                  <option value="RJ">Rio de Janeiro (RJ)</option>
                  <option value="PR">Paraná (PR)</option>
                  <option value="RS">Rio Grande do Sul (RS)</option>
                  <option value="MG">Minas Gerais (MG)</option>
                </select>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800 flex justify-end gap-4 mt-8">
              <Link href="/perfil" className="px-6 py-3 rounded-md border border-zinc-800 text-zinc-300 hover:bg-zinc-900 transition-colors font-medium">Cancelar</Link>
              <button type="button" className="px-8 py-3 rounded-md bg-[#F59E0B] text-[#000000] font-bold uppercase hover:bg-amber-400 transition-colors">Salvar Endereço</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}