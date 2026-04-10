import type { Metadata } from "next";
import Link from "next/link";
import { getAdminStats, getRecentLeads } from "@/actions/admin";
import { BarChart3, Users, Inbox, ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "Dashboard | Admin" };
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [stats, leads] = await Promise.all([
    getAdminStats(),
    getRecentLeads(5),
  ]);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-bold text-[#F0EBE1]">Dashboard</h1>
        <p className="text-[#8B8075] text-sm mt-1">Visão geral dos contatos recebidos</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          { icon: Inbox, label: "Total de Leads", value: stats.total, color: "text-[#C9A96E]" },
          { icon: Users, label: "Não Lidos", value: stats.unread, color: "text-yellow-400" },
          { icon: BarChart3, label: "Recebidos Hoje", value: stats.today, color: "text-emerald-400" },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="admin-card">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[#8B8075] text-sm">{label}</p>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <p className={`font-serif text-4xl font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Recent leads */}
      <div className="admin-card p-0 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(255,255,255,0.06)]">
          <h2 className="font-semibold text-[#F0EBE1] text-sm">Últimos Contatos</h2>
          <Link
            href="/admin/leads"
            className="text-[#C9A96E] text-xs flex items-center gap-1 hover:gap-2 transition-all"
          >
            Ver todos
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {leads.length === 0 ? (
          <div className="px-6 py-12 text-center text-[#8B8075] text-sm">
            Nenhum contato recebido ainda.
          </div>
        ) : (
          <div className="divide-y divide-[rgba(255,255,255,0.04)]">
            {leads.map((lead) => (
              <div key={lead.id} className="px-6 py-4 flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[rgba(201,169,110,0.08)] flex items-center justify-center flex-shrink-0">
                  <span className="text-[#C9A96E] text-xs font-bold">
                    {lead.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#F0EBE1] text-sm font-medium truncate">{lead.name}</p>
                  <p className="text-[#8B8075] text-xs truncate">{lead.email}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  {!lead.read && <span className="badge-unread">Novo</span>}
                  <span className="text-[#5C5555] text-xs">
                    {new Date(lead.createdAt).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
