# Dolce Villa Samui - Backend API (PHP + MySQL)

Backend API server สำหรับระบบบันทึกข้อมูล Agency Contacts

## คุณสมบัติ

- ✅ RESTful API สำหรับจัดการข้อมูล Agency Contacts
- ✅ MySQL Database สำหรับเก็บข้อมูล
- ✅ CORS enabled สำหรับรองรับ frontend
- ✅ Validation และ Error Handling
- ✅ Prepared Statements สำหรับความปลอดภัย (ป้องกัน SQL Injection)
- ✅ UTF-8 Support สำหรับภาษาไทย

## ความต้องการของระบบ

- PHP 7.4 หรือสูงกว่า
- MySQL 5.7 หรือสูงกว่า (หรือ MariaDB 10.2+)
- Apache Web Server (พร้อม mod_rewrite) หรือ Nginx
- XAMPP/WAMP/LAMP (สำหรับ Windows/macOS/Linux)

## การติดตั้ง

### 1. ติดตั้ง MySQL และสร้าง database

ดู `MYSQL_SETUP.md` สำหรับรายละเอียดการติดตั้ง MySQL

### 2. ตั้งค่า Database Configuration

แก้ไขไฟล์ `config.php` หรือสร้างไฟล์ `.env` (ถ้าใช้ dotenv):

```php
// ใน config.php
define('DB_HOST', 'localhost');
define('DB_PORT', '3306');
define('DB_NAME', 'dolce_villa');
define('DB_USER', 'root');
define('DB_PASSWORD', 'your_password');
```

### 3. Initialize Database

รันไฟล์ `init-db.php` เพื่อสร้าง database และ table:

**วิธีที่ 1: ผ่าน Command Line**
```bash
cd backend
php init-db.php
```

**วิธีที่ 2: ผ่าน Browser**
```
http://localhost/dolce-samui/backend/init-db.php
```

### 4. ตั้งค่า Apache (ถ้าใช้ XAMPP)

ตรวจสอบว่า Apache มี mod_rewrite enabled:
- เปิด `httpd.conf` ใน XAMPP
- ตรวจสอบว่า `LoadModule rewrite_module modules/mod_rewrite.so` ไม่ถูก comment

### 5. ตั้งค่า Base URL

แก้ไขไฟล์ `.htaccess` ถ้า path ของคุณแตกต่าง:
```apache
RewriteBase /dolce-samui/backend/
```

## API Endpoints

### Base URL
```
http://localhost/dolce-samui/backend/api
```

### Health Check
```
GET /api/health
```

**Response:**
```json
{
  "status": "ok",
  "message": "Server is running",
  "database": "MySQL",
  "serverTime": "2024-01-01 12:00:00",
  "databaseName": "dolce_villa"
}
```

### สร้าง Agency Contact
```
POST /api/agency-contacts
Content-Type: application/json

{
  "firstName": "ชื่อ",
  "lastName": "นามสกุล",
  "agencyName": "ชื่อ Agency",
  "details": "รายละเอียด (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "บันทึกข้อมูลสำเร็จ",
  "data": {
    "id": 1,
    "firstName": "ชื่อ",
    "lastName": "นามสกุล",
    "agencyName": "ชื่อ Agency",
    "details": "รายละเอียด"
  }
}
```

### ดึงข้อมูล Agency Contacts ทั้งหมด
```
GET /api/agency-contacts
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "first_name": "ชื่อ",
      "last_name": "นามสกุล",
      "agency_name": "ชื่อ Agency",
      "details": "รายละเอียด",
      "created_at": "2024-01-01 12:00:00"
    }
  ]
}
```

### ดึงข้อมูล Agency Contact ตาม ID
```
GET /api/agency-contacts/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "first_name": "ชื่อ",
    "last_name": "นามสกุล",
    "agency_name": "ชื่อ Agency",
    "details": "รายละเอียด",
    "created_at": "2024-01-01 12:00:00"
  }
}
```

## Database Schema

### agency_contacts

| Column | Type | Description |
|--------|------|-------------|
| id | INT AUTO_INCREMENT | Primary Key |
| first_name | VARCHAR(255) | ชื่อ |
| last_name | VARCHAR(255) | นามสกุล |
| agency_name | VARCHAR(255) | ชื่อ Agency |
| details | TEXT | รายละเอียด |
| created_at | DATETIME | วันที่สร้าง (Auto) |

## ตัวอย่างการใช้งาน

### สร้าง Agency Contact
```bash
curl -X POST http://localhost/dolce-samui/backend/api/agency-contacts \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "สมชาย",
    "lastName": "ใจดี",
    "agencyName": "ABC Real Estate",
    "details": "ต้องการข้อมูลเพิ่มเติมเกี่ยวกับโครงการ"
  }'
```

### ดึงข้อมูลทั้งหมด
```bash
curl http://localhost/dolce-samui/backend/api/agency-contacts
```

### ดึงข้อมูลตาม ID
```bash
curl http://localhost/dolce-samui/backend/api/agency-contacts/1
```

## โครงสร้างไฟล์

```
backend/
├── api/
│   ├── index.php              # API Router
│   ├── health.php             # Health Check Endpoint
│   └── agency-contacts.php    # Agency Contacts Endpoints
├── config.php                 # Database Configuration
├── init-db.php               # Database Initialization Script
├── .htaccess                 # Apache Rewrite Rules
└── README.md                 # Documentation
```

## การตั้งค่า Frontend

แก้ไขไฟล์ `.env` ใน root directory:
```env
VITE_API_BASE_URL=http://localhost/dolce-samui/backend/api
```

หรือแก้ไขใน `src/services/AgencyService.ts`:
```typescript
const API_BASE_URL = 'http://localhost/dolce-samui/backend/api';
```

## Troubleshooting

### ❌ Error: "Database connection failed"

**ปัญหา**: ไม่สามารถเชื่อมต่อ MySQL ได้

**แก้ไข**:
1. ตรวจสอบว่า MySQL service กำลังรัน
2. ตรวจสอบ username และ password ใน `config.php`
3. ตรวจสอบว่า database `dolce_villa` ถูกสร้างแล้ว

### ❌ Error: "404 Not Found"

**ปัญหา**: Apache ไม่สามารถหาไฟล์ได้

**แก้ไข**:
1. ตรวจสอบว่า mod_rewrite enabled
2. ตรวจสอบ `.htaccess` ว่าถูกต้อง
3. ตรวจสอบ path ใน `.htaccess` ว่าตรงกับโครงสร้างโฟลเดอร์ของคุณ

### ❌ Error: "Access denied for user"

**ปัญหา**: Username หรือ password ผิด

**แก้ไข**:
1. ตรวจสอบ username และ password ใน `config.php`
2. ทดสอบเชื่อมต่อด้วย command line:
   ```bash
   mysql -u root -p
   ```

## หมายเหตุ

- Database และ table จะถูกสร้างอัตโนมัติเมื่อรัน `init-db.php`
- ต้องติดตั้ง MySQL server ก่อนรัน backend
- สำหรับ production ควรสร้าง user แยกสำหรับแอป (ไม่ใช้ root)
- ควรตั้งค่า error reporting เป็น `0` ใน production
- ควรใช้ HTTPS ใน production

## Migration จาก Node.js

ถ้าคุณเคยใช้ Node.js backend มาก่อน:

1. หยุด Node.js server
2. Database schema เหมือนกัน ไม่ต้อง migrate ข้อมูล
3. แก้ไข API base URL ใน frontend จาก `http://localhost:3001/api` เป็น `http://localhost/dolce-samui/backend/api`