import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Bot, Workflow, MessageCircle, Share2, Calendar, Camera, TrendingUp, CreditCard, DollarSign, MessageSquare } from "lucide-react";

export const Integrations = () => {
  const { t } = useTranslation();

  const integrations = [
    { name: "ChatGPT", categoryKey: "integrations.categories.ai", icon: Bot },
    { name: "n8n", categoryKey: "integrations.categories.automation", icon: Workflow },
    { name: "ManyChat", categoryKey: "integrations.categories.messaging", icon: MessageCircle },
    { name: "Meta API", categoryKey: "integrations.categories.social", icon: Share2 },
    { name: "WhatsApp Business", categoryKey: "integrations.categories.messaging", icon: MessageSquare },
    { name: "Google Calendar", categoryKey: "integrations.categories.productivity", icon: Calendar },
    { name: "Instagram", categoryKey: "integrations.categories.social", icon: Camera },
    { name: "GoHighLevel", categoryKey: "integrations.categories.marketing", icon: TrendingUp },
    { name: "Square", categoryKey: "integrations.categories.payments", icon: CreditCard },
    { name: "PayPal", categoryKey: "integrations.categories.payments", icon: DollarSign },
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
          {integrations.map((integration, index) => {
            const Icon = integration.icon;
            return (
              <Card
                key={index}
                className="p-6 text-center border-border hover:border-primary/50 hover:shadow-soft transition-all duration-300 cursor-pointer group"
              >
                <div className="space-y-3">
                  <div className="flex justify-center">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {integration.name}
                  </h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    {t(integration.categoryKey)}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
