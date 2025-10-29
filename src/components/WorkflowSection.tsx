import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import flowStep1 from "@/assets/flow-step-1.png";
import flowStep2 from "@/assets/flow-step-2.png";
import flowStep3 from "@/assets/flow-step-3.png";

const workflowSteps = [
  {
    number: "01",
    title: "Conexión Inteligente",
    description: "El cliente interactúa con tu negocio a través de WhatsApp, redes sociales o web. Nuestro AI captura y procesa cada interacción.",
    image: flowStep1,
    features: [
      "Respuestas automáticas 24/7",
      "Procesamiento de lenguaje natural",
      "Múltiples canales integrados"
    ]
  },
  {
    number: "02",
    title: "Automatización Inteligente",
    description: "El flujo de trabajo AI procesa la información, programa citas, gestiona documentos y ejecuta tareas complejas sin intervención humana.",
    image: flowStep2,
    features: [
      "Sincronización con calendarios",
      "Gestión automática de archivos",
      "Flujos de trabajo personalizados"
    ]
  },
  {
    number: "03",
    title: "Resultados Medibles",
    description: "Obtén análisis completos, publicaciones automatizadas en redes sociales y seguimiento de todas las interacciones desde un solo dashboard.",
    image: flowStep3,
    features: [
      "Analytics en tiempo real",
      "Reportes automáticos",
      "ROI optimizado"
    ]
  }
];

export const WorkflowSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Cómo Funciona Nuestro Sistema
          </h2>
          <p className="text-lg text-muted-foreground">
            Un flujo de trabajo automatizado diseñado para transformar cada interacción en resultados empresariales
          </p>
        </div>

        <div className="max-w-7xl mx-auto space-y-16">
          {workflowSteps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-8 items-center`}
            >
              {/* Image */}
              <div className="flex-1 w-full">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent-foreground/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img
                    src={step.image}
                    alt={step.title}
                    className="relative w-full rounded-2xl shadow-large border border-border"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 w-full">
                <div className="space-y-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent-foreground text-primary-foreground text-2xl font-bold shadow-medium">
                    {step.number}
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                    {step.title}
                  </h3>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>

                  <div className="space-y-3 pt-4">
                    {step.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Connection Arrow */}
        <div className="flex justify-center my-8">
          <div className="flex items-center gap-2 text-primary">
            <div className="w-12 h-0.5 bg-primary" />
            <ArrowRight className="w-6 h-6" />
            <div className="w-12 h-0.5 bg-primary" />
          </div>
        </div>
      </div>
    </section>
  );
};
