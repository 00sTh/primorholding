import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="hero-gradient relative min-h-screen flex items-center overflow-hidden">
      {/* Decorative gold orbs */}
      <div
        aria-hidden
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        aria-hidden
        className="absolute bottom-1/4 left-1/6 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="section-eyebrow mb-8">
            <span className="gold-line" />
            Consultoria &amp; Holding Empresarial
            <span className="gold-line" />
          </div>

          {/* Headline */}
          <h1 className="font-serif text-[clamp(3rem,7vw,5.5rem)] font-bold leading-[1.05] text-[#F0EBE1] mb-6">
            <span className="text-gradient-gold">Excelência</span>
            <br />
            em Gestão
            <br />
            Empresarial
          </h1>

          {/* Subtitle */}
          <p className="text-[#8B8075] text-lg leading-relaxed mb-10 max-w-xl">
            Estratégia, solidez e visão de longo prazo. A Primor Holding transforma
            desafios em oportunidades de crescimento sustentável para o seu negócio.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contato" className="btn-gold">
              Fale Conosco
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/solucoes" className="btn-outline-gold">
              Conheça as Soluções
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center gap-8 mt-12 pt-12 border-t border-[rgba(255,255,255,0.06)]">
            {[
              { value: "15+", label: "Anos de experiência" },
              { value: "80+", label: "Clientes atendidos" },
              { value: "5", label: "Empresas no portfólio" },
            ].map((stat) => (
              <div key={stat.value} className="text-center">
                <p className="font-serif text-2xl font-bold text-[#C9A96E]">{stat.value}</p>
                <p className="text-[#8B8075] text-xs mt-0.5 whitespace-nowrap">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[#8B8075] text-xs tracking-widest uppercase">Rolar</span>
        <ChevronDown className="w-4 h-4 text-[#8B8075] animate-bounce" />
      </div>
    </section>
  );
}
