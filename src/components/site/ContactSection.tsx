"use client";

import { useActionState } from "react";
import { CheckCircle } from "lucide-react";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

const initialState: ContactState = {};

export function ContactSection() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState
  );

  return (
    <Section id="contato" className="bg-navy-dark">
      <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase text-center mb-4">
        Entre em Contato
      </p>
      <h2 className="font-serif text-3xl md:text-4xl text-center text-cream mb-4">
        Fale Conosco
      </h2>
      <p className="text-slate text-center max-w-xl mx-auto mb-12">
        Preencha o formulario e retornaremos em ate 24 horas.
      </p>

      <div className="max-w-2xl mx-auto">
        {state.success ? (
          <div className="rounded-xl border border-gold/30 bg-navy p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-gold" />
            </div>
            <h3 className="font-serif text-xl text-cream mb-2">
              Mensagem Enviada!
            </h3>
            <p className="text-slate">{state.message}</p>
          </div>
        ) : (
          <form action={formAction} className="space-y-6">
            {/* Honeypot: sr-only so bots see it, real users do not interact */}
            <input
              type="text"
              name="website"
              className="sr-only"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-cream mb-2"
              >
                Nome *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Seu nome completo"
                className="w-full rounded-lg border border-white/10 bg-navy px-4 py-3 text-cream placeholder:text-slate/50 focus:outline-none focus:border-gold/50 transition-colors"
              />
              {state.errors?.name && (
                <p className="text-red-400 text-sm mt-1">
                  {state.errors.name[0]}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-cream mb-2"
              >
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="seu@email.com"
                className="w-full rounded-lg border border-white/10 bg-navy px-4 py-3 text-cream placeholder:text-slate/50 focus:outline-none focus:border-gold/50 transition-colors"
              />
              {state.errors?.email && (
                <p className="text-red-400 text-sm mt-1">
                  {state.errors.email[0]}
                </p>
              )}
            </div>

            {/* Phone (optional) */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-cream mb-2"
              >
                Telefone (opcional)
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="(11) 99999-9999"
                className="w-full rounded-lg border border-white/10 bg-navy px-4 py-3 text-cream placeholder:text-slate/50 focus:outline-none focus:border-gold/50 transition-colors"
              />
              {state.errors?.phone && (
                <p className="text-red-400 text-sm mt-1">
                  {state.errors.phone[0]}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-cream mb-2"
              >
                Mensagem *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Como podemos ajudar?"
                className="w-full rounded-lg border border-white/10 bg-navy px-4 py-3 text-cream placeholder:text-slate/50 focus:outline-none focus:border-gold/50 transition-colors resize-none"
              />
              {state.errors?.message && (
                <p className="text-red-400 text-sm mt-1">
                  {state.errors.message[0]}
                </p>
              )}
            </div>

            <Button type="submit" disabled={pending} size="lg" className="w-full">
              {pending ? "Enviando..." : "Enviar Mensagem"}
            </Button>
          </form>
        )}
      </div>
    </Section>
  );
}
