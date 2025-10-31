import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import flowStep1 from "@/assets/flow-step-1.png";
import flowStep2 from "@/assets/flow-step-2.png";
import flowStep3 from "@/assets/flow-step-3.png";
import { useTranslation } from "react-i18next";

export const WorkflowSection = () => {
  const { t } = useTranslation();

  const workflowSteps = [
    {
      numberKey: "workflow.step1.number",
      titleKey: "workflow.step1.title",
      descriptionKey: "workflow.step1.description",
      image: flowStep1,
      featuresKeys: [
        "workflow.step1.feature1",
        "workflow.step1.feature2",
        "workflow.step1.feature3"
      ]
    },
    {
      numberKey: "workflow.step2.number",
      titleKey: "workflow.step2.title",
      descriptionKey: "workflow.step2.description",
      image: flowStep2,
      featuresKeys: [
        "workflow.step2.feature1",
        "workflow.step2.feature2",
        "workflow.step2.feature3"
      ]
    },
    {
      numberKey: "workflow.step3.number",
      titleKey: "workflow.step3.title",
      descriptionKey: "workflow.step3.description",
      image: flowStep3,
      featuresKeys: [
        "workflow.step3.feature1",
        "workflow.step3.feature2",
        "workflow.step3.feature3"
      ]
    }
  ];

  return (
    <section className="py-24 bg-background/90 backdrop-blur-sm">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            {t('workflow.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('workflow.subtitle')}
          </p>
        </div>

        <div className="max-w-7xl mx-auto space-y-16">
          {workflowSteps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-8 items-center`}
            >
              {/* Image */}
              <div className="flex-1 w-full">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent-foreground/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img
                    src={step.image}
                    alt={t(step.titleKey)}
                    className="relative w-full rounded-2xl shadow-large border border-border"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 w-full">
                <div className="space-y-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent-foreground text-primary-foreground text-2xl font-bold shadow-medium">
                    {t(step.numberKey)}
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                    {t(step.titleKey)}
                  </h3>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {t(step.descriptionKey)}
                  </p>

                  <div className="space-y-3 pt-4">
                    {step.featuresKeys.map((featureKey, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">{t(featureKey)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Connection Arrow */}
        <div className="flex justify-center my-8">
          <div className="flex items-center gap-2 text-primary">
            <div className="w-12 h-0.5 bg-primary" />
            <ArrowRight className="w-6 h-6" />
            <div className="w-12 h-0.5 bg-primary" />
          </div>
        </div>
      </div>
    </section>
  );
};
