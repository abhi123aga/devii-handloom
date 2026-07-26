"use client";

import React from "react";
import { ShieldCheck, HeartHandshake, Eye } from "lucide-react";

export default function OurStory() {
  const pillars = [
    {
      icon: <ShieldCheck className="h-6 w-6 text-gold-500" />,
      title: "100% Weave Authenticity",
      desc: "Every saree in our showcase is verified for yarn quality and handloom authenticity. We reject powerloom duplicates to bring you the real texture and weight of genuine Indian craft."
    },
    {
      icon: <HeartHandshake className="h-6 w-6 text-gold-500" />,
      title: "Direct Loom Sourcing",
      desc: "We work directly with artisanal families in Chanderi, Maheshwar, Kachchh, and West Bengal. By bypassing middlemen, we ensure that weavers receive fair wages for their immense labor."
    },
    {
      icon: <Eye className="h-6 w-6 text-gold-500" />,
      title: "Radical Transparency",
      desc: "We list the exact yarn counts (like 80s/100s combed threads), natural vegetable dyes, and weave history for every saree. Know exactly what you drape, where it came from, and who crafted it."
    }
  ];

  return (
    <section id="story" className="py-24 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 border-t border-gold-950/20 bg-obsidian-950/40">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: Narrative */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center space-x-2">
            <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-bold">Our Philosophy</span>
          </div>
          
          <h2 className="font-serif text-4xl md:text-5xl text-zinc-100 tracking-wide leading-tight">
            Preserving the Slow Craft <br />
            <span className="italic text-gold-300 font-light">of Indian Handlooms</span>
          </h2>
          
          <div className="h-0.5 w-16 bg-gold-600/40 mb-6" />

          <p className="text-zinc-400 font-light leading-relaxed text-sm md:text-base">
            In an era of high-speed synthetic textiles and throwaway fashion, Devii stands as a quiet sanctuary for slow, hand-crafted weaves. We specialize in Cotton and Handloom Sarees, celebrating the delicate imperfections that tell the story of the artisan's hands.
          </p>

          <p className="text-zinc-400 font-light leading-relaxed text-sm md:text-base">
            Each saree takes anywhere from five days to three weeks to weave on traditional wooden pit looms. The thread is often handspun (Khadi) or dyed naturally using traditional block prints like Ajrakh. By showcase-selling these collections offline and through direct inquiry, we maintain an intimate connection with our patrons and weavers alike.
          </p>

          <blockquote className="border-l-2 border-gold-500 pl-6 my-8 italic text-zinc-300 font-serif text-lg">
            "A handloom saree is not merely six yards of fabric; it is a canvas of patience, memory, and generational wisdom."
          </blockquote>
        </div>

        {/* Right Column: Pillars / Feature Highlights */}
        <div className="lg:col-span-5 space-y-8">
          {pillars.map((p, idx) => (
            <div key={idx} className="bg-obsidian-900 border border-gold-950/30 p-6 rounded-sm flex gap-4 transition-all duration-300 hover:border-gold-700/30">
              <div className="flex-shrink-0 p-3 bg-obsidian-950 rounded-sm border border-gold-950/40 self-start">
                {p.icon}
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-lg text-zinc-200">{p.title}</h4>
                <p className="text-zinc-500 text-xs font-light leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
