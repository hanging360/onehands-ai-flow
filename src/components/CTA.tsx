import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

export const CTA = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-gradient-to-br from-primary to-accent-foreground text-primary-foreground">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            {t('cta.title')}
          </h2>
          <p className="text-lg md:text-xl opacity-90 leading-relaxed">
            {t('cta.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              variant="secondary"
              className="group shadow-large hover:shadow-xl transition-all"
              asChild
            >
              <a 
                href={`https://wa.me/17869606797?text=${encodeURIComponent(t('whatsappMessages.scheduleDemo'))}`}
                target="_blank" 
                rel="noopener noreferrer"
              >
                {t('cta.scheduleDemo')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-transparent text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10 hover:border-primary-foreground shadow-soft"
              asChild
            >
              <a 
                href={`https://wa.me/17869606797?text=${encodeURIComponent(t('whatsappMessages.contactUs'))}`}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Mail className="mr-2 w-5 h-5" />
                {t('cta.contactUs')}
              </a>
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
