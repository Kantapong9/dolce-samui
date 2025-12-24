# การตั้งค่า EmailJS สำหรับส่งอีเมล

## ระบบส่งอีเมลผ่าน EmailJS (ไม่ต้องเปิดแอปภายนอก)

### 🚀 ข้อดีของ EmailJS:

- ✅ **ไม่ต้องเปิดแอปภายนอก** - ส่งอีเมลผ่าน API
- ✅ **ใช้ Email ของลูกค้า** - ระบบจะใช้ email ที่ลูกค้ากรอก
- ✅ **Serverless** - ไม่ต้องมี backend server
- ✅ **ฟรี** - มีแผนฟรี 200 อีเมล/เดือน
- ✅ **ง่ายต่อการใช้งาน** - ตั้งค่าครั้งเดียว

### 📋 ขั้นตอนการตั้งค่า:

#### 1. สร้างบัญชี EmailJS
1. ไปที่ [https://www.emailjs.com/](https://www.emailjs.com/)
2. คลิก "Sign Up" เพื่อสร้างบัญชีใหม่
3. ยืนยันอีเมล

#### 2. เพิ่ม Email Service
1. เข้าไปที่ Dashboard
2. คลิก "Add New Service"
3. เลือก Email Provider:
   - **Gmail** (แนะนำ)
   - **Outlook**
   - **Yahoo**
   - **Custom SMTP**
4. เชื่อมต่อบัญชีอีเมลของคุณ
5. บันทึก **Service ID**

#### 3. สร้าง Email Template
1. ไปที่ "Email Templates"
2. คลิก "Create New Template"
3. ตั้งค่า Template ดังนี้:

**Template Name:** Private Viewing Request

**Subject:** Private Viewing Request - Dolce Villa Samui

**Content:**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
    Private Viewing Request
  </h2>
  
  <p>Dear Dolce Villa Samui Team,</p>
  
  <p>I would like to schedule a private viewing of your villa property.</p>
  
  <h3 style="color: #555; margin-top: 30px;">Contact Information:</h3>
  <ul style="list-style: none; padding: 0;">
    <li style="margin: 10px 0;"><strong>Name:</strong> {{from_name}}</li>
    <li style="margin: 10px 0;"><strong>Email:</strong> {{from_email}}</li>
    <li style="margin: 10px 0;"><strong>Phone:</strong> {{phone}}</li>
  </ul>
  
  <h3 style="color: #555; margin-top: 30px;">Message:</h3>
  <p style="background: #f8f9fa; padding: 15px; border-left: 4px solid #007bff; margin: 10px 0;">
    {{message}}
  </p>
  
  <p>Please contact me to arrange a convenient time for the viewing.</p>
  
  <p style="margin-top: 30px;">
    Best regards,<br>
    {{from_name}}
  </p>
  
  <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
  <p style="font-size: 12px; color: #666;">
    This email was sent from the Dolce Villa Samui website contact form.
  </p>
</div>
```

4. บันทึก **Template ID**

#### 4. ตั้งค่า Public Key
1. ไปที่ "Account" > "General"
2. คัดลอก **Public Key**

#### 5. อัปเดต Configuration
แก้ไขไฟล์ `src/config/emailjs.ts`:

```typescript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_xxxxxxxxx', // แทนที่ด้วย Service ID ของคุณ
  TEMPLATE_ID: 'template_xxxxxxxxx', // แทนที่ด้วย Template ID ของคุณ
  PUBLIC_KEY: 'xxxxxxxxxxxxxxxxxxxxxxxxx' // แทนที่ด้วย Public Key ของคุณ
};
```

### 🧪 การทดสอบ:

1. **รันแอปพลิเคชัน**:
   ```bash
   npm run dev
   ```

2. **ทดสอบฟอร์ม**:
   - ไปที่หน้า Contact
   - กรอกฟอร์ม "Schedule a Private Viewing"
   - คลิก "Send Message"

3. **ตรวจสอบผลลัพธ์**:
   - ควรเห็น "Email sent successfully!"
   - ตรวจสอบอีเมลที่ kantapong@dolcevillasamui.com

### 🔧 การแก้ไขปัญหา:

#### EmailJS not configured
- ตรวจสอบ EMAILJS_CONFIG ใน `src/config/emailjs.ts`
- ตรวจสอบว่าใส่ Service ID, Template ID, และ Public Key ครบ

#### Failed to send email
- ตรวจสอบ Email Service connection ใน EmailJS dashboard
- ตรวจสอบ Template variables ({{from_name}}, {{from_email}}, etc.)
- ดู Console logs สำหรับ error details

#### Email not received
- ตรวจสอบ Spam folder
- ตรวจสอบว่า email service ทำงานถูกต้อง
- ทดสอบส่งอีเมลจาก EmailJS dashboard

### 📊 การใช้งาน:

- **แผนฟรี**: 200 อีเมล/เดือน
- **แผนเสียเงิน**: เริ่มต้น $15/เดือน สำหรับ 1,000 อีเมล
- **Custom Domain**: รองรับสำหรับแผนเสียเงิน

### 🌐 การ Deploy:

#### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder
```

#### Environment Variables (Production)
สร้างไฟล์ `.env.local`:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### 📞 Contact Information:

- **Email**: kantapong@dolcevillasamui.com
- **Phone**: +66 85 564 9899
- **Address**: Soi Pratamnak, Bophut, Koh Samui, Thailand
