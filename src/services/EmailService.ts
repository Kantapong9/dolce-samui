import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, EmailTemplateParams } from '@/config/emailjs';

// Email service using EmailJS
export class EmailService {
  static async sendEmail(formData) {
    try {
      // ตรวจสอบว่ากรอกข้อมูลครบหรือไม่
      if (!formData.firstName || !formData.lastName || !formData.email) {
        throw new Error('Please fill in all required fields');
      }

      // ตรวจสอบว่า EmailJS ตั้งค่าครบหรือไม่
      if (EMAILJS_CONFIG.PUBLIC_KEY === 'your_public_key_here') {
        throw new Error('EmailJS not configured. Please set up EmailJS credentials.');
      }

      // Initialize EmailJS
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

      // Prepare template parameters
      const templateParams: EmailTemplateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        message: formData.message || 'No additional message provided',
        to_email: 'kantapong@dolcevillasamui.com'
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
      );

      if (response.status === 200) {
        return { 
          success: true, 
          message: 'Email sent successfully',
          messageId: response.text
        };
      } else {
        throw new Error('Failed to send email');
      }

    } catch (error) {
      console.error('Email sending failed:', error);
      
      // Fallback to mailto if EmailJS fails
      try {
        const subject = encodeURIComponent('Private Viewing Request - Dolce Villa Samui');
        const body = encodeURIComponent(`
Dear Dolce Villa Samui Team,

I would like to schedule a private viewing of your villa property.

Contact Information:
- Name: ${formData.firstName} ${formData.lastName}
- Email: ${formData.email}
- Phone: ${formData.phone || 'Not provided'}

Message:
${formData.message || 'No additional message provided'}

Please contact me to arrange a convenient time for the viewing.

Best regards,
${formData.firstName} ${formData.lastName}
        `);
        
        const mailtoLink = `mailto:kantapong@dolcevillasamui.com?subject=${subject}&body=${body}`;
        window.location.href = mailtoLink;
        
        return { 
          success: true, 
          message: 'Email client opened as fallback' 
        };
      } catch (fallbackError) {
        throw new Error('Failed to send email. Please try again or contact us directly.');
      }
    }
  }
  
  // วิธีที่ 3: ใช้ FormData และ fetch (สำหรับ server-side processing)
  static async sendEmailViaAPI(formData) {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          to: 'kantapong@dolcevillasamui.com',
          subject: 'Private Viewing Request - Dolce Villa Samui'
        }),
      });
      
      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        throw new Error('Failed to send email via API');
      }
    } catch (error) {
      console.error('API email sending failed:', error);
      // Fallback to mailto
      return await this.sendEmail(formData);
    }
  }
}
