import Link from "next/link";
import { COMPANY } from "@/lib/constants";

export const metadata = {
  title: "Termos de Uso",
  description: "Termos e condicoes de uso do site da Primor Holding.",
};

export default function TermosPage() {
  return (
    <main className="pt-20 pb-20 min-h-screen">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="py-12 border-b border-white/10 mb-12">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            Legal
          </p>
          <h1 className="font-serif text-4xl text-cream mb-4">Termos de Uso</h1>
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
            1. Aceitacao dos Termos
          </h2>
          <p className="text-slate leading-relaxed mb-4">
            Ao acessar e utilizar este site, o usuario declara que leu,
            compreendeu e concorda com estes Termos de Uso. A {COMPANY.name}{" "}
            ({COMPANY.fullName}, CNPJ {COMPANY.cnpj}) reserva-se o direito de
            atualizar estes termos a qualquer momento, sem aviso previo. O uso
            continuado do site apos alteracoes implica aceitacao automatica dos
            novos termos.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-xl text-cream mb-4">
            2. Uso do Site
          </h2>
          <p className="text-slate leading-relaxed mb-4">
            Este site e disponibilizado para fins informativos sobre os servicos
            de consultoria empresarial prestados pela Primor Holding. Todo o
            conteudo publicado — textos, imagens, logotipos e materiais — nao
            pode ser reproduzido, distribuido ou utilizado para fins comerciais
            sem autorizacao previa e expressa da empresa.
          </p>
          <p className="text-slate leading-relaxed mb-4">
            E vedado o uso do site para fins ilegais, abusivos ou que possam
            causar danos a terceiros ou a propria Primor Holding.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-xl text-cream mb-4">
            3. Responsabilidade
          </h2>
          <p className="text-slate leading-relaxed mb-4">
            A Primor Holding nao se responsabiliza por interrupcoes tecnicas
            temporarias, erros de conteudo ou indisponibilidade do site. As
            informacoes disponibilizadas neste site sao de carater
            exclusivamente informativo e nao constituem contrato de prestacao de
            servicos de consultoria profissional.
          </p>
          <p className="text-slate leading-relaxed mb-4">
            Para contratar nossos servicos, e necessario celebrar contrato
            formal com a empresa.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-xl text-cream mb-4">
            4. Propriedade Intelectual
          </h2>
          <p className="text-slate leading-relaxed mb-4">
            Todo o conteudo deste site, incluindo textos, logotipos, imagens,
            graficos e demais elementos visuais, e de propriedade exclusiva da{" "}
            {COMPANY.fullName} e esta protegido pela legislacao brasileira de
            direitos autorais (Lei n. 9.610/1998). Qualquer reproducao nao
            autorizada e expressamente proibida e sujeita as penalidades legais
            aplicaveis.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-xl text-cream mb-4">
            5. Links Externos
          </h2>
          <p className="text-slate leading-relaxed mb-4">
            Este site pode conter links para recursos e sites de terceiros
            fornecidos como referencia. A Primor Holding nao tem controle sobre
            o conteudo desses sites externos e nao se responsabiliza por sua
            disponibilidade, veracidade ou politicas de privacidade. O acesso a
            sites de terceiros ocorre por conta e risco do usuario.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-xl text-cream mb-4">
            6. Formulario de Contato
          </h2>
          <p className="text-slate leading-relaxed mb-4">
            O formulario de contato disponivel neste site destina-se
            exclusivamente ao envio de mensagens legitimas relacionadas aos
            servicos da Primor Holding. As informacoes fornecidas estao sujeitas
            a nossa{" "}
            <Link
              href="/privacidade"
              className="text-gold hover:text-gold-light transition-colors"
            >
              Politica de Privacidade
            </Link>
            . Envios considerados spam, falsos ou abusivos poderao ser
            bloqueados sem aviso previo.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-xl text-cream mb-4">
            7. Lei Aplicavel
          </h2>
          <p className="text-slate leading-relaxed mb-4">
            Estes Termos de Uso sao regidos e interpretados de acordo com as
            leis da Republica Federativa do Brasil. Fica eleito o foro da
            comarca de Sao Paulo, SP, como competente para dirimir quaisquer
            controversias decorrentes destes termos, com exclusao de qualquer
            outro, por mais privilegiado que seja.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-xl text-cream mb-4">8. Contato</h2>
          <p className="text-slate leading-relaxed mb-4">
            Para duvidas, reclamacoes ou solicitacoes relacionadas a estes
            termos, entre em contato:
          </p>
          <p className="text-slate leading-relaxed">
            <strong className="text-cream">{COMPANY.fullName}</strong>
            <br />
            CNPJ: {COMPANY.cnpj}
            <br />
            E-mail:{" "}
            <a
              href={`mailto:${COMPANY.email}`}
              className="text-gold hover:text-gold-light transition-colors"
            >
              {COMPANY.email}
            </a>
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
