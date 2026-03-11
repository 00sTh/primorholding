import "dotenv/config";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Upsert SiteSettings (singleton with id: "default")
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    create: {
      id: "default",
      siteName: "Primor Holding",
      heroTitle: "Transforme sua Empresa com Consultoria de Excelencia",
      heroSubtitle:
        "Estrategia, gestao e reestruturacao empresarial para impulsionar resultados reais.",
      aboutTitle: "Sobre Nos",
      aboutText:
        "Com mais de 20 anos de experiencia em reestruturacao e gestao empresarial, Joao Antonio Lopes Correa fundou a Primor Holding com uma missao clara: transformar empresas por meio de estrategias solidas, lideranca humanizada e resultados mensuraveis. Atuamos em setores variados, trazendo uma visao ampla e a expertise necessaria para cada desafio unico.",
      founderName: "Joao Antonio Lopes Correa",
      whatsappNumber: "5511999999999",
      email: "contato@primorholding.com.br",
      cnpj: "59.120.382/0001-30",
      instagramUrl: "",
      linkedinUrl: "",
    },
    update: {},
  });

  console.log("SiteSettings upserted.");

  // Upsert 3 Services by slug
  const services = [
    {
      slug: "estrategia-empresarial",
      title: "Estrategia Empresarial",
      description:
        "Desenvolvemos planos estrategicos robustos alinhados aos objetivos do seu negocio, identificando oportunidades de crescimento e vantagens competitivas sustentaveis.",
      order: 1,
      active: true,
    },
    {
      slug: "reestruturacao-organizacional",
      title: "Reestruturacao Organizacional",
      description:
        "Redesenhamos processos e estruturas organizacionais para aumentar a eficiencia operacional, reduzir custos e preparar a empresa para novos ciclos de crescimento.",
      order: 2,
      active: true,
    },
    {
      slug: "gestao-de-performance",
      title: "Gestao de Performance",
      description:
        "Implementamos indicadores de desempenho e sistemas de gestao que permitem monitorar resultados em tempo real e tomar decisoes baseadas em dados.",
      order: 3,
      active: true,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      create: service,
      update: {
        title: service.title,
        description: service.description,
        order: service.order,
        active: service.active,
      },
    });
  }

  console.log("3 Services upserted.");

  // Delete existing testimonials and recreate for deterministic seed
  await prisma.testimonial.deleteMany();
  await prisma.testimonial.createMany({
    data: [
      {
        name: "Carlos Mendonca",
        company: "Grupo Mendonca",
        role: "CEO",
        content:
          "A Primor Holding transformou nossa visao de negocio. Em apenas 6 meses, redesenhamos nossa estrutura e aumentamos nossa margem operacional em 23%. Recomendo fortemente.",
        rating: 5,
        active: true,
        order: 1,
      },
      {
        name: "Ana Paula Ferreira",
        company: "Ferreira Industrias",
        role: "Diretora Executiva",
        content:
          "Profissionalismo e resultados concretos. O trabalho de reestruturacao foi preciso e o suporte durante todo o processo foi excepcional. Voltaremos a trabalhar juntos com certeza.",
        rating: 5,
        active: true,
        order: 2,
      },
    ],
  });

  console.log("2 Testimonials created.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
