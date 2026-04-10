const stats = [
  { value: "15+", label: "Anos de Mercado", desc: "Experiência consolidada em consultoria" },
  { value: "80+", label: "Clientes Atendidos", desc: "Empresas de diversos setores" },
  { value: "5", label: "Empresas no Portfólio", desc: "Subsidiárias e investidas" },
  { value: "98%", label: "Satisfação", desc: "Índice de retenção de clientes" },
];

export default function NumerosSection() {
  return (
    <section className="section-alt border-y border-[rgba(255,255,255,0.05)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(255,255,255,0.05)]">
          {stats.map((stat) => (
            <div
              key={stat.value}
              className="bg-[#0C0C16] px-8 py-10 text-center"
            >
              <p className="font-serif text-4xl md:text-5xl font-bold text-gradient-gold mb-2">
                {stat.value}
              </p>
              <p className="text-[#F0EBE1] font-semibold text-sm mb-1">{stat.label}</p>
              <p className="text-[#8B8075] text-xs leading-relaxed">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
