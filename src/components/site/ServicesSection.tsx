import { motion } from "@/components/motion";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string | null;
  imageUrl: string | null;
}

interface ServicesSectionProps {
  services: ServiceItem[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <Section id="servicos" className="bg-navy-dark">
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase text-center mb-4">
          O Que Fazemos
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-center text-cream mb-4">
          Nossos Servicos
        </h2>
        <p className="text-slate text-center max-w-2xl mx-auto mb-12">
          Soluções personalizadas para cada etapa do crescimento empresarial.
        </p>
      </motion.div>

      {/* Empty state */}
      {services.length === 0 ? (
        <p className="text-slate text-center py-12">Em breve.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Card hover className="h-full flex flex-col">
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-4 text-gold">
                  <Briefcase size={24} />
                </div>
                <h3 className="font-serif text-xl text-cream mb-3">
                  {service.title}
                </h3>
                <p className="text-slate text-sm leading-relaxed flex-1">
                  {service.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </Section>
  );
}
