import Link from 'next/link';
import { Search, User, ShoppingCart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#000000] text-white pt-16 pb-8 border-t border-zinc-900">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">

          {/* COLUNA 1: Logo e Redes Sociais */}
          <div className="flex flex-col items-start">
            <img
              src="/files/BSKW_logos_PNG/BSKW_horizontal_mono-claro.png"
              alt="B.SKW"
              className="w-48 mb-6 object-contain"
            />
            <div className="flex gap-4">
              <a href="https://instagram.com/nicolasbeskow" target="_blank" rel="noreferrer" className="text-white hover:text-[#F59E0B] transition-colors">
                <Search className="h-6 w-6" />
              </a>
              <a href="#" className="text-white hover:text-[#F59E0B] transition-colors">
                <User className="h-6 w-6" />
              </a>
              <a href="#" className="text-white hover:text-[#F59E0B] transition-colors">
                <ShoppingCart className="h-6 w-6" /> {/* Placeholder TikTok */}
              </a>
            </div>
          </div>

          {/* COLUNA 2: Mais sobre a Marca */}
          <div className="flex flex-col">
            <h3 className="text-lg font-bold mb-6 font-anton tracking-wide">MAIS SOBRE A B.SKW</h3>
            <div className="flex flex-col gap-3 text-zinc-400">
              <Link href="/influenciador" className="hover:text-[#F59E0B] transition-colors">Seja um Influenciador</Link>
              <Link href="#" className="hover:text-[#F59E0B] transition-colors">Nossos Produtos</Link>
              <Link href="#" className="hover:text-[#F59E0B] transition-colors">Quem Somos</Link>
            </div>
          </div>

          {/* COLUNA 3: Atendimento */}
          <div className="flex flex-col">
            <h3 className="text-lg font-bold mb-6 font-anton tracking-wide">ATENDIMENTO</h3>
            <div className="flex flex-col gap-3 text-zinc-400">
              <Link href="#" className="hover:text-[#F59E0B] transition-colors">Trocas e Devoluções</Link>
              <Link href="#" className="hover:text-[#F59E0B] transition-colors">Dúvidas Frequentes</Link>
              <Link href="#" className="hover:text-[#F59E0B] transition-colors">Rastreie seu Pedido</Link>
            </div>
          </div>

          {/* COLUNA 4: Contato */}
          <div className="flex flex-col">
            <h3 className="text-lg font-bold mb-6 font-anton tracking-wide">CONTATO DIRETO</h3>
            <div className="flex flex-col gap-3 text-zinc-400">
              <a href="https://wa.me/5548991243958" target="_blank" rel="noreferrer" className="hover:text-[#F59E0B] transition-colors inline-block underline underline-offset-4">
                Enviar WhatsApp
              </a>
              <a href="mailto:nicolas.operacional@gmail.com" className="hover:text-[#F59E0B] transition-colors inline-block underline underline-offset-4">
                nicolas.operacional@gmail.com
              </a>
            </div>
          </div>

        </div>

        {/* RODAPÉ INFERIOR: Copyright e Links Legais */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p>© 2026 B.SKW Store. Todos os direitos reservados.</p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-white transition-colors">Política de Privacidade</Link>
              <Link href="#" className="hover:text-white transition-colors">Política de Reembolso</Link>
              <Link href="#" className="hover:text-white transition-colors">Termos de Serviço</Link>
            </div>
          </div>
          <div className="flex gap-2">
            {/* Placeholders de Pagamento - podem ser trocados por SVGs dps */}
            <span className="px-2 py-1 bg-zinc-900 rounded font-bold text-[10px]">PIX</span>
            <span className="px-2 py-1 bg-zinc-900 rounded font-bold text-[10px]">VISA</span>
            <span className="px-2 py-1 bg-zinc-900 rounded font-bold text-[10px]">MASTER</span>
          </div>
        </div>
      </div>
    </footer>
  );
}