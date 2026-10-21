import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ShopByCategory() {
  return (
    <section className="bg-white pt-8 pb-8 md:pt-12 md:pb-12 border-b border-zinc-200">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          
          {/* KITS */}
          <Link href="/categoria/kits" className="group relative aspect-square md:aspect-[4/5] bg-zinc-900 overflow-hidden flex flex-col justify-end p-4 md:p-6 cursor-pointer rounded-sm">
            <div className="absolute inset-0 bg-zinc-800 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/files/cat-kits.jpg')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>
            <div className="relative z-20">
              <h3 className="text-white font-anton text-xl md:text-3xl uppercase tracking-wide mb-1">Kits</h3>
              <span className="text-white/80 text-[9px] md:text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 group-hover:text-white transition-colors">
                Shop Now <ArrowRight size={12} />
              </span>
            </div>
          </Link>

          {/* OVERSIZED */}
          <Link href="/categoria/camiseta-oversized" className="group relative aspect-square md:aspect-[4/5] bg-zinc-900 overflow-hidden flex flex-col justify-end p-4 md:p-6 cursor-pointer rounded-sm">
            <div className="absolute inset-0 bg-zinc-800 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/files/cat-oversized.jpg')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>
            <div className="relative z-20">
              <h3 className="text-white font-anton text-xl md:text-3xl uppercase tracking-wide mb-1">Oversized</h3>
              <span className="text-white/80 text-[9px] md:text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 group-hover:text-white transition-colors">
                Shop Now <ArrowRight size={12} />
              </span>
            </div>
          </Link>

          {/* MOLETONS */}
          <Link href="/categoria/moletom" className="group relative aspect-square md:aspect-[4/5] bg-zinc-900 overflow-hidden flex flex-col justify-end p-4 md:p-6 cursor-pointer rounded-sm">
            <div className="absolute inset-0 bg-zinc-800 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/files/cat-moletom.jpg')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>
            <div className="relative z-20">
              <h3 className="text-white font-anton text-xl md:text-3xl uppercase tracking-wide mb-1">Moletons</h3>
              <span className="text-white/80 text-[9px] md:text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 group-hover:text-white transition-colors">
                Shop Now <ArrowRight size={12} />
              </span>
            </div>
          </Link>

          {/* COLLABS */}
          <Link href="/categoria/collab" className="group relative aspect-square md:aspect-[4/5] bg-zinc-900 overflow-hidden flex flex-col justify-end p-4 md:p-6 cursor-pointer rounded-sm">
            <div className="absolute inset-0 bg-zinc-950 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/files/cat-collab.jpg')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>
            <div className="relative z-20">
              <h3 className="text-white font-anton text-xl md:text-3xl uppercase tracking-wide mb-1">Collabs</h3>
              <span className="text-white/80 text-[9px] md:text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 group-hover:text-white transition-colors">
                Em Breve <ArrowRight size={12} />
              </span>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}
