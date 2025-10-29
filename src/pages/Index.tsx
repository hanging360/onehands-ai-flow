import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { WorkflowSection } from "@/components/WorkflowSection";
import { TechnicalDevelopment } from "@/components/TechnicalDevelopment";
import { AIValueProposition } from "@/components/AIValueProposition";
import { BusinessBenefits } from "@/components/BusinessBenefits";
import { Integrations } from "@/components/Integrations";
import { WorkflowDiagram } from "@/components/WorkflowDiagram";
import { AIChatDemo } from "@/components/AIChatDemo";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { NetworkBackground } from "@/components/NetworkBackground";

const Index = () => {
  return (
    <main className="min-h-screen relative">
      <NetworkBackground />
      <div className="relative z-10">
        <Hero />
        <AIChatDemo />
        <Services />
        <WorkflowSection />
        <TechnicalDevelopment />
        <AIValueProposition />
        <BusinessBenefits />
        <Integrations />
        <WorkflowDiagram />
        <CTA />
        <Footer />
      </div>
    </main>
  );
};

export default Index;
