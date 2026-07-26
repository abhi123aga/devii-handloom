"use client";

import React, { useState } from "react";
import { Menu, X, Mail, Phone } from "lucide-react";
import { Instagram } from "@/components/icons";

interface NavbarProps {
  onOpenContact: () => void;
  onScrollToSection: (id: string) => void;
}

export default function Navbar({ onOpenContact, onScrollToSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    onScrollToSection(id);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-obsidian-950/80 backdrop-blur-md border-b border-gold-900/30">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => handleNavClick("hero")}>
            <span className="font-serif text-3xl tracking-[0.2em] text-gold-400 font-medium hover:text-gold-300 transition-colors">
              DEVII
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-12">
            <button
              onClick={() => handleNavClick("collections")}
              className="text-zinc-400 hover:text-gold-400 font-medium tracking-widest text-xs uppercase transition-colors"
            >
              Collections
            </button>
            <button
              onClick={() => handleNavClick("story")}
              className="text-zinc-400 hover:text-gold-400 font-medium tracking-widest text-xs uppercase transition-colors"
            >
              Our Story
            </button>
            <button
              onClick={() => handleNavClick("instagram")}
              className="text-zinc-400 hover:text-gold-400 font-medium tracking-widest text-xs uppercase transition-colors"
            >
              Artisanal Feed
            </button>
          </div>

          {/* Contact Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={onOpenContact}
              className="px-6 py-2.5 bg-gradient-to-r from-gold-700 to-gold-500 hover:from-gold-600 hover:to-gold-400 text-obsidian-950 font-serif font-bold text-sm tracking-wider uppercase rounded-sm transition-all duration-300 shadow-[0_4px_20px_rgba(212,175,55,0.15)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.3)] hover:-translate-y-0.5 active:translate-y-0"
            >
              Inquire Now
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-zinc-400 hover:text-gold-400 focus:outline-none transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-obsidian-950/98 border-b border-gold-900/30 animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="px-6 pt-4 pb-8 space-y-6 flex flex-col">
            <button
              onClick={() => handleNavClick("collections")}
              className="text-left text-zinc-300 hover:text-gold-400 font-medium tracking-widest text-sm uppercase py-2 border-b border-zinc-900 transition-colors"
            >
              Collections
            </button>
            <button
              onClick={() => handleNavClick("story")}
              className="text-left text-zinc-300 hover:text-gold-400 font-medium tracking-widest text-sm uppercase py-2 border-b border-zinc-900 transition-colors"
            >
              Our Story
            </button>
            <button
              onClick={() => handleNavClick("instagram")}
              className="text-left text-zinc-300 hover:text-gold-400 font-medium tracking-widest text-sm uppercase py-2 border-b border-zinc-900 transition-colors"
            >
              Artisanal Feed
            </button>

            {/* Quick Contacts */}
            <div className="flex items-center justify-around py-4 border-b border-zinc-900">
              <a href="mailto:info@devii.com" className="text-zinc-400 hover:text-gold-400 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a href="tel:+919876543210" className="text-zinc-400 hover:text-gold-400 transition-colors">
                <Phone className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/devii.handlooms" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-gold-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>

            <button
              onClick={() => {
                setIsOpen(false);
                onOpenContact();
              }}
              className="w-full py-3.5 bg-gradient-to-r from-gold-700 to-gold-500 text-obsidian-950 font-serif font-bold tracking-wider uppercase text-center rounded-sm transition-all"
            >
              Inquire Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
