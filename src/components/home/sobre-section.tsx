import Link from "next/link";
import { Shield, Target, TrendingUp, ArrowRight, Check } from "lucide-react";

const diferenciais = [
  {
    icon: Shield,
    title: "Solidez e Confiança",
    desc: "Estrutura jurídica e financeira robusta para proteger e potencializar seus ativos.",
  },
  {
    icon: Target,
    title: "Estratégia Focada",
    desc: "Planos sob medida alinhados aos objetivos e ao contexto de cada cliente.",
  },
  {
    icon: TrendingUp,
    title: "Visão de Crescimento",
    desc: "Perspectiva de longo prazo para decisões que constroem valor duradouro.",
  },
];

const pilares = [
  "Consultoria estratégica personalizada",
  "Equipe multidisciplinar experiente",
  "Presença em múltiplos segmentos",
  "Resultados mensuráveis e transparentes",
];

export default function SobreSection() {
  return (
    <section className="section-padding" id="sobre">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <div className="section-eyebrow mb-5">
              <span className="gold-line" />
              Quem Somos
            </div>
            <h2 className="section-title mb-6">
              Uma holding com
              <br />
              <span className="text-gradient-gold">DNA estratégico</span>
            </h2>
            <p className="text-[#8B8075] leading-relaxed mb-5">
              A Primor Holding nasceu da visão de João Antonio Lopes Corrêa de criar uma
              estrutura empresarial que vai além da simples gestão de ativos. Somos um
              grupo comprometido com a excelência em cada decisão.
            </p>
            <p className="text-[#8B8075] leading-relaxed mb-8">
              Com mais de 15 anos de mercado, construímos um portfólio diversificado de
              empresas e um time de consultores que une expertise técnica à sensibilidade
              de negócios.
            </p>

            <ul className="space-y-3 mb-10">
              {pilares.map((pilar) => (
                <li key={pilar} className="flex items-center gap-3 text-sm text-[#F0EBE1]">
                  <div className="w-5 h-5 rounded-full bg-[rgba(201,169,110,0.12)] border border-[rgba(201,169,110,0.25)] flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[#C9A96E]" />
                  </div>
                  {pilar}
                </li>
              ))}
            </ul>

            <Link
              href="/sobre"
              className="inline-flex items-center gap-2 text-[#C9A96E] text-sm font-semibold hover:gap-3 transition-all"
            >
              Saiba mais sobre nós
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right: Cards */}
          <div className="space-y-4">
            {diferenciais.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass-gold rounded-xl p-6 flex gap-5">
                <div className="w-12 h-12 rounded-lg bg-[rgba(201,169,110,0.1)] border border-[rgba(201,169,110,0.2)] flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-[#C9A96E]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#F0EBE1] mb-1.5">{title}</h3>
                  <p className="text-[#8B8075] text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
