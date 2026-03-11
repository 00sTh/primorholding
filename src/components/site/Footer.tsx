import Link from "next/link";
import { COMPANY } from "@/lib/constants";

interface FooterProps {
  settings: {
    cnpj: string;
    email: string;
    instagramUrl: string;
    linkedinUrl: string;
  } | null;
}

export function Footer({ settings }: FooterProps) {
  return (
    <footer className="bg-navy border-t border-white/5 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Column 1: Logo + tagline */}
          <div>
            <p className="font-serif text-gold text-lg font-bold tracking-widest mb-2">
              PRIMOR HOLDING
            </p>
            <p className="text-slate text-sm">
              Consultoria Empresarial de Excelencia
            </p>
          </div>

          {/* Column 2: Links */}
          <div>
            <p className="text-gold font-semibold mb-4">Links</p>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="#sobre"
                  className="text-sm text-slate hover:text-cream transition-colors"
                >
                  Sobre
                </a>
              </li>
              <li>
                <a
                  href="#servicos"
                  className="text-sm text-slate hover:text-cream transition-colors"
                >
                  Servicos
                </a>
              </li>
              <li>
                <a
                  href="#contato"
                  className="text-sm text-slate hover:text-cream transition-colors"
                >
                  Contato
                </a>
              </li>
              <li>
                <Link
                  href="/privacidade"
                  className="text-sm text-slate hover:text-cream transition-colors"
                >
                  Politica de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  href="/termos"
                  className="text-sm text-slate hover:text-cream transition-colors"
                >
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <p className="text-gold font-semibold mb-4">Contato</p>
            <p className="text-sm text-slate mb-3">
              {settings?.email ?? COMPANY.email}
            </p>
            {settings?.instagramUrl && settings.instagramUrl.length > 0 && (
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate hover:text-cream transition-colors block mb-2"
              >
                Instagram
              </a>
            )}
            {settings?.linkedinUrl && settings.linkedinUrl.length > 0 && (
              <a
                href={settings.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate hover:text-cream transition-colors block"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 mt-8 pt-8 text-center text-sm text-slate">
          <p className="mb-1">{COMPANY.fullName}</p>
          <p className="mb-1">
            CNPJ: {settings?.cnpj ?? COMPANY.cnpj}
          </p>
          <p>
            &copy; {new Date().getFullYear()} Primor Holding. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
