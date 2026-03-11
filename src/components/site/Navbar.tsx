"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Servicos" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#contato", label: "Contato" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy-dark/95 backdrop-blur-sm border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <a href="/" className="flex flex-col leading-tight">
          <span className="font-serif text-gold text-xl font-bold tracking-widest">
            PRIMOR
          </span>
          <span className="text-cream text-xs tracking-widest font-medium">
            HOLDING
          </span>
        </a>

        {/* Desktop nav links */}
        <nav className="hidden md:flex gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate hover:text-cream transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA button */}
        <div className="hidden md:flex">
          <a href="#contato">
            <Button size="sm">Fale Conosco</Button>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-cream p-2"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-navy-dark border-b border-white/5 py-4 flex flex-col gap-4 px-6 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate hover:text-cream transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a href="#contato" onClick={() => setMenuOpen(false)}>
            <Button size="sm" className="w-full">
              Fale Conosco
            </Button>
          </a>
        </div>
      )}
    </header>
  );
}
