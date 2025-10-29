import { useTranslation } from "react-i18next";
import { useMermaid } from "@/hooks/useMermaid";

export const WorkflowDiagram = () => {
  const { t } = useTranslation();
  useMermaid();

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            {t('workflowDiagram.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('workflowDiagram.subtitle')}
          </p>
        </div>

        <div className="max-w-6xl mx-auto bg-card rounded-2xl p-8 shadow-large border border-border overflow-x-auto">
          <div className="mermaid-diagram min-w-[800px]">
            <pre className="mermaid">
{`graph TD
    A[Cliente envía mensaje por WhatsApp] --> B{AI recibe mensaje}
    B --> C[AI analiza consulta]
    C --> D{Tipo de consulta}
    
    D -->|Consulta Simple| E[AI responde automáticamente]
    E --> F[Cliente satisfecho?]
    F -->|Sí| G[Fin de conversación]
    F -->|No| H[Clasificación avanzada]
    
    D -->|Consulta Compleja| H
    D -->|Solicitud de cita| I[AI verifica disponibilidad]
    
    H --> J{Clasificar cliente}
    J -->|Ventas| K[Transferir a agente de ventas]
    J -->|Soporte| L[Transferir a soporte técnico]
    J -->|Urgente| M[Transferir inmediatamente]
    
    I --> N[AI propone horarios disponibles]
    N --> O[Cliente selecciona horario]
    O --> P[AI confirma cita en Google Calendar]
    P --> Q[Enviar confirmación por WhatsApp]
    Q --> R{Requiere seguimiento?}
    R -->|Sí| S[Notificar a agente humano]
    R -->|No| G
    
    K --> T[Agente humano toma control]
    L --> T
    M --> T
    S --> T
    T --> U[Conversación humano-cliente]
    U --> G
    
    style A fill:#25D366
    style B fill:#00A8E8
    style C fill:#00A8E8
    style E fill:#00A8E8
    style I fill:#00A8E8
    style N fill:#00A8E8
    style P fill:#00A8E8
    style T fill:#FF6B6B
    style G fill:#51CF66`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};
