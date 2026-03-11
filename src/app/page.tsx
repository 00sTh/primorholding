export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-gradient-gold mb-6">
          Primor Holding
        </h1>
        <p className="text-cream/80 text-lg md:text-xl mb-10 leading-relaxed">
          Consultoria empresarial de excelencia. Estrategia, gestao e
          reestruturacao para impulsionar o crescimento do seu negocio.
        </p>
        <button className="inline-flex items-center justify-center rounded-lg bg-gold text-navy-dark font-semibold h-11 px-6 text-base transition-all duration-200 hover:bg-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50">
          Entre em Contato
        </button>
      </div>
    </main>
  );
}
