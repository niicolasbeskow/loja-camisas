'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Link from 'next/link';

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

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await signIn('google', { callbackUrl: '/' });
    } catch (err) {
      setError('Erro ao fazer login com Google');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-amber-300 mb-2">B.SKW</h1>
          <p className="text-gray-300">Faça login para continuar</p>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-amber-200/20">
          <h2 className="text-2xl font-semibold text-amber-100 mb-4">Entrar com Google</h2>
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className={`w-full bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 ${
              isLoading ? 'opacity-70' : ''
            }`}
          >
            {isLoading ? 'Carregando...' : 'Entrar com Google'}
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
            </svg>
          </button>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-amber-100 mb-3">Ou faça login com email</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-amber-200 mb-1">Email</label>
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
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 ${
                  isLoading ? 'opacity-70' : ''
                }`}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>
          </div>

          <div className="text-center text-sm text-gray-400 mt-4">
            Não tem conta? <Link href="/cadastro" className="text-amber-300 hover:underline">Cadastre-se</Link>
          </div>
        </div>
      </div>
    </div>
  );
}