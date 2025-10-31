import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, Clock, Target, Sparkles, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export const AIValueProposition = () => {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: Brain,
      titleKey: "aiValue.benefit1.title",
      descriptionKey: "aiValue.benefit1.description",
    },
    {
      icon: TrendingUp,
      titleKey: "aiValue.benefit2.title",
      descriptionKey: "aiValue.benefit2.description",
    },
    {
      icon: Clock,
      titleKey: "aiValue.benefit3.title",
      descriptionKey: "aiValue.benefit3.description",
    },
    {
      icon: Target,
      titleKey: "aiValue.benefit4.title",
      descriptionKey: "aiValue.benefit4.description",
    },
  ];

  const whatsappMessage = encodeURIComponent(t('whatsapp.aiConsultation'));
  const whatsappUrl = `https://wa.me/17869606797?text=${whatsappMessage}`;

  return (
    <section className="py-24 bg-primary/5 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">{t('aiValue.badge')}</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            {t('aiValue.title')}
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {t('aiValue.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card
                key={index}
                className="p-8 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-medium bg-card/50 backdrop-blur-sm"
              >
                <div className="mb-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  {t(benefit.titleKey)}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t(benefit.descriptionKey)}
                </p>
              </Card>
            );
          })}
        </div>

        <Card className="max-w-5xl mx-auto p-12 bg-gradient-to-br from-primary to-primary/80 border-none text-primary-foreground">
          <div className="text-center mb-8">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              {t('aiValue.cta.title')}
            </h3>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              {t('aiValue.cta.description')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg px-8 py-6 h-auto group"
              asChild
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                {t('aiValue.cta.button')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>

          <div className="mt-8 pt-8 border-t border-primary-foreground/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">{t('aiValue.stat1.number')}</div>
                <div className="text-primary-foreground/80">{t('aiValue.stat1.label')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">{t('aiValue.stat2.number')}</div>
                <div className="text-primary-foreground/80">{t('aiValue.stat2.label')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">{t('aiValue.stat3.number')}</div>
                <div className="text-primary-foreground/80">{t('aiValue.stat3.label')}</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
