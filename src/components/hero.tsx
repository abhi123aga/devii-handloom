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
      <div className="absolute inset-0 z-0 bg-[#07070a]">
        <Image
          src="/images/hero_saree_v4.jpg"
          alt="Royal Indian Handloom Cotton Saree"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_25%] opacity-40 scale-105 animate-[pulse_8s_infinite_alternate]"
          style={{
            animationDuration: "25s",
          }}
        />
        {/* Hardcoded Obsidian Overlay Gradients (Always Dark) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07070a] via-[#07070a]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07070a]/80 via-transparent to-[#07070a]/80" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center mt-8">
        <p className="font-cursive text-6xl md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-100 to-gold-400 mb-2 animate-in fade-in slide-in-from-bottom-3 duration-1000 delay-100 normal-case leading-none py-2">
          Wear Your Power
        </p>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#f4f4f5] tracking-wide leading-none mb-6 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200 pt-2">
          Handwoven Legacies of <br />
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-100 to-gold-400">
            Cotton & Thread
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-[#a1a1aa] text-base md:text-lg tracking-wide leading-relaxed font-light mb-12 animate-in fade-in slide-in-from-bottom-7 duration-1000 delay-300">
          Devii brings you hand-spun cotton and artisanal weaves sourced directly from India's ancestral loom rooms. Authenticity woven into every warp and weft, curated for the modern connoisseur of heritage fabrics.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
          <a
            href="https://www.instagram.com/devii.handloom"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-gold-500 hover:bg-gold-500/10 text-gold-300 hover:text-gold-200 font-serif text-sm tracking-wider uppercase rounded-sm transition-all duration-300 cursor-pointer inline-block text-center"
          >
            Explore Saree
          </a>
          <button
            onClick={onOpenContact}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-400 text-[#07070a] hover:from-gold-500 hover:to-gold-300 font-serif font-bold text-sm tracking-wider uppercase rounded-sm transition-all duration-300 shadow-[0_4px_20px_rgba(212,175,55,0.2)] cursor-pointer"
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
