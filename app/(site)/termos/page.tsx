import type { Metadata } from "next";

export const metadata: Metadata = { title: "Termos de Uso" };

export default function TermosPage() {
  return (
    <>
      <section className="hero-gradient pt-40 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-eyebrow mb-5">
            <span className="gold-line" />
            Legal
          </div>
          <h1 className="section-title">Termos de Uso</h1>
          <p className="text-[#6B6057] mt-4 text-sm">Última atualização: abril de 2026</p>
        </div>
      </section>

      <section className="section-padding section-alt">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-dark p-8 md:p-12">
            <div className="space-y-8 text-[#6B6057] text-sm leading-relaxed">
              <div>
                <h2 className="text-[#1C1510] font-serif text-xl font-semibold mb-3">1. Aceitação dos Termos</h2>
                <p>Ao acessar e usar este site, você concorda com estes Termos de Uso. Se não concordar, por favor, não utilize nosso site.</p>
              </div>
              <div>
                <h2 className="text-[#1C1510] font-serif text-xl font-semibold mb-3">2. Uso do Site</h2>
                <p>Este site é de uso exclusivamente informativo. As informações aqui contidas não constituem consultoria jurídica, financeira ou empresarial formal.</p>
              </div>
              <div>
                <h2 className="text-[#1C1510] font-serif text-xl font-semibold mb-3">3. Propriedade Intelectual</h2>
                <p>Todo o conteúdo deste site, incluindo textos, imagens e logotipos, é de propriedade da Primor Partnership Holding Ltda e protegido por leis de propriedade intelectual.</p>
              </div>
              <div>
                <h2 className="text-[#1C1510] font-serif text-xl font-semibold mb-3">4. Contato</h2>
                <p>Para dúvidas sobre estes termos, entre em contato: contato@primorholding.com.br</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
