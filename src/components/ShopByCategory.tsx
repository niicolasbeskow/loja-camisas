import Link from 'next/link';
import { ArrowRight, Lock } from 'lucide-react';

export default function ShopByCategory() {
  return (
    <section className="bg-[#FAFAFA] pt-8 pb-8 md:pt-12 md:pb-12 border-b border-zinc-200">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          
          <Link href="/categoria/kits" className="group relative aspect-square md:aspect-[4/5] bg-zinc-900 overflow-hidden flex flex-col justify-end p-4 md:p-6 cursor-pointer rounded-none">
            <div className="absolute inset-0 bg-zinc-800 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/files/cat-kits.jpg')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>
            <div className="relative z-20">
              <h3 className="text-white font-anton text-xl md:text-3xl uppercase tracking-wide mb-1">Kits</h3>
              <span className="text-white/80 text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 group-hover:text-white transition-colors">
                Explorar <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1.5" />
              </span>
            </div>
          </Link>

          <Link href="/categoria/camiseta-oversized" className="group relative aspect-square md:aspect-[4/5] bg-zinc-900 overflow-hidden flex flex-col justify-end p-4 md:p-6 cursor-pointer rounded-none">
            <div className="absolute inset-0 bg-zinc-800 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/files/cat-oversized.jpg')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>
            <div className="relative z-20">
              <h3 className="text-white font-anton text-xl md:text-3xl uppercase tracking-wide mb-1">Oversized</h3>
              <span className="text-white/80 text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 group-hover:text-white transition-colors">
                Explorar <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1.5" />
              </span>
            </div>
          </Link>

          <Link href="/categoria/moletom" className="group relative aspect-square md:aspect-[4/5] bg-zinc-900 overflow-hidden flex flex-col justify-end p-4 md:p-6 cursor-pointer rounded-none">
            <div className="absolute inset-0 bg-zinc-800 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/files/cat-moletom.jpg')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>
            <div className="relative z-20">
              <h3 className="text-white font-anton text-xl md:text-3xl uppercase tracking-wide mb-1">Moletons</h3>
              <span className="text-white/80 text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 group-hover:text-white transition-colors">
                Explorar <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1.5" />
              </span>
            </div>
          </Link>

          {/* COLLABS: Grayscale + Lock/Drop Alert */}
          <div className="group relative aspect-square md:aspect-[4/5] bg-zinc-900 overflow-hidden flex flex-col justify-end p-4 md:p-6 rounded-none cursor-default">
            <div className="absolute inset-0 bg-zinc-950 bg-cover bg-center transition-transform duration-700 grayscale opacity-50" style={{ backgroundImage: "url('/files/cat-collab.jpg')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/30 z-10"></div>
            
            <div className="absolute top-4 right-4 z-20">
              <div className="bg-black text-white px-2 py-1 md:px-3 md:py-1.5 text-[9px] font-mono uppercase tracking-widest flex items-center gap-1.5 border border-zinc-800">
                <Lock size={10} /> Drop Locked
              </div>
            </div>

            <div className="relative z-20">
              <h3 className="text-zinc-400 font-anton text-xl md:text-3xl uppercase tracking-wide mb-2 line-through decoration-zinc-700">Collabs</h3>
              <button className="w-full bg-white text-black h-10 md:h-12 flex items-center justify-center font-bold text-[10px] md:text-[11px] uppercase tracking-widest hover:bg-zinc-200 transition-colors active:scale-[0.98]">
                Cadastre-se p/ o Drop
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
