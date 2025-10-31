import { MessageSquare, Calendar, UserCheck, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

export const WorkflowDiagram = () => {
  const steps = [
    {
      icon: MessageSquare,
      title: "WhatsApp Message",
      description: "Customer sends inquiry",
      example: "Hello, I need help with...",
      color: "from-[#25D366] to-[#128C7E]",
      bgColor: "bg-[#25D366]/10"
    },
    {
      icon: MessageSquare,
      title: "AI Response",
      description: "Instant classification & reply",
      example: "I understand. Let me help you...",
      color: "from-primary to-accent-foreground",
      bgColor: "bg-primary/10"
    },
    {
      icon: Calendar,
      title: "Schedule Appointment",
      description: "AI books calendar slot",
      example: "Available: Tomorrow 2PM",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: UserCheck,
      title: "Human Agent",
      description: "Transfer if needed",
      example: "Agent John joining chat...",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-500/10"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-background/80 backdrop-blur-sm">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Complete Automation Flow
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            See how our AI handles customer interactions from first contact to resolution
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <Card className="p-6 h-full border-border hover:border-primary/50 hover:shadow-soft transition-all duration-300">
                    <div className="flex flex-col h-full space-y-4">
                      {/* Icon */}
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-medium`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 space-y-2">
                        <div className="text-xs font-bold text-primary uppercase tracking-wider">
                          Step {index + 1}
                        </div>
                        <h3 className="text-lg font-bold text-foreground">
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                      </div>

                      {/* Example Message */}
                      <div className={`${step.bgColor} rounded-lg p-3 border border-border/50`}>
                        <div className="text-xs font-mono text-foreground/80 italic">
                          "{step.example}"
                        </div>
                      </div>
                    </div>
                  </Card>
                  
                  {/* Arrow for desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-6 h-6 text-primary" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
