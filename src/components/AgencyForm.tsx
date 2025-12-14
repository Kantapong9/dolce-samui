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
      setError('กรุณากรอกข้อมูลให้ครบถ้วน (ชื่อ, นามสกุล, และชื่อ Agency)');
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
          title: "บันทึกสำเร็จ",
          description: "ข้อมูลของคุณถูกบันทึกเรียบร้อยแล้ว",
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
        throw new Error(result.message || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      const errorMessage = error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่อีกครั้ง';
      setError(errorMessage);
      toast({
        title: "เกิดข้อผิดพลาด",
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
            กรอกข้อมูลผู้ติดต่อจาก Agency
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            กรุณากรอกข้อมูลของคุณเพื่อให้เราสามารถติดต่อกลับได้
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
                ข้อมูลของคุณถูกบันทึกเรียบร้อยแล้ว เราจะติดต่อกลับโดยเร็วที่สุด
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
                    ชื่อ <span className="text-red-500">*</span>
                  </label>
                  <Input 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="กรุณากรอกชื่อ" 
                    required
                    disabled={isLoading}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    นามสกุล <span className="text-red-500">*</span>
                  </label>
                  <Input 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="กรุณากรอกนามสกุล" 
                    required
                    disabled={isLoading}
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ชื่อ Agency <span className="text-red-500">*</span>
                </label>
                <Input 
                  name="agencyName"
                  value={formData.agencyName}
                  onChange={handleInputChange}
                  placeholder="กรุณากรอกชื่อ Agency" 
                  required
                  disabled={isLoading}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  รายละเอียด
                </label>
                <Textarea 
                  name="details"
                  value={formData.details}
                  onChange={handleInputChange}
                  placeholder="กรุณากรอกรายละเอียดเพิ่มเติม (ถ้ามี)" 
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
                    กำลังบันทึก...
                  </>
                ) : (
                  'บันทึกข้อมูล'
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

