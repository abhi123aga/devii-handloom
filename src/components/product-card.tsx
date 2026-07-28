"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Sparkles, Heart } from "lucide-react";
import { Saree } from "@/data/sarees";
import { useAuth, useClerk } from "@clerk/nextjs";

interface ProductCardProps {
  saree: Saree;
  onSelect: (saree: Saree) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (sareeId: string) => void;
}

export default function ProductCard({
  saree,
  onSelect,
  isWishlisted = false,
  onToggleWishlist,
}: ProductCardProps) {
  const { isSignedIn } = useAuth();
  const { openSignIn } = useClerk();

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isSignedIn) {
      openSignIn();
      return;
    }
    if (onToggleWishlist) {
      onToggleWishlist(saree.id);
    }
  };

  return (
    <div
      className="group relative bg-obsidian-900 border border-gold-950/40 rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-500 hover:border-gold-600/30 hover:shadow-[0_8px_30px_rgba(181,137,44,0.05)] cursor-pointer"
      onClick={() => onSelect(saree)}
    >
      <div>
        {/* Saree Image Container with zoom & Sheen effect */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-obsidian-950 sheen-container">
          <Image
            src={saree.image}
            alt={saree.name}
            fill
            sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Accent tags */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            <span className="px-3 py-1 bg-obsidian-950/90 border border-gold-600/20 text-[9px] tracking-widest text-gold-300 font-bold uppercase rounded-sm backdrop-blur-sm">
              {saree.category}
            </span>
          </div>

          <div className="absolute top-4 right-4 z-10">
            <span className="px-2.5 py-1 bg-emerald-950/90 border border-emerald-500/20 text-[9px] tracking-widest text-emerald-400 font-bold uppercase rounded-sm backdrop-blur-sm flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              In Stock
            </span>
          </div>

          {/* Draped Overlay Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent opacity-60" />
        </div>

        {/* Card Body */}
        <div className="p-6">
          <div className="flex items-center text-[10px] text-zinc-400 gap-1.5 uppercase tracking-widest mb-2.5">
            <MapPin className="h-3 w-3 text-gold-500" />
            <span>{saree.origin}</span>
          </div>

          <h3 className="font-serif text-2xl text-zinc-100 group-hover:text-gold-300 transition-colors tracking-wide leading-snug mb-2">
            {saree.name}
          </h3>

          <p className="text-zinc-500 text-xs font-light line-clamp-2 leading-relaxed mb-4">
            {saree.description}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 pt-0 flex items-center justify-between border-t border-gold-950/20 mt-auto">
        <div className="flex flex-col pt-4">
          <span className="text-[10px] text-zinc-500 tracking-wider uppercase font-semibold">Price</span>
          <span className="font-serif text-xl font-bold text-gold-400">{saree.price}</span>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={handleWishlistClick}
            className="px-3 py-2 border border-gold-900/40 text-gold-400 hover:bg-gold-950 rounded-sm transition-all duration-300 flex items-center justify-center cursor-pointer"
            title={isWishlisted ? "Remove from Loom Vault" : "Save to Loom Vault"}
          >
            <Heart
              className={`h-4 w-4 transition-colors duration-300 ${
                isWishlisted ? "fill-gold-500 text-gold-500" : "text-zinc-400 hover:text-gold-400"
              }`}
            />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(saree);
            }}
            className="px-4 py-2 border border-gold-900/40 text-gold-400 hover:bg-gold-500 hover:text-obsidian-950 hover:border-gold-500 text-[10px] tracking-widest uppercase font-bold transition-all duration-300 rounded-sm flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5" />
            View Craft
          </button>
        </div>
      </div>
    </div>
  );
}
