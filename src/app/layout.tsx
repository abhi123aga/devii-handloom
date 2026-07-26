import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Devii | Handwoven Legacies of Cotton & Thread",
  description: "Discover Devii's exclusive heritage collection of cotton and handloom sarees, directly sourced from India's finest weaving communities. Exquisite textures, traditional artistry.",
  openGraph: {
    title: "Devii | Handwoven Legacies of Cotton & Thread",
    description: "Discover Devii's exclusive heritage collection of cotton and handloom sarees.",
    images: [{ url: "/images/hero_saree.jpg", width: 1200, height: 630, alt: "Devii Sarees Banner" }],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${inter.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-obsidian-950 text-zinc-100 font-sans selection:bg-gold-700 selection:text-gold-50">
        {children}
      </body>
    </html>
  );
}
