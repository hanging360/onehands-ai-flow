import { useTranslation } from "react-i18next";
import { OneHandsLogo } from "./OneHandsLogo";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-card/60 backdrop-blur-sm border-t border-border py-12">
      <div className="container px-4 mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <OneHandsLogo className="h-10 w-auto" />
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">
                {t('footer.privacy')}
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                {t('footer.terms')}
              </a>
              <a 
                href={`https://wa.me/17869606797?text=${encodeURIComponent(t('whatsappMessages.contactUs'))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                {t('footer.contact')}
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>Powered by hanging360.llc</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
