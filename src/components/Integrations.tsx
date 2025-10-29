import { Card } from "@/components/ui/card";

const integrations = [
  { name: "ChatGPT", category: "AI" },
  { name: "n8n", category: "Automation" },
  { name: "Lovable", category: "Development" },
  { name: "ManyChat", category: "Messaging" },
  { name: "Meta API", category: "Social" },
  { name: "WhatsApp Business", category: "Messaging" },
  { name: "Google Calendar", category: "Productivity" },
  { name: "Instagram", category: "Social" },
];

export const Integrations = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Powered by Leading Technologies
          </h2>
          <p className="text-lg text-muted-foreground">
            We integrate with the best tools and platforms to deliver seamless automation solutions.
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
                  {integration.category}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
