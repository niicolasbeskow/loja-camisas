import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "B.SKW Admin - Painel de Controle",
  description: "Painel de administração da B.SKW",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-[100vh] flex bg-gray-50">
        {/* Admin Sidebar */}
        <aside className="w-64 bg-gray-900 text-white flex-shrink-0">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-8">B.SKW Admin</h1>
            <nav className="space-y-2">
              <a
                href="/admin"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800"
              >
                Dashboard
              </a>
              <a
                href="/admin/produtos"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800"
              >
                Produtos
              </a>
              <a
                href="/admin/artistas"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800"
              >
                Artistas
              </a>
              <a
                href="/admin/pedidos"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800"
              >
                Pedidos
              </a>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </body>
    </html>
  );
}