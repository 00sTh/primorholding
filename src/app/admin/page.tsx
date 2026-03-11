export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { Briefcase, Star, FileText, MessageSquare } from "lucide-react";

export default async function AdminDashboard() {
  const [servicesCount, testimonialsCount, postsCount, unreadContactsCount] =
    await Promise.all([
      prisma.service.count(),
      prisma.testimonial.count(),
      prisma.blogPost.count(),
      prisma.contact.count({ where: { read: false } }),
    ]);

  const stats = [
    {
      label: "Servicos",
      count: servicesCount,
      icon: Briefcase,
    },
    {
      label: "Depoimentos",
      count: testimonialsCount,
      icon: Star,
    },
    {
      label: "Posts",
      count: postsCount,
      icon: FileText,
    },
    {
      label: "Contatos nao lidos",
      count: unreadContactsCount,
      icon: MessageSquare,
    },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl text-cream mb-8">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, count, icon: Icon }) => (
          <div
            key={label}
            className="bg-navy rounded-lg p-6 border border-navy-light"
          >
            <div className="flex items-center justify-between mb-3">
              <Icon size={20} className="text-gold" />
            </div>
            <p className="text-gold font-serif text-4xl font-bold">{count}</p>
            <p className="text-slate text-sm mt-1">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
