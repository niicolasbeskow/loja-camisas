"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Menu,
  X,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Truck,
  Flame,
  Search,
  ShieldCheck
} from 'lucide-react';

export interface ItemCarrinho {
  sku: string;
  nome: string;
  preco: number;
  tamanho: string;
  cor: string;
  quantidade: number;
  imagem?: string;
}

const META_FRETE_GRATIS = 299.0;

const linksNavegacao = [
  { nome: 'Edições', href: '/' },
  { nome: 'Heavy Suedine', href: '/categoria/camiseta-suedine' },
  { nome: 'Oversized', href: '/categoria/camiseta-oversized' },
  { nome: 'Boxy', href: '/categoria/camiseta-boxy' },
  { nome: 'Moletons', href: '/categoria/moletom' },
  { nome: 'Feminino', href: '/categoria/feminino' }
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
        const idx = agrupado.findIndex(
          (i) => i.sku === item.sku && i.tamanho === item.tamanho
        );
        if (idx >= 0) {
          agrupado[idx].quantidade += item.quantidade || 1;
        } else {
          agrupado.push({ ...item, quantidade: item.quantidade || 1 });
        }
      });

      setItens(agrupado);
    } catch (e) {
      console.error(e);
    }
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
    if (typeof window !== 'undefined') {
      localStorage.setItem('bskw_carrinho', JSON.stringify(novosItens));
    }
  };

  const alterarQuantidade = (sku: string, tamanho: string, delta: number) => {
    const atualizados = itens
      .map((item) => {
        if (item.sku === sku && item.tamanho === tamanho) {
          return { ...item, quantidade: item.quantidade + delta };
        }
        return item;
      })
      .filter((item) => item.quantidade > 0);

    salvarItensStorage(atualizados);
  };

  const removerItem = (sku: string, tamanho: string) => {
    const filtrados = itens.filter(
      (item) => !(item.sku === sku && item.tamanho === tamanho)
    );
    salvarItensStorage(filtrados);
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
      {/* TOP BAR EM GRAFITE SOBRE BREU */}
      <div className="bg-[#161616] text-white border-b border-[#2a2a2a] py-2.5 px-4 font-outfit">
        <div className="max-w-[1400px] mx-auto flex items-center justify-center md:justify-between text-[12px] font-semibold uppercase tracking-[0.2em]">
          <span className="hidden md:inline text-[#9A9A9A]">
            HEAVY SUEDINE · GOLA CANELADA 3 CM
          </span>
          <span className="text-white">
            FRETE GRÁTIS ACIMA DE R$ 299 <span className="text-[#F59E0B] mx-1">·</span> KITS PROGRESSIVOS
          </span>
          <span className="hidden md:inline text-[#9A9A9A]">
            FLORIANÓPOLIS, SC
          </span>
        </div>
      </div>

      {/* NAVBAR STICKY EM BREU (#000000) */}
      <header className="sticky top-0 z-40 bg-[#000000]/95 backdrop-blur-md border-b border-[#2a2a2a] font-outfit text-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 h-20 flex items-center justify-between gap-4">
          
          {/* BOTÃO MENU MOBILE */}
          <button
            type="button"
            onClick={() => setMenuMobileAberto(true)}
            className="lg:hidden p-2 -ml-2 text-white hover:text-[#F59E0B] active:scale-95 transition-colors"
            aria-label="Abrir Menu"
          >
            <Menu size={24} />
          </button>

          {/* WORDMARK OFICIAL B.SKW (RESPEITANDO TAMANHO MÍNIMO >= 80PX) */}
          <Link
            href="/"
            aria-label="B.SKW — Ir para o início"
            className="flex items-center shrink-0"
          >
            <img
              src="/files/BSKW_principal_fundo-preto.png"
              alt="B.SKW Logo"
              className="h-9 md:h-11 w-auto object-contain"
            />
          </Link>

          {/* LINKS DE NAVEGAÇÃO DESKTOP (OUTFIT 500 13PX, TRACKING 0.12EM) */}
          <nav className="hidden lg:flex items-center gap-2">
            {linksNavegacao.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium uppercase tracking-[0.12em] text-white px-3 py-2.5 border-b-2 border-transparent hover:border-[#F59E0B] hover:text-[#F59E0B] transition-colors whitespace-nowrap"
              >
                {link.nome}
              </Link>
            ))}
          </nav>

          {/* AÇÕES: BUSCA + BOTÃO DO CARRINHO */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setBuscaAberta(!buscaAberta)}
              className="p-2.5 text-white hover:text-[#F59E0B] active:scale-95 transition-colors"
              aria-label="Buscar peças"
            >
              <Search size={20} />
            </button>

            <button
              type="button"
              onClick={() => setCarrinhoAberto(true)}
              className="relative flex items-center gap-2.5 bg-[#161616] text-white border border-[#2a2a2a] hover:border-[#F59E0B] px-4 py-2.5 rounded-none active:scale-95 transition-all"
              aria-label="Abrir carrinho"
            >
              <ShoppingBag size={17} />
              <span className="font-anton text-base tracking-wide text-[#F59E0B] leading-none">
                {totalPecas}
              </span>
            </button>
          </div>
        </div>

        {/* BARRA DE BUSCA EXPANSÍVEL */}
        {buscaAberta && (
          <div className="border-t border-[#2a2a2a] bg-[#161616] px-4 md:px-6 py-4 animate-in slide-in-from-top-2 duration-150">
            <div className="max-w-[1400px] mx-auto flex items-center gap-3">
              <Search size={18} className="text-[#9A9A9A] shrink-0" />
              <input
                type="text"
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
                placeholder="BUSCAR POR MODELAGEM (HEAVY SUEDINE, OVERSIZED, BOXY)..."
                className="w-full bg-transparent text-base md:text-[13px] font-outfit font-medium uppercase tracking-[0.12em] text-white outline-none placeholder:text-[#9A9A9A]"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setBuscaAberta(false)}
                className="text-[#9A9A9A] hover:text-white p-1"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* MENU LATERAL MOBILE */}
      {menuMobileAberto && (
        <div className="fixed inset-0 z-50 lg:hidden flex font-outfit">
          <div
            className="fixed inset-0 bg-[#000000]/85 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={() => setMenuMobileAberto(false)}
          />
          <div className="relative z-10 w-[85%] max-w-xs bg-[#000000] text-white h-full flex flex-col justify-between border-r border-[#2a2a2a] animate-in slide-in-from-left duration-200">
            <div>
              <div className="p-6 border-b border-[#2a2a2a] flex items-center justify-between bg-[#161616]">
                <span className="font-anton text-3xl uppercase tracking-normal">
                  B<span className="text-[#F59E0B]">.</span>SKW
                </span>
                <button
                  onClick={() => setMenuMobileAberto(false)}
                  className="p-1.5 text-[#9A9A9A] hover:text-white"
                  aria-label="Fechar menu"
                >
                  <X size={22} />
                </button>
              </div>
              <nav className="flex flex-col divide-y divide-[#2a2a2a]">
                {linksNavegacao.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuMobileAberto(false)}
                    className="p-5 text-[13px] font-semibold uppercase tracking-[0.2em] text-white hover:bg-[#161616] hover:text-[#F59E0B] flex items-center justify-between transition-colors"
                  >
                    {link.nome}
                    <ArrowRight size={15} className="text-[#9A9A9A]" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* BASE DO MENU COM TEXTURA CANELADA */}
            <div
              className="p-6 border-t border-[#2a2a2a]"
              style={{
                backgroundColor: '#000000',
                backgroundImage: 'repeating-linear-gradient(90deg, #1c1c1c 0 3px, transparent 3px 9px)'
              }}
            >
              <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#F59E0B] block mb-2">
                ARMADURA DE TECIDO
              </span>
              <p className="text-[13px] text-[#9A9A9A] leading-relaxed">
                Streetwear autoral em Heavy Suedine. Adicione 3 peças para ativar o valor de Kit 3.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CART DRAWER (GAVETA LATERAL EM BREU E GRAFITE) */}
      {carrinhoAberto && (
        <div className="fixed inset-0 z-50 flex justify-end font-outfit text-white">
          <div
            className="fixed inset-0 bg-[#000000]/85 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={() => setCarrinhoAberto(false)}
          />

          <div className="relative z-10 w-full max-w-md bg-[#000000] h-full flex flex-col justify-between border-l border-[#2a2a2a] shadow-2xl animate-in slide-in-from-right duration-200">
            
            {/* TOPO DA GAVETA */}
            <div>
              <div className="p-6 border-b border-[#2a2a2a] flex items-center justify-between bg-[#161616]">
                <div className="flex items-center gap-3">
                  <h2 className="font-anton text-[28px] leading-[32px] uppercase text-white">
                    Sua Edição
                  </h2>
                  <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#F59E0B] border border-[#2a2a2a] bg-[#000000] px-2.5 py-1">
                    {totalPecas} {totalPecas === 1 ? 'PEÇA' : 'PEÇAS'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setCarrinhoAberto(false)}
                  className="p-1.5 text-[#9A9A9A] hover:text-white transition-colors"
                  aria-label="Fechar carrinho"
                >
                  <X size={22} />
                </button>
              </div>

              {/* BARRA DE PROGRESSO DE FRETE GRÁTIS */}
              <div className="px-6 py-4 bg-[#000000] border-b border-[#2a2a2a]">
                <div className="flex items-center justify-between text-[12px] font-semibold uppercase tracking-[0.15em] mb-2.5">
                  {faltaParaFrete === 0 ? (
                    <span className="text-[#F59E0B] flex items-center gap-2">
                      <Truck size={15} /> Frete Grátis Liberado
                    </span>
                  ) : (
                    <span className="text-[#9A9A9A]">
                      Faltam <strong className="text-white">R$ {faltaParaFrete.toFixed(2).replace('.', ',')}</strong> p/ Frete Grátis
                    </span>
                  )}
                  <span className="font-anton text-sm text-white">{Math.round(progressoFrete)}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#161616] border border-[#2a2a2a] overflow-hidden">
                  <div
                    className="h-full bg-[#F59E0B] transition-all duration-500 ease-out"
                    style={{ width: `${progressoFrete}%` }}
                  />
                </div>
              </div>

              {/* PROGRESSO DO KIT */}
              <div className="px-6 py-3 bg-[#161616] border-b border-[#2a2a2a] flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.15em]">
                <Flame size={14} className={totalPecas >= 2 ? "text-[#F59E0B]" : "text-[#9A9A9A]"} />
                {totalPecas === 0 && <span className="text-[#9A9A9A]">Adicione 2+ peças para valor de Kit</span>}
                {totalPecas === 1 && (
                  <span className="text-white">
                    Adicione <strong className="text-[#F59E0B]">+1 peça</strong> para ativar o Kit 2
                  </span>
                )}
                {totalPecas === 2 && (
                  <span className="text-white">
                    Kit 2 Ativo · Adicione <strong className="text-[#F59E0B]">+1 peça</strong> para Kit 3
                  </span>
                )}
                {totalPecas >= 3 && (
                  <span className="text-[#F59E0B]">
                    Kit 3 Ativado · Desconto Máximo
                  </span>
                )}
              </div>
            </div>

            {/* LISTA DE PRODUTOS */}
            <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#2a2a2a]">
              {itens.length === 0 ? (
                <div
                  className="h-full border border-dashed border-[#555555] p-8 flex flex-col items-center justify-center text-center"
                  style={{
                    backgroundColor: '#000000',
                    backgroundImage: 'repeating-linear-gradient(90deg, #1c1c1c 0 3px, transparent 3px 9px)'
                  }}
                >
                  <span className="font-anton text-3xl uppercase text-white mb-2">
                    Nenhuma Peça
                  </span>
                  <p className="text-[13px] text-[#9A9A9A] max-w-[240px] mb-6">
                    Tecido de alta gramatura que mantém o caimento e a gola depois de cada lavagem.
                  </p>
                  <button
                    type="button"
                    onClick={() => setCarrinhoAberto(false)}
                    className="bg-[#F59E0B] text-[#000000] px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.08em] hover:brightness-110 active:scale-95 transition-all rounded-none"
                  >
                    Ver a Edição
                  </button>
                </div>
              ) : (
                itens.map((item) => (
                  <div key={`${item.sku}-${item.tamanho}`} className="py-5 first:pt-0 last:pb-0 flex gap-4">
                    <div
                      className="w-20 h-24 bg-[#161616] border border-[#2a2a2a] shrink-0 flex items-center justify-center relative overflow-hidden"
                      style={{
                        backgroundImage: 'repeating-linear-gradient(90deg, #1c1c1c 0 3px, transparent 3px 9px)'
                      }}
                    >
                      {item.imagem ? (
                        <img src={item.imagem} alt={item.nome} className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-anton text-sm text-[#9A9A9A] uppercase">
                          B<span className="text-[#F59E0B]">.</span>SKW
                        </span>
                      )}
                      <span className="absolute bottom-1 right-1 bg-[#000000] text-white border border-[#2a2a2a] font-anton text-xs px-1.5 py-0.5">
                        {item.tamanho}
                      </span>
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-semibold text-[13px] uppercase tracking-[0.08em] text-white line-clamp-1">
                            {item.nome}
                          </h4>
                          <button
                            type="button"
                            onClick={() => removerItem(item.sku, item.tamanho)}
                            className="text-[#9A9A9A] hover:text-[#F59E0B] transition-colors p-0.5"
                            aria-label="Remover peça"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                        <p className="text-[13px] text-[#9A9A9A] mt-0.5">
                          {item.cor} · Tam. {item.tamanho}
                        </p>
                      </div>

                      <div className="flex items-end justify-between mt-3">
                        <div className="flex items-center border border-[#2a2a2a] bg-[#161616]">
                          <button
                            type="button"
                            onClick={() => alterarQuantidade(item.sku, item.tamanho, -1)}
                            className="w-8 h-8 flex items-center justify-center text-white hover:text-[#F59E0B] active:scale-90"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="w-8 text-center font-anton text-sm text-white">
                            {item.quantidade}
                          </span>
                          <button
                            type="button"
                            onClick={() => alterarQuantidade(item.sku, item.tamanho, 1)}
                            className="w-8 h-8 flex items-center justify-center text-white hover:text-[#F59E0B] active:scale-90"
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        <span className="font-anton text-xl text-white">
                          R$ {(item.preco * item.quantidade).toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* RODAPÉ DO CARRINHO */}
            {itens.length > 0 && (
              <div className="p-6 bg-[#161616] border-t border-[#2a2a2a]">
                <div className="space-y-2.5 mb-5">
                  <div className="flex justify-between text-[13px] text-[#9A9A9A]">
                    <span className="uppercase tracking-[0.12em]">Subtotal ({totalPecas} un)</span>
                    <span className="text-white">R$ {subtotalBruto.toFixed(2).replace('.', ',')}</span>
                  </div>

                  {descontoKitValor > 0 && (
                    <div className="flex justify-between text-[12px] font-semibold uppercase tracking-[0.15em] text-[#F59E0B] bg-[#000000] px-3 py-2 border border-[#2a2a2a]">
                      <span>Desconto Kit {totalPecas >= 3 ? '3' : '2'}</span>
                      <span>- R$ {descontoKitValor.toFixed(2).replace('.', ',')}</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-[#2a2a2a] flex justify-between items-baseline">
                    <span className="font-semibold text-[12px] uppercase tracking-[0.2em] text-white">
                      Total
                    </span>
                    <div className="text-right">
                      <span className="font-anton text-3xl text-white block leading-none">
                        R$ {subtotalFinal.toFixed(2).replace('.', ',')}
                      </span>
                      <span className="text-[13px] text-[#9A9A9A]">
                        3x de R$ {(subtotalFinal / 3).toFixed(2).replace('.', ',')} s/ juros
                      </span>
                    </div>
                  </div>
                </div>

                {/* BOTÃO DE AÇÃO EM ÂMBAR COM TEXTO BREU */}
                <Link
                  href="/checkout"
                  onClick={() => setCarrinhoAberto(false)}
                  className="w-full bg-[#F59E0B] text-[#000000] h-14 flex items-center justify-center gap-3 font-semibold text-[13px] uppercase tracking-[0.08em] hover:brightness-110 active:scale-[0.98] transition-all rounded-none"
                >
                  Garantir a Sua <ArrowRight size={17} />
                </Link>

                <div className="mt-3 flex items-center justify-center gap-2 text-[12px] text-[#9A9A9A]">
                  <ShieldCheck size={14} className="text-white" /> Compra protegida · Envio imediato
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}
