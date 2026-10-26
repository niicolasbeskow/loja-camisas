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
    titulo: 'Oversized Heavy Suedine',
    subtitulo: 'Gola canelada de 3 cm · Ombros deslocados · Trama pesada',
    notaCaimento: 'A modelagem Oversized B.SKW já possui corte amplo. Para o caimento autoral da marca, escolha o seu tamanho habitual.',
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
    subtitulo: 'Tórax amplo · Comprimento na linha do cinto',
    notaCaimento: 'Estrutura quadrada com ombros marcados e comprimento levemente reduzido.',
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
    titulo: 'Corte Clássico B.SKW',
    subtitulo: '200 g/m² · Alinhada ao corpo · Zero encolhimento',
    notaCaimento: 'Caimento reto tradicional. Se preferir mais folga no tórax, selecione 1 tamanho acima.',
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
    subtitulo: 'Alta gramatura · Punhos canelados firmes',
    notaCaimento: 'Construído como armadura térmica para sobreposição com camiseta por baixo.',
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
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#000000]/85 backdrop-blur-xs p-3 md:p-6 font-outfit text-white animate-in fade-in duration-200">
      
      <div className="bg-[#161616] w-full max-w-2xl rounded-none border border-[#2a2a2a] shadow-2xl relative flex flex-col max-h-[92vh] overflow-hidden">
        
        <div
          className="p-6 flex items-center justify-between border-b border-[#2a2a2a]"
          style={{
            backgroundColor: '#000000',
            backgroundImage: 'repeating-linear-gradient(90deg, #1c1c1c 0 3px, transparent 3px 9px)'
          }}
        >
          <div>
            <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#F59E0B] block mb-1">
              B.SKW · PROPORÇÕES E MEDIDAS
            </span>
            <h2 className="font-anton text-3xl uppercase leading-none text-white">
              Dimensões da Armadura
            </h2>
          </div>
          <button
            type="button"
            onClick={aoFechar}
            className="p-2 text-[#9A9A9A] hover:text-white transition-colors"
            aria-label="Fechar"
          >
            <X size={22} />
          </button>
        </div>

        <div className="grid grid-cols-2 border-b border-[#2a2a2a] bg-[#000000]">
          <button
            type="button"
            onClick={() => setAbaModal('provador')}
            className={`py-4 px-4 flex items-center justify-center gap-2 font-semibold text-[12px] uppercase tracking-[0.2em] transition-all border-b-2 ${
              abaModal === 'provador'
                ? 'bg-[#161616] text-[#F59E0B] border-[#F59E0B]'
                : 'text-[#9A9A9A] border-transparent hover:text-white'
            }`}
          >
            <Sparkles size={14} /> Simulador de Caimento
          </button>
          <button
            type="button"
            onClick={() => setAbaModal('tabela')}
            className={`py-4 px-4 flex items-center justify-center gap-2 font-semibold text-[12px] uppercase tracking-[0.2em] transition-all border-b-2 ${
              abaModal === 'tabela'
                ? 'bg-[#161616] text-[#F59E0B] border-[#F59E0B]'
                : 'text-[#9A9A9A] border-transparent hover:text-white'
            }`}
          >
            <Ruler size={14} /> Tabela em Centímetros
          </button>
        </div>

        <div className="px-6 py-3.5 bg-[#000000] border-b border-[#2a2a2a] flex items-center gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#9A9A9A] shrink-0 mr-2">
            Modelagem:
          </span>
          {(Object.keys(tabelasMedidas) as ModelagemKey[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setModelagemAtiva(key)}
              className={`px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.15em] border rounded-none shrink-0 transition-all ${
                modelagemAtiva === key
                  ? 'bg-[#F59E0B] text-[#000000] border-[#F59E0B]'
                  : 'bg-[#161616] text-[#9A9A9A] border-[#2a2a2a] hover:text-white'
              }`}
            >
              {key === 'basica' ? 'Clássica' : key}
            </button>
          ))}
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          
          {abaModal === 'provador' ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-5 border border-[#2a2a2a] bg-[#000000]">
                  <div className="flex justify-between items-baseline mb-3">
                    <label className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#9A9A9A]">
                      01 · Altura
                    </label>
                    <span className="font-anton text-2xl text-white">
                      {(altura / 100).toFixed(2).replace('.', ',')} M
                    </span>
                  </div>
                  <input
                    type="range"
                    min={150}
                    max={205}
                    value={altura}
                    onChange={(e) => setAltura(Number(e.target.value))}
                    className="w-full accent-[#F59E0B] cursor-pointer h-1.5 bg-[#161616] rounded-none"
                  />
                  <div className="flex justify-between text-[12px] text-[#9A9A9A] mt-2">
                    <span>1,50m</span>
                    <span>1,75m</span>
                    <span>2,05m</span>
                  </div>
                </div>

                <div className="p-5 border border-[#2a2a2a] bg-[#000000]">
                  <div className="flex justify-between items-baseline mb-3">
                    <label className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#9A9A9A]">
                      02 · Peso
                    </label>
                    <span className="font-anton text-2xl text-white">
                      {peso} KG
                    </span>
                  </div>
                  <input
                    type="range"
                    min={45}
                    max={140}
                    value={peso}
                    onChange={(e) => setPeso(Number(e.target.value))}
                    className="w-full accent-[#F59E0B] cursor-pointer h-1.5 bg-[#161616] rounded-none"
                  />
                  <div className="flex justify-between text-[12px] text-[#9A9A9A] mt-2">
                    <span>45kg</span>
                    <span>90kg</span>
                    <span>140kg</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#9A9A9A] block mb-3">
                  03 · Preferência de Caimento
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'justo', label: 'Alinhado', desc: 'Menos sobra' },
                    { id: 'padrao', label: 'Autoral B.SKW', desc: 'Recomendado' },
                    { id: 'baggy', label: 'Extra Amplo', desc: 'Mais pesado' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPreferencia(item.id as PreferenciaFit)}
                      className={`p-4 border text-left transition-all rounded-none ${
                        preferencia === item.id
                          ? 'border-[#F59E0B] bg-[#000000] text-white'
                          : 'border-[#2a2a2a] bg-[#000000] text-[#9A9A9A] hover:border-white'
                      }`}
                    >
                      <span className="block font-anton text-lg uppercase text-white">
                        {item.label}
                      </span>
                      <span className={`block text-[12px] mt-0.5 ${
                        preferencia === item.id ? 'text-[#F59E0B]' : 'text-[#9A9A9A]'
                      }`}>
                        {item.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div
                className="p-6 border border-[#2a2a2a] flex flex-col md:flex-row items-center justify-between gap-5"
                style={{
                  backgroundColor: '#000000',
                  backgroundImage: 'repeating-linear-gradient(90deg, #1c1c1c 0 3px, transparent 3px 9px)'
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#F59E0B] text-[#000000] font-anton text-4xl flex items-center justify-center shrink-0">
                    {tamanhoRecomendado}
                  </div>
                  <div>
                    <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#F59E0B] block mb-1">
                      TAMANHO RECOMENDADO
                    </span>
                    <h4 className="font-anton text-2xl uppercase text-white">
                      {dadosModelagem.titulo} · Tam. {tamanhoRecomendado}
                    </h4>
                    <p className="text-[13px] text-[#9A9A9A] mt-0.5">
                      Tórax: {medidasRecomendadas.torax} cm · Comprimento: {medidasRecomendadas.comprimento} cm
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleAplicarTamanho(tamanhoRecomendado)}
                  className="w-full md:w-auto bg-[#F59E0B] text-[#000000] px-6 py-4 font-semibold text-[12px] uppercase tracking-[0.08em] hover:brightness-110 active:scale-95 transition-all shrink-0 flex items-center justify-center gap-2"
                >
                  <Check size={16} strokeWidth={3} /> Selecionar {tamanhoRecomendado}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-5 bg-[#000000] border border-[#2a2a2a]">
                <h3 className="font-anton text-2xl uppercase text-white mb-1">
                  {dadosModelagem.titulo}
                </h3>
                <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#F59E0B] mb-2">
                  {dadosModelagem.subtitulo}
                </p>
                <p className="text-[14px] text-[#9A9A9A] leading-relaxed">
                  {dadosModelagem.notaCaimento}
                </p>
              </div>

              <div className="overflow-x-auto border border-[#2a2a2a]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#000000] text-[#9A9A9A] text-[12px] font-semibold uppercase tracking-[0.2em] border-b border-[#2a2a2a]">
                      <th className="py-3.5 px-4">Tam.</th>
                      <th className="py-3.5 px-4">Tórax (Largura)</th>
                      <th className="py-3.5 px-4">Comprimento</th>
                      <th className="py-3.5 px-4">Manga</th>
                      <th className="py-3.5 px-4 text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2a2a2a] text-[14px]">
                    {dadosModelagem.medidas.map((linha) => {
                      const isRecomendado = linha.tam === tamanhoRecomendado;
                      return (
                        <tr
                          key={linha.tam}
                          onClick={() => handleAplicarTamanho(linha.tam)}
                          className={`cursor-pointer transition-colors ${
                            isRecomendado
                              ? 'bg-[#000000] text-white'
                              : 'bg-[#161616] text-[#9A9A9A] hover:bg-[#000000] hover:text-white'
                          }`}
                        >
                          <td className="py-3.5 px-4 font-anton text-lg text-white flex items-center gap-2.5">
                            {linha.tam}
                            {isRecomendado && (
                              <span className="bg-[#F59E0B] text-[#000000] font-outfit font-semibold text-[10px] px-2 py-0.5 uppercase tracking-[0.15em]">
                                Ideal
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4">{linha.torax} cm</td>
                          <td className="py-3.5 px-4">{linha.comprimento} cm</td>
                          <td className="py-3.5 px-4">{linha.manga} cm</td>
                          <td className="py-3.5 px-4 text-right">
                            <span className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#F59E0B] underline underline-offset-4">
                              Usar
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="flex items-start gap-3 text-[13px] text-[#9A9A9A] bg-[#000000] p-4 border border-[#2a2a2a]">
                <Info size={16} className="text-[#F59E0B] shrink-0 mt-0.5" />
                <p>
                  Meça uma camiseta sua estendida em superfície plana, de uma costura lateral à outra na altura do peito (Tórax). Margem de tolerância: ±1,5 cm.
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
