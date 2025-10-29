import { Card } from "@/components/ui/card";
import { Code2, Puzzle, Zap, Shield } from "lucide-react";

const technicalFeatures = [
  {
    icon: Code2,
    title: "Desarrollo con n8n",
    description: "Utilizamos n8n como plataforma principal de automatización, permitiendo crear flujos de trabajo visuales y escalables sin código complejo."
  },
  {
    icon: Puzzle,
    title: "Integración API",
    description: "Conectamos Meta API, ChatGPT, y múltiples servicios empresariales mediante APIs RESTful seguras y optimizadas."
  },
  {
    icon: Zap,
    title: "Procesamiento AI",
    description: "Implementamos modelos de ChatGPT para comprensión de lenguaje natural, automatización de respuestas y toma de decisiones inteligentes."
  },
  {
    icon: Shield,
    title: "Seguridad Empresarial",
    description: "Encriptación end-to-end, cumplimiento GDPR, y protocolos de seguridad enterprise-grade en todas las integraciones."
  }
];

export const TechnicalDevelopment = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Desarrollo Técnico
          </h2>
          <p className="text-lg text-muted-foreground">
            Tecnología de vanguardia que impulsa cada automatización
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-16">
          {technicalFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="p-8 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-medium"
              >
                <div className="mb-4 w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent-foreground/10 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Technical Stack */}
        <Card className="max-w-6xl mx-auto p-8 md:p-12 bg-gradient-to-br from-card to-accent/20 border-border">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
            Stack Tecnológico
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h4 className="font-semibold text-primary uppercase text-sm tracking-wide">
                IA & Procesamiento
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• OpenAI GPT-4</li>
                <li>• Procesamiento NLP</li>
                <li>• Machine Learning</li>
                <li>• Análisis Predictivo</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-primary uppercase text-sm tracking-wide">
                Automatización
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• n8n Workflows</li>
                <li>• ManyChat Bots</li>
                <li>• Zapier Integration</li>
                <li>• Custom APIs</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-primary uppercase text-sm tracking-wide">
                Plataformas
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Meta Business Suite</li>
                <li>• WhatsApp Business</li>
                <li>• Google Workspace</li>
                <li>• Cloud Infrastructure</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
