import { Card } from "@/components/ui/card";
import { TrendingUp, Clock, Users, DollarSign, Target, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

export const BusinessBenefits = () => {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: Clock,
      titleKey: "benefits.timeSaving.title",
      statKey: "benefits.timeSaving.stat",
      descriptionKey: "benefits.timeSaving.description"
    },
    {
      icon: DollarSign,
      titleKey: "benefits.costReduction.title",
      statKey: "benefits.costReduction.stat",
      descriptionKey: "benefits.costReduction.description"
    },
    {
      icon: Users,
      titleKey: "benefits.customerExperience.title",
      statKey: "benefits.customerExperience.stat",
      descriptionKey: "benefits.customerExperience.description"
    },
    {
      icon: TrendingUp,
      titleKey: "benefits.scalability.title",
      statKey: "benefits.scalability.stat",
      descriptionKey: "benefits.scalability.description"
    },
    {
      icon: Target,
      titleKey: "benefits.precision.title",
      statKey: "benefits.precision.stat",
      descriptionKey: "benefits.precision.description"
    },
    {
      icon: Sparkles,
      titleKey: "benefits.innovation.title",
      statKey: "benefits.innovation.stat",
      descriptionKey: "benefits.innovation.description"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            {t('benefits.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('benefits.subtitle')}
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
                    {t(benefit.statKey)}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {t(benefit.titleKey)}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t(benefit.descriptionKey)}
                </p>
              </Card>
            );
          })}
        </div>

        {/* ROI Card */}
        <Card className="max-w-4xl mx-auto p-8 md:p-12 bg-gradient-to-br from-primary to-accent-foreground text-primary-foreground">
          <div className="text-center space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold">
              {t('benefits.roiTitle')}
            </h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              {t('benefits.roiDescription')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              <div className="space-y-2">
                <div className="text-4xl font-bold">{t('benefits.roi1')}</div>
                <div className="text-sm opacity-75">{t('benefits.roi1Label')}</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold">{t('benefits.roi2')}</div>
                <div className="text-sm opacity-75">{t('benefits.roi2Label')}</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold">{t('benefits.roi3')}</div>
                <div className="text-sm opacity-75">{t('benefits.roi3Label')}</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
