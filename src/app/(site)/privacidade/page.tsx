import Link from "next/link";
import { COMPANY } from "@/lib/constants";

export const metadata = {
  title: "Politica de Privacidade",
  description:
    "Politica de privacidade da Primor Holding conforme a Lei Geral de Protecao de Dados (LGPD).",
};

export default function PrivacidadePage() {
  return (
    <main className="pt-20 pb-20 min-h-screen">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="py-12 border-b border-white/10 mb-12">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            Legal
          </p>
          <h1 className="font-serif text-4xl text-cream mb-4">
            Politica de Privacidade
          </h1>
          <p className="text-slate">
            Ultima atualizacao:{" "}
            {new Date().toLocaleDateString("pt-BR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <section className="mb-10">
          <h2 className="font-serif text-xl text-cream mb-4">
            1. Identificacao do Controlador
          </h2>
          <p className="text-slate leading-relaxed mb-4">
            {COMPANY.fullName}, CNPJ {COMPANY.cnpj}, e-mail{" "}
            <a
              href={`mailto:${COMPANY.email}`}
              className="text-gold hover:text-gold-light transition-colors"
            >
              {COMPANY.email}
            </a>
            , doravante denominada Primor Holding, e a controladora dos dados
            pessoais tratados neste site, nos termos da Lei Geral de Protecao de
            Dados (Lei n. 13.709/2018 — LGPD).
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-xl text-cream mb-4">
            2. Dados Coletados
          </h2>
          <p className="text-slate leading-relaxed mb-4">
            Este site coleta exclusivamente os dados informados voluntariamente
            pelo visitante por meio do formulario de contato: nome completo,
            endereco de e-mail, numero de telefone (opcional) e mensagem.
          </p>
          <p className="text-slate leading-relaxed mb-4">
            Nao ha cadastro de contas de usuario, nao sao coletados dados de
            pagamento e nenhuma informacao financeira e armazenada nesta
            plataforma.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-xl text-cream mb-4">
            3. Finalidade do Tratamento
          </h2>
          <p className="text-slate leading-relaxed mb-4">
            Os dados coletados sao utilizados unicamente para responder as
            solicitacoes de contato enviadas pelo visitante e para aprimorar a
            qualidade dos nossos servicos. As informacoes nao sao vendidas,
            cedidas ou compartilhadas com terceiros sem o consentimento expresso
            do titular, salvo por obrigacao legal.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-xl text-cream mb-4">
            4. Base Legal (LGPD)
          </h2>
          <p className="text-slate leading-relaxed mb-4">
            O tratamento dos dados se fundamenta nas seguintes hipoteses legais
            previstas na LGPD:
          </p>
          <ul className="text-slate leading-relaxed mb-4 list-disc list-inside space-y-2">
            <li>
              Art. 7, VI — legitimo interesse da Primor Holding em responder
              comunicacoes e prestar seus servicos de consultoria;
            </li>
            <li>
              Art. 7, I — consentimento do titular, manifestado por meio do
              banner de cookies exibido na primeira visita ao site.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-xl text-cream mb-4">
            5. Cookies e Tecnologias
          </h2>
          <p className="text-slate leading-relaxed mb-4">
            O site utiliza cookies de sessao necessarios para o funcionamento
            tecnico da plataforma. Cookies de analytics sao ativados somente
            mediante consentimento explicito do visitante, obtido por meio do
            banner de cookies exibido na primeira visita.
          </p>
          <p className="text-slate leading-relaxed mb-4">
            A preferencia de consentimento e salva no armazenamento local do
            navegador (localStorage) sob a chave{" "}
            <code className="text-gold/80 bg-white/5 px-1 rounded">
              primor:cookie-consent
            </code>
            .
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-xl text-cream mb-4">
            6. Seus Direitos
          </h2>
          <p className="text-slate leading-relaxed mb-4">
            Nos termos do Art. 18 da LGPD, o titular dos dados tem direito a:
          </p>
          <ul className="text-slate leading-relaxed mb-4 list-disc list-inside space-y-2">
            <li>Confirmacao da existencia de tratamento;</li>
            <li>Acesso aos dados;</li>
            <li>Correcao de dados incompletos, inexatos ou desatualizados;</li>
            <li>
              Anonimizacao, bloqueio ou eliminacao de dados desnecessarios;
            </li>
            <li>Portabilidade dos dados;</li>
            <li>
              Revogacao do consentimento a qualquer momento, sem prejuizo da
              licitude do tratamento anterior.
            </li>
          </ul>
          <p className="text-slate leading-relaxed mb-4">
            Para exercer seus direitos, entre em contato pelo e-mail:{" "}
            <a
              href={`mailto:${COMPANY.email}`}
              className="text-gold hover:text-gold-light transition-colors"
            >
              {COMPANY.email}
            </a>
            .
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-xl text-cream mb-4">
            7. Retencao de Dados
          </h2>
          <p className="text-slate leading-relaxed mb-4">
            Os dados coletados pelo formulario de contato sao retidos pelo prazo
            de 5 (cinco) anos para cumprimento de obrigacoes legais. Apos esse
            periodo, as informacoes sao excluidas permanentemente de nossos
            sistemas.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-xl text-cream mb-4">
            8. Contato do DPO
          </h2>
          <p className="text-slate leading-relaxed mb-4">
            O Encarregado pelo Tratamento de Dados Pessoais (DPO) pode ser
            contactado pelo e-mail:{" "}
            <a
              href={`mailto:${COMPANY.email}`}
              className="text-gold hover:text-gold-light transition-colors"
            >
              {COMPANY.email}
            </a>
            .
          </p>
        </section>

        <div className="border-t border-white/10 pt-8 mt-12">
          <Link
            href="/"
            className="text-gold hover:text-gold-light transition-colors text-sm"
          >
            ← Voltar ao inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
