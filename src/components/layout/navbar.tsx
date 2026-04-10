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
          ? "bg-[#09090F]/95 backdrop-blur-md border-b border-[rgba(201,169,110,0.1)] shadow-[0_4px_32px_rgba(0,0,0,0.4)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 border border-[#C9A96E]/50 rounded flex items-center justify-center group-hover:border-[#C9A96E] transition-colors">
              <span className="text-[#C9A96E] font-serif text-sm font-bold leading-none">P</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-serif text-[#F0EBE1] text-lg font-semibold tracking-wide">
                PRIMOR
              </span>
              <span className="text-[#8B8075] text-[0.6rem] font-medium tracking-[0.25em] uppercase">
                Holding
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#8B8075] hover:text-[#F0EBE1] transition-colors tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/contato" className="btn-gold text-sm py-2.5 px-5">
              Fale Conosco
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-[#8B8075] hover:text-[#F0EBE1] transition-colors p-2"
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-[#09090F]/98 backdrop-blur-md border-t border-[rgba(255,255,255,0.06)]">
          <div className="px-4 py-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-[#8B8075] hover:text-[#F0EBE1] hover:bg-white/5 rounded-lg transition-all"
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
