import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const servicos = [
  {
    num: "01",
    title: "Estratégia Empresarial",
    desc: "Planejamento de longo prazo, análise competitiva e posicionamento de mercado para crescimento sustentável.",
    tag: "Planejamento",
    href: "/solucoes#estrategia",
  },
  {
    num: "02",
    title: "Reestruturação Organizacional",
    desc: "Redesenho de processos, governança e cultura para maior eficiência e capacidade de execução.",
    tag: "Transformação",
    href: "/solucoes#reestruturacao",
  },
  {
    num: "03",
    title: "Gestão de Performance",
    desc: "KPIs, dashboards executivos e ciclos de revisão que conectam estratégia à operação diária.",
    tag: "Resultados",
    href: "/solucoes#performance",
  },
  {
    num: "04",
    title: "M&A e Intermediação",
    desc: "Assessoria em fusões, aquisições e parcerias — da prospecção ao fechamento com rigor e discrição.",
    tag: "Transações",
    href: "/solucoes#ma",
  },
];

export default function SolucoesSection() {
  return (
    <section className="section-padding" id="solucoes" style={{ background: "#FAFAF7" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header — two column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 items-end">
          <div>
            <div className="section-eyebrow mb-5">
              <span className="gold-line" />
              O Que Fazemos
            </div>
            <h2
              className="font-serif font-bold text-[#1C1510] leading-[1.05]"
              style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}
            >
              Soluções para cada
              <br />
              <span className="text-gradient-gold">fase do negócio</span>
            </h2>
          </div>
          <div className="lg:text-right">
            <p className="text-[#6B6057] leading-relaxed max-w-sm lg:ml-auto mb-6">
              Do diagnóstico à execução — expertise especializada em cada etapa
              da jornada empresarial.
            </p>
            <Link href="/solucoes" className="btn-outline-gold">
              Ver todas as soluções
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Numbered editorial list */}
        <div className="border-b border-[rgba(0,0,0,0.07)]">
          {servicos.map(({ num, title, desc, tag, href }) => (
            <Link key={num} href={href} className="service-row group block">
              {/* Number */}
              <span className="font-serif text-[#C9A96E] text-sm font-bold opacity-60 pt-1">
                {num}
              </span>
              {/* Content */}
              <div>
                <h3 className="service-row-title mb-2">{title}</h3>
                <p className="text-[#6B6057] text-sm leading-relaxed max-w-lg">{desc}</p>
                <span className="inline-block mt-3 px-3 py-1 text-[0.65rem] font-semibold tracking-widest uppercase text-[#C9A96E] border border-[rgba(201,169,110,0.2)] rounded-full">
                  {tag}
                </span>
              </div>
              {/* Arrow */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full border border-[rgba(201,169,110,0.2)] flex items-center justify-center group-hover:bg-[rgba(201,169,110,0.08)] group-hover:border-[rgba(201,169,110,0.4)] transition-all mt-1">
                <ArrowUpRight className="w-4 h-4 text-[#C9A96E]" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
