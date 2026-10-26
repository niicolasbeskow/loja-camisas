import Link from 'next/link';

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
            <div className="flex items-center gap-6 mt-6">
              {/* Instagram */}
              <a href="https://instagram.com/nicolasbeskow" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#F59E0B] transition-colors" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>

              {/* YouTube */}
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#F59E0B] transition-colors" aria-label="YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                </svg>
              </a>

              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#F59E0B] transition-colors" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Coluna 2 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-anton text-xl uppercase tracking-wide mb-2">Mais sobre a B.SKW</h4>
            <Link href="/influenciador" className="text-zinc-400 hover:text-[#F59E0B] transition-colors text-sm">Seja um Influenciador</Link>
            <Link href="/produtos" className="text-zinc-400 hover:text-[#F59E0B] transition-colors text-sm">Nossos Produtos</Link>
            <Link href="/quem-somos" className="text-zinc-400 hover:text-[#F59E0B] transition-colors text-sm">Quem Somos</Link>
          </div>

          {/* Coluna 3 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-anton text-xl uppercase tracking-wide mb-2">Atendimento</h4>
            <Link href="/trocas" className="text-zinc-400 hover:text-[#F59E0B] transition-colors text-sm">Trocas e Devoluções</Link>
            <Link href="/faq" className="text-zinc-400 hover:text-[#F59E0B] transition-colors text-sm">Dúvidas Frequentes</Link>
            <Link href="/rastreio" className="text-zinc-400 hover:text-[#F59E0B] transition-colors text-sm">Rastreie seu Pedido</Link>
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
      </div>
    </footer>
  );
}