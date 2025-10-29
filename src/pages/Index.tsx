import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Integrations } from "@/components/Integrations";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <Services />
      <Integrations />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;
