import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "B.SKW - Streetwear Premium",
  description: "Loja oficial de camisas streetwear da B.SKW",
};

import Marquee from '@/components/Marquee';
import Header from '@/components/Header';
import CartSidebar from '@/components/CartSidebar';
import { AuthProvider } from '@/providers/AuthProvider';

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <Marquee />
          <Header />
          <CartSidebar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}