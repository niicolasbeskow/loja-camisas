"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X, Trash2, Plus, Minus, ArrowRight, Truck, Flame, Search, ShieldCheck } from 'lucide-react';

export interface ItemCarrinho {
  sku: string; nome: string; preco: number; tamanho: string; cor: string; quantidade: number; imagem?: string;
}

const META_FRETE_GRATIS = 299.0;
const linksNavegacao = [
  { nome: 'Drop // Todos', href: '/produtos' },
  { nome: 'Oversized', href: '/categoria/camiseta-oversized' },
  { nome: 'Suedine 250g', href: '/categoria/camiseta-suedine' },
  { nome: 'Kits', href: '/categoria/kits' },
  { nome: 'Moletons', href: '/categoria/moletom' }
];

export default function Header() {
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);
  const [buscaAberta, setBuscaAberta] = useState(false);
  const [termoBusca, setTermoBusca] = useState('');
  const [itens, setItens] = useState<ItemCarrinho[]>([]);

  const sincronizarCarrinho = () => {
    if (typeof window === 'undefined') return;
    try {
      const bruto: ItemCarrinho[] = JSON.parse(localStorage.getItem('bskw_carrinho') || '[]');
      const agrupado: ItemCarrinho[] = [];
      bruto.forEach((item) => {
        const idx = agrupado.findIndex((i) => i.sku === item.sku && i.tamanho === item.tamanho);
        if (idx >= 0) agrupado[idx].quantidade += item.quantidade || 1;
        else agrupado.push({ ...item, quantidade: item.quantidade || 1 });
      });
      setItens(agrupado);
    } catch (e) {}
  };

  useEffect(() => {
    sincronizarCarrinho();
    const handleStorageUpdate = () => {
      sincronizarCarrinho();
      setCarrinhoAberto(true);
    };
    window.addEventListener('storage', handleStorageUpdate);
    return () => window.removeEventListener('storage', handleStorageUpdate);
  }, []);

  const salvarItensStorage = (novosItens: ItemCarrinho[]) => {
    setItens(novosItens);
    if (typeof window !== 'undefined') localStorage.setItem('bskw_carrinho', JSON.stringify(novosItens));
  };

  const alterarQuantidade = (sku: string, tamanho: string, delta: number) => {
    const atualizados = itens.map((item) => {
      if (item.sku === sku && item.tamanho === tamanho) return { ...item, quantidade: item.quantidade + delta };
      return item;
    }).filter((item) => item.quantidade > 0);
    salvarItensStorage(atualizados);
  };

  const removerItem = (sku: string, tamanho: string) => {
    salvarItensStorage(itens.filter((item) => !(item.sku === sku && item.tamanho === tamanho)));
  };

  const totalPecas = itens.reduce((acc, item) => acc + item.quantidade, 0);
  const subtotalBruto = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  const percentualDescontoKit = totalPecas >= 3 ? 0.155 : totalPecas === 2 ? 0.11 : 0;
  const descontoKitValor = subtotalBruto * percentualDescontoKit;
  const subtotalFinal = subtotalBruto - descontoKitValor;
  const faltaParaFrete = Math.max(0, META_FRETE_GRATIS - subtotalFinal);
  const progressoFrete = Math.min(100, (subtotalFinal / META_FRETE_GRATIS) * 100);

  return (
    <>
      <div className="bg-black text-white border-b border-zinc-800 py-2 px-4 text-center font-mono text-[10px] md:text-[11px] uppercase tracking-widest">
        <div className="max-w-[1400px] mx-auto flex items-center justify-center md:justify-between">
          <span className="hidden md:inline text-zinc-400">B.SKW® // HEAVYWEIGHT STREETWEAR</span>
          <span className="font-bold text-[#a3e635]">FRETE GRÁTIS ACIMA DE R$ 299 • DESCONTO PROGRESSIVO NOS KITS 2 E 3</span>
          <span className="hidden md:inline text-zinc-400">ENVIO PARA TODO O BRASIL</span>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200 font-outfit">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between gap-4">
          <button type="button" onClick={() => setMenuMobileAberto(true)} className="lg:hidden p-2 -ml-2 text-zinc-900 hover:bg-zinc-100 active:scale-95 transition-all">
            <Menu size={22} />
          </button>

          <Link href="/" className="font-anton text-3xl md:text-4xl tracking-wider uppercase text-zinc-900 leading-none select-none">
            B.SKW<span className="text-xs font-mono align-top ml-0.5 text-zinc-400">®</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {linksNavegacao.map((link) => (
              <Link key={link.href} href={link.href} className="text-xs font-bold uppercase tracking-widest text-zinc-600 hover:text-black transition-colors py-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-black hover:after:w-full after:transition-all">
                {link.nome}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <button type="button" onClick={() => setBuscaAberta(!buscaAberta)} className="p-2.5 text-zinc-900 hover:bg-zinc-100 active:scale-95 transition-all">
              <Search size={19} />
            </button>
            <button type="button" onClick={() => setCarrinhoAberto(true)} className="relative flex items-center gap-2.5 bg-black text-white px-3.5 py-2.5 md:px-4 md:py-2.5 rounded-none hover:bg-zinc-800 active:scale-95 transition-all">
              <ShoppingBag size={16} />
              <span className="font-mono text-xs font-bold">[{totalPecas}]</span>
            </button>
          </div>
        </div>

        {buscaAberta && (
          <div className="border-t border-zinc-200 bg-[#FAFAFA] px-4 md:px-6 py-3 animate-in slide-in-from-top-2 duration-150">
            <div className="max-w-[1400px] mx-auto flex items-center gap-3">
              <Search size={16} className="text-zinc-400 shrink-0" />
              <input type="text" value={termoBusca} onChange={(e) => setTermoBusca(e.target.value)} placeholder="Buscar por modelagem..." className="w-full bg-transparent text-base md:text-xs font-mono uppercase tracking-wider text-zinc-900 outline-none placeholder:text-zinc-400" autoFocus />
              <button type="button" onClick={() => setBuscaAberta(false)} className="text-zinc-400 hover:text-black p-1"><X size={18} /></button>
            </div>
          </div>
        )}
      </header>

      {menuMobileAberto && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200" onClick={() => setMenuMobileAberto(false)} />
          <div className="relative z-10 w-[85%] max-w-xs bg-white h-full flex flex-col justify-between border-r border-zinc-900 animate-in slide-in-from-left duration-200 font-outfit">
            <div>
              <div className="p-5 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
                <span className="font-anton text-2xl uppercase tracking-wider">B.SKW // MENU</span>
                <button onClick={() => setMenuMobileAberto(false)} className="p-1.5 text-zinc-500 hover:text-black"><X size={22} /></button>
              </div>
              <nav className="flex flex-col divide-y divide-zinc-100">
                {linksNavegacao.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setMenuMobileAberto(false)} className="p-4 text-xs font-bold uppercase tracking-widest text-zinc-900 hover:bg-zinc-50 flex items-center justify-between">
                    {link.nome} <ArrowRight size={14} className="text-zinc-400" />
                  </Link>
                ))}
              </nav>
            </div>
            <div className="p-5 border-t border-zinc-200 bg-zinc-950 text-white">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#a3e635] block mb-1">DICA DE SETUP</span>
              <p className="text-xs text-zinc-300 leading-relaxed">Adicione 3 peças no carrinho para destravar automaticamente o maior desconto do catálogo.</p>
            </div>
          </div>
        </div>
      )}

      {carrinhoAberto && (
        <div className="fixed inset-0 z-50 flex justify-end font-outfit">
          <div className="fixed inset-0 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200" onClick={() => setCarrinhoAberto(false)} />
          <div className="relative z-10 w-full max-w-md bg-white h-full flex flex-col justify-between border-l border-zinc-900 shadow-2xl animate-in slide-in-from-right duration-200">
            <div>
              <div className="p-5 border-b border-zinc-200 flex items-center justify-between bg-white">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag size={18} className="text-black" />
                  <h2 className="font-anton text-2xl uppercase tracking-wide text-zinc-900">Teu Setup</h2>
                  <span className="font-mono text-xs font-bold bg-zinc-100 border border-zinc-300 px-2 py-0.5">{totalPecas} {totalPecas === 1 ? 'PEÇA' : 'PEÇAS'}</span>
                </div>
                <button type="button" onClick={() => setCarrinhoAberto(false)} className="p-1.5 text-zinc-400 hover:text-black transition-colors"><X size={22} /></button>
              </div>

              <div className="px-5 py-3.5 bg-zinc-950 text-white border-b border-zinc-800">
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider mb-2">
                  {faltaParaFrete === 0 ? (
                    <span className="text-[#a3e635] font-bold flex items-center gap-1.5"><Truck size={14} /> Frete Grátis Desbloqueado!</span>
                  ) : (
                    <span className="text-zinc-300">Faltam <strong className="text-white">R$ {faltaParaFrete.toFixed(2).replace('.', ',')}</strong> p/ <strong className="text-[#a3e635]">Frete Grátis</strong></span>
                  )}
                  <span className="text-zinc-400">{Math.round(progressoFrete)}%</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-800 overflow-hidden">
                  <div className="h-full bg-[#a3e635] transition-all duration-500 ease-out" style={{ width: `${progressoFrete}%` }} />
                </div>
              </div>

              <div className="px-5 py-2.5 bg-zinc-100 border-b border-zinc-200 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-zinc-800">
                  <Flame size={14} className={totalPecas >= 2 ? "text-black fill-[#a3e635]" : "text-zinc-400"} />
                  {totalPecas === 0 && <span>Adicione 2+ peças para ativar desconto de Kit</span>}
                  {totalPecas === 1 && <span>Adicione <strong className="underline">mais 1 peça</strong> p/ ativar o <strong>Kit 2 (-11%)</strong></span>}
                  {totalPecas === 2 && <span>Kit 2 Ativo! Adicione <strong className="underline">+1 peça</strong> p/ o <strong>Kit 3 (-15%)</strong></span>}
                  {totalPecas >= 3 && <span className="font-bold text-black">Desconto Máximo de Kit 3 Ativado!</span>}
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 divide-y divide-zinc-200 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-zinc-300">
              {itens.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 bg-zinc-100 border border-zinc-200 flex items-center justify-center mb-4"><ShoppingBag size={24} className="text-zinc-400" /></div>
                  <h3 className="font-anton text-xl uppercase tracking-wide text-zinc-900 mb-1">Teu carrinho está vazio</h3>
                  <p className="text-xs text-zinc-500 max-w-[240px] mb-6">Comece a montar o seu kit com nossas camisetas de alta gramatura.</p>
                  <button type="button" onClick={() => setCarrinhoAberto(false)} className="bg-black text-white px-6 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 active:scale-95 transition-all rounded-none">Explorar Catálogo</button>
                </div>
              ) : (
                itens.map((item) => (
                  <div key={`${item.sku}-${item.tamanho}`} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                    <div className="w-20 h-24 bg-zinc-100 border border-zinc-200 shrink-0 flex items-center justify-center relative overflow-hidden">
                      {item.imagem ? <img src={item.imagem} alt={item.nome} className="w-full h-full object-cover" /> : <span className="font-anton text-xs text-zinc-400 uppercase tracking-widest">B.SKW</span>}
                      <span className="absolute bottom-1 right-1 bg-black text-white font-mono text-[9px] font-bold px-1.5 py-0.5">{item.tamanho}</span>
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-900 line-clamp-1">{item.nome}</h4>
                          <button type="button" onClick={() => removerItem(item.sku, item.tamanho)} className="text-zinc-400 hover:text-red-600 transition-colors p-0.5"><Trash2 size={14} /></button>
                        </div>
                        <p className="font-mono text-[10px] uppercase text-zinc-500 mt-0.5">Cor: {item.cor} • Tam: {item.tamanho}</p>
                      </div>

                      <div className="flex items-end justify-between mt-3">
                        <div className="flex items-center border border-zinc-300 bg-white">
                          <button type="button" onClick={() => alterarQuantidade(item.sku, item.tamanho, -1)} className="w-7 h-7 flex items-center justify-center text-zinc-600 hover:bg-zinc-100 active:scale-90"><Minus size={12} /></button>
                          <span className="w-8 text-center font-mono text-xs font-bold text-zinc-900">{item.quantidade}</span>
                          <button type="button" onClick={() => alterarQuantidade(item.sku, item.tamanho, 1)} className="w-7 h-7 flex items-center justify-center text-zinc-600 hover:bg-zinc-100 active:scale-90"><Plus size={12} /></button>
                        </div>
                        <div className="text-right">
                          <span className="font-anton text-base tracking-wide text-zinc-900">R$ {(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {itens.length > 0 && (
              <div className="p-5 bg-[#FAFAFA] border-t border-zinc-200">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs text-zinc-600">
                    <span className="uppercase tracking-wider font-medium">Subtotal ({totalPecas} un)</span>
                    <span className="font-mono">R$ {subtotalBruto.toFixed(2).replace('.', ',')}</span>
                  </div>
                  {descontoKitValor > 0 && (
                    <div className="flex justify-between text-xs font-bold text-zinc-900 bg-[#a3e635]/30 px-2 py-1 border border-[#a3e635]">
                      <span className="font-mono uppercase text-[11px]">Desconto Prog. (Kit {totalPecas >= 3 ? '3+' : '2'})</span>
                      <span className="font-mono">- R$ {descontoKitValor.toFixed(2).replace('.', ',')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs text-zinc-600">
                    <span className="uppercase tracking-wider font-medium">Entrega</span>
                    <span className="font-mono font-bold uppercase text-zinc-900">{faltaParaFrete === 0 ? 'GRÁTIS' : 'No Checkout'}</span>
                  </div>
                  <div className="pt-3 border-t border-zinc-200 flex justify-between items-baseline">
                    <span className="font-bold text-xs uppercase tracking-widest text-zinc-900">Total Estimado</span>
                    <div className="text-right">
                      <span className="font-anton text-2xl tracking-wide text-zinc-900 block leading-none">R$ {subtotalFinal.toFixed(2).replace('.', ',')}</span>
                      <span className="font-mono text-[10px] text-zinc-500 uppercase">ou 3x R$ {(subtotalFinal / 3).toFixed(2).replace('.', ',')} s/ j</span>
                    </div>
                  </div>
                </div>

                <Link href="/checkout" onClick={() => setCarrinhoAberto(false)} className="w-full bg-black text-white h-14 flex items-center justify-center gap-3 font-bold text-xs uppercase tracking-widest hover:bg-zinc-800 active:scale-[0.98] transition-all rounded-none">
                  Finalizar Compra <ArrowRight size={16} />
                </Link>

                <div className="mt-3 flex items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                  <ShieldCheck size={13} className="text-zinc-600" /> Checkout Seguro • PIX
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}
