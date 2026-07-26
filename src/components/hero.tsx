"use client";

import React from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";

interface HeroProps {
  onScrollToCollections: () => void;
  onOpenContact: () => void;
}

export default function Hero({ onScrollToCollections, onOpenContact }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image Container with Ambient Zoom */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_saree.jpg"
          alt="Royal Indian Handloom Cotton Saree"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40 scale-105 animate-[pulse_8s_infinite_alternate]"
          style={{
            animationDuration: "25s",
          }}
        />
        {/* Obsidian Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian-950/80 via-transparent to-obsidian-950/80" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center mt-8">
        <div className="inline-flex items-center space-x-2 border border-gold-600/30 px-4 py-1.5 rounded-full bg-gold-950/20 backdrop-blur-sm mb-6 animate-in fade-in slide-in-from-bottom-3 duration-1000">
          <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-ping" />
          <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-gold-300">
            Artisanal Handloom Heritage
          </span>
        </div>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-zinc-100 tracking-wide leading-none mb-6 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200">
          Handwoven Legacies of <br />
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-100 to-gold-400">
            Cotton & Thread
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-zinc-400 text-base md:text-lg tracking-wide leading-relaxed font-light mb-12 animate-in fade-in slide-in-from-bottom-7 duration-1000 delay-300">
          Devii brings you hand-spun cotton and artisanal weaves sourced directly from India's ancestral loom rooms. Authenticity woven into every warp and weft, curated for the modern connoisseur of heritage fabrics.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
          <button
            onClick={onScrollToCollections}
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-gold-500 hover:bg-gold-500/10 text-gold-300 hover:text-gold-200 font-serif text-sm tracking-wider uppercase rounded-sm transition-all duration-300"
          >
            Explore Stock
          </button>
          <button
            onClick={onOpenContact}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-400 text-obsidian-950 hover:from-gold-500 hover:to-gold-300 font-serif font-bold text-sm tracking-wider uppercase rounded-sm transition-all duration-300 shadow-[0_4px_20px_rgba(212,175,55,0.2)]"
          >
            Direct Inquiry
          </button>
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce cursor-pointer opacity-70 hover:opacity-100 transition-opacity" onClick={onScrollToCollections}>
        <ArrowDown className="text-gold-400 h-6 w-6" />
      </div>
    </section>
  );
}
