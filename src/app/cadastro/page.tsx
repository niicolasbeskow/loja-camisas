import Link from 'next/link';

export default function CadastroPage() {
  return (
    <main className="min-h-screen bg-[#000000] text-white flex flex-col items-center justify-center py-20 px-4">

      {/* Logo */}
      <div className="mb-8">
        <Link href="/">
          <img
            src="/files/BSKW_horizontal_cor-branco-ambar.png"
            alt="B.SKW"
            className="h-12 w-auto object-contain"
          />
        </Link>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-md bg-[#000000] border border-zinc-800 p-8 rounded-md shadow-2xl">
        <h1 className="text-3xl md:text-4xl font-anton uppercase text-center mb-2 tracking-wide">Cadastro</h1>
        <p className="text-zinc-400 text-sm text-center mb-8">Crie sua conta na armadura do streetwear.</p>

        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-300" htmlFor="nome">Nome completo</label>
            <input type="text" id="nome" className="bg-zinc-900 border border-zinc-800 rounded-md px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#F59E0B] focus:border-[#F59E0B] transition-colors" placeholder="Seu nome completo" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-300" htmlFor="email">E-mail</label>
            <input type="email" id="email" className="bg-zinc-900 border border-zinc-800 rounded-md px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#F59E0B] focus:border-[#F59E0B] transition-colors" placeholder="seu@email.com" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-300" htmlFor="senha">Senha</label>
            <input type="password" id="senha" className="bg-zinc-900 border border-zinc-800 rounded-md px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#F59E0B] focus:border-[#F59E0B] transition-colors" placeholder="••••••••" />
          </div>

          <button type="submit" className="mt-4 w-full bg-[#F59E0B] text-[#000000] font-bold uppercase py-4 rounded-md hover:bg-amber-400 transition-colors">Cadastrar</button>
        </form>

        <p className="mt-8 text-center text-sm text-zinc-400">
          Já tem uma conta? <Link href="/login" className="text-[#F59E0B] hover:underline">Faça login</Link>
        </p>
      </div>
    </main>
  );
}