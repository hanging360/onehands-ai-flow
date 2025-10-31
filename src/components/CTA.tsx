import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

export const CTA = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-gradient-to-br from-primary/60 to-accent-foreground/60 backdrop-blur-sm text-primary-foreground">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            {t('cta.title')}
          </h2>
          <p className="text-lg md:text-xl opacity-90 leading-relaxed">
            {t('cta.subtitle')}
          </p>
          
          <div className="flex flex-col gap-3 justify-center items-center pt-4">
            <p className="text-lg opacity-90">
              {t('cta.aiPrompt')}
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="group shadow-large hover:shadow-xl transition-all"
              onClick={() => {
                document.getElementById('ai-demo')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t('cta.getStarted')}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="pt-8 flex flex-wrap justify-center gap-8 text-sm opacity-75">
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold">{t('cta.stat1')}</div>
              <div>{t('cta.stat1Label')}</div>
            </div>
            <div className="w-px bg-primary-foreground/20" />
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold">{t('cta.stat2')}</div>
              <div>{t('cta.stat2Label')}</div>
            </div>
            <div className="w-px bg-primary-foreground/20" />
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold">{t('cta.stat3')}</div>
              <div>{t('cta.stat3Label')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
