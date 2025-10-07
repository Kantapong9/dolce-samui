import { useLanguage } from '@/contexts/LanguageContext';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import house1 from '@/assets/house-1.jpg';
import house2 from '@/assets/house-2.jpg';
import house3 from '@/assets/house-3.jpg';
import house4 from '@/assets/house-4.jpg';
import house5 from '@/assets/house-5.jpg';
import house6 from '@/assets/house-6.jpg';

const HouseLayout = () => {
  const { t } = useLanguage();

  const houseImages = [
    { src: house1, alt: 'House Layout 1' },
    { src: house2, alt: 'House Layout 2' },
    { src: house3, alt: 'House Layout 3' },
    { src: house4, alt: 'House Layout 4' },
    { src: house5, alt: 'House Layout 5' },
    { src: house6, alt: 'House Layout 6' },
  ];

  const areaData = [
    { room: t('layout.total'), area: '400 m²' },
    { room: t('layout.living'), area: '100 m²' },
    { room: t('layout.kitchen'), area: '25 m²' },
    { room: t('layout.dining'), area: '30 m²' },
    { room: t('layout.bedroom1'), area: '60 m²' },
    { room: t('layout.bedroom2'), area: '40 m²' },
    { room: t('layout.bedroom3'), area: '40 m²' },
    { room: t('layout.bedroom4'), area: '30 m²' },
    { room: t('layout.pool'), area: '60 m²' },
  ];

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* House Plan Images Carousel */}
          <div className="order-2 lg:order-1">
            <Carousel className="w-full">
              <CarouselContent>
                {houseImages.map((house, index) => (
                  <CarouselItem key={index}>
                    <div className="relative overflow-hidden rounded-lg shadow-lg">
                      <img 
                        src={house.src} 
                        alt={house.alt} 
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </div>

          {/* Area Table */}
          <div className="order-1 lg:order-2">
            <div className="bg-card rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-foreground mb-6">{t('layout.areas')}</h3>
              <div className="space-y-4">
                {areaData.map((item, index) => (
                  <div 
                    key={index}
                    className={`flex justify-between items-center py-3 px-4 rounded-lg ${
                      index === 0 ? 'bg-primary/10 font-semibold' : 'bg-muted/50'
                    }`}
                  >
                    <span className="text-foreground">{item.room}</span>
                    <span className="text-foreground font-medium">{item.area}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HouseLayout;