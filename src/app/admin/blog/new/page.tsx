"use client";

import { useActionState } from "react";
import Link from "next/link";
import { createBlogPost, type BlogPostState } from "@/app/actions/blog";
import { ArrowLeft } from "lucide-react";

const inputClass =
  "bg-navy border border-navy-light rounded px-3 py-2 text-cream w-full focus:outline-none focus:border-gold";
const labelClass = "block text-slate text-sm mb-1";

export default function NewBlogPostPage() {
  const [state, formAction, isPending] = useActionState<BlogPostState, FormData>(
    createBlogPost,
    {}
  );

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/admin/blog"
          className="text-slate hover:text-cream transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>
        <h1 className="font-serif text-3xl text-cream">Novo Post</h1>
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
          <label className={labelClass}>Resumo (opcional)</label>
          <textarea
            name="excerpt"
            rows={2}
            placeholder="Resumo do post para SEO e preview"
            className={inputClass}
          />
          {state.errors?.excerpt && (
            <p className="text-red-400 text-xs mt-1">{state.errors.excerpt[0]}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>Conteudo *</label>
          <textarea
            name="content"
            rows={12}
            className={inputClass}
            required
          />
          {state.errors?.content && (
            <p className="text-red-400 text-xs mt-1">
              {state.errors.content[0]}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="published"
            id="published"
            className="w-4 h-4 accent-gold"
          />
          <label htmlFor="published" className="text-slate text-sm">
            Publicar imediatamente
          </label>
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
            {isPending ? "Criando..." : "Criar Post"}
          </button>
          <Link
            href="/admin/blog"
            className="px-6 py-2 rounded-md text-sm text-slate hover:text-cream border border-navy-light transition-colors"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
