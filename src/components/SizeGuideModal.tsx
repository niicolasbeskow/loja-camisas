"use client";

import { useState, useEffect } from 'react';
import { Tamanho } from '@/data/produtos';
import { X, Ruler, Sparkles, Check, Info } from 'lucide-react';

interface SizeGuideModalProps {
  aberto: boolean;
  aoFechar: () => void;
  categoriaAtual?: string;
  aoSelecionarTamanho?: (tamanho: Tamanho) => void;
}

type ModelagemKey = 'oversized' | 'boxy' | 'basica' | 'moletom';
type PreferenciaFit = 'justo' | 'padrao' | 'baggy';

interface MedidaLinha {
  tam: Tamanho;
  torax: number;
  comprimento: number;
  manga: number;
}

const tabelasMedidas: Record<ModelagemKey, {
  titulo: string;
  subtitulo: string;
  notaCaimento: string;
  medidas: MedidaLinha[];
}> = {
  oversized: {
    titulo: 'Oversized Heavyweight',
    subtitulo: 'Ombros deslocados • Modelagem ampla • Gola canelada 3cm',
    notaCaimento: 'A modelagem Oversized B.SKW já possui corte amplo de fábrica. Para o caimento streetwear original, escolha o seu tamanho habitual.',
    medidas: [
      { tam: 'P', torax: 56, comprimento: 72, manga: 24 },
      { tam: 'M', torax: 59, comprimento: 75, manga: 25 },
      { tam: 'G', torax: 62, comprimento: 78, manga: 26 },
      { tam: 'GG', torax: 65, comprimento: 81, manga: 27 },
      { tam: 'XG', torax: 68, comprimento: 83, manga: 28 },
      { tam: 'G1', torax: 71, comprimento: 85, manga: 29 },
      { tam: 'G2', torax: 74, comprimento: 87, manga: 30 },
    ]
  },
  boxy: {
    titulo: 'Boxy Fit',
    subtitulo: 'Tórax largo • Comprimento levemente reduzido (cropped sutil)',
    notaCaimento: 'Corte quadrado inspirado nos anos 90: estrutura larga nos ombros e comprimento que termina exatamente na linha do cinto.',
    medidas: [
      { tam: 'P', torax: 58, comprimento: 67, manga: 23 },
      { tam: 'M', torax: 61, comprimento: 69, manga: 24 },
      { tam: 'G', torax: 64, comprimento: 71, manga: 25 },
      { tam: 'GG', torax: 67, comprimento: 73, manga: 26 },
      { tam: 'XG', torax: 70, comprimento: 75, manga: 27 },
      { tam: 'G1', torax: 73, comprimento: 77, manga: 28 },
      { tam: 'G2', torax: 76, comprimento: 79, manga: 29 },
    ]
  },
  basica: {
    titulo: 'Regular / Básica',
    subtitulo: 'Corte clássico alinhado ao corpo • Conforto diário',
    notaCaimento: 'Caimento tradicional alinhado ao ombro. Se preferir um visual mais solto nesta linha, recomendamos pegar 1 tamanho acima.',
    medidas: [
      { tam: 'P', torax: 51, comprimento: 70, manga: 20 },
      { tam: 'M', torax: 54, comprimento: 72, manga: 21 },
      { tam: 'G', torax: 57, comprimento: 74, manga: 22 },
      { tam: 'GG', torax: 60, comprimento: 76, manga: 23 },
      { tam: 'XG', torax: 63, comprimento: 78, manga: 24 },
      { tam: 'G1', torax: 66, comprimento: 80, manga: 25 },
      { tam: 'G2', torax: 69, comprimento: 82, manga: 26 },
    ]
  },
  moletom: {
    titulo: 'Moletom 320 g/m²',
    subtitulo: 'Estrutura pesada • Punhos de alta compressão',
    notaCaimento: 'Desenvolvido para sobreposição (layering). Possui espaço interno confortável para usar com camiseta por baixo.',
    medidas: [
      { tam: 'P', torax: 58, comprimento: 71, manga: 61 },
      { tam: 'M', torax: 61, comprimento: 74, manga: 62 },
      { tam: 'G', torax: 64, comprimento: 77, manga: 63 },
      { tam: 'GG', torax: 67, comprimento: 79, manga: 64 },
      { tam: 'XG', torax: 70, comprimento: 81, manga: 65 },
      { tam: 'G1', torax: 73, comprimento: 83, manga: 66 },
      { tam: 'G2', torax: 76, comprimento: 85, manga: 67 },
    ]
  }
};

export default function SizeGuideModal({
  aberto,
  aoFechar,
  categoriaAtual = 'camiseta-oversized',
  aoSelecionarTamanho
}: SizeGuideModalProps) {
  const [abaModal, setAbaModal] = useState<'provador' | 'tabela'>('provador');
  const [modelagemAtiva, setModelagemAtiva] = useState<ModelagemKey>('oversized');

  const [altura, setAltura] = useState<number>(176);
  const [peso, setPeso] = useState<number>(76);
  const [preferencia, setPreferencia] = useState<PreferenciaFit>('padrao');

  useEffect(() => {
    if (!categoriaAtual) return;
    if (categoriaAtual.includes('boxy')) setModelagemAtiva('boxy');
    else if (categoriaAtual.includes('basica') || categoriaAtual.includes('poliamida')) setModelagemAtiva('basica');
    else if (categoriaAtual.includes('moletom')) setModelagemAtiva('moletom');
    else setModelagemAtiva('oversized');
  }, [categoriaAtual, aberto]);

  if (!aberto) return null;

  const calcularTamanhoIdeal = (): Tamanho => {
    const lista: Tamanho[] = ['P', 'M', 'G', 'GG', 'XG', 'G1', 'G2'];
    let score = 0;

    if (peso < 62) score = 0;
    else if (peso < 74) score = 1;
    else if (peso < 86) score = 2;
    else if (peso < 98) score = 3;
    else if (peso < 110) score = 4;
    else if (peso < 122) score = 5;
    else score = 6;

    if (altura >= 188 && score < 3) score += 1;
    if (altura >= 182 && score < 2) score += 1;
    if (altura <= 165 && score > 1) score -= 1;

    if (preferencia === 'justo') score -= 1;
    if (preferencia === 'baggy') score += 1;

    const indexFinal = Math.max(0, Math.min(lista.length - 1, score));
    return lista[indexFinal];
  };

  const tamanhoRecomendado = calcularTamanhoIdeal();
  const dadosModelagem = tabelasMedidas[modelagemAtiva];
  const medidasRecomendadas = dadosModelagem.medidas.find(m => m.tam === tamanhoRecomendado) || dadosModelagem.medidas[1];

  const handleAplicarTamanho = (tam: Tamanho) => {
    if (aoSelecionarTamanho) {
      aoSelecionarTamanho(tam);
    }
    aoFechar();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-xs p-3 md:p-6 font-outfit animate-in fade-in duration-200">
      
      <div className="bg-white w-full max-w-2xl rounded-none border-2 border-zinc-900 shadow-2xl relative flex flex-col max-h-[92vh] overflow-hidden">
        
        <div className="p-5 md:p-6 bg-zinc-950 text-white flex items-center justify-between border-b border-zinc-800">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#a3e635] block mb-0.5">
              B.SKW® // FIT LAB
            </span>
            <h2 className="font-anton text-2xl md:text-3xl uppercase tracking-wide leading-none">
              Guia de Medidas & Provador
            </h2>
          </div>
          <button
            type="button"
            onClick={aoFechar}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors active:scale-95"
            aria-label="Fechar Guia de Medidas"
          >
            <X size={22} />
          </button>
        </div>

        <div className="grid grid-cols-2 border-b border-zinc-200 bg-zinc-100">
          <button
            type="button"
            onClick={() => setAbaModal('provador')}
            className={`py-3.5 px-4 flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest transition-all ${
              abaModal === 'provador'
                ? 'bg-white text-black border-b-2 border-black'
                : 'text-zinc-500 hover:text-black hover:bg-zinc-50'
            }`}
          >
            <Sparkles size={14} /> Descobrir Meu Tamanho
          </button>
          <button
            type="button"
            onClick={() => setAbaModal('tabela')}
            className={`py-3.5 px-4 flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest transition-all ${
              abaModal === 'tabela'
                ? 'bg-white text-black border-b-2 border-black'
                : 'text-zinc-500 hover:text-black hover:bg-zinc-50'
            }`}
          >
            <Ruler size={14} /> Tabela em Centímetros
          </button>
        </div>

        <div className="px-5 md:px-6 py-3 bg-[#FAFAFA] border-b border-zinc-200 flex items-center gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          <span className="font-mono text-[10px] uppercase text-zinc-400 shrink-0 mr-1">
            Corte:
          </span>
          {(Object.keys(tabelasMedidas) as ModelagemKey[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setModelagemAtiva(key)}
              className={`px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider border rounded-none shrink-0 transition-all ${
                modelagemAtiva === key
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-zinc-600 border-zinc-300 hover:border-black'
              }`}
            >
              {key === 'basica' ? 'Básica' : key}
            </button>
          ))}
        </div>

        <div className="p-5 md:p-6 overflow-y-auto space-y-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-zinc-300">
          
          {abaModal === 'provador' ? (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-4 border border-zinc-200 bg-[#FAFAFA]">
                  <div className="flex justify-between items-baseline mb-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-700">
                      1. Tua Altura
                    </label>
                    <span className="font-mono text-lg font-bold text-black bg-white px-2.5 py-0.5 border border-zinc-300">
                      {(altura / 100).toFixed(2).replace('.', ',')} m
                    </span>
                  </div>
                  <input
                    type="range"
                    min={150}
                    max={205}
                    value={altura}
                    onChange={(e) => setAltura(Number(e.target.value))}
                    className="w-full accent-black cursor-pointer h-1.5 bg-zinc-300 rounded-none"
                  />
                  <div className="flex justify-between font-mono text-[10px] text-zinc-400 mt-1.5">
                    <span>1,50m</span>
                    <span>1,75m</span>
                    <span>2,05m</span>
                  </div>
                </div>

                <div className="p-4 border border-zinc-200 bg-[#FAFAFA]">
                  <div className="flex justify-between items-baseline mb-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-700">
                      2. Teu Peso
                    </label>
                    <span className="font-mono text-lg font-bold text-black bg-white px-2.5 py-0.5 border border-zinc-300">
                      {peso} kg
                    </span>
                  </div>
                  <input
                    type="range"
                    min={45}
                    max={140}
                    value={peso}
                    onChange={(e) => setPeso(Number(e.target.value))}
                    className="w-full accent-black cursor-pointer h-1.5 bg-zinc-300 rounded-none"
                  />
                  <div className="flex justify-between font-mono text-[10px] text-zinc-400 mt-1.5">
                    <span>45kg</span>
                    <span>90kg</span>
                    <span>140kg</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-700 block mb-2.5">
                  3. Como preferes o caimento no corpo?
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'justo', label: 'Mais Alinhado', desc: 'Menos sobra' },
                    { id: 'padrao', label: 'Fit Original', desc: 'Recomendado' },
                    { id: 'baggy', label: 'Extra Baggy', desc: 'Bem largo' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPreferencia(item.id as PreferenciaFit)}
                      className={`p-3 border-2 text-left transition-all rounded-none active:scale-[0.98] ${
                        preferencia === item.id
                          ? 'border-black bg-black text-white'
                          : 'border-zinc-200 bg-white text-zinc-800 hover:border-zinc-900'
                      }`}
                    >
                      <span className="block font-bold text-[10px] md:text-xs uppercase tracking-wider leading-tight">
                        {item.label}
                      </span>
                      <span className={`block font-mono text-[9px] md:text-[10px] mt-1 ${
                        preferencia === item.id ? 'text-[#a3e635]' : 'text-zinc-400'
                      }`}>
                        {item.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-5 bg-zinc-950 text-white border border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-5">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#a3e635] text-black font-anton text-4xl flex items-center justify-center shrink-0 border border-white">
                    {tamanhoRecomendado}
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#a3e635] block mb-0.5">
                      MATCH IDEAL PARA {(altura / 100).toFixed(2)}M / {peso}KG
                    </span>
                    <h4 className="font-anton text-xl uppercase tracking-wide text-white">
                      Tam. {tamanhoRecomendado} na {dadosModelagem.titulo}
                    </h4>
                    <p className="font-mono text-[10px] md:text-[11px] text-zinc-400 mt-1">
                      Medidas: Tórax {medidasRecomendadas.torax}cm • Compr. {medidasRecomendadas.comprimento}cm
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleAplicarTamanho(tamanhoRecomendado)}
                  className="w-full md:w-auto bg-white text-black px-5 py-3.5 font-bold text-xs uppercase tracking-widest hover:bg-[#a3e635] active:scale-95 transition-all shrink-0 flex items-center justify-center gap-2"
                >
                  <Check size={15} strokeWidth={3} /> Usar {tamanhoRecomendado}
                </button>
              </div>

            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-[#FAFAFA] p-4 border border-zinc-200">
                <div className="md:col-span-8 space-y-1.5">
                  <h3 className="font-anton text-xl uppercase tracking-wide text-zinc-900">
                    {dadosModelagem.titulo}
                  </h3>
                  <p className="font-mono text-[11px] font-bold uppercase text-zinc-500">
                    {dadosModelagem.subtitulo}
                  </p>
                  <p className="text-xs text-zinc-600 leading-relaxed pt-1">
                    {dadosModelagem.notaCaimento}
                  </p>
                </div>

                <div className="md:col-span-4 flex flex-col items-center justify-center bg-white p-3 border border-zinc-200">
                  <svg viewBox="0 0 120 110" className="w-24 h-24 stroke-zinc-900 fill-none" strokeWidth="2">
                    <path d="M35,15 L50,15 C50,22 70,22 70,15 L85,15 L110,35 L95,52 L85,42 L85,95 L35,95 L35,42 L25,52 L10,35 Z" fill="#f4f4f5" />
                    <line x1="35" y1="55" x2="85" y2="55" stroke="#000" strokeDasharray="3 2" />
                    <circle cx="60" cy="55" r="7" fill="#000" stroke="none" />
                    <text x="60" y="58" textAnchor="middle" fill="#a3e635" fontSize="8" fontFamily="monospace" fontWeight="bold" stroke="none">A</text>
                    <line x1="74" y1="15" x2="74" y2="95" stroke="#000" strokeDasharray="3 2" />
                    <circle cx="74" cy="78" r="7" fill="#000" stroke="none" />
                    <text x="74" y="81" textAnchor="middle" fill="#a3e635" fontSize="8" fontFamily="monospace" fontWeight="bold" stroke="none">B</text>
                  </svg>
                  <span className="font-mono text-[9px] uppercase text-zinc-500 mt-1">
                    A: Largura • B: Altura
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto border border-zinc-200">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                  <thead>
                    <tr className="bg-zinc-950 text-white font-mono text-[10px] uppercase tracking-widest">
                      <th className="py-3 px-4">Tamanho</th>
                      <th className="py-3 px-4">A // Tórax</th>
                      <th className="py-3 px-4">B // Compr.</th>
                      <th className="py-3 px-4">Manga</th>
                      <th className="py-3 px-4 text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 font-mono text-xs">
                    {dadosModelagem.medidas.map((linha) => {
                      const isRecomendado = linha.tam === tamanhoRecomendado;
                      return (
                        <tr
                          key={linha.tam}
                          onClick={() => handleAplicarTamanho(linha.tam)}
                          className={`cursor-pointer transition-colors ${
                            isRecomendado
                              ? 'bg-[#a3e635]/20 hover:bg-[#a3e635]/30 font-bold'
                              : 'bg-white hover:bg-zinc-50'
                          }`}
                        >
                          <td className="py-3 px-4 font-bold text-zinc-900 flex items-center gap-2">
                            {linha.tam}
                            {isRecomendado && (
                              <span className="bg-black text-[#a3e635] text-[9px] px-1.5 py-0.5 uppercase tracking-wider">
                                Teu Fit
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-zinc-700">{linha.torax} cm</td>
                          <td className="py-3 px-4 text-zinc-700">{linha.comprimento} cm</td>
                          <td className="py-3 px-4 text-zinc-700">{linha.manga} cm</td>
                          <td className="py-3 px-4 text-right">
                            <span className="text-[10px] font-bold uppercase tracking-wider underline text-black hover:text-[#a3e635] transition-colors">
                              Selecionar
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="flex items-start gap-2.5 text-[11px] text-zinc-500 bg-zinc-100 p-3.5 border border-zinc-200">
                <Info size={15} className="text-zinc-900 shrink-0 mt-0.5" />
                <p>
                  <strong>Dica de medição:</strong> Estenda uma camiseta sua que veste bem sobre uma superfície plana e meça apenas a parte frontal de uma axila à outra (Tórax). As medidas podem variar em até ±1,5 cm devido ao processo de lavanderia.
                </p>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
