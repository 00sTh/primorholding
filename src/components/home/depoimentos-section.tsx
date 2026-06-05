import { Quote } from "lucide-react";

const depoimentos = [
  {
    quote:
      "A Primor foi fundamental na reestruturação do nosso modelo de negócios. Em 8 meses, revertemos um cenário crítico e voltamos ao crescimento com uma equipe mais coesa e estratégia clara.",
    nome: "Ricardo Almeida",
    cargo: "CEO, Grupo Meridian",
    inicial: "RA",
  },
  {
    quote:
      "A assessoria na aquisição foi impecável. Rigor técnico, discrição total e um time que entende de verdade os desafios de M&A no Brasil. Recomendaria sem hesitação.",
    nome: "Fernanda Castilho",
    cargo: "Diretora Financeira, Castilho & Associados",
    inicial: "FC",
  },
  {
    quote:
      "Em 18 meses de trabalho conjunto, implementamos um sistema de performance que transformou a cultura da empresa. Os resultados foram além do esperado.",
    nome: "Paulo Rodrigues",
    cargo: "Sócio-Fundador, Conecta Ventures",
    inicial: "PR",
  },
];

export default function DepoimentosSection() {
  return (
    <section className="section-padding section-alt" id="depoimentos">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="section-eyebrow mb-5">
              <span className="gold-line" />
              O Que Dizem
            </div>
            <h2
              className="font-serif font-bold text-[#1C1510] leading-[1.05]"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)" }}
            >
              Clientes que
              <br />
              <span className="text-gradient-gold">confiam na Primor</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {depoimentos.map((d, i) => (
            <div key={i} className="testimonial-card flex flex-col">
              <Quote className="w-7 h-7 text-[#C9A96E] opacity-50 mb-5 flex-shrink-0" />
              <p className="text-[#1C1510] text-sm leading-relaxed flex-1 mb-6 italic">
                &ldquo;{d.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-5 border-t border-[rgba(201,169,110,0.1)]">
                <div className="w-10 h-10 rounded-full bg-[rgba(201,169,110,0.08)] border border-[rgba(201,169,110,0.2)] flex items-center justify-center flex-shrink-0">
                  <span className="text-[#C9A96E] text-xs font-bold font-serif">{d.inicial}</span>
                </div>
                <div>
                  <p className="text-[#1C1510] text-sm font-semibold leading-tight">{d.nome}</p>
                  <p className="text-[#6B6057] text-xs">{d.cargo}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
