import { Card } from "@/components/ui/card";
import { MessageSquare, Calendar, Share2, FolderOpen, Workflow, Bot } from "lucide-react";

const services = [
  {
    icon: MessageSquare,
    title: "WhatsApp Automation",
    description: "Intelligent chatbots and automated messaging workflows for customer engagement and support.",
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "AI-powered appointment booking and calendar management that adapts to your business needs.",
  },
  {
    icon: Share2,
    title: "Social Media Management",
    description: "Automated posts, comment management, and engagement tracking across all platforms.",
  },
  {
    icon: FolderOpen,
    title: "Document Processing",
    description: "Intelligent file and folder management with AI-powered organization and retrieval.",
  },
  {
    icon: Workflow,
    title: "Custom Workflows",
    description: "Build complex automation flows connecting all your business tools and processes.",
  },
  {
    icon: Bot,
    title: "AI Assistants",
    description: "Deploy intelligent AI assistants powered by ChatGPT for any business function.",
  },
];

export const Services = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Complete AI Automation Suite
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to automate and scale your business operations with artificial intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="p-6 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-medium group cursor-pointer"
              >
                <div className="mb-4 w-12 h-12 rounded-lg bg-accent flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
