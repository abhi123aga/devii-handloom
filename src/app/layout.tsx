import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Cormorant_Garamond, Inter, Great_Vibes } from "next/font/google";
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

const greatVibes = Great_Vibes({
  variable: "--font-cursive",
  subsets: ["latin"],
  weight: ["400"],
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
    <ClerkProvider>
      <html
        lang="en"
        className={`${cormorantGaramond.variable} ${inter.variable} ${greatVibes.variable} h-full antialiased`}
        suppressHydrationWarning
      >
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  const theme = localStorage.getItem('theme') || 'dark';
                  document.documentElement.classList.add(theme);
                })();
              `,
            }}
          />
        </head>
        <body className="min-h-full flex flex-col bg-obsidian-950 text-zinc-100 font-sans selection:bg-gold-700 selection:text-gold-50">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
