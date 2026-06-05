const items = [
  "Estratégia Empresarial",
  "Fusões & Aquisições",
  "Gestão de Performance",
  "Reestruturação",
  "Holding & Participações",
  "Consultoria Executiva",
  "Governança Corporativa",
  "Crescimento Sustentável",
];

export default function MarqueeSection() {
  const repeated = [...items, ...items]; // duplicate for seamless loop

  return (
    <div className="border-y border-[rgba(201,169,110,0.1)] bg-[#080C1A] py-4 overflow-hidden">
      <div className="animate-marquee">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-5 px-6 whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] flex-shrink-0 opacity-60" />
            <span className="text-[#6B6057] text-xs font-medium tracking-[0.18em] uppercase">
              {item}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
