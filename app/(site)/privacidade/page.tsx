import type { Metadata } from "next";

export const metadata: Metadata = { title: "Política de Privacidade" };

export default function PrivacidadePage() {
  return (
    <>
      <section className="hero-gradient pt-40 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-eyebrow mb-5">
            <span className="gold-line" />
            Legal
          </div>
          <h1 className="section-title">Política de Privacidade</h1>
          <p className="text-[#8B8075] mt-4 text-sm">Última atualização: abril de 2026</p>
        </div>
      </section>

      <section className="section-padding section-alt">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-dark p-8 md:p-12 prose prose-invert max-w-none">
            <div className="space-y-8 text-[#8B8075] text-sm leading-relaxed">
              <div>
                <h2 className="text-[#F0EBE1] font-serif text-xl font-semibold mb-3">1. Informações que coletamos</h2>
                <p>Coletamos informações fornecidas diretamente por você ao preencher formulários de contato em nosso site, como nome, e-mail, telefone e mensagem.</p>
              </div>
              <div>
                <h2 className="text-[#F0EBE1] font-serif text-xl font-semibold mb-3">2. Como usamos suas informações</h2>
                <p>As informações coletadas são utilizadas exclusivamente para responder às suas solicitações de contato e, mediante seu consentimento, enviar comunicações sobre nossos serviços.</p>
              </div>
              <div>
                <h2 className="text-[#F0EBE1] font-serif text-xl font-semibold mb-3">3. Compartilhamento de dados</h2>
                <p>Não compartilhamos suas informações pessoais com terceiros, exceto quando exigido por lei ou necessário para prestação dos serviços contratados.</p>
              </div>
              <div>
                <h2 className="text-[#F0EBE1] font-serif text-xl font-semibold mb-3">4. Seus direitos</h2>
                <p>Você tem o direito de acessar, corrigir ou solicitar a exclusão de seus dados pessoais. Entre em contato pelo e-mail: contato@primorholding.com.br</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
