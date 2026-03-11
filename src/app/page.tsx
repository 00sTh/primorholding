import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <Section className="flex min-h-screen items-center">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-gradient-gold mb-6">
            Primor Holding
          </h1>
          <p className="text-cream/80 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
            Consultoria empresarial de excelencia. Estrategia, gestao e
            reestruturacao para impulsionar o crescimento do seu negocio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg">
              Entre em Contato
            </Button>
            <Button variant="secondary" size="lg">
              Saiba Mais
            </Button>
          </div>
        </div>
      </Section>

      {/* Services Preview */}
      <Section>
        <h2 className="font-serif text-3xl md:text-4xl text-center text-cream mb-4">
          Nossos Servicos
        </h2>
        <p className="text-slate text-center mb-12 max-w-2xl mx-auto">
          Solucoes estrategicas para transformar e fortalecer o seu negocio.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card hover>
            <h3 className="font-serif text-xl text-gold mb-3">
              Consultoria Estrategica
            </h3>
            <p className="text-cream/70 text-sm leading-relaxed">
              Analise aprofundada e planejamento para posicionar sua empresa no
              caminho do crescimento sustentavel.
            </p>
          </Card>
          <Card hover>
            <h3 className="font-serif text-xl text-gold mb-3">
              Reestruturacao Empresarial
            </h3>
            <p className="text-cream/70 text-sm leading-relaxed">
              Reorganizacao operacional e financeira para recuperar a
              competitividade e a eficiencia do seu negocio.
            </p>
          </Card>
          <Card hover>
            <h3 className="font-serif text-xl text-gold mb-3">
              Gestao de Negocios
            </h3>
            <p className="text-cream/70 text-sm leading-relaxed">
              Acompanhamento e orientacao continua para garantir a execucao
              eficaz da estrategia definida.
            </p>
          </Card>
        </div>
      </Section>
    </main>
  );
}
