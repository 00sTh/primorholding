import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Target, Eye, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre Nós",
  description:
    "Conheça a Primor Holding, sua história, missão, visão, valores e o time de liderança que guia o grupo.",
};

const valores = [
  { icon: Target, label: "Foco em Resultados" },
  { icon: Eye, label: "Transparência Total" },
  { icon: Heart, label: "Comprometimento" },
];

const timeline = [
  { ano: "2010", titulo: "Fundação", desc: "João Antonio funda a Primor com foco em consultoria para PMEs." },
  { ano: "2013", titulo: "Primeira Subsidiária", desc: "Criação da Primor Logística, consolidando a estrutura de holding." },
  { ano: "2017", titulo: "Expansão Regional", desc: "Ampliação para consultoria de grandes empresas e M&A." },
  { ano: "2021", titulo: "Portfólio Diversificado", desc: "5 empresas ativas em setores estratégicos da economia." },
  { ano: "2026", titulo: "Visão de Futuro", desc: "Expansão internacional e novos investimentos em tecnologia." },
];

export default function SobrePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-gradient pt-40 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="section-eyebrow mb-5">
              <span className="gold-line" />
              Nossa História
            </div>
            <h1 className="section-title mb-5">
              Solidez construída
              <br />
              <span className="text-gradient-gold">ao longo do tempo</span>
            </h1>
            <p className="text-[#8B8075] text-lg leading-relaxed">
              A Primor Holding é mais do que um grupo empresarial. É o resultado de
              décadas de trabalho dedicado à criação de valor real e duradouro.
            </p>
          </div>
        </div>
      </section>

      {/* Missão / Visão / Valores */}
      <section className="section-padding section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-dark p-8">
              <div className="w-10 h-10 rounded-lg bg-[rgba(201,169,110,0.08)] border border-[rgba(201,169,110,0.2)] flex items-center justify-center mb-5">
                <Target className="w-5 h-5 text-[#C9A96E]" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#F0EBE1] mb-3">Missão</h3>
              <p className="text-[#8B8075] text-sm leading-relaxed">
                Promover o crescimento sustentável de empresas e empreendedores por meio
                de consultoria estratégica de alto padrão, gestão eficiente e parcerias
                de valor.
              </p>
            </div>
            <div className="glass-gold rounded-xl p-8">
              <div className="w-10 h-10 rounded-lg bg-[rgba(201,169,110,0.15)] border border-[rgba(201,169,110,0.3)] flex items-center justify-center mb-5">
                <Eye className="w-5 h-5 text-[#C9A96E]" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#F0EBE1] mb-3">Visão</h3>
              <p className="text-[#8B8075] text-sm leading-relaxed">
                Ser reconhecida como a holding de consultoria mais admirada do Brasil,
                referência em ética, excelência e geração de valor para todas as partes
                envolvidas.
              </p>
            </div>
            <div className="card-dark p-8">
              <div className="w-10 h-10 rounded-lg bg-[rgba(201,169,110,0.08)] border border-[rgba(201,169,110,0.2)] flex items-center justify-center mb-5">
                <Heart className="w-5 h-5 text-[#C9A96E]" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#F0EBE1] mb-3">Valores</h3>
              <ul className="space-y-2.5">
                {["Integridade", "Excelência", "Inovação", "Comprometimento", "Parceria"].map(
                  (v) => (
                    <li key={v} className="flex items-center gap-2.5 text-sm text-[#8B8075]">
                      <Check className="w-3.5 h-3.5 text-[#C9A96E] flex-shrink-0" />
                      {v}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="section-eyebrow justify-center mb-5">
              <span className="gold-line" />
              Trajetória
              <span className="gold-line" />
            </div>
            <h2 className="section-title">Nossa Jornada</h2>
          </div>

          <div className="relative max-w-3xl mx-auto">
            {/* Line */}
            <div className="absolute left-[3.25rem] top-0 bottom-0 w-px bg-[rgba(201,169,110,0.15)]" />

            <div className="space-y-8">
              {timeline.map((item) => (
                <div key={item.ano} className="flex gap-8 items-start">
                  <div className="w-24 flex-shrink-0 text-right">
                    <span className="font-serif text-[#C9A96E] font-bold text-lg">{item.ano}</span>
                  </div>
                  <div className="relative flex-shrink-0">
                    <div className="w-3 h-3 rounded-full bg-[#C9A96E] border-2 border-[#09090F] mt-1.5 relative z-10" />
                  </div>
                  <div className="card-dark p-5 flex-1">
                    <h4 className="font-semibold text-[#F0EBE1] mb-1">{item.titulo}</h4>
                    <p className="text-[#8B8075] text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-alt section-padding">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h2 className="section-title mb-4">Pronto para começar?</h2>
          <p className="section-subtitle mb-8">
            Agende uma conversa e descubra como podemos contribuir para o crescimento do seu negócio.
          </p>
          <Link href="/contato" className="btn-gold">
            Fale Conosco
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
