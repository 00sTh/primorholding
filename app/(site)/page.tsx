import HeroSection from "@/components/home/hero-section";
import MarqueeSection from "@/components/home/marquee-section";
import NumerosSection from "@/components/home/numeros-section";
import SobreSection from "@/components/home/sobre-section";
import SolucoesSection from "@/components/home/solucoes-section";
import PortfolioSection from "@/components/home/portfolio-section";
import DepoimentosSection from "@/components/home/depoimentos-section";
import TimeSection from "@/components/home/time-section";
import CTASection from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <NumerosSection />
      <SobreSection />
      <SolucoesSection />
      <PortfolioSection />
      <DepoimentosSection />
      <TimeSection />
      <CTASection />
    </>
  );
}
