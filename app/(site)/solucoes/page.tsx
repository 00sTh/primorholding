import type { Metadata } from "next";
import Link from "next/link";
import { TrendingUp, Settings, BarChart3, Handshake, Check, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Soluções",
  description:
    "Consultoria estratégica, reestruturação organizacional, gestão de performance e assessoria em M&A.",
};

const servicos = [
  {
    id: "estrategia",
    icon: TrendingUp,
    titulo: "Estratégia Empresarial",
    desc: "Desenvolvimento de planos estratégicos robustos que orientam o crescimento sustentável da empresa no curto, médio e longo prazo.",
    beneficios: [
      "Análise competitiva de mercado",
      "Definição de posicionamento estratégico",
      "Planejamento de expansão e novos mercados",
      "Cenários e planos de contingência",
      "Alinhamento de stakeholders",
    ],
  },
  {
    id: "reestruturacao",
    icon: Settings,
    titulo: "Reestruturação Organizacional",
    desc: "Redesenho de estruturas, processos e cultura para maior eficiência, agilidade e capacidade de execução da estratégia.",
    beneficios: [
      "Diagnóstico organizacional completo",
      "Redesenho de processos críticos",
      "Estrutura de governança corporativa",
      "Gestão de mudança e comunicação",
      "Desenvolvimento de lideranças",
    ],
  },
  {
    id: "performance",
    icon: BarChart3,
    titulo: "Gestão de Performance",
    desc: "Implementação de sistemas de monitoramento e cultura orientada a resultados que conectam estratégia à execução diária.",
    beneficios: [
      "Definição e cascata de KPIs",
      "Painéis executivos e dashboards",
      "Ciclos de revisão estratégica",
      "Incentivos e metas alinhados",
      "Cultura de dados e decisão",
    ],
  },
  {
    id: "ma",
    icon: Handshake,
    titulo: "M&A e Intermediação",
    desc: "Assessoria especializada em fusões, aquisições, desinvestimentos e parcerias estratégicas do início ao fechamento.",
    beneficios: [
      "Prospecção e seleção de alvos",
      "Due diligence estratégica e financeira",
      "Modelagem e valuation",
      "Negociação e estruturação",
      "Integração pós-transação",
    ],
  },
];

export default function SolucoesPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-gradient pt-40 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="section-eyebrow mb-5">
              <span className="gold-line" />
              O Que Fazemos
            </div>
            <h1 className="section-title mb-5">
              Soluções para cada
              <br />
              <span className="text-gradient-gold">fase do negócio</span>
            </h1>
            <p className="text-[#8B8075] text-lg leading-relaxed">
              Da estratégia à execução, da reestruturação ao crescimento — a Primor
              Holding oferece expertise especializada em cada etapa da jornada empresarial.
            </p>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {servicos.map(({ id, icon: Icon, titulo, desc, beneficios }, i) => (
            <div
              key={id}
              id={id}
              className={`card-dark p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-start ${
                i % 2 !== 0 ? "md:[direction:rtl]" : ""
              }`}
            >
              <div className={i % 2 !== 0 ? "[direction:ltr]" : ""}>
                <div className="w-14 h-14 rounded-xl bg-[rgba(201,169,110,0.08)] border border-[rgba(201,169,110,0.15)] flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-[#C9A96E]" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-[#F0EBE1] mb-4">{titulo}</h2>
                <p className="text-[#8B8075] leading-relaxed mb-6">{desc}</p>
                <Link
                  href="/contato"
                  className="inline-flex items-center gap-2 text-[#C9A96E] text-sm font-semibold hover:gap-3 transition-all"
                >
                  Solicitar proposta
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className={i % 2 !== 0 ? "[direction:ltr]" : ""}>
                <div className="glass-gold rounded-xl p-6">
                  <h4 className="text-[#C9A96E] text-xs font-semibold uppercase tracking-wider mb-5">
                    O que entregamos
                  </h4>
                  <ul className="space-y-3">
                    {beneficios.map((b) => (
                      <li key={b} className="flex items-center gap-3 text-sm text-[#F0EBE1]">
                        <div className="w-5 h-5 rounded-full bg-[rgba(201,169,110,0.12)] flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-[#C9A96E]" />
                        </div>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-alt section-padding">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h2 className="section-title mb-4">Não encontrou o que precisa?</h2>
          <p className="section-subtitle mb-8">
            Cada desafio é único. Entre em contato e vamos construir juntos uma solução sob medida.
          </p>
          <Link href="/contato" className="btn-gold">
            Falar com Especialista
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
