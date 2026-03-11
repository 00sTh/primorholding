export const dynamic = "force-dynamic";

import { Fragment } from "react";
import { prisma } from "@/lib/prisma";
import { toggleContactRead } from "@/app/actions/contacts";
import { Mail, MailOpen, MessageSquare } from "lucide-react";

interface ContactRow {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  read: boolean;
  createdAt: Date;
}

export default async function ContactsPage() {
  const [contacts, unreadCount]: [ContactRow[], number] = await Promise.all([
    prisma.contact.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        company: true,
        message: true,
        read: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.contact.count({ where: { read: false } }),
  ]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl text-cream">Contatos</h1>
      </div>

      <p className="text-slate text-sm mb-6">
        {contacts.length} mensagen{contacts.length !== 1 ? "s" : ""},{" "}
        <span className={unreadCount > 0 ? "text-gold font-medium" : ""}>
          {unreadCount} nao lida{unreadCount !== 1 ? "s" : ""}
        </span>
      </p>

      {contacts.length === 0 ? (
        <div className="bg-navy rounded-lg border border-navy-light p-12 text-center">
          <MessageSquare size={32} className="text-slate mx-auto mb-3" />
          <p className="text-slate">Nenhuma mensagem recebida ainda.</p>
        </div>
      ) : (
        <div className="bg-navy rounded-lg border border-navy-light overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-light">
                <th className="text-left text-slate font-medium px-4 py-3">
                  Nome
                </th>
                <th className="text-left text-slate font-medium px-4 py-3">
                  Email
                </th>
                <th className="text-left text-slate font-medium px-4 py-3">
                  Telefone
                </th>
                <th className="text-left text-slate font-medium px-4 py-3">
                  Empresa
                </th>
                <th className="text-left text-slate font-medium px-4 py-3">
                  Mensagem
                </th>
                <th className="text-left text-slate font-medium px-4 py-3">
                  Data
                </th>
                <th className="text-left text-slate font-medium px-4 py-3">
                  Status
                </th>
                <th className="text-left text-slate font-medium px-4 py-3">
                  Acao
                </th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <Fragment key={contact.id}>
                  <tr
                    className={`border-b border-navy-light transition-colors ${
                      contact.read
                        ? "bg-navy-dark opacity-70"
                        : "bg-navy/80 font-medium"
                    }`}
                  >
                    <td className="px-4 py-3 text-cream">{contact.name}</td>
                    <td className="px-4 py-3 text-slate">
                      <a
                        href={`mailto:${contact.email}`}
                        className="hover:text-gold transition-colors"
                      >
                        {contact.email}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-slate">
                      {contact.phone ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-slate">
                      {contact.company ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-slate max-w-xs">
                      {contact.message.length > 80
                        ? contact.message.slice(0, 80) + "..."
                        : contact.message}
                    </td>
                    <td className="px-4 py-3 text-slate whitespace-nowrap">
                      {contact.createdAt.toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-4 py-3">
                      {contact.read ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-slate/20 text-slate">
                          <MailOpen size={12} />
                          Lido
                        </span>
                      ) : (
                        <span
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs text-white"
                          style={{ backgroundColor: "#C9A227", color: "#0A1628" }}
                        >
                          <Mail size={12} />
                          Nao lido
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <form
                        action={toggleContactRead.bind(
                          null,
                          contact.id,
                          contact.read
                        )}
                      >
                        <button
                          type="submit"
                          className="flex items-center gap-1 text-xs text-slate hover:text-cream transition-colors px-2 py-1 rounded hover:bg-navy-light"
                        >
                          {contact.read ? (
                            <>
                              <Mail size={12} />
                              Marcar nao lido
                            </>
                          ) : (
                            <>
                              <MailOpen size={12} />
                              Marcar lido
                            </>
                          )}
                        </button>
                      </form>
                    </td>
                  </tr>
                  {contact.message.length > 80 && (
                    <tr
                      className={`border-b border-navy-light ${
                        contact.read ? "bg-navy-dark opacity-70" : "bg-navy/80"
                      }`}
                    >
                      <td colSpan={8} className="px-4 pb-3">
                        <details className="text-slate text-xs">
                          <summary className="cursor-pointer hover:text-cream transition-colors">
                            Ver mensagem completa
                          </summary>
                          <p className="mt-2 text-slate leading-relaxed whitespace-pre-wrap">
                            {contact.message}
                          </p>
                        </details>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
