import { useLanguage } from '@/contexts/LanguageContext';

const ProjectConcept = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
            {t('concept.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t('concept.description')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProjectConcept;
