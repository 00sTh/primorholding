"use client";

import { useActionState } from "react";
import { submitLead } from "@/actions/leads";
import type { ActionResult } from "@/types";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";

const initialState: ActionResult = { success: false, message: "" };

export default function ContatoPage() {
  const [state, action, pending] = useActionState(submitLead, initialState);

  return (
    <>
      {/* Hero */}
      <section className="hero-gradient pt-40 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <div className="section-eyebrow mb-5">
              <span className="gold-line" />
              Entre em Contato
            </div>
            <h1 className="section-title mb-4">
              Vamos conversar
              <br />
              <span className="text-gradient-gold">sobre seu negócio</span>
            </h1>
            <p className="text-[#6B6057] text-lg">
              Nossa equipe está pronta para entender seus desafios e apresentar
              as melhores soluções.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Info */}
            <div className="lg:col-span-2 space-y-6">
              {[
                {
                  icon: MapPin,
                  label: "Endereço",
                  value: "Av. Paulista, 1000 — São Paulo, SP",
                },
                { icon: Phone, label: "Telefone", value: "(11) 3000-0000" },
                {
                  icon: Mail,
                  label: "E-mail",
                  value: "contato@primorholding.com.br",
                },
                {
                  icon: Clock,
                  label: "Horário",
                  value: "Segunda a Sexta, 9h às 18h",
                },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="card-dark p-5 flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-[rgba(201,169,110,0.08)] border border-[rgba(201,169,110,0.15)] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-[#C9A96E]" />
                  </div>
                  <div>
                    <p className="text-[#6B6057] text-xs uppercase tracking-wider mb-1">
                      {label}
                    </p>
                    <p className="text-[#1C1510] text-sm font-medium">{value}</p>
                  </div>
                </div>
              ))}

              <div className="glass-gold rounded-xl p-6 mt-2">
                <p className="text-[#C9A96E] text-xs font-semibold uppercase tracking-wider mb-3">
                  Dados Empresariais
                </p>
                <p className="text-[#1C1510] text-sm font-medium mb-1">
                  PRIMOR PARTNERSHIP HOLDING LTDA
                </p>
                <p className="text-[#6B6057] text-sm">
                  CNPJ: 59.120.382/0001-30
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              {state.success ? (
                <div className="card-dark p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-[rgba(201,169,110,0.1)] border border-[rgba(201,169,110,0.2)] flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-[#C9A96E]" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-[#1C1510] mb-3">
                    Mensagem enviada!
                  </h3>
                  <p className="text-[#6B6057]">{state.message}</p>
                </div>
              ) : (
                <div className="card-dark p-8">
                  <h3 className="font-serif text-xl font-semibold text-[#1C1510] mb-7">
                    Envie sua mensagem
                  </h3>

                  {state.message && !state.success && (
                    <div className="bg-red-950/30 border border-red-800/30 rounded-lg px-4 py-3 mb-6 text-red-400 text-sm">
                      {state.message}
                    </div>
                  )}

                  <form action={action} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="label-dark" htmlFor="name">
                          Nome *
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Seu nome completo"
                          className="input-dark"
                          required
                        />
                        {state.errors?.name && (
                          <p className="text-red-400 text-xs mt-1">{state.errors.name[0]}</p>
                        )}
                      </div>
                      <div>
                        <label className="label-dark" htmlFor="email">
                          E-mail *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="seu@email.com"
                          className="input-dark"
                          required
                        />
                        {state.errors?.email && (
                          <p className="text-red-400 text-xs mt-1">{state.errors.email[0]}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="label-dark" htmlFor="phone">
                          Telefone
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="(11) 99999-9999"
                          className="input-dark"
                        />
                      </div>
                      <div>
                        <label className="label-dark" htmlFor="company">
                          Empresa
                        </label>
                        <input
                          id="company"
                          name="company"
                          type="text"
                          placeholder="Nome da empresa"
                          className="input-dark"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="label-dark" htmlFor="message">
                        Mensagem *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        placeholder="Conte-nos sobre seu desafio ou oportunidade..."
                        className="input-dark resize-none"
                        required
                      />
                      {state.errors?.message && (
                        <p className="text-red-400 text-xs mt-1">{state.errors.message[0]}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={pending}
                      className="btn-gold w-full disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {pending ? (
                        "Enviando..."
                      ) : (
                        <>
                          Enviar Mensagem
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
