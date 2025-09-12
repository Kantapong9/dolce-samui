
import Hero from '@/components/Hero';
import Amenities from '@/components/Amenities';
import HouseLayout from '@/components/HouseLayout';
import Gallery from '@/components/Gallery';
import Location from '@/components/Location';
import Contact from '@/components/Contact';
import Navigation from '@/components/Navigation';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Amenities />
      <HouseLayout />
      <Gallery />
      <Location />
      <Contact />
    </div>
  );
};

export default Index;
