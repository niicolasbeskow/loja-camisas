import type { Metadata } from "next";
import { Anton, Outfit } from "next/font/google";
import "./globals.css";

const antón = Anton({
  variable: "--font-anton",
  weight: ["400"],
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  weight: ["400", "500", "600"],
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
      className={`${antón.variable} ${outfit.variable} h-full antialiased`}
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