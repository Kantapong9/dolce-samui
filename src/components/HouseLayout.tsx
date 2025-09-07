import { useLanguage } from '@/contexts/LanguageContext';
import housePlan from '@/assets/house-plan.jpg';

const HouseLayout = () => {
  const { t } = useLanguage();

  const areaData = [
    { room: 'Total Area', area: '400 m²' },
    { room: 'Living Room', area: '100 m²' },
    { room: 'Kitchen', area: '25 m²' },
    { room: 'Dinning', area: '30 m²' },
    { room: 'Bedroom 1', area: '60 m²' },
    { room: 'Bedroom 2', area: '40 m²' },
    { room: 'Bedroom 3', area: '40 m²' },
    { room: 'Bedroom 4', area: '30 m²' },
    { room: 'Swimming Pool', area: '60 m²' },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            House Layout
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the thoughtfully designed layout of our villa with spacious rooms and modern amenities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* House Plan Image */}
          <div className="order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img 
                src={housePlan} 
                alt="Villa House Plan" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Area Table */}
          <div className="order-1 lg:order-2">
            <div className="bg-card rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-foreground mb-6">Room Areas</h3>
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