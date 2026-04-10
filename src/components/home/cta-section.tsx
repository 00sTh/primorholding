import Link from "next/link";
import { ArrowRight, Phone, Shield, Clock } from "lucide-react";

export default function CTASection() {
  return (
    <section className="hero-gradient section-padding relative overflow-hidden">
      {/* Decorative */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,169,110,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="section-eyebrow justify-center mb-6">
          <span className="gold-line" />
          Pronto para Avançar?
          <span className="gold-line" />
        </div>

        <h2 className="section-title mb-5">
          Transforme a estratégia
          <br />
          em <span className="text-gradient-gold">resultado</span>
        </h2>

        <p className="section-subtitle mx-auto mb-10">
          Agende uma conversa com nossa equipe e descubra como a Primor Holding
          pode acelerar o crescimento do seu negócio.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link href="/contato" className="btn-gold">
            Agendar Reunião
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a href="tel:+551130000000" className="btn-outline-gold">
            <Phone className="w-4 h-4" />
            Ligar Agora
          </a>
        </div>

        {/* Trust bullets */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-[#8B8075]">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#C9A96E]" />
            Confidencialidade garantida
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#C9A96E]" />
            Primeira consulta gratuita
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#C9A96E]" />
            Sem compromisso inicial
          </div>
        </div>
      </div>
    </section>
  );
}
