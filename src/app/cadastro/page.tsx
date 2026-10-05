'use client';

import { useState } from 'react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }

      // If successful, redirect to login
      window.location.href = '/login';
    } catch (err: any) {
      setError(err.message || 'Erro ao cadastrar');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-amber-300 mb-2">B.SKW</h1>
          <p className="text-gray-300">Crie sua conta</p>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-amber-200/20">
          <h2 className="text-2xl font-semibold text-amber-100 mb-4">Cadastro</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-amber-200 mb-1">Nome completo</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome completo"
                className="w-full px-4 py-2 bg-gray-700 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-200 mb-1">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full px-4 py-2 bg-gray-700 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-200 mb-1">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 bg-gray-700 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 text-white"
                required
                minLength={6}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 ${
                isLoading ? 'opacity-70' : ''
              }`}
            >
              {isLoading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </form>

          <div className="text-center text-sm text-gray-400 mt-4">
            Já tem conta? <span className="text-amber-300 cursor-pointer">Faça login</span>
          </div>
        </div>
      </div>
    </div>
  );
}