import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#080C1A" }}>
      {/* Gold border top */}
      <div className="h-px bg-gradient-to-r from-transparent via-[rgba(201,169,110,0.4)] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <div>
            <div className="section-eyebrow mb-6">
              <span className="gold-line" />
              Próximo Passo
            </div>
            <h2
              className="font-serif font-bold text-[#F0EBE1] leading-[1.05] mb-6"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
            >
              Vamos construir
              <br />
              <span className="text-gradient-gold">algo juntos?</span>
            </h2>
            <p className="text-[#8B8A9A] leading-relaxed max-w-md">
              Primeira conversa sem compromisso. Nossa equipe está pronta para
              entender seu desafio e propor o caminho mais direto ao crescimento.
            </p>
          </div>

          {/* Right — card */}
          <div className="glass-gold rounded-2xl p-8">
            <p className="text-[#C9A96E] text-xs font-semibold tracking-widest uppercase mb-6">
              Entre em Contato
            </p>
            <div className="space-y-4 mb-8">
              {[
                "Primeira consulta 100% gratuita",
                "Confidencialidade garantida em contrato",
                "Proposta personalizada em 48h",
                "Sem burocracia — direto ao ponto",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-[#F0EBE1]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/contato" className="btn-gold w-full">
                Agendar Reunião
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:+551130000000" className="btn-ghost w-full">
                <Phone className="w-4 h-4" />
                (11) 3000-0000
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-[rgba(201,169,110,0.2)] to-transparent" />
    </section>
  );
}
