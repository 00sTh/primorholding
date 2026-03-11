import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Primor Holding - Consultoria Empresarial",
    template: "%s | Primor Holding",
  },
  description: "Consultoria empresarial de excelencia. Estrategia, gestao e reestruturacao para impulsionar o crescimento do seu negocio.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Primor Holding",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={geist.variable}>
      <body className="font-sans antialiased">
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}
