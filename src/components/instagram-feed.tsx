"use client";

import React from "react";
import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";
import { Instagram } from "@/components/icons";

export default function InstagramFeed() {
  // Mock posts using our beautiful generated images
  const feedPosts = [
    {
      id: 1,
      image: "/images/saree_crimson_gold.jpg",
      likes: "248",
      comments: "14",
      tag: "#adrika #maheshwarisilk"
    },
    {
      id: 2,
      image: "/images/saree_emerald_handloom.jpg",
      likes: "312",
      comments: "28",
      tag: "#vaikuntha #chanderiweave"
    },
    {
      id: 3,
      image: "/images/saree_indigo_ajrakh.jpg",
      likes: "189",
      comments: "9",
      tag: "#ajrakhblockprint #organiccotton"
    },
    {
      id: 4,
      image: "/images/saree_mustard_khadi.jpg",
      likes: "405",
      comments: "37",
      tag: "#swarnalata #bengalkhadi"
    }
  ];

  return (
    <section id="instagram" className="py-24 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 border-t border-gold-950/20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Instagram className="h-4 w-4 text-gold-500" />
            <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-bold">Social Showroom</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-zinc-100 tracking-wide">
            Our Instagram Marketplace
          </h2>
          <div className="h-0.5 w-16 bg-gold-600/40 mt-4 mb-2" />
          <p className="text-zinc-500 font-light text-sm max-w-xl">
            We list and sell catalog drop releases live on our social feed. Follow <a href="https://www.instagram.com/devii.handloom" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-gold-300 font-medium transition-colors">@devii.handloom</a> to catch fresh loom dispatches first.
          </p>
        </div>

        <a 
          href="https://www.instagram.com/devii.handloom"
          target="_blank"
          rel="noopener noreferrer"
          className="self-start md:self-auto px-6 py-3 border border-gold-500 hover:bg-gold-500 text-gold-300 hover:text-obsidian-950 font-serif text-xs tracking-widest uppercase transition-all duration-300 rounded-sm flex items-center gap-2"
        >
          <Instagram className="h-4 w-4" />
          Follow @devii.handloom
        </a>
      </div>

      {/* Grid of Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {feedPosts.map((post) => (
          <a 
            key={post.id}
            href="https://www.instagram.com/devii.handloom"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square w-full rounded-sm overflow-hidden border border-gold-950/40 bg-obsidian-900"
          >
            {/* Post Image */}
            <Image
              src={post.image}
              alt="Devii Instagram Saree Post"
              fill
              sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 25vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-obsidian-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center space-y-4">
              <Instagram className="h-8 w-8 text-gold-400 mb-2" />
              
              <div className="flex items-center gap-6 text-zinc-200">
                <span className="flex items-center gap-1.5 text-sm font-semibold">
                  <Heart className="h-4 w-4 text-crimson-accent fill-crimson-accent" />
                  {post.likes}
                </span>
                <span className="flex items-center gap-1.5 text-sm font-semibold">
                  <MessageCircle className="h-4 w-4 text-gold-400 fill-gold-400" />
                  {post.comments}
                </span>
              </div>
              
              <span className="text-[10px] tracking-wider text-zinc-500 font-bold uppercase">
                {post.tag}
              </span>

              <span className="px-4 py-1.5 bg-gold-600 text-obsidian-950 text-[9px] tracking-widest uppercase font-bold rounded-sm mt-4">
                Tap to Order / DM
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
