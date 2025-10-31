import { Card } from "@/components/ui/card";
import { Code2, Puzzle, Zap, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";
import n8nImage from "@/assets/tech-n8n-workflow.png";
import apiImage from "@/assets/tech-api-integrations.png";
import aiImage from "@/assets/tech-ai-processing.png";
import securityImage from "@/assets/tech-security.png";

export const TechnicalDevelopment = () => {
  const { t } = useTranslation();

  const technicalFeatures = [
    {
      icon: Code2,
      titleKey: "technical.n8n.title",
      descriptionKey: "technical.n8n.description",
      image: n8nImage,
    },
    {
      icon: Puzzle,
      titleKey: "technical.api.title",
      descriptionKey: "technical.api.description",
      image: apiImage,
    },
    {
      icon: Zap,
      titleKey: "technical.ai.title",
      descriptionKey: "technical.ai.description",
      image: aiImage,
    },
    {
      icon: Shield,
      titleKey: "technical.security.title",
      descriptionKey: "technical.security.description",
      image: securityImage,
    }
  ];

  return (
    <section className="py-24 bg-background/80 backdrop-blur-sm">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            {t('technical.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('technical.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-16">
          {technicalFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="p-8 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-medium overflow-hidden"
              >
                <div className="mb-6 w-full h-48 rounded-lg overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={t(feature.titleKey)}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mb-4 w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent-foreground/10 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t(feature.descriptionKey)}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Technical Stack */}
        <Card className="max-w-6xl mx-auto p-8 md:p-12 bg-gradient-to-br from-card to-accent/20 border-border">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
            {t('technical.stackTitle')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h4 className="font-semibold text-primary uppercase text-sm tracking-wide">
                {t('technical.stack1Title')}
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                {(t('technical.stack1Items', { returnObjects: true }) as string[]).map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-primary uppercase text-sm tracking-wide">
                {t('technical.stack2Title')}
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                {(t('technical.stack2Items', { returnObjects: true }) as string[]).map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-primary uppercase text-sm tracking-wide">
                {t('technical.stack3Title')}
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                {(t('technical.stack3Items', { returnObjects: true }) as string[]).map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
