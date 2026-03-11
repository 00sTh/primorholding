import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Trash2, Pencil, Plus } from "lucide-react";
import { deleteTestimonial } from "@/app/actions/testimonials";

interface TestimonialRow {
  id: string;
  name: string;
  company: string | null;
  photoUrl: string | null;
  rating: number;
  active: boolean;
  order: number;
}

export default async function TestimonialsListPage() {
  const testimonials: TestimonialRow[] = await prisma.testimonial.findMany({
    select: {
      id: true,
      name: true,
      company: true,
      photoUrl: true,
      rating: true,
      active: true,
      order: true,
    },
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl text-cream">Depoimentos</h1>
        <Link
          href="/admin/testimonials/new"
          className="flex items-center gap-2 bg-gold text-navy-dark px-4 py-2 rounded-md text-sm font-medium hover:bg-gold-light transition-colors"
        >
          <Plus size={16} />
          Novo Depoimento
        </Link>
      </div>

      {testimonials.length === 0 ? (
        <div className="bg-navy rounded-lg border border-navy-light p-12 text-center">
          <p className="text-slate">Nenhum depoimento cadastrado.</p>
          <Link
            href="/admin/testimonials/new"
            className="mt-4 inline-flex items-center gap-2 text-gold hover:text-gold-light text-sm"
          >
            <Plus size={14} />
            Adicionar primeiro depoimento
          </Link>
        </div>
      ) : (
        <div className="bg-navy rounded-lg border border-navy-light overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-light">
                <th className="text-left text-slate font-medium px-4 py-3">
                  Foto
                </th>
                <th className="text-left text-slate font-medium px-4 py-3">
                  Nome
                </th>
                <th className="text-left text-slate font-medium px-4 py-3">
                  Empresa
                </th>
                <th className="text-left text-slate font-medium px-4 py-3">
                  Rating
                </th>
                <th className="text-left text-slate font-medium px-4 py-3">
                  Ativo
                </th>
                <th className="text-left text-slate font-medium px-4 py-3">
                  Acoes
                </th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((testimonial) => (
                <tr
                  key={testimonial.id}
                  className="border-b border-navy-light last:border-0 hover:bg-navy-dark transition-colors"
                >
                  <td className="px-4 py-3">
                    {testimonial.photoUrl ? (
                      <Image
                        src={testimonial.photoUrl}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-navy-dark rounded-full flex items-center justify-center">
                        <span className="text-gold text-sm font-medium">
                          {testimonial.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-cream">{testimonial.name}</td>
                  <td className="px-4 py-3 text-slate">
                    {testimonial.company ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-slate">
                    ⭐ {testimonial.rating}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs ${
                        testimonial.active
                          ? "bg-green-900 text-green-300"
                          : "bg-slate/20 text-slate"
                      }`}
                    >
                      {testimonial.active ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/testimonials/${testimonial.id}`}
                        className="p-1.5 text-slate hover:text-cream transition-colors rounded hover:bg-navy-dark"
                        title="Editar"
                      >
                        <Pencil size={14} />
                      </Link>
                      <form
                        action={deleteTestimonial.bind(null, testimonial.id)}
                      >
                        <button
                          type="submit"
                          className="p-1.5 text-slate hover:text-red-400 transition-colors rounded hover:bg-navy-dark"
                          title="Excluir"
                        >
                          <Trash2 size={14} />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
