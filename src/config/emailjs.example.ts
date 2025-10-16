// EmailJS configuration example
// คัดลอกไฟล์นี้เป็น emailjs.ts และใส่ข้อมูลจริง

export const EMAILJS_CONFIG = {
  // Service ID - ไปที่ EmailJS Dashboard > Email Services
  // คัดลอก Service ID จากที่นั่น
  SERVICE_ID: 'service_xxxxxxxxx',
  
  // Template ID - ไปที่ EmailJS Dashboard > Email Templates
  // คัดลอก Template ID จากที่นั่น
  TEMPLATE_ID: 'template_xxxxxxxxx',
  
  // Public Key - ไปที่ EmailJS Dashboard > Account > General
  // คัดลอก Public Key จากที่นั่น
  PUBLIC_KEY: 'xxxxxxxxxxxxxxxxxxxxxxxxx'
};

// Interface สำหรับ template parameters
export interface EmailTemplateParams extends Record<string, unknown> {
  from_name: string;
  from_email: string;
  phone: string;
  message: string;
  to_email: string;
}

/*
ขั้นตอนการตั้งค่า:

1. ไปที่ https://www.emailjs.com/
2. สร้างบัญชีใหม่
3. เพิ่ม Email Service (Gmail, Outlook, etc.)
4. สร้าง Email Template
5. คัดลอก Service ID, Template ID, และ Public Key
6. ใส่ข้อมูลใน EMAILJS_CONFIG ข้างต้น
7. เปลี่ยนชื่อไฟล์จาก emailjs.example.ts เป็น emailjs.ts
*/
