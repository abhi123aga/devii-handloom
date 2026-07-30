"use client";

import React from "react";
import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";
import { Instagram } from "@/components/icons";

export default function InstagramFeed() {
  const feedPosts = [
    {
      id: 1,
      image: "/images/instagram_1.png",
      link: "https://www.instagram.com/p/Cqky2jtDH1L/",
      likes: "248",
      comments: "14",
      tag: "#cottonhandloom #deviihandlooms"
    },
    {
      id: 2,
      image: "/images/instagram_2.png",
      link: "https://www.instagram.com/p/CqkwFzvssch/",
      likes: "312",
      comments: "28",
      tag: "#traditionalsaree #handloomlove"
    }
  ];

  return (
    <section id="instagram" className="py-24 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 border-t border-gold-950/20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Instagram className="h-4 w-4 text-gold-600 dark:text-gold-500" />
            <span className="text-xs uppercase tracking-[0.25em] text-gold-600 dark:text-gold-400 font-bold">Social Showroom</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-zinc-100 tracking-wide">
            Our Instagram Marketplace
          </h2>
          <div className="h-0.5 w-16 bg-gold-600/40 mt-4 mb-2" />
          <p className="text-zinc-600 dark:text-zinc-500 font-light text-sm max-w-xl">
            We list and sell catalog drop releases live on our social feed. Follow <a href="https://www.instagram.com/devii.handloom" target="_blank" rel="noopener noreferrer" className="text-gold-600 hover:text-gold-500 dark:text-gold-400 dark:hover:text-gold-300 font-medium transition-colors">@devii.handloom</a> to catch fresh loom dispatches first.
          </p>
        </div>
      </div>

      {/* Grid of Posts (Centered, 2 Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {feedPosts.map((post) => (
          <a 
            key={post.id}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square w-full rounded-sm overflow-hidden border border-gold-950/40 bg-obsidian-900 cursor-pointer"
          >
            {/* Post Image */}
            <Image
              src={post.image}
              alt="Devii Instagram Saree Post"
              fill
              sizes="(max-w-768px) 100vw, 50vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-obsidian-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center space-y-4">
              <Instagram className="h-8 w-8 text-gold-400 mb-2" />
              

              


              <span className="px-4 py-1.5 bg-gold-600 text-obsidian-950 text-[9px] tracking-widest uppercase font-bold rounded-sm mt-4">
                View on Instagram / Order
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
