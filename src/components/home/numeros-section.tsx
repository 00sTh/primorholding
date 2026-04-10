const stats = [
  { value: "15+", label: "Anos", sub: "de mercado" },
  { value: "80+", label: "Clientes", sub: "atendidos" },
  { value: "5", label: "Empresas", sub: "no portfólio" },
  { value: "98%", label: "Retenção", sub: "de clientes" },
];

export default function NumerosSection() {
  return (
    <section className="section-padding" style={{ background: "#050A18" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-[rgba(201,169,110,0.1)]">
          {stats.map((stat) => (
            <div key={stat.value} className="lg:px-10 first:pl-0 last:pr-0">
              <p
                className="font-serif font-bold leading-none text-gradient-gold mb-3"
                style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)" }}
              >
                {stat.value}
              </p>
              <p className="text-[#F0EBE1] font-semibold text-base">{stat.label}</p>
              <p className="text-[#8B8A9A] text-sm mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
