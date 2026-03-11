"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Star,
  FileText,
  MessageSquare,
} from "lucide-react";

const navLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/services", label: "Servicos", icon: Briefcase, exact: false },
  {
    href: "/admin/testimonials",
    label: "Depoimentos",
    icon: Star,
    exact: false,
  },
  { href: "/admin/blog", label: "Blog", icon: FileText, exact: false },
  {
    href: "/admin/contacts",
    label: "Contatos",
    icon: MessageSquare,
    exact: false,
  },
];

function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="mt-8 flex flex-col gap-1 px-3">
      {navLinks.map(({ href, label, icon: Icon, exact }) => {
        const isActive = exact ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
              isActive
                ? "bg-navy text-gold font-medium"
                : "text-slate hover:text-cream hover:bg-navy"
            }`}
          >
            <Icon size={16} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-navy-dark">
      <aside className="w-56 border-r border-navy-light flex-shrink-0 flex flex-col">
        <div className="px-6 py-5 border-b border-navy-light">
          <Link href="/admin" className="font-serif text-gold text-xl">
            Primor Admin
          </Link>
        </div>
        <AdminNav />
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
