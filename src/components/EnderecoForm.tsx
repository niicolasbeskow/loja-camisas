"use client";

import { useState } from "react";
import Link from "next/link";

export default function EnderecoForm() {
  const [formData, setFormData] = useState({
    cep: "", rua: "", numero: "", complemento: "", bairro: "", cidade: "", estado: ""
  });
  const [loadingCep, setLoadingCep] = useState(false);

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let cep = e.target.value.replace(/\D/g, "");
    if (cep.length > 8) cep = cep.slice(0, 8);

    let formattedCep = cep;
    if (cep.length > 5) {
      formattedCep = cep.replace(/^(\d{5})(\d)/, "$1-$2");
    }

    setFormData(prev => ({ ...prev, cep: formattedCep }));

    if (cep.length === 8) {
      setLoadingCep(true);
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setFormData(prev => ({
            ...prev,
            rua: data.logradouro || "",
            bairro: data.bairro || "",
            cidade: data.localidade || "",
            estado: data.uf || ""
          }));
          document.getElementById("numero")?.focus();
        }
      } catch (error) {
        console.error("Erro ao buscar CEP", error);
      } finally {
        setLoadingCep(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-400">
            CEP {loadingCep && <span className="text-[#F59E0B] text-xs ml-2">Buscando...</span>}
          </label>
          <input type="text" name="cep" value={formData.cep} onChange={handleCepChange} placeholder="00000-000" className="bg-zinc-900 border border-zinc-800 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#F59E0B] transition-colors" />
        </div>
        <div className="hidden md:block"></div>

        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-sm font-medium text-zinc-400">Rua / Logradouro</label>
          <input type="text" name="rua" value={formData.rua} onChange={handleChange} placeholder="Ex: Avenida Paulista" className="bg-zinc-900 border border-zinc-800 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#F59E0B] transition-colors" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-400">Número</label>
          <input type="text" id="numero" name="numero" value={formData.numero} onChange={handleChange} placeholder="Ex: 100" className="bg-zinc-900 border border-zinc-800 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#F59E0B] transition-colors" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-400">Complemento</label>
          <input type="text" name="complemento" value={formData.complemento} onChange={handleChange} placeholder="Apto, Bloco, etc. (Opcional)" className="bg-zinc-900 border border-zinc-800 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#F59E0B] transition-colors" />
        </div>

        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-sm font-medium text-zinc-400">Bairro</label>
          <input type="text" name="bairro" value={formData.bairro} onChange={handleChange} placeholder="Seu bairro" className="bg-zinc-900 border border-zinc-800 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#F59E0B] transition-colors" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-400">Cidade</label>
          <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} placeholder="Sua cidade" className="bg-zinc-900 border border-zinc-800 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#F59E0B] transition-colors" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-400">Estado</label>
          <select name="estado" value={formData.estado} onChange={handleChange} className="bg-zinc-900 border border-zinc-800 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#F59E0B] transition-colors">
            <option value="">Selecione...</option>
            <option value="SC">Santa Catarina (SC)</option>
            <option value="SP">São Paulo (SP)</option>
            <option value="RJ">Rio de Janeiro (RJ)</option>
            <option value="PR">Paraná (PR)</option>
            <option value="RS">Rio Grande do Sul (RS)</option>
            <option value="MG">Minas Gerais (MG)</option>
            {/* Adicione os outros se quiser */}
          </select>
        </div>
      </div>

      <div className="pt-6 border-t border-zinc-800 flex justify-end gap-4 mt-8">
        <Link href="/perfil" className="px-6 py-3 rounded-md border border-zinc-800 text-zinc-300 hover:bg-zinc-900 transition-colors font-medium">Cancelar</Link>
        <button type="button" className="px-8 py-3 rounded-md bg-[#F59E0B] text-[#000000] font-bold uppercase hover:bg-amber-400 transition-colors">Salvar Endereço</button>
      </div>
    </form>
  );
}