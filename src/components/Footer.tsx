import logo from "@/assets/onehands-logo-digital.png";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container px-4 mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <img src={logo} alt="OneHands.ai" className="h-10 w-auto" />
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">
                {t('footer.privacy')}
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                {t('footer.terms')}
              </a>
              <a href="#" className="hover:text-primary transition-colors">
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
