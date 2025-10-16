// EmailJS configuration
export const EMAILJS_CONFIG = {
  // คุณจะต้องแทนที่ค่าเหล่านี้ด้วยข้อมูลจริงจาก EmailJS
  // ไปที่ https://www.emailjs.com/ เพื่อสร้างบัญชีและตั้งค่า
  
  // Service ID - ID ของ email service ที่สร้างใน EmailJS
  SERVICE_ID: 'service_lm7wfzx',
  
  // Template ID - ID ของ email template ที่สร้างใน EmailJS
  TEMPLATE_ID: 'template_c9bvxsl',
  
  // Public Key - Public key จาก EmailJS account
  PUBLIC_KEY: 'BIsAWYCCb7B5ygxot'
};

// Interface สำหรับ template parameters
export interface EmailTemplateParams extends Record<string, unknown> {
  from_name: string;
  from_email: string;
  phone: string;
  message: string;
  to_email: string;
}
