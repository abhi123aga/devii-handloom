"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, MessageSquare, Send, Info, Check, MapPin } from "lucide-react";
import { Instagram } from "@/components/icons";
import { Saree } from "@/data/sarees";

interface ProductDrawerProps {
  saree: Saree | null;
  onClose: () => void;
  onOpenContactWithSaree: (sareeName: string) => void;
}

export default function ProductDrawer({ saree, onClose, onOpenContactWithSaree }: ProductDrawerProps) {
  // Prevent page scroll when drawer is open
  useEffect(() => {
    if (saree) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [saree]);

  if (!saree) return null;

  // Prefilled WhatsApp link
  const whatsappNumber = "919380735763";
  const whatsappMessage = encodeURIComponent(
    `Hi Devii Handlooms! I am interested in inquiring about the "${saree.name}" saree (${saree.price}). Please share availability and dispatch details.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-obsidian-950/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Drawer Panel (slides from right) */}
      <div className="relative w-full max-w-2xl h-full bg-obsidian-900 border-l border-gold-900/30 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-y-auto flex flex-col justify-between z-10 animate-in slide-in-from-right duration-500 ease-out">
        
        {/* Header */}
        <div className="sticky top-0 bg-obsidian-900/90 backdrop-blur-md px-8 py-6 border-b border-gold-950/30 flex items-center justify-between z-20">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-gold-500 font-bold block mb-1">
              Craft Details
            </span>
            <h2 className="font-serif text-3xl text-zinc-100 tracking-wide">
              {saree.name}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-gold-400 border border-gold-950/30 hover:border-gold-500/40 rounded-full transition-all duration-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 space-y-8">
          
          {/* Main Image Banner */}
          <div className="relative aspect-[4/3] w-full rounded-sm overflow-hidden border border-gold-950/30">
            <Image
              src={saree.image}
              alt={saree.name}
              fill
              sizes="(max-w-768px) 100vw, 800px"
              className="object-cover object-center"
            />
            <div className="absolute bottom-4 left-4 z-10">
              <span className="px-3.5 py-1.5 bg-emerald-950 border border-emerald-500/30 text-[10px] tracking-widest text-emerald-300 font-bold uppercase rounded-sm flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Ready to Dispatch
              </span>
            </div>
          </div>

          {/* Quick Specifications */}
          <div className="grid grid-cols-2 gap-4 bg-obsidian-950 p-6 rounded-sm border border-gold-950/20">
            <div>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest block mb-1">Origin</span>
              <span className="text-zinc-200 text-sm font-semibold flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-gold-500" />
                {saree.origin}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest block mb-1">Weave Technique</span>
              <span className="text-zinc-200 text-sm font-semibold">{saree.craftName}</span>
            </div>
            <div className="mt-4">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest block mb-1">Material</span>
              <span className="text-zinc-200 text-sm font-semibold">{saree.material}</span>
            </div>
            <div className="mt-4">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest block mb-1">Indicative Price</span>
              <span className="text-gold-400 text-lg font-bold font-serif">{saree.price}</span>
            </div>
          </div>

          {/* Story & Description */}
          <div className="space-y-3">
            <h3 className="font-serif text-xl text-zinc-200 flex items-center gap-2">
              <Info className="h-4 w-4 text-gold-500" />
              Artisan Story
            </h3>
            <p className="text-zinc-400 text-sm font-light leading-relaxed">
              {saree.description}
            </p>
          </div>

          {/* Saree Specifications Bullet Points */}
          <div className="space-y-3">
            <h3 className="font-serif text-xl text-zinc-200">Specifications</h3>
            <ul className="space-y-3">
              {saree.details.map((detail, idx) => (
                <li key={idx} className="flex items-start text-zinc-400 text-sm gap-3 font-light">
                  <span className="mt-1 p-0.5 rounded-full bg-gold-950 border border-gold-600/30 text-gold-400">
                    <Check className="h-3 w-3" />
                  </span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA Footer Action Bar */}
        <div className="sticky bottom-0 bg-obsidian-950 border-t border-gold-950/40 p-8 space-y-4">
          <div className="text-xs text-zinc-500 text-center font-light leading-relaxed">
            * Direct sales only. Inquire below to connect with us. We ship worldwide with secure custom packaging.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* WhatsApp Inquire */}
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-4 bg-emerald-700 hover:bg-emerald-600 text-zinc-100 font-serif font-bold text-sm tracking-wider uppercase rounded-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_20px_rgba(16,185,129,0.15)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageSquare className="h-4.5 w-4.5" />
              WhatsApp Inquiry
            </a>

            {/* Custom Contact Form */}
            <button
              onClick={() => {
                onClose();
                onOpenContactWithSaree(saree.name);
              }}
              className="py-4 bg-gradient-to-r from-gold-700 to-gold-500 hover:from-gold-600 hover:to-gold-400 text-obsidian-950 font-serif font-bold text-sm tracking-wider uppercase rounded-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_20px_rgba(212,175,55,0.15)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <Send className="h-4.5 w-4.5" />
              Inquire via Form
            </button>
          </div>

          {/* Instagram Action */}
          <div className="flex justify-center pt-2">
            <a 
              href="https://www.instagram.com/devii.handloom" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-zinc-400 hover:text-gold-400 text-xs uppercase tracking-wider transition-colors"
            >
              <Instagram className="h-4 w-4" />
              Explore on Instagram Direct
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
