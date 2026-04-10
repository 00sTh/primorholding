import type { Metadata } from "next";
import { getLeads, toggleLeadRead } from "@/actions/leads";
import { Mail, Phone, Building2, MessageSquare } from "lucide-react";

export const metadata: Metadata = { title: "Leads | Admin" };
export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const leads = await getLeads();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-bold text-[#F0EBE1]">Leads</h1>
        <p className="text-[#8B8075] text-sm mt-1">
          {leads.length} {leads.length === 1 ? "contato recebido" : "contatos recebidos"}
        </p>
      </div>

      {leads.length === 0 ? (
        <div className="admin-card text-center py-16">
          <MessageSquare className="w-10 h-10 text-[#8B8075] mx-auto mb-4" />
          <p className="text-[#F0EBE1] font-medium mb-1">Nenhum lead ainda</p>
          <p className="text-[#8B8075] text-sm">Os contatos enviados pelo site aparecerão aqui.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className={`admin-card border ${
                !lead.read
                  ? "border-[rgba(201,169,110,0.2)]"
                  : "border-[rgba(255,255,255,0.06)]"
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-[#F0EBE1]">{lead.name}</h3>
                    {!lead.read ? (
                      <span className="badge-unread">Novo</span>
                    ) : (
                      <span className="badge-read">Lido</span>
                    )}
                  </div>
                  <p className="text-[#8B8075] text-xs">
                    {new Date(lead.createdAt).toLocaleString("pt-BR")}
                  </p>
                </div>
                <form
                  action={async () => {
                    "use server";
                    await toggleLeadRead(lead.id, lead.read);
                  }}
                >
                  <button
                    type="submit"
                    className="btn-ghost text-xs py-1.5 px-3"
                  >
                    {lead.read ? "Marcar não lido" : "Marcar lido"}
                  </button>
                </form>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 text-sm">
                <div className="flex items-center gap-2 text-[#8B8075]">
                  <Mail className="w-3.5 h-3.5 text-[#C9A96E] flex-shrink-0" />
                  <a href={`mailto:${lead.email}`} className="hover:text-[#C9A96E] transition-colors truncate">
                    {lead.email}
                  </a>
                </div>
                {lead.phone && (
                  <div className="flex items-center gap-2 text-[#8B8075]">
                    <Phone className="w-3.5 h-3.5 text-[#C9A96E] flex-shrink-0" />
                    {lead.phone}
                  </div>
                )}
                {lead.company && (
                  <div className="flex items-center gap-2 text-[#8B8075]">
                    <Building2 className="w-3.5 h-3.5 text-[#C9A96E] flex-shrink-0" />
                    {lead.company}
                  </div>
                )}
              </div>

              <div className="bg-[rgba(255,255,255,0.03)] rounded-lg p-4 border border-[rgba(255,255,255,0.05)]">
                <p className="text-[#8B8075] text-xs uppercase tracking-wider mb-2">Mensagem</p>
                <p className="text-[#F0EBE1] text-sm leading-relaxed whitespace-pre-wrap">
                  {lead.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
