import type { Metadata } from "next";
import { Anton, Outfit } from "next/font/google";
import "./globals.css";
import { useSession } from "next-auth/react";

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
  metadataBase: new URL('https://loja-camisas-two.vercel.app'),
  title: "B.SKW | Streetwear Premium",
  description: "Armadura de tecido para quem veste a rua com respeito.",
  icons: {
    icon: "/files/BSKW_logos_PNG/BSKW_monograma_cor-branco-ambar.png",
    apple: "/files/BSKW_logos_PNG/BSKW_monograma_cor-branco-ambar.png",
  },
  openGraph: {
    title: "B.SKW | Streetwear Premium",
    description: "Armadura de tecido para quem veste a rua com respeito.",
    url: "https://loja-camisas-two.vercel.app",
    siteName: "B.SKW",
    images: [
      {
        url: "https://loja-camisas-two.vercel.app/files/BSKW_monograma_cor-branco-ambar_fundo-preto.png",
        width: 800,
        height: 800,
        alt: "B.SKW Monograma",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "B.SKW | Streetwear Premium",
    description: "Armadura de tecido para quem veste a rua com respeito.",
    images: ["https://loja-camisas-two.vercel.app/files/BSKW_monograma_cor-branco-ambar_fundo-preto.png"],
  },
};

import Marquee from '@/components/Marquee';
import Header from '@/components/Header';
import CartSidebar from '@/components/CartSidebar';
import { AuthProvider } from '@/providers/AuthProvider';
import Footer from '@/components/Footer';

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
        <Footer />
      </body>
    </html>
  );
}