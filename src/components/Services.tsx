import { Card } from "@/components/ui/card";
import { MessageSquare, Calendar, Share2, FolderOpen, Workflow, Bot } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: MessageSquare,
      titleKey: "services.whatsapp.title",
      descriptionKey: "services.whatsapp.description",
    },
    {
      icon: Calendar,
      titleKey: "services.scheduling.title",
      descriptionKey: "services.scheduling.description",
    },
    {
      icon: Share2,
      titleKey: "services.social.title",
      descriptionKey: "services.social.description",
    },
    {
      icon: FolderOpen,
      titleKey: "services.documents.title",
      descriptionKey: "services.documents.description",
    },
    {
      icon: Workflow,
      titleKey: "services.workflows.title",
      descriptionKey: "services.workflows.description",
    },
    {
      icon: Bot,
      titleKey: "services.assistants.title",
      descriptionKey: "services.assistants.description",
    },
  ];

  return (
    <section className="py-24 bg-background/90 backdrop-blur-sm">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            {t('services.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="p-6 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-medium group cursor-pointer"
              >
                <div className="mb-4 w-12 h-12 rounded-lg bg-accent flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {t(service.titleKey)}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t(service.descriptionKey)}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
