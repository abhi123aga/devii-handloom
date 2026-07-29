"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Collections from "@/components/collections";
import OurStory from "@/components/our-story";
import InstagramFeed from "@/components/instagram-feed";
import Footer from "@/components/footer";
import ProductDrawer from "@/components/product-drawer";
import ContactDrawer from "@/components/contact-drawer";
import { Saree } from "@/data/sarees";
import { useAuth } from "@clerk/nextjs";
import WhatsAppButton from "@/components/whatsapp-button";

export default function Home() {
  const [sarees, setSarees] = useState<Saree[]>([]);
  const [selectedSaree, setSelectedSaree] = useState<Saree | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [prefilledSareeName, setPrefilledSareeName] = useState("");
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const fetchSarees = async () => {
      try {
        const response = await fetch("/api/sarees");
        if (response.ok) {
          const data = await response.json();
          setSarees(data);
        }
      } catch (error) {
        console.error("Failed to fetch sarees:", error);
      }
    };
    fetchSarees();
  }, []);

  // Fetch wishlist when signed in
  useEffect(() => {
    if (!isSignedIn) {
      setWishlistIds([]);
      return;
    }
    const fetchWishlist = async () => {
      try {
        const response = await fetch("/api/wishlist");
        if (response.ok) {
          const data = await response.json();
          setWishlistIds(data);
        }
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      }
    };
    fetchWishlist();
  }, [isSignedIn]);

  const handleToggleWishlist = async (sareeId: string) => {
    try {
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sareeId }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.wishlisted) {
          setWishlistIds((prev) => [...prev, sareeId]);
        } else {
          setWishlistIds((prev) => prev.filter((id) => id !== sareeId));
        }
      }
    } catch (error) {
      console.error("Failed to toggle wishlist:", error);
    }
  };

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleOpenContact = () => {
    // If user has wishlist items, we can prefill the form with their wishlist names
    if (wishlistIds.length > 0) {
      const wishlistedNames = sarees
        .filter((s) => wishlistIds.includes(s.id))
        .map((s) => s.name)
        .join(", ");
      setPrefilledSareeName(`Wishlist: ${wishlistedNames}`);
    } else {
      setPrefilledSareeName("");
    }
    setIsContactOpen(true);
  };

  const handleOpenContactWithSaree = (sareeName: string) => {
    setPrefilledSareeName(sareeName);
    setIsContactOpen(true);
  };

  const handleSelectSaree = (saree: Saree) => {
    setSelectedSaree(saree);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-obsidian-950 text-zinc-100 antialiased overflow-x-hidden">
      {/* Navbar */}
      <Navbar onOpenContact={handleOpenContact} onScrollToSection={handleScrollToSection} />

      {/* Main Layout Sections */}
      <main className="flex-grow pt-20">
        <Hero
          onScrollToCollections={() => handleScrollToSection("collections")}
          onOpenContact={handleOpenContact}
        />
        <Collections
          sarees={sarees}
          onSelectSaree={handleSelectSaree}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
        />
        <OurStory />
        <InstagramFeed />
      </main>

      {/* Footer */}
      <Footer onScrollToSection={handleScrollToSection} onOpenContact={handleOpenContact} />

      {/* Slide-out Product Details Drawer */}
      <ProductDrawer
        saree={selectedSaree}
        onClose={() => setSelectedSaree(null)}
        onOpenContactWithSaree={handleOpenContactWithSaree}
      />

      {/* Centered Inquiry Contact Modal */}
      <ContactDrawer
        isOpen={isContactOpen}
        prefilledSaree={prefilledSareeName}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Floating WhatsApp Quick Connect Widget */}
      <WhatsAppButton />
    </div>
  );
}
