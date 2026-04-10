import HeroSection from "@/components/home/hero-section";
import NumerosSection from "@/components/home/numeros-section";
import SobreSection from "@/components/home/sobre-section";
import SolucoesSection from "@/components/home/solucoes-section";
import PortfolioSection from "@/components/home/portfolio-section";
import TimeSection from "@/components/home/time-section";
import CTASection from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <NumerosSection />
      <SobreSection />
      <SolucoesSection />
      <PortfolioSection />
      <TimeSection />
      <CTASection />
    </>
  );
}
