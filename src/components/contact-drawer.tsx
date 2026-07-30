"use client";

import React, { useState, useEffect } from "react";
import { X, Send, CheckCircle2, MessageSquare, Mail, Phone } from "lucide-react";
import { Instagram } from "@/components/icons";

interface ContactDrawerProps {
  isOpen: boolean;
  prefilledSaree: string;
  onClose: () => void;
}

export default function ContactDrawer({ isOpen, prefilledSaree, onClose }: ContactDrawerProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    saree: "",
    message: "",
    channel: "WhatsApp"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync prefilled saree
  useEffect(() => {
    if (prefilledSaree) {
      setFormData(prev => ({ ...prev, saree: prefilledSaree }));
    }
  }, [prefilledSaree, isOpen]);

  // Lock scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to deliver inquiry");
      }

      // Also save to local storage for user redundancy
      const existing = JSON.parse(localStorage.getItem("devii_inquiries") || "[]");
      existing.push({
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString()
      });
      localStorage.setItem("devii_inquiries", JSON.stringify(existing));

      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      alert("Loom connection timeout. Please proceed with direct WhatsApp Inquiry!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      saree: "",
      message: "",
      channel: "WhatsApp"
    });
    setIsSuccess(false);
    onClose();
  };

  // WhatsApp click path for submitted details
  const whatsappNumber = "919380735763";
  const getWhatsAppSubmitUrl = () => {
    const text = `Hi Devii! My name is ${formData.name}. I just submitted an inquiry for "${formData.saree || "General Collection"}" via your website. \n\nMessage: ${formData.message}\nEmail: ${formData.email}\nPhone: ${formData.phone || "N/A"}\nPreferred Contact Channel: ${formData.channel}`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop (Dark backdrop with blur to make the white modal pop) */}
      <div 
        className="absolute inset-0 bg-black/75 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Center Modal Dialog Panel (Opaque solid white background with a soft gold border) */}
      <div className="relative w-full max-w-lg mx-4 bg-[#ffffff] border border-gold-500/30 rounded-sm shadow-[0_15px_50px_rgba(0,0,0,0.15)] overflow-hidden z-10 animate-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-gold-600 transition-colors z-20 cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {isSuccess ? (
          /* Success Screen */
          <div className="p-8 text-center space-y-6 bg-[#ffffff]">
            <div className="flex justify-center">
              <div className="p-4 bg-emerald-50 border border-emerald-500/20 text-emerald-600 rounded-full animate-bounce">
                <CheckCircle2 className="h-12 w-12" />
              </div>
            </div>
            <h3 className="font-serif text-3xl text-zinc-900 tracking-wide">
              Inquiry Received
            </h3>
            <p className="text-zinc-600 text-sm leading-relaxed max-w-sm mx-auto font-light">
              Thank you, <span className="font-semibold text-zinc-900">{formData.name}</span>. Your inquiry for <span className="italic text-gold-600 font-medium">"{formData.saree || "General Handlooms"}"</span> has been recorded.
            </p>
            <div className="bg-zinc-50 p-4 rounded-sm border border-zinc-200 text-left text-xs space-y-2 max-w-md mx-auto text-zinc-600 font-light">
              <div><strong className="text-zinc-800">Contact Channel:</strong> {formData.channel}</div>
              <div><strong className="text-zinc-800">We will reach out to:</strong> {formData.phone || formData.email}</div>
            </div>

            <div className="space-y-4 pt-4">
              <a 
                href={getWhatsAppSubmitUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-serif font-bold text-sm tracking-wider uppercase rounded-sm flex items-center justify-center gap-2 transition-all shadow-[0_4px_15px_rgba(16,185,129,0.2)] cursor-pointer"
              >
                <MessageSquare className="h-4.5 w-4.5" />
                Open WhatsApp Chat
              </a>
              <button
                onClick={resetForm}
                className="w-full py-4 border border-zinc-300 hover:border-zinc-500 text-zinc-700 font-serif text-sm tracking-wider uppercase rounded-sm transition-all cursor-pointer"
              >
                Back to Site
              </button>
            </div>
          </div>
        ) : (
          /* Form Screen */
          <div className="p-8 space-y-6 bg-[#ffffff]">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-gold-600 font-bold block mb-1">
                Direct Connection Seam
              </span>
              <h3 className="font-serif text-3xl text-zinc-900 tracking-wide">
                Artisanal Inquiry
              </h3>
              <p className="text-zinc-500 text-xs font-light mt-1.5 leading-relaxed">
                Connect directly with us to purchase sarees or enquire about custom loom despatches. No checkout pages, just authentic conversations.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-1.5 font-bold">
                  Your Name*
                </label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. Priyadarshini Sen"
                  className="w-full bg-[#ffffff] border border-gold-500/30 hover:border-gold-500/60 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/10 rounded-sm px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none transition-all duration-300"
                />
              </div>

              {/* Email / WhatsApp grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-1.5 font-bold">
                    Email Address*
                  </label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="name@domain.com"
                    className="w-full bg-[#ffffff] border border-gold-500/30 hover:border-gold-500/60 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/10 rounded-sm px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-1.5 font-bold">
                    WhatsApp Phone No.
                  </label>
                  <input 
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      const sanitized = e.target.value.replace(/[^0-9+\s\-()]/g, "");
                      setFormData({...formData, phone: sanitized});
                    }}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full bg-[#ffffff] border border-gold-500/30 hover:border-gold-500/60 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/10 rounded-sm px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none transition-all duration-300"
                  />
                </div>
              </div>

              {/* Saree Selection */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-1.5 font-bold">
                  Saree of Interest
                </label>
                <input 
                  type="text" 
                  value={formData.saree}
                  onChange={(e) => setFormData({...formData, saree: e.target.value})}
                  placeholder="e.g. Adrika Crimson Zari (or leave blank)"
                  className="w-full bg-[#ffffff] border border-gold-500/30 hover:border-gold-500/60 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/10 rounded-sm px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none transition-all duration-300"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-1.5 font-bold">
                  Message / Custom Requests*
                </label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Ask about dimensions, dispatch timelines, blouse customizations, or stock quantities..."
                  className="w-full bg-[#ffffff] border border-gold-500/30 hover:border-gold-500/60 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/10 rounded-sm px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none transition-all duration-300 resize-none"
                />
              </div>

              {/* Connection Channel */}
              <div className="pt-2">
                <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2 font-bold">
                  How should we contact you?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {["WhatsApp", "Instagram", "Email", "Phone Call"].map((item) => (
                    <button
                      type="button"
                      key={item}
                      onClick={() => setFormData({...formData, channel: item})}
                      className={`py-3 text-[10px] tracking-wider uppercase font-bold border rounded-sm transition-all cursor-pointer ${
                        formData.channel === item
                          ? "bg-gold-500/10 border-gold-500 text-gold-700"
                          : "bg-[#ffffff] border-gold-500/20 text-zinc-500 hover:border-gold-500/50"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4.5 bg-gradient-to-r from-gold-700 to-gold-500 hover:from-gold-600 hover:to-gold-400 text-white font-serif font-bold text-sm tracking-wider uppercase rounded-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_25px_rgba(212,175,55,0.2)] disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      Connecting Loom...
                    </>
                  ) : (
                    <>
                      <Send className="h-4.5 w-4.5" />
                      Submit Saree Inquiry
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
