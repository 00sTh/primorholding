import Image from "next/image";
import { motion } from "@/components/motion";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

interface TestimonialItem {
  id: string;
  name: string;
  company: string | null;
  role: string | null;
  content: string;
  photoUrl: string | null;
  rating: number;
}

interface TestimonialsSectionProps {
  testimonials: TestimonialItem[];
}

export function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  return (
    <Section id="depoimentos" className="bg-navy">
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase text-center mb-4">
          O Que Dizem Nossos Clientes
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-center text-cream mb-12">
          Depoimentos
        </h2>
      </motion.div>

      {/* Empty state */}
      {testimonials.length === 0 ? (
        <p className="text-slate text-center py-12">Em breve.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Card className="flex flex-col h-full">
                <Quote className="text-gold/30 mb-4" size={32} />
                <p className="text-slate leading-relaxed flex-1 italic mb-6">
                  &ldquo;{t.content}&rdquo;
                </p>
                {/* Stars */}
                <div className="flex gap-1 text-gold mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                {/* Author */}
                <div className="flex items-center gap-3">
                  {t.photoUrl ? (
                    <Image
                      src={t.photoUrl}
                      alt={t.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold text-sm font-bold flex-shrink-0">
                      {t.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-cream text-sm">{t.name}</p>
                    <p className="text-slate text-xs">
                      {[t.role, t.company].filter(Boolean).join(" • ")}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </Section>
  );
}
