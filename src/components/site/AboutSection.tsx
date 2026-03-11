import Image from "next/image";
import { motion } from "@/components/motion";
import { Section } from "@/components/ui/section";

interface AboutSectionProps {
  title: string;
  text: string;
  founderName: string;
  founderPhotoUrl: string | null;
}

export function AboutSection({
  title,
  text,
  founderName,
  founderPhotoUrl,
}: AboutSectionProps) {
  return (
    <Section id="sobre" className="bg-navy">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left column — photo */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {founderPhotoUrl ? (
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-gold/20 gold-glow">
              <Image
                src={founderPhotoUrl}
                alt={founderName}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="aspect-[3/4] rounded-2xl border border-gold/20 gold-glow bg-navy-light flex items-center justify-center">
              <span className="font-serif text-6xl text-gold/50">JA</span>
            </div>
          )}
        </motion.div>

        {/* Right column — text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            Nossa Historia
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-cream mb-6">
            {title}
          </h2>
          <p className="text-slate leading-relaxed mb-8">{text}</p>
          <div className="flex items-center gap-4 border-l-2 border-gold pl-4">
            <div>
              <p className="font-semibold text-cream">{founderName}</p>
              <p className="text-sm text-slate">Fundador e CEO</p>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
