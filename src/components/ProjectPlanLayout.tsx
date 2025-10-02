import { useLanguage } from '@/contexts/LanguageContext';
import projectPlanImage from '@/assets/project-plan.jpeg';

const ProjectPlanLayout = () => {
  const { t } = useLanguage();

  return (
    <section id="project-plan" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light mb-4 text-foreground">
            {t('projectPlan.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('projectPlan.subtitle')}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src={projectPlanImage}
              alt="Project Plan Layout"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectPlanLayout;
