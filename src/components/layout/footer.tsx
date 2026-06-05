import Link from "next/link";
import { MapPin, Phone, Mail, Linkedin, Instagram } from "lucide-react";

const navLinks = [
  { label: "Sobre a Primor", href: "/sobre" },
  { label: "Soluções", href: "/solucoes" },
  { label: "Portfólio", href: "/#portfolio" },
  { label: "Nossa Equipe", href: "/#time" },
  { label: "Fale Conosco", href: "/contato" },
];

export default function Footer() {
  return (
    <footer className="bg-[#F0EBE0] border-t border-[rgba(201,169,110,0.08)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-6 group w-fit">
              <div className="w-8 h-8 border border-[#C9A96E]/50 rounded flex items-center justify-center">
                <span className="text-[#C9A96E] font-serif text-sm font-bold leading-none">P</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-serif text-[#1C1510] text-lg font-semibold tracking-wide">PRIMOR</span>
                <span className="text-[#6B6057] text-[0.6rem] font-medium tracking-[0.25em] uppercase">Holding</span>
              </div>
            </Link>
            <p className="text-[#6B6057] text-sm leading-relaxed mb-6 max-w-xs">
              Consultoria empresarial com solidez, estratégia e visão de longo prazo para o crescimento do seu negócio.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-[#6B6057] text-sm">
                <MapPin className="w-4 h-4 text-[#C9A96E] mt-0.5 flex-shrink-0" />
                <span>São Paulo, SP — Brasil</span>
              </div>
              <div className="flex items-center gap-3 text-[#6B6057] text-sm">
                <Phone className="w-4 h-4 text-[#C9A96E] flex-shrink-0" />
                <span>(11) 3000-0000</span>
              </div>
              <div className="flex items-center gap-3 text-[#6B6057] text-sm">
                <Mail className="w-4 h-4 text-[#C9A96E] flex-shrink-0" />
                <span>contato@primorholding.com.br</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[#1C1510] font-semibold text-sm tracking-wide mb-6">Navegação</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#6B6057] hover:text-[#C9A96E] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3 mt-8">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-[rgba(0,0,0,0.08)] flex items-center justify-center text-[#6B6057] hover:text-[#C9A96E] hover:border-[rgba(201,169,110,0.3)] transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-[rgba(0,0,0,0.08)] flex items-center justify-center text-[#6B6057] hover:text-[#C9A96E] hover:border-[rgba(201,169,110,0.3)] transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* CNPJ Card */}
          <div>
            <h4 className="text-[#1C1510] font-semibold text-sm tracking-wide mb-6">Dados Empresariais</h4>
            <div className="glass-gold rounded-xl p-5 space-y-3">
              <div>
                <p className="text-[#6B6057] text-xs uppercase tracking-wider mb-1">Razão Social</p>
                <p className="text-[#1C1510] text-sm font-medium">PRIMOR PARTNERSHIP HOLDING LTDA</p>
              </div>
              <div>
                <p className="text-[#6B6057] text-xs uppercase tracking-wider mb-1">CNPJ</p>
                <p className="text-[#C9A96E] text-sm font-medium tracking-wider">59.120.382/0001-30</p>
              </div>
              <div>
                <p className="text-[#6B6057] text-xs uppercase tracking-wider mb-1">Fundador</p>
                <p className="text-[#1C1510] text-sm">João Antonio Lopes Corrêa</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-gold my-10" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#6B6057] text-xs">
            © {new Date().getFullYear()} Primor Partnership Holding Ltda. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacidade" className="text-[#6B6057] hover:text-[#C9A96E] text-xs transition-colors">
              Política de Privacidade
            </Link>
            <Link href="/termos" className="text-[#6B6057] hover:text-[#C9A96E] text-xs transition-colors">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
