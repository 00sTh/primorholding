"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  createTestimonial,
  type TestimonialState,
} from "@/app/actions/testimonials";
import { ArrowLeft } from "lucide-react";

const inputClass =
  "bg-navy border border-navy-light rounded px-3 py-2 text-cream w-full focus:outline-none focus:border-gold";
const labelClass = "block text-slate text-sm mb-1";

export default function NewTestimonialPage() {
  const [state, formAction, isPending] = useActionState<
    TestimonialState,
    FormData
  >(createTestimonial, {});

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/admin/testimonials"
          className="text-slate hover:text-cream transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>
        <h1 className="font-serif text-3xl text-cream">Novo Depoimento</h1>
      </div>

      <form action={formAction} className="space-y-5">
        <div>
          <label className={labelClass}>Nome *</label>
          <input type="text" name="name" className={inputClass} required />
          {state.errors?.name && (
            <p className="text-red-400 text-xs mt-1">{state.errors.name[0]}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>Empresa</label>
          <input type="text" name="company" className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Cargo</label>
          <input type="text" name="role" className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Depoimento *</label>
          <textarea
            name="content"
            rows={4}
            className={inputClass}
            required
          />
          {state.errors?.content && (
            <p className="text-red-400 text-xs mt-1">
              {state.errors.content[0]}
            </p>
          )}
        </div>

        <div>
          <label className={labelClass}>Rating (1-5)</label>
          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            defaultValue="5"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Ordem</label>
          <input
            type="number"
            name="order"
            defaultValue="0"
            className={inputClass}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="active"
            id="active"
            defaultChecked
            value="true"
            className="w-4 h-4 accent-gold"
          />
          <label htmlFor="active" className="text-slate text-sm">
            Ativo
          </label>
        </div>

        <div>
          <label className={labelClass}>Foto</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            className="text-slate text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-navy file:text-cream file:text-sm hover:file:bg-navy-light cursor-pointer"
          />
        </div>

        {state.message && (
          <p className="text-red-400 text-sm">{state.message}</p>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="bg-gold text-navy-dark px-6 py-2 rounded-md text-sm font-medium hover:bg-gold-light transition-colors disabled:opacity-50"
          >
            {isPending ? "Criando..." : "Criar Depoimento"}
          </button>
          <Link
            href="/admin/testimonials"
            className="px-6 py-2 rounded-md text-sm text-slate hover:text-cream border border-navy-light transition-colors"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
