import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

export const Integrations = () => {
  const { t } = useTranslation();

  const integrations = [
    { name: "ChatGPT", categoryKey: "integrations.categories.ai" },
    { name: "n8n", categoryKey: "integrations.categories.automation" },
    { name: "Lovable", categoryKey: "integrations.categories.development" },
    { name: "ManyChat", categoryKey: "integrations.categories.messaging" },
    { name: "Meta API", categoryKey: "integrations.categories.social" },
    { name: "WhatsApp Business", categoryKey: "integrations.categories.messaging" },
    { name: "Google Calendar", categoryKey: "integrations.categories.productivity" },
    { name: "Instagram", categoryKey: "integrations.categories.social" },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            {t('integrations.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('integrations.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {integrations.map((integration, index) => (
            <Card
              key={index}
              className="p-6 text-center border-border hover:border-primary/50 hover:shadow-soft transition-all duration-300 cursor-pointer group"
            >
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {integration.name}
                </h3>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  {t(integration.categoryKey)}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
