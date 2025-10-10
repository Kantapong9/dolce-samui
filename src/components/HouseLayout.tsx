import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselApi } from '@/components/ui/carousel';
import house1 from '@/assets/house-1.jpg';
import house2 from '@/assets/house-2.jpg';
import house3 from '@/assets/house-3.jpg';
import house4 from '@/assets/house-4.jpg';
import house5 from '@/assets/house-5.jpg';
import house6 from '@/assets/house-6.jpg';

const HouseLayout = () => {
  const { t } = useLanguage();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const houseImages = [
    { src: house1, alt: 'House Layout 1' },
    { src: house2, alt: 'House Layout 2' },
    { src: house3, alt: 'House Layout 3' },
    { src: house4, alt: 'House Layout 4' },
    { src: house5, alt: 'House Layout 5' },
    { src: house6, alt: 'House Layout 6' },
  ];

  const houseInfo = [
    {
      title: 'House of Dawn',
      area: '(400 sq.m. usable area)',
      description: 'Main living areas including spacious living room, modern kitchen, and dining area with direct pool access.',
      features: ['3 bedrooms plus', '3 bathrooms + 1 guest toilet', 'Modern kitchen', 'Salt water pool (8m x 3m)', 'Laundry room', '2 parking']
    },
    {
      title: 'First Floor Plan',
      area: '',
      description: 'Private quarters featuring master bedroom suite and three additional bedrooms with en-suite bathrooms.',
      features: ['Master bedroom 60m²', '3 Additional bedrooms', 'En-suite bathrooms', 'Balconies']
    },
    {
      title: 'Front Elevation',
      area: '',
      description: 'Modern architectural design with clean lines and contemporary finishes.',
      features: ['Contemporary style', 'Large windows', 'Covered parking', 'Landscaped entrance']
    },
    {
      title: 'Rear Elevation',
      area: '',
      description: 'Stunning pool area with outdoor entertainment spaces and garden views.',
      features: ['Private pool 60m²', 'Outdoor terrace', 'Garden area', 'Pool deck']
    },
    {
      title: 'Side Elevation',
      area: '',
      description: 'Side view showcasing the multi-level design and architectural details.',
      features: ['Two-story design', 'Balcony access', 'Privacy walls', 'Side entrance']
    },
    {
      title: '3D Perspective',
      area: '',
      description: 'Complete view of the villa showcasing the modern design and spatial layout.',
      features: ['Total area 400m²', '4 Bedrooms', '5 Bathrooms', 'Private pool']
    }
  ];

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-6">
            {t('layout.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('layout.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-8 gap-12 items-stretch max-w-6xl mx-auto">
          {/* House Plan Images Carousel */}
          <div className="order-2 lg:order-1 lg:col-span-5 flex">
            <Carousel className="w-full h-full" setApi={setApi}>
              <CarouselContent>
                {houseImages.map((house, index) => (
                  <CarouselItem key={index}>
                    <div className="relative overflow-hidden rounded-lg shadow-lg h-full flex items-center">
                      <img 
                        src={house.src} 
                        alt={house.alt} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </div>

          {/* House Information */}
          <div className="order-1 lg:order-2 lg:col-span-3 flex">
            <div className="bg-card rounded-lg shadow-lg p-6 flex flex-col w-full">
              <h3 className="text-2xl font-light text-foreground mb-1">
                {houseInfo[current].title}
              </h3>
              {houseInfo[current].area && (
                <p className="text-lg text-muted-foreground mb-3">
                  {houseInfo[current].area}
                </p>
              )}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {houseInfo[current].description}
              </p>
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                  Key Features
                </h4>
                <ul className="space-y-2">
                  {houseInfo[current].features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span className="text-foreground text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HouseLayout;