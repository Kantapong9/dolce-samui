# Dolce Villa Samui - Backend API

Backend API server สำหรับระบบบันทึกข้อมูล Agency Contacts

## คุณสมบัติ

- ✅ RESTful API สำหรับจัดการข้อมูล Agency Contacts
- ✅ MySQL Database สำหรับเก็บข้อมูล
- ✅ CORS enabled สำหรับรองรับ frontend
- ✅ Validation และ Error Handling
- ✅ Connection Pooling สำหรับประสิทธิภาพที่ดี

## การติดตั้ง

1. ติดตั้ง dependencies:
```bash
npm install
```

2. ติดตั้ง MySQL และสร้าง database (ดู `MYSQL_SETUP.md` สำหรับรายละเอียด)

3. สร้างไฟล์ `.env` (ดู `env.example`):
```bash
PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_NAME=dolce_villa
DB_USER=root
DB_PASSWORD=your_password
```

3. รัน server:
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

## API Endpoints

### Health Check
```
GET /api/health
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

### ดึงข้อมูล Agency Contacts ทั้งหมด
```
GET /api/agency-contacts
```

### ดึงข้อมูล Agency Contact ตาม ID
```
GET /api/agency-contacts/:id
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
curl -X POST http://localhost:3001/api/agency-contacts \
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
curl http://localhost:3001/api/agency-contacts
```

## หมายเหตุ

- Database และ table จะถูกสร้างอัตโนมัติเมื่อรัน server ครั้งแรก
- ต้องติดตั้ง MySQL server ก่อนรัน backend
- ดูรายละเอียดการตั้งค่า MySQL ใน `MYSQL_SETUP.md`
- สำหรับ production ควรสร้าง user แยกสำหรับแอป (ไม่ใช้ root)

