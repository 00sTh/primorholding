import Link from "next/link";
import { LayoutDashboard, Users, LogOut } from "lucide-react";
import { logoutAdmin } from "@/actions/admin";

const navItems = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/leads", icon: Users, label: "Leads" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#09090F] flex">
      {/* Sidebar */}
      <aside className="admin-sidebar w-60 flex-shrink-0 flex flex-col">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-[rgba(201,169,110,0.1)]">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-7 h-7 border border-[#C9A96E]/40 rounded flex items-center justify-center">
              <span className="text-[#C9A96E] font-serif text-xs font-bold">P</span>
            </div>
            <div>
              <p className="text-[#F0EBE1] text-sm font-semibold">Primor</p>
              <p className="text-[#8B8075] text-[0.6rem] tracking-widest uppercase">Admin</p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ href, icon: Icon, label }) => (
            <Link key={href} href={href} className="admin-nav-link">
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-4 border-t border-[rgba(255,255,255,0.05)] pt-4">
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="admin-nav-link w-full text-left hover:text-red-400"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </form>
        </div>

        {/* Link to site */}
        <div className="px-4 py-3 border-t border-[rgba(255,255,255,0.04)]">
          <Link
            href="/"
            target="_blank"
            className="text-[#5C5555] hover:text-[#8B8075] text-xs flex items-center gap-1.5 transition-colors"
          >
            Ver site público ↗
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto bg-[#09090F]">
        {children}
      </main>
    </div>
  );
}
