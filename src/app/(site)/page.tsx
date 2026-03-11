export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { COMPANY } from "@/lib/constants";
import { HeroSection } from "@/components/site/HeroSection";
import { AboutSection } from "@/components/site/AboutSection";
import { ServicesSection } from "@/components/site/ServicesSection";
import { TestimonialsSection } from "@/components/site/TestimonialsSection";
import { ContactSection } from "@/components/site/ContactSection";

export const metadata: Metadata = {
  title: "Consultoria Empresarial de Excelencia",
  description:
    "Transforme sua empresa com consultoria especializada em estrategia, reestruturacao e gestao de performance. Entre em contato com a Primor Holding.",
  openGraph: {
    title: "Primor Holding — Consultoria Empresarial",
    description:
      "Transforme sua empresa com consultoria especializada em estrategia, reestruturacao e gestao de performance.",
  },
};

export default async function HomePage() {
  const [services, testimonials, settings] = await Promise.all([
    prisma.service
      .findMany({
        where: { active: true },
        orderBy: { order: "asc" },
        select: {
          id: true,
          title: true,
          description: true,
          icon: true,
          imageUrl: true,
        },
      })
      .catch(() => []),
    prisma.testimonial
      .findMany({
        where: { active: true },
        orderBy: { order: "asc" },
        select: {
          id: true,
          name: true,
          company: true,
          role: true,
          content: true,
          photoUrl: true,
          rating: true,
        },
      })
      .catch(() => []),
    prisma.siteSettings
      .findUnique({
        where: { id: "default" },
        select: {
          heroTitle: true,
          heroSubtitle: true,
          aboutTitle: true,
          aboutText: true,
          founderName: true,
          founderPhotoUrl: true,
        },
      })
      .catch(() => null),
  ]);

  return (
    <>
      <HeroSection
        title={
          settings?.heroTitle ??
          "Transforme sua Empresa com Consultoria de Excelencia"
        }
        subtitle={
          settings?.heroSubtitle ??
          "Estrategia, gestao e reestruturacao empresarial para impulsionar resultados reais."
        }
      />
      <AboutSection
        title={settings?.aboutTitle ?? "Sobre Nos"}
        text={settings?.aboutText ?? ""}
        founderName={settings?.founderName ?? COMPANY.founder}
        founderPhotoUrl={settings?.founderPhotoUrl ?? null}
      />
      <ServicesSection services={services} />
      <TestimonialsSection testimonials={testimonials} />
      <ContactSection />
    </>
  );
}
