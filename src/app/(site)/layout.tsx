import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { CookieBanner } from "@/components/site/CookieBanner";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await prisma.siteSettings
    .findUnique({
      where: { id: "default" },
      select: {
        cnpj: true,
        email: true,
        instagramUrl: true,
        linkedinUrl: true,
        whatsappNumber: true,
      },
    })
    .catch(() => null);

  return (
    <>
      <Navbar />
      <main className="pt-20">{children}</main>
      <Footer settings={settings} />
      {settings?.whatsappNumber && settings.whatsappNumber.length > 0 && (
        <WhatsAppButton number={settings.whatsappNumber} />
      )}
      <CookieBanner />
    </>
  );
}
