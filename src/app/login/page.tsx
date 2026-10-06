'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false
      });

      // If successful, redirect to home
      window.location.href = '/';
    } catch (err: any) {
      setError(err?.type === 'CredentialsSignin' ? 'Credenciais inválidas' : 'Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-concreto flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="font-display uppercase text-4xl text-amber">
            B.SKW
          </h1>
        </div>

        {error && (
          <div className="bg-breu/20 border border-breu/20 text-breu px-4 py-3 rounded-md mb-4">
            {error}
          </div>
        )}

        {/* Card do formulário */}
        <div className="bg-grafite border border-breu/20 rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-breu mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full px-4 py-2 bg-breu/20 border border-breu/20 text-breu placeholder-breu/50 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-breu mb-2">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 bg-breu/20 border border-breu/20 text-breu placeholder-breu/50 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-ambar text-breu font-sans font-semibold rounded-none px-4 py-2 transition-colors hover:bg-amber/80 disabled:opacity-50"
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>

        {/* Optional: cadastro link */}
        <div className="text-center text-breu/60 mt-4">
          Não tem conta? <a href="/cadastro" className="underline">Cadastre-se</a>
        </div>
      </div>
    </main>
  );
}