import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { WorkflowSection } from "@/components/WorkflowSection";
import { TechnicalDevelopment } from "@/components/TechnicalDevelopment";
import { BusinessBenefits } from "@/components/BusinessBenefits";
import { Integrations } from "@/components/Integrations";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <Services />
      <WorkflowSection />
      <TechnicalDevelopment />
      <BusinessBenefits />
      <Integrations />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;
