"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser, useClerk } from "@clerk/nextjs";
import { 
  Heart, 
  MessageSquare, 
  Clock, 
  ArrowLeft, 
  Sparkles, 
  ExternalLink,
  ChevronRight,
  Send,
  X
} from "lucide-react";
import { Saree } from "@/data/sarees";

interface InquiryRecord {
  id: string;
  name: string;
  email: string;
  phone?: string;
  sareeName?: string;
  message: string;
  channel: string;
  status: string;
  createdAt: string;
}

export default function Dashboard() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [activeTab, setActiveTab] = useState<"wishlist" | "inquiries">("wishlist");
  
  const [sarees, setSarees] = useState<Saree[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // Load all dashboard data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Fetch sarees
        const sareesRes = await fetch("/api/sarees");
        const sareesData = sareesRes.ok ? await sareesRes.json() : [];
        setSarees(sareesData);

        // Fetch wishlist IDs
        const wishlistRes = await fetch("/api/wishlist");
        const wishlistData = wishlistRes.ok ? await wishlistRes.json() : [];
        setWishlistIds(wishlistData);

        // Fetch inquiries history
        const inquiriesRes = await fetch("/api/user-inquiries");
        const inquiriesData = inquiriesRes.ok ? await inquiriesRes.json() : [];
        setInquiries(inquiriesData);
      } catch (error) {
        console.error("Error loading dashboard details:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Toggle wishlist action from dashboard
  const handleRemoveWishlist = async (sareeId: string) => {
    try {
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sareeId }),
      });
      if (response.ok) {
        const data = await response.json();
        if (!data.wishlisted) {
          setWishlistIds((prev) => prev.filter((id) => id !== sareeId));
        }
      }
    } catch (error) {
      console.error("Failed to remove wishlist item:", error);
    }
  };

  // Get wishlisted saree objects
  const wishlistedSarees = sarees.filter((s) => wishlistIds.includes(s.id));

  // WhatsApp click path helper
  const getWhatsAppInquiryUrl = (sareeName: string, price: string) => {
    const whatsappNumber = "919380735763";
    const text = `Hi Devii Handlooms! I am logged in as ${user?.fullName || "customer"} and am interested in inquiring about the wishlisted "${sareeName}" saree (${price}). Please let me know its availability.`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return {
          text: "Under Review",
          style: "bg-amber-950/40 border border-amber-600/30 text-amber-400",
        };
      case "in discussion":
        return {
          text: "In Discussion",
          style: "bg-blue-950/40 border border-blue-600/30 text-blue-400",
        };
      case "dispatched":
        return {
          text: "Handed to Carrier",
          style: "bg-purple-950/40 border border-purple-600/30 text-purple-400",
        };
      case "completed":
        return {
          text: "Acquired",
          style: "bg-gold-500/10 border border-gold-500/40 text-gold-400",
        };
      default:
        return {
          text: status,
          style: "bg-zinc-900 border border-zinc-700 text-zinc-300",
        };
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-zinc-100 antialiased font-sans flex flex-col justify-between">
      <div>
        {/* Top Minimal Navigation Bar */}
        <header className="border-b border-gold-950/20 bg-obsidian-900/60 backdrop-blur-md sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-zinc-400 hover:text-gold-400 text-xs uppercase tracking-widest transition-colors font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              Return to Gallery
            </Link>

            <Link href="/" className="font-serif text-3xl tracking-[0.2em] text-gold-400 hover:text-gold-300 transition-colors pl-8">
              DEVII
            </Link>

            <button 
              onClick={() => signOut()}
              className="text-zinc-500 hover:text-red-400 text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Log Out
            </button>
          </div>
        </header>

        {/* Dashboard Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-16 w-full">
          {/* User Profile Summary */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-12 border-b border-gold-950/15">
            <div>
              <div className="flex items-center gap-2 mb-2 text-gold-400 font-bold uppercase tracking-widest text-xs">
                <Sparkles className="h-3.5 w-3.5" />
                Artisan Member Portal
              </div>
              <h1 className="font-serif text-4xl md:text-5xl tracking-wide text-zinc-100">
                Welcome, {user?.firstName || "Patron of Devii"}
              </h1>
              <p className="text-zinc-500 font-light text-sm mt-2">
                Manage your curation selections, track handmade custom inquiries, and discuss dispatches.
              </p>
            </div>
            <div className="flex items-center gap-4 bg-obsidian-900 border border-gold-950/20 px-6 py-4 rounded-sm">
              <div className="relative h-12 w-12 rounded-full overflow-hidden border border-gold-500/20">
                {user?.imageUrl ? (
                  <Image 
                    src={user.imageUrl} 
                    alt="Profile Picture" 
                    fill 
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-gold-950 flex items-center justify-center text-gold-400 font-serif font-bold text-lg">
                    {user?.firstName?.[0] || "P"}
                  </div>
                )}
              </div>
              <div>
                <div className="text-sm font-semibold text-zinc-200">{user?.fullName}</div>
                <div className="text-xs text-zinc-500">{user?.primaryEmailAddress?.emailAddress}</div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-4 border-b border-zinc-900 mb-10">
            <button
              onClick={() => setActiveTab("wishlist")}
              className={`pb-4 px-2 text-sm font-bold uppercase tracking-wider transition-all relative cursor-pointer ${
                activeTab === "wishlist"
                  ? "text-gold-400 font-bold border-b-2 border-gold-500"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <span className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Loom Vault ({wishlistIds.length})
              </span>
            </button>
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`pb-4 px-2 text-sm font-bold uppercase tracking-wider transition-all relative cursor-pointer ${
                activeTab === "inquiries"
                  ? "text-gold-400 font-bold border-b-2 border-gold-500"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <span className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Discussion Room ({inquiries.length})
              </span>
            </button>
          </div>

          {/* Loading indicator */}
          {loading ? (
            <div className="py-24 text-center">
              <div className="h-8 w-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-zinc-500 text-sm">Curation files retrieving...</p>
            </div>
          ) : (
            <div>
              {/* Loom Vault (Wishlist) View */}
              {activeTab === "wishlist" && (
                <div>
                  {wishlistedSarees.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-300">
                      {wishlistedSarees.map((saree) => (
                        <div 
                          key={saree.id}
                          className="bg-obsidian-900 border border-gold-950/30 rounded-sm overflow-hidden flex flex-col justify-between"
                        >
                          <div className="relative aspect-[4/3] w-full bg-obsidian-950">
                            <Image 
                              src={saree.image} 
                              alt={saree.name}
                              fill
                              className="object-cover"
                            />
                            <button
                              onClick={() => handleRemoveWishlist(saree.id)}
                              className="absolute top-4 right-4 p-2 bg-obsidian-950/80 border border-red-500/20 text-zinc-400 hover:text-red-400 rounded-full backdrop-blur-sm transition-all cursor-pointer"
                              title="Remove from Curation"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <div className="p-6 flex-grow">
                            <span className="text-[9px] uppercase tracking-widest text-gold-400 font-semibold block mb-1">
                              {saree.category}
                            </span>
                            <h3 className="font-serif text-2xl text-zinc-100 tracking-wide mb-2">
                              {saree.name}
                            </h3>
                            <p className="text-zinc-500 text-xs font-light line-clamp-2 leading-relaxed mb-4">
                              {saree.description}
                            </p>
                            <div className="flex items-center justify-between pt-4 border-t border-gold-950/15">
                              <div>
                                <span className="text-[9px] text-zinc-500 tracking-wider uppercase block">Acquisition Est</span>
                                <span className="font-serif text-lg font-bold text-gold-400">{saree.price}</span>
                              </div>
                              <a 
                                href={getWhatsAppInquiryUrl(saree.name, saree.price)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-gold-600/10 hover:bg-gold-500 border border-gold-500/30 hover:border-gold-500 text-gold-300 hover:text-obsidian-950 font-serif text-[10px] tracking-widest uppercase font-bold transition-all duration-300 rounded-sm flex items-center gap-1.5 cursor-pointer"
                              >
                                <Send className="h-3 w-3" />
                                Inquire
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-24 bg-obsidian-900 border border-gold-950/20 rounded-sm max-w-xl mx-auto">
                      <Heart className="h-10 w-10 text-zinc-600 mx-auto mb-4 stroke-1" />
                      <h3 className="font-serif text-xl text-zinc-300 tracking-wide mb-2">Loom Vault Empty</h3>
                      <p className="text-zinc-500 text-xs font-light max-w-sm mx-auto mb-6">
                        You haven't saved any sarees to your vault yet. Explore our latest drops to curate your heritage selections.
                      </p>
                      <Link 
                        href="/" 
                        className="px-6 py-2.5 bg-gradient-to-r from-gold-700 to-gold-500 hover:from-gold-600 hover:to-gold-400 text-obsidian-950 font-serif font-bold text-xs tracking-wider uppercase rounded-sm transition-all duration-300"
                      >
                        Browse Showroom
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Discussion Room (Inquiries History) View */}
              {activeTab === "inquiries" && (
                <div>
                  {inquiries.length > 0 ? (
                    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
                      {inquiries.map((inq) => {
                        const statusObj = getStatusStyle(inq.status);
                        return (
                          <div 
                            key={inq.id}
                            className="bg-obsidian-900 border border-gold-950/25 rounded-sm p-6 flex flex-col md:flex-row md:items-start justify-between gap-6 transition-all hover:border-gold-700/25"
                          >
                            <div className="space-y-3 flex-grow">
                              <div className="flex flex-wrap items-center gap-3">
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] tracking-wider uppercase font-bold ${statusObj.style}`}>
                                  {statusObj.text}
                                </span>
                                <span className="flex items-center gap-1 text-[10px] text-zinc-500 tracking-wider">
                                  <Clock className="h-3 w-3" />
                                  {new Date(inq.createdAt).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric"
                                  })}
                                </span>
                              </div>
                              
                              <h3 className="font-serif text-2xl text-zinc-200">
                                {inq.sareeName ? `Inquiry: ${inq.sareeName}` : "General Collection Inquiry"}
                              </h3>
                              
                              <p className="text-zinc-400 text-xs font-light leading-relaxed bg-obsidian-950/45 p-4 rounded-sm border border-zinc-950">
                                <span className="text-zinc-500 uppercase tracking-widest text-[9px] block mb-1">Your Message</span>
                                "{inq.message}"
                              </p>

                              <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-zinc-500 font-light">
                                <div><span className="font-semibold text-zinc-400">Channel:</span> {inq.channel}</div>
                                {inq.phone && <div><span className="font-semibold text-zinc-400">Phone:</span> {inq.phone}</div>}
                                <div><span className="font-semibold text-zinc-400">Email:</span> {inq.email}</div>
                              </div>
                            </div>

                            <div className="flex flex-col items-stretch gap-2 shrink-0 w-full md:w-auto">
                              {inq.channel === "WhatsApp" && (
                                <a 
                                  href={`https://wa.me/919380735763?text=${encodeURIComponent(`Hi Devii! Reconnecting about my inquiry for ${inq.sareeName || "Saree Selection"} (ID: ${inq.id}).`)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-4 py-2.5 bg-emerald-600/10 hover:bg-emerald-600 border border-emerald-500/30 hover:border-emerald-500 text-emerald-400 hover:text-white text-center text-[10px] tracking-widest uppercase font-bold transition-all duration-300 rounded-sm flex items-center justify-center gap-1.5"
                                >
                                  <ExternalLink className="h-3.5 w-3.5" />
                                  Resume Chat
                                </a>
                              )}
                              <a 
                                href={`mailto:contact@deviihandloom.in?subject=Discussion Room Saree Inquiry ${inq.id}`}
                                className="px-4 py-2.5 bg-obsidian-950 hover:bg-gold-500 border border-gold-950/50 hover:border-gold-500 text-zinc-400 hover:text-obsidian-950 text-center text-[10px] tracking-widest uppercase font-bold transition-all duration-300 rounded-sm flex items-center justify-center gap-1.5"
                              >
                                Email Weaver
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-24 bg-obsidian-900 border border-gold-950/20 rounded-sm max-w-xl mx-auto">
                      <MessageSquare className="h-10 w-10 text-zinc-600 mx-auto mb-4 stroke-1" />
                      <h3 className="font-serif text-xl text-zinc-300 tracking-wide mb-2">No Discussion History</h3>
                      <p className="text-zinc-500 text-xs font-light max-w-sm mx-auto mb-6">
                        You have not submitted any inquiries or custom orders yet. Use the showroom forms to submit your first dispatch request.
                      </p>
                      <Link 
                        href="/" 
                        className="px-6 py-2.5 bg-gradient-to-r from-gold-700 to-gold-500 hover:from-gold-600 hover:to-gold-400 text-obsidian-950 font-serif font-bold text-xs tracking-wider uppercase rounded-sm transition-all duration-300"
                      >
                        Explore Gallery
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Footer copyright */}
      <footer className="border-t border-gold-950/15 py-8 bg-obsidian-950">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-zinc-500 text-xs gap-4">
          <div>© {new Date().getFullYear()} Devii Handlooms. All rights preserved.</div>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-gold-400 transition-colors">Showroom Gallery</Link>
            <span>•</span>
            <a href="https://www.instagram.com/devii.handloom" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors">Instagram Direct</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
