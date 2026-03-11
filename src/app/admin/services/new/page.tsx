"use client";

import { useActionState } from "react";
import Link from "next/link";
import { createService, type ServiceState } from "@/app/actions/services";
import { ArrowLeft } from "lucide-react";

const inputClass =
  "bg-navy border border-navy-light rounded px-3 py-2 text-cream w-full focus:outline-none focus:border-gold";
const labelClass = "block text-slate text-sm mb-1";

export default function NewServicePage() {
  const [state, formAction, isPending] = useActionState<ServiceState, FormData>(
    createService,
    {}
  );

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/admin/services"
          className="text-slate hover:text-cream transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>
        <h1 className="font-serif text-3xl text-cream">Novo Servico</h1>
      </div>

      <form action={formAction} className="space-y-5">
        <div>
          <label className={labelClass}>Titulo *</label>
          <input type="text" name="title" className={inputClass} required />
          {state.errors?.title && (
            <p className="text-red-400 text-xs mt-1">{state.errors.title[0]}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>Descricao *</label>
          <textarea
            name="description"
            rows={4}
            className={inputClass}
            required
          />
          {state.errors?.description && (
            <p className="text-red-400 text-xs mt-1">
              {state.errors.description[0]}
            </p>
          )}
        </div>

        <div>
          <label className={labelClass}>Icone (nome lucide, ex: briefcase)</label>
          <input
            type="text"
            name="icon"
            placeholder="briefcase"
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
          <label className={labelClass}>Imagem</label>
          <input
            type="file"
            name="image"
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
            {isPending ? "Criando..." : "Criar Servico"}
          </button>
          <Link
            href="/admin/services"
            className="px-6 py-2 rounded-md text-sm text-slate hover:text-cream border border-navy-light transition-colors"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
