import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, CheckCircle2, Building2 } from 'lucide-react';
import { useState } from 'react';
import { AgencyService } from '@/services/AgencyService';
import { useToast } from '@/hooks/use-toast';

const AgencyForm = () => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    agencyName: '',
    details: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.agencyName) {
      setError('Please fill in all the required information (first name, last name, and agency name).');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const result = await AgencyService.createAgencyContact({
        firstName: formData.firstName,
        lastName: formData.lastName,
        agencyName: formData.agencyName,
        details: formData.details
      });
      
      if (result.success) {
        setIsSubmitted(true);
        toast({
          title: "Saved successfully",
          description: "Your information has been successfully saved.",
        });
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            firstName: '',
            lastName: '',
            agencyName: '',
            details: ''
          });
        }, 3000);
      } else {
        throw new Error(result.message || 'An error occurred while saving the data.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      const errorMessage = error instanceof Error ? error.message : 'An error occurred while saving the data. Please try again.';
      setError(errorMessage);
      toast({
        title: "An error occurred.",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-navbar rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="text-white" size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
          Fill in the contact information from the agency.
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Please enter your potential customer's full name so we can reserve them under your name.
          </p>
        </div>

        <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="text-green-600" size={40} />
              </div>
              <h3 className="text-2xl font-medium text-gray-900 mb-2">
                บันทึกข้อมูลสำเร็จ!
              </h3>
              <p className="text-gray-600 mb-6">
              Your information has been successfully saved. We will contact you as soon as possible.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name <span className="text-red-500">*</span>
                  </label>
                  <Input 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Input customer's name" 
                    required
                    disabled={isLoading}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name <span className="text-red-500">*</span>
                  </label>
                  <Input 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Input customer's last name" 
                    required
                    disabled={isLoading}
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Agent Name <span className="text-red-500">*</span>
                </label>
                <Input 
                  name="agencyName"
                  value={formData.agencyName}
                  onChange={handleInputChange}
                  placeholder=" Input your name here" 
                  required
                  disabled={isLoading}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Details
                </label>
                <Textarea 
                  name="details"
                  value={formData.details}
                  onChange={handleInputChange}
                  placeholder="Input additional details of your potential customer's details. (optional)" 
                  rows={6}
                  disabled={isLoading}
                  className="w-full"
                />
              </div>

              <Button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-navbar hover:bg-navbar/80 text-navbar-foreground text-lg py-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Recording...
                  </>
                ) : (
                  'Save Info'
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default AgencyForm;

