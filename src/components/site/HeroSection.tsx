import { motion } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface HeroSectionProps {
  title: string;
  subtitle: string;
}

export function HeroSection({ title, subtitle }: HeroSectionProps) {
  const renderTitle = (text: string) => {
    if (text.includes("Excelencia")) {
      const parts = text.split("Excelencia");
      return (
        <>
          {parts[0]}
          <span className="text-gradient-gold">Excelencia</span>
          {parts[1]}
        </>
      );
    }
    return text;
  };

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center bg-navy-dark overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-gold/3 blur-3xl pointer-events-none" />
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-gold text-sm font-semibold tracking-[0.3em] uppercase mb-6"
        >
          Consultoria Empresarial
        </motion.p>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-cream mb-6 leading-tight"
        >
          {renderTitle(title)}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg sm:text-xl text-slate max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {subtitle}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-row gap-4 justify-center items-center"
        >
          <a href="#contato">
            <Button size="lg">Iniciar Conversa</Button>
          </a>
          <a href="#servicos">
            <Button size="lg" variant="secondary">
              Conhecer Servicos
            </Button>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-gold/50">
        <ChevronDown size={24} />
      </div>
    </section>
  );
}
