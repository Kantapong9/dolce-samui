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
    { src: house2, alt: 'House Layout 1' },
    { src: house3, alt: 'House Layout 1' },
    { src: house4, alt: 'House Layout 1' },
    { src: house5, alt: 'House Layout 1' },
    { src: house6, alt: 'House Layout 1' },
  ];

  const houseInfo = [
    {
      title: 'Villa Detail',
      area: '(295 - 306 Sq.m. usable area)',
      description: 'Complete view of the pool villa floor plan that surrounded by ample of green spaces.',
      features: ['3 bedrooms plus or 4 bedrooms', '3 or bathrooms + 1 guest toilet', 'Salt water pool (8m x 3m)', 'Salt water pool (8m x 3m)', 'Laundry room', '2 parking']
    },
    {
      title: 'Villa Detail',
      area: '(295 - 306 Sq.m. usable area)',
      description: 'Complete view of the pool villa floor plan that surrounded by ample of green spaces.',
      features: ['3 bedrooms plus or 4 bedrooms', '3 or bathrooms + 1 guest toilet', 'Salt water pool (8m x 3m)', 'Salt water pool (8m x 3m)', 'Laundry room', '2 parking']
    },
    {
      title: 'Villa Detail',
      area: '(295 - 306 Sq.m. usable area)',
      description: 'Complete view of the pool villa floor plan that surrounded by ample of green spaces.',
      features: ['3 bedrooms plus or 4 bedrooms', '3 or bathrooms + 1 guest toilet', 'Salt water pool (8m x 3m)', 'Salt water pool (8m x 3m)', 'Laundry room', '2 parking']
    },
    {
      title: 'Villa Detail',
      area: '(295 - 306 Sq.m. usable area)',
      description: 'Complete view of the pool villa floor plan that surrounded by ample of green spaces.',
      features: ['3 bedrooms plus or 4 bedrooms', '3 or bathrooms + 1 guest toilet', 'Salt water pool (8m x 3m)', 'Salt water pool (8m x 3m)', 'Laundry room', '2 parking']
    },
    {
      title: 'Villa Detail',
      area: '(295 - 306 Sq.m. usable area)',
      description: 'Complete view of the pool villa floor plan that surrounded by ample of green spaces.',
      features: ['3 bedrooms plus or 4 bedrooms', '3 or bathrooms + 1 guest toilet', 'Salt water pool (8m x 3m)', 'Salt water pool (8m x 3m)', 'Laundry room', '2 parking']
     },
    {
      title: 'Villa Detail',
      area: '(295 - 306 Sq.m. usable area)',
      description: 'Complete view of the pool villa floor plan that surrounded by ample of green spaces.',
      features: ['3 bedrooms plus or 4 bedrooms', '3 or bathrooms + 1 guest toilet', 'Salt water pool (8m x 3m)', 'Salt water pool (8m x 3m)', 'Laundry room', '2 parking']
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
                    <div className="relative overflow-hidden rounded-lg h-full flex items-center">
                      <img 
                        src={house.src} 
                        alt={house.alt} 
                        className="w-full h-full object-contain rounded-lg shadow-lg"
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