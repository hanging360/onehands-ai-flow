import { Card } from "@/components/ui/card";
import { TrendingUp, Clock, Users, DollarSign, Target, Sparkles } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Ahorro de Tiempo",
    stat: "85%",
    description: "Reduce el tiempo dedicado a tareas repetitivas, liberando a tu equipo para enfocarse en estrategia y crecimiento."
  },
  {
    icon: DollarSign,
    title: "Reducción de Costos",
    stat: "60%",
    description: "Disminuye costos operativos al automatizar procesos que normalmente requerirían múltiples empleados."
  },
  {
    icon: Users,
    title: "Mejor Experiencia del Cliente",
    stat: "95%",
    description: "Respuestas instantáneas 24/7 mejoran la satisfacción del cliente y aumentan la retención."
  },
  {
    icon: TrendingUp,
    title: "Escalabilidad",
    stat: "10x",
    description: "Maneja 10 veces más interacciones sin aumentar tu equipo, creciendo sin límites operativos."
  },
  {
    icon: Target,
    title: "Precisión en Procesos",
    stat: "99%",
    description: "Elimina errores humanos en tareas repetitivas, asegurando consistencia en cada interacción."
  },
  {
    icon: Sparkles,
    title: "Innovación Continua",
    stat: "∞",
    description: "Acceso constante a las últimas tecnologías AI sin necesidad de contratar especialistas internos."
  }
];

export const BusinessBenefits = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Beneficios para tu Empresa
          </h2>
          <p className="text-lg text-muted-foreground">
            Transforma tu operación con resultados medibles y retorno de inversión inmediato
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card
                key={index}
                className="p-6 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-medium group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-accent-foreground/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary">
                    {benefit.stat}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* ROI Card */}
        <Card className="max-w-4xl mx-auto p-8 md:p-12 bg-gradient-to-br from-primary to-accent-foreground text-primary-foreground">
          <div className="text-center space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold">
              Retorno de Inversión Garantizado
            </h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              La mayoría de nuestros clientes recuperan su inversión en los primeros 3 meses y experimentan mejoras operativas inmediatas desde el día uno.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              <div className="space-y-2">
                <div className="text-4xl font-bold">3 meses</div>
                <div className="text-sm opacity-75">ROI promedio</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold">24/7</div>
                <div className="text-sm opacity-75">Disponibilidad</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold">100%</div>
                <div className="text-sm opacity-75">Personalizable</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
