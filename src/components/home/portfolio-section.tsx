const empresas = [
  { nome: "Primor Logística", setor: "Logística", inicial: "PL" },
  { nome: "Primor Tech", setor: "Tecnologia", inicial: "PT" },
  { nome: "Primor Imóveis", setor: "Imobiliário", inicial: "PI" },
  { nome: "Primor Agro", setor: "Agronegócio", inicial: "PA" },
  { nome: "Primor Capital", setor: "Financeiro", inicial: "PC" },
];

export default function PortfolioSection() {
  return (
    <section className="section-padding" id="portfolio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="section-eyebrow justify-center mb-5">
            <span className="gold-line" />
            Grupo Primor
            <span className="gold-line" />
          </div>
          <h2 className="section-title mb-4">Portfólio de Empresas</h2>
          <p className="section-subtitle mx-auto">
            Um ecossistema diversificado de empresas unidas pela mesma visão
            de excelência e crescimento sustentável.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {empresas.map((empresa) => (
            <div
              key={empresa.nome}
              className="card-dark p-6 flex items-center gap-5 group"
            >
              <div className="w-14 h-14 rounded-xl bg-[rgba(201,169,110,0.06)] border border-[rgba(201,169,110,0.15)] flex items-center justify-center flex-shrink-0 group-hover:bg-[rgba(201,169,110,0.1)] transition-colors">
                <span className="font-serif text-[#C9A96E] font-bold text-lg">
                  {empresa.inicial}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-[#1C1510] mb-1 group-hover:text-[#C9A96E] transition-colors">
                  {empresa.nome}
                </h3>
                <span className="inline-block px-2.5 py-1 text-xs font-medium text-[#6B6057] bg-[rgba(0,0,0,0.04)] border border-[rgba(0,0,0,0.07)] rounded-full">
                  {empresa.setor}
                </span>
              </div>
            </div>
          ))}

          {/* CTA card */}
          <div className="card-dark p-6 flex items-center gap-5 border-dashed !border-[rgba(201,169,110,0.15)] !bg-[rgba(201,169,110,0.02)]">
            <div className="w-14 h-14 rounded-xl border border-dashed border-[rgba(201,169,110,0.25)] flex items-center justify-center flex-shrink-0">
              <span className="text-[#C9A96E] text-2xl">+</span>
            </div>
            <div>
              <h3 className="font-semibold text-[#6B6057] mb-1">Sua Empresa</h3>
              <p className="text-[#5C5555] text-xs">Venha fazer parte do grupo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
