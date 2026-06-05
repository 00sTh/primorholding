import { Linkedin } from "lucide-react";

const time = [
  {
    inicial: "JA",
    nome: "João Antonio Lopes Corrêa",
    cargo: "Fundador & CEO",
    bio: "Empreendedor serial com mais de 15 anos de experiência em gestão estratégica, M&A e desenvolvimento de negócios em múltiplos segmentos.",
  },
];

export default function TimeSection() {
  return (
    <section className="section-alt section-padding" id="time">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="section-eyebrow justify-center mb-5">
            <span className="gold-line" />
            Nossa Liderança
            <span className="gold-line" />
          </div>
          <h2 className="section-title mb-4">Liderança Primor</h2>
          <p className="section-subtitle mx-auto">
            Experiência executiva e visão de longo prazo conduzindo cada decisão
            estratégica da holding.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
          {time.map((pessoa) => (
            <div key={pessoa.nome} className="card-dark p-8 text-center group">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-[rgba(201,169,110,0.08)] border-2 border-[rgba(201,169,110,0.2)] flex items-center justify-center mx-auto mb-5 group-hover:border-[rgba(201,169,110,0.4)] transition-colors">
                <span className="font-serif text-2xl font-bold text-[#C9A96E]">
                  {pessoa.inicial}
                </span>
              </div>

              <h3 className="font-serif text-lg font-semibold text-[#1C1510] mb-1">
                {pessoa.nome}
              </h3>
              <p className="text-[#C9A96E] text-xs font-semibold tracking-wider uppercase mb-4">
                {pessoa.cargo}
              </p>
              <p className="text-[#6B6057] text-sm leading-relaxed mb-5">{pessoa.bio}</p>

              <button className="w-9 h-9 rounded-lg border border-[rgba(0,0,0,0.08)] flex items-center justify-center text-[#6B6057] hover:text-[#C9A96E] hover:border-[rgba(201,169,110,0.3)] transition-all mx-auto">
                <Linkedin className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
