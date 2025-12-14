# ระบบกรอกข้อมูลผู้ติดต่อจาก Agency

## ภาพรวม

ระบบนี้ประกอบด้วย:
- **Frontend**: หน้าเว็บสำหรับกรอกข้อมูล Agency (React + TypeScript)
- **Backend**: API Server สำหรับบันทึกข้อมูล (Express + MySQL)
- **Database**: MySQL สำหรับเก็บข้อมูล Agency Contacts

## โครงสร้าง

### Frontend
- **หน้า Agency Form**: `/agency`
- **Component**: `src/components/AgencyForm.tsx`
- **Service**: `src/services/AgencyService.ts`
- **Types**: `src/types/agency.ts`

### Backend
- **Server**: `backend/server.js`
- **Database**: MySQL (ต้องติดตั้งและสร้าง database ก่อน)
- **Port**: 3001 (default)

## การติดตั้งและรัน

### 1. ติดตั้ง Backend Dependencies

```bash
cd backend
npm install
```

### 2. ตั้งค่า MySQL Database

ติดตั้ง MySQL และสร้าง database (ดู `backend/MYSQL_SETUP.md`)

### 3. ตั้งค่า Environment Variables

สร้างไฟล์ `backend/.env`:
```
PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_NAME=dolce_villa
DB_USER=root
DB_PASSWORD=your_password
```

### 4. รัน Backend Server

```bash
cd backend
npm run dev
```

Server จะรันที่ `http://localhost:3001`

### 5. ตั้งค่า Frontend

สร้างไฟล์ `.env` ใน root directory (ถ้ายังไม่มี):
```
VITE_API_BASE_URL=http://localhost:3001/api
```

### 6. รัน Frontend

```bash
npm run dev
```

Frontend จะรันที่ `http://localhost:8080`

### 7. เข้าถึงหน้า Agency Form

เปิดเบราว์เซอร์ไปที่:
```
http://localhost:8080/agency
```

## ฟอร์ม Fields

- **ชื่อ** (required): ชื่อของผู้ติดต่อ
- **นามสกุล** (required): นามสกุลของผู้ติดต่อ
- **ชื่อ Agency** (required): ชื่อของ Agency
- **รายละเอียด** (optional): รายละเอียดเพิ่มเติม

## API Endpoints

### POST /api/agency-contacts
สร้าง Agency Contact ใหม่

**Request Body:**
```json
{
  "firstName": "ชื่อ",
  "lastName": "นามสกุล",
  "agencyName": "ชื่อ Agency",
  "details": "รายละเอียด"
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

### GET /api/agency-contacts
ดึงข้อมูล Agency Contacts ทั้งหมด

### GET /api/agency-contacts/:id
ดึงข้อมูล Agency Contact ตาม ID

## Database Schema

```sql
CREATE TABLE agency_contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  agency_name TEXT NOT NULL,
  details TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## การใช้งาน

1. เปิดหน้า `/agency` ในเบราว์เซอร์
2. กรอกข้อมูลในฟอร์ม:
   - ชื่อ (required)
   - นามสกุล (required)
   - ชื่อ Agency (required)
   - รายละเอียด (optional)
3. กดปุ่ม "บันทึกข้อมูล"
4. ระบบจะบันทึกข้อมูลลงฐานข้อมูลและแสดงข้อความสำเร็จ

## หมายเหตุ

- ข้อมูลจะถูกบันทึกใน MySQL database
- Database และ table จะถูกสร้างอัตโนมัติเมื่อรัน server ครั้งแรก
- ควรเพิ่ม authentication และ authorization สำหรับการเข้าถึง API
- ควรเพิ่ม validation เพิ่มเติมตามความต้องการ
- ดูรายละเอียดการตั้งค่า MySQL ใน `backend/MYSQL_SETUP.md`

