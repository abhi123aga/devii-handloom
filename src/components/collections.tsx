"use client";

import React, { useState } from "react";
import { SAREE_COLLECTION, Saree } from "@/data/sarees";
import ProductCard from "./product-card";
import { Layers } from "lucide-react";

interface CollectionsProps {
  onSelectSaree: (saree: Saree) => void;
}

export default function Collections({ onSelectSaree }: CollectionsProps) {
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "Traditional Handloom", "Heritage Cotton-Silk", "Artisanal block Print", "Khadi & Handspun"];

  const filteredSarees = filter === "All" 
    ? SAREE_COLLECTION 
    : SAREE_COLLECTION.filter(s => s.category === filter);

  return (
    <section id="collections" className="py-24 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 border-t border-gold-950/20">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Layers className="h-4 w-4 text-gold-500" />
          <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-bold">In-Stock Showroom</span>
        </div>
        <h2 className="font-serif text-4xl md:text-5xl text-zinc-100 tracking-wide mb-4">
          The Weave Gallery
        </h2>
        <div className="h-0.5 w-16 bg-gold-600/40 mx-auto mb-6" />
        <p className="text-zinc-400 font-light text-sm md:text-base leading-relaxed">
          Explore our exclusive catalog of handloom cottons, detailed blocks, and textured khadis. Since we focus on authenticity and slow fashion, each piece is either unique or available in extremely limited stocks.
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-16">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2.5 text-xs font-semibold tracking-wider uppercase rounded-sm transition-all duration-300 border ${
              filter === cat
                ? "bg-gold-500/10 border-gold-500 text-gold-300"
                : "bg-obsidian-900 border-gold-950/40 text-zinc-400 hover:border-gold-700/30 hover:text-gold-400"
            }`}
          >
            {cat === "All" ? "All Collections" : cat}
          </button>
        ))}
      </div>

      {/* Saree Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredSarees.length > 0 ? (
          filteredSarees.map((saree) => (
            <ProductCard 
              key={saree.id} 
              saree={saree} 
              onSelect={onSelectSaree} 
            />
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-obsidian-900 border border-gold-950/20 rounded-sm">
            <p className="text-zinc-400">No sarees found in this collection.</p>
          </div>
        )}
      </div>
    </section>
  );
}
