import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://primorholding.vercel.app"),
  title: {
    default: "Primor Holding — Consultoria Empresarial",
    template: "%s | Primor Holding",
  },
  description:
    "Consultoria empresarial especializada em estrategia, gestao e reestruturacao organizacional. Liderada por Joao Antonio Lopes Correa com mais de 20 anos de experiencia.",
  keywords: [
    "consultoria empresarial",
    "holding",
    "estrategia empresarial",
    "gestao empresarial",
    "reestruturacao organizacional",
    "Joao Antonio Lopes Correa",
    "Primor Holding",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Primor Holding",
    title: "Primor Holding — Consultoria Empresarial",
    description:
      "Consultoria empresarial especializada em estrategia, gestao e reestruturacao organizacional.",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://primorholding.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Primor Holding — Consultoria Empresarial",
    description:
      "Consultoria empresarial especializada em estrategia, gestao e reestruturacao organizacional.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
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
