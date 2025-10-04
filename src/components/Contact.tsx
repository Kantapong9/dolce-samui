
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-navbar rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Sales Office</h3>
                <p className="text-gray-600">{t('contact.phone')}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-navbar rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                <p className="text-gray-600">{t('contact.email.address')}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-navbar rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Sales Gallery</h3>
                <p className="text-gray-600">{t('contact.address')}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-navbar rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Viewing Hours</h3>
                <p className="text-gray-600">Monday - Saturday: 9AM - 6PM</p>
                <p className="text-gray-600">Sunday: 10AM - 4PM</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-light text-gray-900 mb-6">Schedule a Private Viewing</h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.name')}
                  </label>
                  <Input placeholder={t('contact.name')} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.lastname')}
                  </label>
                  <Input placeholder={t('contact.lastname')} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.email')}
                </label>
                <Input type="email" placeholder={t('contact.email')} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <Input type="tel" placeholder="+1 (555) 123-4567" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.message')}
                </label>
                <Textarea 
                  placeholder={t('contact.message')} 
                  rows={4}
                />
              </div>

              <Button className="w-full bg-navbar hover:bg-navbar/80 text-navbar-foreground text-lg py-3">
                {t('contact.send')}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
