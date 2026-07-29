"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser, useClerk } from "@clerk/nextjs";
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Check, 
  X, 
  Loader2, 
  Sparkles, 
  AlertTriangle,
  Upload,
  RefreshCw,
  ShoppingBag
} from "lucide-react";
import { Saree } from "@/data/sarees";

interface ExtendedSaree extends Saree {
  details: string[];
}

export default function AdminPortal() {
  const { user, isLoaded: userLoaded } = useUser();
  const { signOut } = useClerk();
  
  // States
  const [sarees, setSarees] = useState<ExtendedSaree[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    category: "Traditional Handloom",
    material: "",
    price: "₹",
    origin: "",
    craftName: "",
    description: "",
    image: "",
  });
  
  const [detailInput, setDetailInput] = useState("");
  const [detailsList, setDetailsList] = useState<string[]>([]);
  const [imageInputMode, setImageInputMode] = useState<"upload" | "url">("upload");

  // Allowed emails config
  const allowedEmails = ["abhijeetagarwal35@gmail.com", "handloomdevii@gmail.com"];
  const userEmail = user?.emailAddresses?.[0]?.emailAddress;
  const isAdmin = userEmail && allowedEmails.includes(userEmail);

  // Load sarees
  const loadSarees = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/sarees");
      if (res.ok) {
        const data = await res.json();
        setSarees(data);
      }
    } catch (err) {
      console.error("Failed to load sarees:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userLoaded && isAdmin) {
      loadSarees();
    }
  }, [userLoaded, userEmail]);

  // Handle Client-side Image Compression (max 600px, quality 0.7)
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new window.Image();
      img.src = reader.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        
        const maxDim = 600;
        let width = img.width;
        let height = img.height;
        
        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);
        
        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
        setFormData(prev => ({ ...prev, image: compressedBase64 }));
      };
    };
    reader.readAsDataURL(file);
  };

  // Add detail bullet point
  const handleAddDetail = () => {
    if (detailInput.trim()) {
      setDetailsList([...detailsList, detailInput.trim()]);
      setDetailInput("");
    }
  };

  // Remove detail bullet point
  const handleRemoveDetail = (index: number) => {
    setDetailsList(detailsList.filter((_, i) => i !== index));
  };

  // Add Saree Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    
    if (!formData.image) {
      setErrorMsg("Please upload a product photo or specify an image URL.");
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch("/api/sarees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          details: detailsList,
        }),
      });

      const resData = await response.json();
      if (response.ok) {
        setSuccessMsg(`Successfully added "${formData.name}" to the showroom!`);
        // Reset form
        setFormData({
          name: "",
          category: "Traditional Handloom",
          material: "",
          price: "₹",
          origin: "",
          craftName: "",
          description: "",
          image: "",
        });
        setDetailsList([]);
        loadSarees();
      } else {
        setErrorMsg(resData.error || "Failed to add product.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Saree handler
  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This action is permanent.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/sarees?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSuccessMsg(`Deleted "${name}" successfully.`);
        loadSarees();
      } else {
        const data = await response.json();
        setErrorMsg(data.error || "Failed to delete.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred.");
    }
  };

  // Toggle Stock Status handler
  const handleToggleStock = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch("/api/sarees", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, inStock: !currentStatus }),
      });

      if (response.ok) {
        loadSarees();
      } else {
        const data = await response.json();
        setErrorMsg(data.error || "Failed to update stock status.");
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  // Loading Gate
  if (!userLoaded) {
    return (
      <div className="min-h-screen bg-obsidian-950 flex flex-col items-center justify-center text-zinc-400">
        <Loader2 className="h-8 w-8 text-gold-500 animate-spin mb-4" />
        <p className="text-xs uppercase tracking-widest">Validating credentials...</p>
      </div>
    );
  }

  // Access Denied gate
  if (userLoaded && !isAdmin) {
    return (
      <div className="min-h-screen bg-obsidian-950 flex flex-col items-center justify-center px-6 text-center">
        <div className="bg-red-950/20 border border-red-500/20 p-8 rounded-sm max-w-md shadow-2xl">
          <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h2 className="font-serif text-2xl text-zinc-100 mb-3 tracking-wide">Access Denied</h2>
          <p className="text-zinc-500 text-sm font-light leading-relaxed mb-6">
            You are logged in as <span className="font-semibold text-zinc-300">{userEmail}</span>. This portal is restricted to authorized designers and creators of Devii Handloom only.
          </p>
          <div className="flex flex-col gap-3">
            <Link 
              href="/"
              className="px-6 py-2.5 bg-gradient-to-r from-gold-700 to-gold-500 text-obsidian-950 font-serif font-bold text-xs tracking-wider uppercase rounded-sm transition-all"
            >
              Return to Gallery
            </Link>
            <button 
              onClick={() => signOut()}
              className="text-xs text-zinc-500 hover:text-zinc-300 uppercase tracking-widest transition-colors py-2"
            >
              Sign In with different account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian-950 text-zinc-100 antialiased font-sans flex flex-col justify-between">
      <div>
        {/* Navigation Bar */}
        <header className="border-b border-gold-950/20 bg-obsidian-900/60 backdrop-blur-md sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-zinc-400 hover:text-gold-400 text-xs uppercase tracking-widest transition-colors font-medium cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              Main Showroom
            </Link>

            <div className="font-serif text-2xl tracking-[0.2em] text-gold-400">
              DEVII <span className="text-[10px] tracking-widest uppercase font-sans font-bold text-zinc-500 ml-1">Creator Panel</span>
            </div>

            <button 
              onClick={() => signOut()}
              className="text-zinc-500 hover:text-red-400 text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Log Out
            </button>
          </div>
        </header>

        {/* Dashboard Frame */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          
          {/* Header Message */}
          <div className="mb-10 pb-6 border-b border-gold-950/15 flex flex-col sm:flex-row justify-between sm:items-end gap-4">
            <div>
              <div className="flex items-center gap-1.5 mb-2 text-gold-400 font-bold uppercase tracking-widest text-[10px]">
                <Sparkles className="h-3.5 w-3.5" />
                Live Showroom Management
              </div>
              <h1 className="font-serif text-3xl md:text-4xl text-zinc-100">
                Welcome, Curator
              </h1>
            </div>
            <div className="text-zinc-500 text-xs font-light">
              Signed in as: <span className="text-zinc-300 font-semibold">{userEmail}</span>
            </div>
          </div>

          {/* Feedback alerts */}
          {errorMsg && (
            <div className="mb-8 p-4 bg-red-950/40 border border-red-500/20 text-red-300 text-xs rounded-sm flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" />
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="mb-8 p-4 bg-emerald-950/40 border border-emerald-500/20 text-emerald-300 text-xs rounded-sm flex items-center gap-2 animate-in fade-in duration-200">
              <Check className="h-4 w-4 flex-shrink-0" />
              {successMsg}
            </div>
          )}

          {/* Split Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Side: Add Product Form (Col 5) */}
            <div className="lg:col-span-5 bg-obsidian-900 border border-gold-950/30 p-6 sm:p-8 rounded-sm self-start">
              <h2 className="font-serif text-xl text-gold-400 mb-6 pb-3 border-b border-gold-950/10 flex items-center gap-2">
                <Plus className="h-5 w-5" /> Add Saree Master
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Saree Name */}
                <div>
                  <label className="block text-[9px] uppercase tracking-widest text-zinc-400 mb-1.5 font-bold">
                    Saree Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Vaikuntha Emerald Jamdani"
                    className="w-full bg-obsidian-950 border border-gold-950/40 rounded-sm px-4 py-2.5 text-xs text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>

                {/* Grid category / material */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] uppercase tracking-widest text-zinc-400 mb-1.5 font-bold">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-obsidian-950 border border-gold-950/40 rounded-sm px-3 py-2.5 text-xs text-zinc-300 focus:outline-none focus:border-gold-500 transition-colors"
                    >
                      <option value="Traditional Handloom">Traditional Handloom</option>
                      <option value="Heritage Cotton-Silk">Heritage Cotton-Silk</option>
                      <option value="Artisanal block Print">Artisanal block Print</option>
                      <option value="Khadi & Handspun">Khadi & Handspun</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase tracking-widest text-zinc-400 mb-1.5 font-bold">
                      Material *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.material}
                      onChange={e => setFormData({...formData, material: e.target.value})}
                      placeholder="e.g. Mulberry Silk & Cotton"
                      className="w-full bg-obsidian-950 border border-gold-950/40 rounded-sm px-4 py-2.5 text-xs text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Grid price / origin / craft */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[9px] uppercase tracking-widest text-zinc-400 mb-1.5 font-bold">
                      Price *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: e.target.value})}
                      placeholder="e.g. ₹18,500"
                      className="w-full bg-obsidian-950 border border-gold-950/40 rounded-sm px-3 py-2.5 text-xs text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase tracking-widest text-zinc-400 mb-1.5 font-bold">
                      Origin *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.origin}
                      onChange={e => setFormData({...formData, origin: e.target.value})}
                      placeholder="e.g. Bengal"
                      className="w-full bg-obsidian-950 border border-gold-950/40 rounded-sm px-3 py-2.5 text-xs text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase tracking-widest text-zinc-400 mb-1.5 font-bold">
                      Craft Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.craftName}
                      onChange={e => setFormData({...formData, craftName: e.target.value})}
                      placeholder="e.g. Jamdani"
                      className="w-full bg-obsidian-950 border border-gold-950/40 rounded-sm px-3 py-2.5 text-xs text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Saree Description */}
                <div>
                  <label className="block text-[9px] uppercase tracking-widest text-zinc-400 mb-1.5 font-bold">
                    Description / Story *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe the weaving heritage and artistic design pattern..."
                    className="w-full bg-obsidian-950 border border-gold-950/40 rounded-sm px-4 py-2.5 text-xs text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>

                {/* Bullet details list builder */}
                <div>
                  <label className="block text-[9px] uppercase tracking-widest text-zinc-400 mb-1.5 font-bold">
                    Key Specifications / Features
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={detailInput}
                      onChange={e => setDetailInput(e.target.value)}
                      placeholder="e.g. Pure Zari work border"
                      className="flex-grow bg-obsidian-950 border border-gold-950/40 rounded-sm px-3 py-2 text-xs text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-gold-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={handleAddDetail}
                      className="px-3 bg-gold-600 hover:bg-gold-500 text-obsidian-950 rounded-sm text-xs font-bold transition-all cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                  {/* Render added list */}
                  {detailsList.length > 0 && (
                    <ul className="space-y-1.5 bg-obsidian-950/50 p-3 rounded-sm border border-gold-950/15">
                      {detailsList.map((det, i) => (
                        <li key={i} className="flex justify-between items-center text-[11px] text-zinc-300">
                          <span>• {det}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveDetail(i)}
                            className="text-red-500 hover:text-red-400 ml-2"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Image Section */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-[9px] uppercase tracking-widest text-zinc-400 font-bold">
                      Saree Image *
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => { setImageInputMode("upload"); setFormData({...formData, image: ""}); }}
                        className={`text-[8px] tracking-widest uppercase px-2 py-0.5 rounded-sm border ${
                          imageInputMode === "upload"
                            ? "bg-gold-500/10 border-gold-500 text-gold-300 font-bold"
                            : "border-zinc-800 text-zinc-500 hover:text-zinc-300"
                        }`}
                      >
                        File Upload
                      </button>
                      <button
                        type="button"
                        onClick={() => { setImageInputMode("url"); setFormData({...formData, image: ""}); }}
                        className={`text-[8px] tracking-widest uppercase px-2 py-0.5 rounded-sm border ${
                          imageInputMode === "url"
                            ? "bg-gold-500/10 border-gold-500 text-gold-300 font-bold"
                            : "border-zinc-800 text-zinc-500 hover:text-zinc-300"
                        }`}
                      >
                        Image URL
                      </button>
                    </div>
                  </div>

                  {imageInputMode === "upload" ? (
                    <div className="relative border-2 border-dashed border-gold-950/30 hover:border-gold-500/30 rounded-sm bg-obsidian-950 p-4 transition-colors flex flex-col items-center justify-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      {formData.image ? (
                        <div className="text-center">
                          <Check className="h-6 w-6 text-emerald-400 mx-auto mb-1.5" />
                          <span className="text-[10px] text-zinc-300 block font-semibold">Image Uploaded</span>
                          <span className="text-[9px] text-zinc-500 italic truncate max-w-[200px] block">
                            (Base64 Compressed Successfully)
                          </span>
                        </div>
                      ) : (
                        <div className="text-center text-zinc-500">
                          <Upload className="h-6 w-6 text-gold-500/60 mx-auto mb-2" />
                          <span className="text-[10px] uppercase tracking-wider block text-zinc-400 font-semibold">
                            Upload Photo
                          </span>
                          <span className="text-[9px] text-zinc-600 block mt-0.5">
                            JPEG / PNG (Auto-compressed to &lt;50KB)
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <input
                      type="url"
                      value={formData.image}
                      onChange={e => setFormData({...formData, image: e.target.value})}
                      placeholder="https://images.domain.com/saree.jpg"
                      className="w-full bg-obsidian-950 border border-gold-950/40 rounded-sm px-4 py-2.5 text-xs text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-gradient-to-r from-gold-700 to-gold-500 hover:from-gold-600 hover:to-gold-400 text-obsidian-950 font-serif font-bold text-xs tracking-wider uppercase rounded-sm transition-all shadow-[0_4px_20px_rgba(212,175,55,0.15)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Publishing to Showroom...
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" />
                      Publish Saree to Catalog
                    </>
                  )}
                </button>

              </form>
            </div>

            {/* Right Side: Product Catalog List (Col 7) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex justify-between items-center mb-2 pb-3 border-b border-gold-950/10">
                <h2 className="font-serif text-xl text-zinc-200 flex items-center gap-2">
                  Live Showroom Catalog ({sarees.length})
                </h2>
                <button 
                  onClick={loadSarees}
                  className="p-2 border border-gold-950/30 text-gold-400 hover:bg-gold-950/50 rounded-sm transition-all cursor-pointer"
                  title="Reload Catalog"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                </button>
              </div>

              {loading ? (
                <div className="py-24 text-center">
                  <Loader2 className="h-8 w-8 text-gold-500 animate-spin mx-auto mb-4" />
                  <p className="text-xs uppercase tracking-widest text-zinc-500">Retrieving catalog records...</p>
                </div>
              ) : sarees.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
                  {sarees.map((saree) => (
                    <div 
                      key={saree.id}
                      className="bg-obsidian-900 border border-gold-950/20 rounded-sm overflow-hidden flex flex-col justify-between shadow-lg"
                    >
                      <div className="relative aspect-[4/3] w-full bg-obsidian-950">
                        <Image 
                          src={saree.image} 
                          alt={saree.name}
                          fill
                          sizes="(max-width: 600px) 100vw, 50vw"
                          className="object-cover"
                        />
                        <button
                          onClick={() => handleDelete(saree.id, saree.name)}
                          className="absolute top-3 right-3 p-2 bg-red-950/90 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white rounded-full transition-all cursor-pointer"
                          title="Delete Saree"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="p-4 flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-[8px] uppercase tracking-widest text-gold-400 font-bold">
                              {saree.category}
                            </span>
                            <span className="text-[9px] text-zinc-500">{saree.origin}</span>
                          </div>
                          <h3 className="font-serif text-lg text-zinc-200 tracking-wide line-clamp-1">
                            {saree.name}
                          </h3>
                          <p className="text-zinc-500 text-[10px] font-light line-clamp-2 mt-1 mb-3">
                            {saree.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-gold-950/15">
                          <span className="font-serif text-gold-400 font-bold text-sm">
                            {saree.price}
                          </span>
                          
                          {/* Stock status toggle */}
                          <button
                            onClick={() => handleToggleStock(saree.id, saree.inStock)}
                            className={`px-3 py-1 text-[8px] tracking-widest uppercase font-bold rounded-sm border cursor-pointer transition-all ${
                              saree.inStock
                                ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-400 hover:bg-red-950/20 hover:border-red-500/30 hover:text-red-400 hover:content-['Out']"
                                : "bg-red-950/40 border-red-500/30 text-red-400 hover:bg-emerald-950/20 hover:border-emerald-500/30 hover:text-emerald-400"
                            }`}
                          >
                            {saree.inStock ? "● In Stock" : "○ Out of Stock"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-24 bg-obsidian-900 border border-gold-950/20 rounded-sm">
                  <p className="text-zinc-500 text-xs">Catalog is currently empty.</p>
                </div>
              )}

            </div>

          </div>

        </main>
      </div>

      {/* Admin Footer */}
      <footer className="border-t border-gold-950/20 py-8 bg-obsidian-950 text-center text-[10px] text-zinc-600 tracking-wider">
        DEVII HANDLOOMS INC. • EXCLUSIVE OWNER CATALOG OPERATIONS
      </footer>
    </div>
  );
}
