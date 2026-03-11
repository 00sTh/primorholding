import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Trash2, Pencil, Plus } from "lucide-react";
import { deleteService } from "@/app/actions/services";

interface ServiceRow {
  id: string;
  title: string;
  imageUrl: string | null;
  active: boolean;
  order: number;
}

export default async function ServicesListPage() {
  const services: ServiceRow[] = await prisma.service.findMany({
    select: {
      id: true,
      title: true,
      imageUrl: true,
      active: true,
      order: true,
    },
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl text-cream">Servicos</h1>
        <Link
          href="/admin/services/new"
          className="flex items-center gap-2 bg-gold text-navy-dark px-4 py-2 rounded-md text-sm font-medium hover:bg-gold-light transition-colors"
        >
          <Plus size={16} />
          Novo Servico
        </Link>
      </div>

      {services.length === 0 ? (
        <div className="bg-navy rounded-lg border border-navy-light p-12 text-center">
          <p className="text-slate">Nenhum servico cadastrado.</p>
          <Link
            href="/admin/services/new"
            className="mt-4 inline-flex items-center gap-2 text-gold hover:text-gold-light text-sm"
          >
            <Plus size={14} />
            Adicionar primeiro servico
          </Link>
        </div>
      ) : (
        <div className="bg-navy rounded-lg border border-navy-light overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-light">
                <th className="text-left text-slate font-medium px-4 py-3">
                  Imagem
                </th>
                <th className="text-left text-slate font-medium px-4 py-3">
                  Titulo
                </th>
                <th className="text-left text-slate font-medium px-4 py-3">
                  Ativo
                </th>
                <th className="text-left text-slate font-medium px-4 py-3">
                  Ordem
                </th>
                <th className="text-left text-slate font-medium px-4 py-3">
                  Acoes
                </th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr
                  key={service.id}
                  className="border-b border-navy-light last:border-0 hover:bg-navy-dark transition-colors"
                >
                  <td className="px-4 py-3">
                    {service.imageUrl ? (
                      <Image
                        src={service.imageUrl}
                        alt={service.title}
                        width={48}
                        height={48}
                        className="rounded object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-navy-dark rounded flex items-center justify-center">
                        <span className="text-slate text-xs">N/A</span>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-cream">{service.title}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs ${
                        service.active
                          ? "bg-green-900 text-green-300"
                          : "bg-slate/20 text-slate"
                      }`}
                    >
                      {service.active ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate">{service.order}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/services/${service.id}`}
                        className="p-1.5 text-slate hover:text-cream transition-colors rounded hover:bg-navy-dark"
                        title="Editar"
                      >
                        <Pencil size={14} />
                      </Link>
                      <form action={deleteService.bind(null, service.id)}>
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
