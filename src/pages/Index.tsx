import Hero from '@/components/Hero';
import ProjectConcept from '@/components/ProjectConcept';
import Amenities from '@/components/Amenities';
import ProjectPlanLayout from '@/components/ProjectPlanLayout';
import HouseLayout from '@/components/HouseLayout';
import Gallery from '@/components/Gallery';
import Location from '@/components/Location';
import PaymentTerms from '@/components/PaymentTerms';
import Contact from '@/components/Contact';
import Navigation from '@/components/Navigation';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <ProjectConcept />
      <Amenities />
      <ProjectPlanLayout />
      <HouseLayout />
      <Gallery />
      <Location />
      <PaymentTerms />
      <Contact />
    </div>
  );
};

export default Index;
