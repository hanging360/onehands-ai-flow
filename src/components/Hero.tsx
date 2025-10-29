import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import logo from "@/assets/onehands-logo-digital.png";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-accent to-background">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-foreground/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="container relative z-10 px-4 py-20 mx-auto">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Logo */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <img 
              src={logo} 
              alt="OneHands.ai Logo" 
              className="h-20 md:h-24 w-auto drop-shadow-lg"
            />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border shadow-soft animate-fade-in-up delay-100">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Powered by Advanced AI Technology
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight animate-fade-in-up delay-200">
            Automate Your Business
            <br />
            <span className="bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
              With AI Intelligence
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-300">
            Transform your business operations with intelligent automation. From WhatsApp and social media to calendars and workflows - all powered by ChatGPT and cutting-edge AI.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-fade-in-up delay-400">
            <Button 
              size="lg" 
              className="group shadow-medium hover:shadow-large transition-all"
              onClick={() => window.open('https://wa.me/17869606797?text=Hola,%20estoy%20interesado%20en%20OneHands.ai', '_blank')}
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="shadow-soft"
              onClick={() => window.open('https://wa.me/17869606797?text=Me%20gustaría%20agendar%20una%20demo%20de%20OneHands.ai', '_blank')}
            >
              Schedule Demo
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="pt-8 flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground animate-fade-in-up delay-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span>ChatGPT Powered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span>Enterprise Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span>24/7 Automation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
