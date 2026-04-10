import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Primor Holding | Consultoria Empresarial de Excelência",
    template: "%s | Primor Holding",
  },
  description:
    "A Primor Holding oferece consultoria empresarial estratégica, gestão de performance e intermediação de negócios com excelência e solidez.",
  keywords: ["consultoria empresarial", "holding", "estratégia", "M&A", "gestão"],
  authors: [{ name: "Primor Holding" }],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://primor-holding.vercel.app"
  ),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
