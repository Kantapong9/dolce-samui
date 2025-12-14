# 🚀 ขั้นตอนต่อไป - เริ่มใช้งานระบบ

## ✅ สิ่งที่ต้องทำ

### 1. สร้างไฟล์ `.env` สำหรับ Backend

สร้างไฟล์ `backend/.env` และกรอกข้อมูล MySQL:

```env
PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_NAME=dolce_villa
DB_USER=root
DB_PASSWORD=your_mysql_password
```

**หมายเหตุ**: แทนที่ `your_mysql_password` ด้วย password ของ MySQL ที่คุณตั้งไว้

---

### 2. ติดตั้ง Dependencies

```bash
# ติดตั้ง Backend dependencies
cd backend
npm install

# กลับไปที่ root directory
cd ..
```

---

### 3. รัน Backend Server

เปิด terminal ใหม่และรัน:

```bash
cd backend
npm run dev
```

**ตรวจสอบ**: ควรเห็นข้อความ:
```
✅ MySQL database connected
✅ Database table initialized
Server is running on http://localhost:3001
MySQL Database: localhost:3306/dolce_villa
```

---

### 4. ตั้งค่า Frontend (Terminal ใหม่)

เปิด terminal อีกตัวและรัน:

```bash
# อยู่ใน root directory
npm run dev
```

Frontend จะรันที่ `http://localhost:8080`

---

### 5. ทดสอบระบบ

#### 5.1 ทดสอบ Backend API

เปิด browser ไปที่:
```
http://localhost:3001/api/health
```

ควรเห็น:
```json
{
  "status": "ok",
  "message": "Server is running",
  "database": "MySQL",
  "serverTime": "...",
  "databaseName": "dolce_villa"
}
```

#### 5.2 ทดสอบ Frontend

เปิด browser ไปที่:
```
http://localhost:8080/agency
```

กรอกข้อมูลในฟอร์ม:
- ชื่อ: ทดสอบ
- นามสกุล: ระบบ
- ชื่อ Agency: Test Agency
- รายละเอียด: ทดสอบการบันทึกข้อมูล

กดปุ่ม "บันทึกข้อมูล" และตรวจสอบว่าบันทึกสำเร็จ

#### 5.3 ตรวจสอบข้อมูลใน Database

```bash
mysql -u root -p dolce_villa

SELECT * FROM agency_contacts;
```

ควรเห็นข้อมูลที่บันทึกไว้

---

## 📋 Checklist

- [ ] สร้างไฟล์ `backend/.env` และตั้งค่า MySQL
- [ ] ติดตั้ง Backend dependencies (`cd backend && npm install`)
- [ ] รัน Backend server (`cd backend && npm run dev`)
- [ ] ตรวจสอบ Backend ทำงาน (http://localhost:3001/api/health)
- [ ] รัน Frontend (`npm run dev`)
- [ ] ทดสอบฟอร์ม (http://localhost:8080/agency)
- [ ] ตรวจสอบข้อมูลใน MySQL database

---

## 🔧 Troubleshooting

### Backend ไม่สามารถเชื่อมต่อ MySQL

**ตรวจสอบ**:
1. MySQL service กำลังรันอยู่หรือไม่
2. Database `dolce_villa` ถูกสร้างแล้วหรือยัง
3. Username และ password ใน `.env` ถูกต้องหรือไม่

**แก้ไข**:
```bash
# ตรวจสอบ MySQL service
# Windows: เปิด services.msc
# macOS: brew services list
# Linux: sudo systemctl status mysql

# สร้าง database (ถ้ายังไม่มี)
mysql -u root -p
CREATE DATABASE dolce_villa;
EXIT;
```

### Frontend ไม่สามารถเชื่อมต่อ Backend

**ตรวจสอบ**:
1. Backend server กำลังรันอยู่หรือไม่ (http://localhost:3001/api/health)
2. ไฟล์ `.env` ใน root directory มี `VITE_API_BASE_URL=http://localhost:3001/api` หรือไม่

**แก้ไข**:
สร้างไฟล์ `.env` ใน root directory:
```env
VITE_API_BASE_URL=http://localhost:3001/api
```

---

## 📚 เอกสารเพิ่มเติม

- `backend/MYSQL_SETUP.md` - คู่มือการตั้งค่า MySQL แบบละเอียด
- `backend/README.md` - เอกสาร Backend API
- `AGENCY_FORM_SETUP.md` - เอกสารระบบ Agency Form

---

## 🎉 พร้อมใช้งาน!

เมื่อทำตามขั้นตอนข้างต้นเสร็จแล้ว ระบบจะพร้อมใช้งาน:
- ✅ Backend API ทำงานที่ `http://localhost:3001`
- ✅ Frontend ทำงานที่ `http://localhost:8080`
- ✅ ฟอร์ม Agency อยู่ที่ `http://localhost:8080/agency`
- ✅ ข้อมูลถูกบันทึกใน MySQL database

