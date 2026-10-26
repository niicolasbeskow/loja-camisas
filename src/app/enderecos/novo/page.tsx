import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import EnderecoForm from "@/components/EnderecoForm";

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
          <EnderecoForm/>
        </div>
      </div>
    </main>
  );
}