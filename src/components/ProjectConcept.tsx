import { useLanguage } from '@/contexts/LanguageContext';
import mainVillageImage from '@/assets/main-village.jpg';

const ProjectConcept = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
            {t('concept.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t('concept.description')}
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src={mainVillageImage}
              alt="Dolce Villa Samui - Main Village View"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectConcept;
