
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact Our Sales Team
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to own your dream villa? Contact our expert sales team for private viewings and investment opportunities
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="text-blue-600" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Sales Office</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
                <p className="text-gray-600">+1 (555) 987-6543</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="text-blue-600" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                <p className="text-gray-600">sales@aqualuxdev.com</p>
                <p className="text-gray-600">invest@aqualuxdev.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="text-blue-600" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Sales Gallery</h3>
                <p className="text-gray-600">Luxury Waterfront District</p>
                <p className="text-gray-600">Premium Development Zone</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="text-blue-600" size={20} />
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
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Schedule a Private Viewing</h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <Input placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <Input placeholder="Doe" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input type="email" placeholder="john@example.com" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <Input type="tel" placeholder="+1 (555) 123-4567" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interested Property
                </label>
                <Input placeholder="Ocean Breeze Villa, Mountain View Retreat, etc." />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <Textarea 
                  placeholder="Tell us about your requirements and preferred viewing times..." 
                  rows={4}
                />
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3">
                Request Private Viewing
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
