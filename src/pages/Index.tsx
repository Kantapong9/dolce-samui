
import Hero from '@/components/Hero';
import VillaShowcase from '@/components/VillaShowcase';
import Amenities from '@/components/Amenities';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Navigation from '@/components/Navigation';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <VillaShowcase />
      <Amenities />
      <Gallery />
      <Contact />
    </div>
  );
};

export default Index;
