"use client";

import React from "react";
import { Mail, Phone, ArrowUp, Send } from "lucide-react";
import { Instagram } from "@/components/icons";
import Image from "next/image";

interface FooterProps {
  onScrollToSection: (id: string) => void;
  onOpenContact: () => void;
}

export default function Footer({ onScrollToSection, onOpenContact }: FooterProps) {
  const handleScrollTop = () => {
    onScrollToSection("hero");
  };

  return (
    <footer className="bg-obsidian-950 border-t border-gold-900/20 pt-20 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-gold-950/20">
          
          {/* Brand Info */}
          <div className="md:col-span-10 space-y-6">
            <div className="cursor-pointer block" onClick={handleScrollTop}>
              <Image
                src="/images/logo.png"
                alt="DEVII"
                width={140}
                height={45}
                className="h-11 w-auto object-contain"
              />
            </div>
            <p className="text-zinc-500 text-sm font-light leading-relaxed max-w-sm">
              Devii is a premium boutique dedicated to reviving handspun cotton and heritage loom traditions. We offer limited-stock and bespoke sarees, working directly with weaving families across India.
            </p>
            <div className="flex items-center space-x-6">
              <a 
                href="mailto:contact@deviihandloom.in" 
                className="p-2.5 bg-obsidian-900 border border-gold-950/30 hover:border-gold-500/40 text-zinc-400 hover:text-gold-400 rounded-full transition-all"
                aria-label="Email Us"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a 
                href="tel:+919380735763" 
                className="p-2.5 bg-obsidian-900 border border-gold-950/30 hover:border-gold-500/40 text-zinc-400 hover:text-gold-400 rounded-full transition-all"
                aria-label="Call Us"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a 
                href="https://www.instagram.com/devii.handloom" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 bg-obsidian-900 border border-gold-950/30 hover:border-gold-500/40 text-zinc-400 hover:text-gold-400 rounded-full transition-all"
                aria-label="Follow Us on Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation Column removed */}

          {/* Top Button */}
          <div className="md:col-span-2 flex flex-col justify-between items-end md:items-end">
            <button 
              onClick={handleScrollTop}
              className="p-3 bg-obsidian-900 border border-gold-950/30 hover:border-gold-500/40 text-gold-400 hover:text-gold-300 rounded-full transition-all hidden md:flex items-center justify-center"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
          </div>

        </div>

        {/* Bottom copyright rows */}
        <div className="pt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-zinc-600 text-xs font-light tracking-wide text-center sm:text-left">
            Copyright © {new Date().getFullYear()} Devii Handlooms. All Rights Reserved. 
            <span className="block mt-1 sm:inline sm:mt-0 sm:ml-4 text-zinc-700">
              Designed for Authentic Indian Weaves.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={onOpenContact}
              className="text-zinc-500 hover:text-gold-400 text-xs uppercase tracking-wider font-bold transition-colors flex items-center gap-1.5"
            >
              <Send className="h-3.5 w-3.5" />
              Inquire
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
