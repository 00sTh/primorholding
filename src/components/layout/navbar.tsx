"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Sobre", href: "/sobre" },
  { label: "Soluções", href: "/solucoes" },
  { label: "Portfólio", href: "/#portfolio" },
  { label: "Contato", href: "/contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-[rgba(201,169,110,0.1)] shadow-[0_4px_32px_rgba(0,0,0,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 md:h-28">
          {/* Left nav */}
          <nav className="hidden md:flex items-center gap-8 flex-1">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#6B6057] hover:text-[#1C1510] transition-colors tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Logo centro */}
          <Link href="/" className="flex flex-col items-center leading-none group flex-shrink-0">
            <span className="font-serif text-[#C9A96E] text-4xl md:text-5xl font-bold uppercase group-hover:text-[#1C1510] transition-colors">
              PRIMOR
            </span>
            <span className="text-[#6B6057] text-xs md:text-sm font-semibold uppercase mt-1">
              Holding
            </span>
          </Link>

          {/* Right nav + CTA */}
          <div className="hidden md:flex items-center gap-8 flex-1 justify-end">
            {navLinks.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#6B6057] hover:text-[#1C1510] transition-colors tracking-wide"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contato" className="btn-gold text-sm py-2.5 px-5">
              Fale Conosco
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-[#6B6057] hover:text-[#1C1510] transition-colors p-2"
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-white/98 backdrop-blur-md border-t border-[rgba(0,0,0,0.07)]">
          <div className="px-4 py-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-[#6B6057] hover:text-[#1C1510] hover:bg-black/5 rounded-lg transition-all"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4">
              <Link
                href="/contato"
                onClick={() => setOpen(false)}
                className="btn-gold w-full text-sm py-3"
              >
                Fale Conosco
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
