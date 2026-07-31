"use client";

import React, { useState } from "react";
import { ShieldCheck, HeartHandshake, Eye, ChevronDown, ChevronUp } from "lucide-react";

export default function OurStory() {
  const [isExpanded, setIsExpanded] = useState(false);
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

          <p className="text-zinc-600 dark:text-zinc-400 font-light leading-relaxed text-sm md:text-base">
            We have always loved sarees. The drape, the colours, the quiet elegance of six yards that can carry a hundred stories. But growing up in India, we also noticed something we couldn't ignore. India is a hot, humid, tropical country, and yet we would watch women dressed in beautiful silk sarees, visibly uncomfortable, sweating through weddings and festivals, quietly enduring it because that's just what you did.
          </p>

          <p className="text-zinc-600 dark:text-zinc-400 font-light leading-relaxed text-sm md:text-base">
            We would see it in our own mothers and aunts. The pallu held a little too tight, the fanning between photographs, the relief on their faces the moment the saree finally came off at the end of the night. And every time, the same question came back to us. Why should looking beautiful mean feeling this uncomfortable? Why should the same climate that gave us some of the finest cotton and silk in the world also be the reason we struggle to wear them?
          </p>

          {/* Read More Toggle Button */}
          <div className="pt-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-6 py-2.5 border border-gold-500/30 hover:border-gold-500/80 text-gold-700 dark:text-gold-400 font-serif font-bold text-xs tracking-widest uppercase rounded-sm flex items-center gap-2 transition-all duration-300 hover:bg-gold-500/5 cursor-pointer"
            >
              {isExpanded ? (
                <>
                  Read Less <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Read More <ChevronDown className="h-4 w-4" />
                </>
              )}
            </button>
          </div>

          {/* Collapsible Content */}
          <div className={`space-y-6 transition-all duration-700 ease-in-out overflow-hidden ${
            isExpanded ? "max-h-[2500px] opacity-100 mt-6" : "max-h-0 opacity-0 pointer-events-none mt-0"
          }`}>
            <p className="text-zinc-600 dark:text-zinc-400 font-light leading-relaxed text-sm md:text-base font-medium text-gold-600 dark:text-gold-400">
              That question became Devii.
            </p>

            <p className="text-zinc-600 dark:text-zinc-400 font-light leading-relaxed text-sm md:text-base">
              We started travelling to weavers across India, from small clusters to well-known weaving towns, looking for fabric that didn't just look good but felt good against the skin, in our heat, for hours at a stretch. Every saree we choose has to earn its place with us. It has to breathe. It has to move with the body instead of clinging to it. And it still has to shine, drape beautifully, and hold its own with the trends women love today.
            </p>

            <p className="text-zinc-600 dark:text-zinc-400 font-light leading-relaxed text-sm md:text-base">
              Because comfort was never meant to be a compromise. A saree should carry you through a long day, a longer function, a family that won't stop taking photos, and still let you feel like yourself by the end of it.
            </p>

            <p className="text-zinc-600 dark:text-zinc-400 font-light leading-relaxed text-sm md:text-base">
              This is why we say, <strong className="font-bold text-gold-600 dark:text-gold-400">wear your power</strong>. Real confidence starts with actually being comfortable in your own skin, and in what you're wearing over it.
            </p>

            <div className="h-px w-full bg-gold-950/10 dark:bg-gold-500/10 my-8" />

            <p className="text-zinc-600 dark:text-zinc-400 font-light leading-relaxed text-sm md:text-base">
              In an era of high-speed synthetic textiles and throwaway fashion, Devii stands as a quiet sanctuary for slow, hand-crafted weaves. We specialize in Cotton and Handloom Sarees, celebrating the delicate imperfections that tell the story of the artisan's hands.
            </p>

            <p className="text-zinc-600 dark:text-zinc-400 font-light leading-relaxed text-sm md:text-base">
              Each saree takes anywhere from five days to three weeks to weave on traditional wooden pit looms. The thread is often handspun (Khadi) or dyed naturally using traditional block prints like Ajrakh. By showcase-selling these collections offline and through direct inquiry, we maintain an intimate connection with our patrons and weavers alike.
            </p>

            <blockquote className="border-l-2 border-gold-500 pl-6 my-8 italic text-zinc-300 font-serif text-lg">
              "A handloom saree is not merely six yards of fabric; it is a canvas of patience, memory, and generational wisdom."
            </blockquote>
          </div>
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
