'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function InfluenciadorPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    instagram: '',
    tiktok: '',
    youtube: '',
    públicoAlvo: '',
    nicho: '',
    alcance: '',
    taxaEngajamento: '',
    motivo: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));

      // In a real app, you would send this data to your backend
      console.log('Influencer application data:', formData);
      setSuccess(true);
      setFormData({
        nome: '',
        email: '',
        instagram: '',
        tiktok: '',
        youtube: '',
        públicoAlvo: '',
        nicho: '',
        alcance: '',
        taxaEngajamento: '',
        motivo: ''
      });
    } catch (err) {
      setError('Erro ao enviar aplicação. Tente novamente.');
      console.error('Application error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#000000] text-white py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 border-b border-zinc-800 pb-4">
          <Link href="/perfil" className="text-zinc-500 hover:text-[#F59E0B] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </Link>
          <h1 className="text-4xl md:text-5xl font-anton uppercase tracking-wide">
            Seja um Influenciador B.SKW
          </h1>
        </div>

        {/* Form */}
        <div className="bg-[#000000] border border-zinc-800 p-8 rounded-md shadow-2xl">
          {success ? (
            <div className="text-center py-12">
              <h2 className="text-3xl font-bold mb-6 text-[#F59E0B]">
                Aplicação enviada!
              </h2>
              <p className="text-zinc-400 mb-8">
                Obrigado por se candidatar. Nossa equipe entrará em contato em até 5 dias úteis.
              </p>
              <Link href="/" className="bg-[#F59E0B] text-[#000000] font-bold uppercase py-3 px-8 rounded hover:bg-amber-400 transition-colors">
                Voltar à Loja
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-2xl font-anton uppercase mb-6 text-white flex items-center gap-2">
                <span className="w-2 h-6 bg-[#F59E0B] inline-block"></span>
                Candidatura de Influenciador
              </h2>

              {error && (
                <div className="bg-red-900 border border-red-800 text-red-300 p-4 rounded-md mb-6">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-zinc-400">Nome Completo</label>
                  <input type="text" name="nome" value={formData.nome} onChange={handleChange} placeholder="Seu nome completo" className="bg-zinc-900 border border-zinc-800 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#F59E0B] transition-colors" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-zinc-400">E-mail</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="seu@email.com" className="bg-zinc-900 border border-zinc-800 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#F59E0B] transition-colors" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-zinc-400">Instagram</label>
                  <input type="text" name="instagram" value={formData.instagram} onChange={handleChange} placeholder="@seuperfil" className="bg-zinc-900 border border-zinc-800 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#F59E0B] transition-colors" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-zinc-400">TikTok</label>
                  <input type="text" name="tiktok" value={formData.tiktok} onChange={handleChange} placeholder="@seuperfil" className="bg-zinc-900 border border-zinc-800 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#F59E0B] transition-colors" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-zinc-400">YouTube</label>
                  <input type="text" name="youtube" value={formData.youtube} onChange={handleChange} placeholder="Canal URL" className="bg-zinc-900 border border-zinc-800 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#F59E0B] transition-colors" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-400">Público-Alvo</label>
                <select name="públicoAlvo" value={formData.públicoAlvo} onChange={handleChange} className="bg-zinc-900 border border-zinc-800 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#F59E0B] transition-colors">
                  <option value="">Selecione...</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="unissex">Unissex</option>
                  <option value="alternativo">Alternativo</option>
                  <option value="fitness">Fitness</option>
                  <option value="streetwear">Streetwear</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-400">Nicho de Conteúdo</label>
                <input type="text" name="nicho" value={formData.nicho} onChange={handleChange} placeholder="Moda, lifestyle, fitness, etc." className="bg-zinc-900 border border-zinc-800 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#F59E0B] transition-colors" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-400">Alcance Médio</label>
                <input type="text" name="alcance" value={formData.alcance} onChange={handleChange} placeholder="Ex: 50k visualizações/post" className="bg-zinc-900 border border-zinc-800 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#F59E0B] transition-colors" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-400">Taxa de Engajamento (%)</label>
                <input type="text" name="taxaEngajamento" value={formData.taxaEngajamento} onChange={handleChange} placeholder="Ex: 8.5" className="bg-zinc-900 border border-zinc-800 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#F59E0B] transition-colors" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-400">Por que você quer representar a B.SKW?</label>
                <textarea name="motivo" value={formData.motivo} onChange={handleChange} placeholder="Conte um pouco sobre você e por que nossa marca combina com seu estilo..." rows={4} className="bg-zinc-900 border border-zinc-800 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#F59E0B] transition-colors" />
              </div>

              <div className="pt-6 border-t border-zinc-800 flex justify-end gap-4 mt-8">
                <Link href="/perfil" className="px-6 py-3 rounded-md border border-zinc-800 text-zinc-300 hover:bg-zinc-900 transition-colors font-medium">Cancelar</Link>
                <button type="submit" disabled={loading} className={`px-8 py-3 rounded-md bg-[#F59E0B] text-[#000000] font-bold uppercase hover:bg-amber-400 transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                  {loading ? 'Enviando...' : 'Enviar Candidatura'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}