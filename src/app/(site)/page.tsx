import { prisma } from "@/lib/prisma";
import { COMPANY } from "@/lib/constants";
import { HeroSection } from "@/components/site/HeroSection";
import { AboutSection } from "@/components/site/AboutSection";
import { ServicesSection } from "@/components/site/ServicesSection";
import { TestimonialsSection } from "@/components/site/TestimonialsSection";

export default async function HomePage() {
  const [services, testimonials, settings] = await Promise.all([
    prisma.service.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
      select: {
        id: true,
        title: true,
        description: true,
        icon: true,
        imageUrl: true,
      },
    }),
    prisma.testimonial.findMany({
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
    }),
    prisma.siteSettings.findUnique({
      where: { id: "default" },
      select: {
        heroTitle: true,
        heroSubtitle: true,
        aboutTitle: true,
        aboutText: true,
        founderName: true,
        founderPhotoUrl: true,
      },
    }),
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
    </>
  );
}
