import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary to-accent-foreground text-primary-foreground">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg md:text-xl opacity-90 leading-relaxed">
            Join forward-thinking companies automating their operations with AI. 
            Schedule a demo and see how OneHands.ai can revolutionize your workflows.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              variant="secondary"
              className="group shadow-large hover:shadow-xl transition-all"
            >
              Schedule Demo
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-transparent text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10 hover:border-primary-foreground shadow-soft"
            >
              <Mail className="mr-2 w-5 h-5" />
              Contact Us
            </Button>
          </div>

          <div className="pt-8 flex flex-wrap justify-center gap-8 text-sm opacity-75">
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold">24/7</div>
              <div>Automation</div>
            </div>
            <div className="w-px bg-primary-foreground/20" />
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold">100+</div>
              <div>Integrations</div>
            </div>
            <div className="w-px bg-primary-foreground/20" />
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold">99.9%</div>
              <div>Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
