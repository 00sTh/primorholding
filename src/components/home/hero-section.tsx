import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="hero-gradient relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Giant background PRIMOR text */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <span
          className="font-serif font-bold leading-none whitespace-nowrap"
          style={{
            fontSize: "clamp(10rem, 28vw, 22rem)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(201,169,110,0.06)",
            letterSpacing: "-0.02em",
            transform: "translateY(10%)",
          }}
        >
          PRIMOR
        </span>
      </div>

      {/* Subtle gold glow right */}
      <div
        aria-hidden
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at 80% 50%, rgba(201,169,110,0.07) 0%, transparent 60%)",
        }}
      />

      {/* Vertical est. label on right */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 opacity-30">
        <div className="w-px h-16 bg-[#C9A96E]" />
        <span
          className="text-[#C9A96E] text-[0.6rem] font-semibold tracking-[0.35em] uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          Est. 2010
        </span>
        <div className="w-px h-16 bg-[#C9A96E]" />
      </div>

      {/* Main content — pinned to bottom */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-48 w-full">
        {/* Tag */}
        <div className="flex items-center gap-3 mb-8">
          <span className="inline-block w-2 h-2 rounded-full bg-[#C9A96E]" />
          <span className="text-[#C9A96E] text-xs font-semibold tracking-[0.25em] uppercase">
            Consultoria &amp; Holding Empresarial
          </span>
        </div>

        {/* Headline — editorial scale */}
        <h1
          className="font-serif font-bold text-[#F0EBE1] leading-[0.95] mb-10"
          style={{ fontSize: "clamp(3.5rem, 9vw, 7.5rem)" }}
        >
          Solidez.
          <br />
          <em className="not-italic text-gradient-gold">Estratégia.</em>
          <br />
          Crescimento.
        </h1>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-8 border-t border-[rgba(201,169,110,0.12)]">
          <p className="text-[#8B8A9A] text-base leading-relaxed max-w-md">
            Transformamos desafios empresariais em oportunidades de crescimento
            sustentável — com rigor analítico e visão de longo prazo.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link href="/contato" className="btn-gold">
              Agendar Reunião
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/solucoes" className="btn-outline-gold">
              Nossas Soluções
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
