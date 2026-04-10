import Link from "next/link";
import { TrendingUp, Settings, BarChart3, Handshake, ArrowRight } from "lucide-react";

const servicos = [
  {
    icon: TrendingUp,
    title: "Estratégia Empresarial",
    desc: "Planejamento estratégico de longo prazo, análise de mercado e definição de posicionamento competitivo para crescimento sustentável.",
    href: "/solucoes#estrategia",
  },
  {
    icon: Settings,
    title: "Reestruturação Organizacional",
    desc: "Diagnóstico e redesenho de processos, cultura organizacional e estrutura de governança para maior eficiência e agilidade.",
    href: "/solucoes#reestruturacao",
  },
  {
    icon: BarChart3,
    title: "Gestão de Performance",
    desc: "Definição de KPIs, sistemas de monitoramento e cultura de resultados que conectam estratégia à execução operacional.",
    href: "/solucoes#performance",
  },
  {
    icon: Handshake,
    title: "M&A e Intermediação",
    desc: "Assessoria completa em fusões, aquisições, desinvestimentos e parcerias estratégicas com rigor analítico e discrição.",
    href: "/solucoes#ma",
  },
];

export default function SolucoesSection() {
  return (
    <section className="section-alt section-padding" id="solucoes">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="section-eyebrow justify-center mb-5">
            <span className="gold-line" />
            O Que Fazemos
            <span className="gold-line" />
          </div>
          <h2 className="section-title mb-4">Nossas Soluções</h2>
          <p className="section-subtitle mx-auto">
            Serviços especializados para cada fase da jornada empresarial,
            do planejamento à execução com excelência.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {servicos.map(({ icon: Icon, title, desc, href }) => (
            <div key={title} className="card-dark p-8 group">
              <div className="w-12 h-12 rounded-xl bg-[rgba(201,169,110,0.08)] border border-[rgba(201,169,110,0.15)] flex items-center justify-center mb-6 group-hover:bg-[rgba(201,169,110,0.12)] transition-colors">
                <Icon className="w-5 h-5 text-[#C9A96E]" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#F0EBE1] mb-3">
                {title}
              </h3>
              <p className="text-[#8B8075] text-sm leading-relaxed mb-6">{desc}</p>
              <Link
                href={href}
                className="inline-flex items-center gap-2 text-[#C9A96E] text-sm font-semibold hover:gap-3 transition-all"
              >
                Saiba mais
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/solucoes" className="btn-outline-gold">
            Ver todas as soluções
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
