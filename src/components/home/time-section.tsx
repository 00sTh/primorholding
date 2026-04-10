import { Linkedin } from "lucide-react";

const time = [
  {
    inicial: "JA",
    nome: "João Antonio Lopes Corrêa",
    cargo: "Fundador & CEO",
    bio: "Empreendedor serial com mais de 15 anos de experiência em gestão estratégica, M&A e desenvolvimento de negócios em múltiplos segmentos.",
  },
  {
    inicial: "MR",
    nome: "Maria Rita Fonseca",
    cargo: "Diretora de Estratégia",
    bio: "Especialista em planejamento estratégico e reestruturação organizacional, com passagem por multinacionais e consultorias de referência.",
  },
  {
    inicial: "CA",
    nome: "Carlos Alberto Nunes",
    cargo: "Diretor Financeiro",
    bio: "CFO com expertise em estruturação financeira, captação de recursos e gestão de portfólio para grupos empresariais complexos.",
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
          <h2 className="section-title mb-4">Time de Excelência</h2>
          <p className="section-subtitle mx-auto">
            Profissionais com trajetórias sólidas e comprometidos com os
            resultados de cada cliente.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {time.map((pessoa) => (
            <div key={pessoa.nome} className="card-dark p-8 text-center group">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-[rgba(201,169,110,0.08)] border-2 border-[rgba(201,169,110,0.2)] flex items-center justify-center mx-auto mb-5 group-hover:border-[rgba(201,169,110,0.4)] transition-colors">
                <span className="font-serif text-2xl font-bold text-[#C9A96E]">
                  {pessoa.inicial}
                </span>
              </div>

              <h3 className="font-serif text-lg font-semibold text-[#F0EBE1] mb-1">
                {pessoa.nome}
              </h3>
              <p className="text-[#C9A96E] text-xs font-semibold tracking-wider uppercase mb-4">
                {pessoa.cargo}
              </p>
              <p className="text-[#8B8075] text-sm leading-relaxed mb-5">{pessoa.bio}</p>

              <button className="w-9 h-9 rounded-lg border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#8B8075] hover:text-[#C9A96E] hover:border-[rgba(201,169,110,0.3)] transition-all mx-auto">
                <Linkedin className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
