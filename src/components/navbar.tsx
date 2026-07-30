"use client";

import React, { useState } from "react";
import { Menu, X, Mail, Phone } from "lucide-react";
import { Instagram } from "@/components/icons";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "@/components/theme-toggle";

interface NavbarProps {
  onOpenContact: () => void;
  onScrollToSection: (id: string) => void;
}

export default function Navbar({ onOpenContact, onScrollToSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn } = useAuth();

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    onScrollToSection(id);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#fdf2f4] shadow-sm transition-all duration-300">
      <div className="w-full px-4 sm:px-6">
        <div className="flex items-center justify-between h-30 md:h-40">
          
          {/* Desktop Left: Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 flex-1">
            <button
              onClick={() => handleNavClick("story")}
              className="px-6 py-2.5 bg-gradient-to-r from-gold-700 to-gold-500 hover:from-gold-600 hover:to-gold-400 text-zinc-950 font-serif font-bold text-xs tracking-widest uppercase rounded-sm transition-all duration-300 shadow-[0_4px_15px_rgba(181,137,44,0.15)] hover:shadow-[0_4px_20px_rgba(181,137,44,0.3)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Our Story
            </button>
            <button
              onClick={() => handleNavClick("instagram")}
              className="px-6 py-2.5 bg-gradient-to-r from-gold-700 to-gold-500 hover:from-gold-600 hover:to-gold-400 text-zinc-950 font-serif font-bold text-xs tracking-widest uppercase rounded-sm transition-all duration-300 shadow-[0_4px_15px_rgba(181,137,44,0.15)] hover:shadow-[0_4px_20px_rgba(181,137,44,0.3)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Artisanal Feed
            </button>
          </div>

          {/* Desktop Center: Brand Logo Image (White background merges seamlessly, sized directly to fit container) */}
          <div
            className="flex-shrink-0 flex items-center justify-center cursor-pointer py-1"
            onClick={() => handleNavClick("hero")}
          >
            <Image
              src="/images/logo-header.png"
              alt="DEVII"
              width={360}
              height={144}
              className="h-36 w-auto object-contain mix-blend-multiply"
              priority
            />
          </div>

          {/* Mobile Logo Container (Shown on left on mobile, sized directly to fit container) */}
          <div
            className="md:hidden flex-shrink-0 flex items-center cursor-pointer"
            onClick={() => handleNavClick("hero")}
          >
            <Image
              src="/images/logo-header.png"
              alt="DEVII"
              width={260}
              height={104}
              className="h-26 w-auto object-contain mix-blend-multiply"
              priority
            />
          </div>

          {/* Desktop Right: Instagram Follow, Theme Toggle, Auth */}
          <div className="hidden md:flex items-center justify-end space-x-6 flex-1">
            <a
              href="https://www.instagram.com/devii.handloom"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-gradient-to-tr from-[#fdf497] via-[#d62976] to-[#4f5bd5] hover:opacity-90 text-white text-xs font-serif font-bold tracking-widest uppercase rounded-sm flex items-center gap-2.5 transition-all duration-300 shadow-[0_4px_15px_rgba(214,41,118,0.2)] hover:shadow-[0_4px_20px_rgba(214,41,118,0.45)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Instagram className="h-4 w-4 text-white animate-[pulse_3s_infinite]" />
              Follow Us @devii.handloom
            </a>
            <ThemeToggle />
            
            {/* Loom Vault commented out for now */}

            {isSignedIn ? (
              <UserButton />
            ) : (
              <SignInButton mode="modal">
                <button className="text-xs uppercase tracking-widest text-black hover:text-gold-600 font-medium transition-colors cursor-pointer">
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>

          {/* Mobile right menu controls */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-zinc-700 hover:text-gold-600 focus:outline-none transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#fdf2f4] border-b border-zinc-200 animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="px-6 pt-4 pb-8 space-y-6 flex flex-col">
            <button
              onClick={() => handleNavClick("story")}
              className="text-left text-zinc-800 hover:text-gold-600 font-medium tracking-widest text-sm uppercase py-2 border-b border-zinc-100 transition-colors cursor-pointer"
            >
              Our Story
            </button>
            <button
              onClick={() => handleNavClick("instagram")}
              className="text-left text-zinc-800 hover:text-gold-600 font-medium tracking-widest text-sm uppercase py-2 border-b border-zinc-100 transition-colors cursor-pointer"
            >
              Artisanal Feed
            </button>

            {/* Loom Vault commented out for now
            {isSignedIn ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="text-left text-zinc-800 hover:text-gold-600 font-medium tracking-widest text-sm uppercase py-2 border-b border-zinc-100 transition-colors cursor-pointer"
                >
                  My Loom Vault
                </Link>
                <div className="flex items-center justify-between py-2 border-b border-zinc-100">
                  <span className="text-xs text-zinc-400 uppercase tracking-wider">
                    Account Settings
                  </span>
                  <UserButton />
                </div>
              </>
            ) : (
              <SignInButton mode="modal">
                <button className="text-left text-zinc-800 hover:text-gold-600 font-medium tracking-widest text-sm uppercase py-2 border-b border-zinc-100 transition-colors cursor-pointer">
                  Sign In / Register
                </button>
              </SignInButton>
            )}
            */}

            {/* Quick Contacts */}
            <div className="flex items-center justify-around py-4 border-b border-zinc-100">
              <a
                href="mailto:contact@deviihandloom.in"
                className="text-zinc-500 hover:text-gold-600 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="tel:+919380735763"
                className="text-zinc-500 hover:text-gold-600 transition-colors"
              >
                <Phone className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/devii.handloom"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-gold-600 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>

            <button
              onClick={() => {
                setIsOpen(false);
                onOpenContact();
              }}
              className="w-full py-3.5 bg-gradient-to-r from-gold-700 to-gold-500 text-white font-serif font-bold tracking-wider uppercase text-center rounded-sm transition-all cursor-pointer"
            >
              Inquire Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
