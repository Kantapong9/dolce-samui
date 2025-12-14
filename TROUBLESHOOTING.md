# 🔧 Troubleshooting Guide

## ❌ Error: ERR_CONNECTION_REFUSED

### สาเหตุ
Backend server ไม่ได้รันอยู่ หรือไม่สามารถเชื่อมต่อได้

### วิธีแก้ไข

#### 1. ตรวจสอบว่า Backend Server รันอยู่หรือไม่

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
```

#### 2. ตรวจสอบไฟล์ `.env`

ตรวจสอบว่ามีไฟล์ `backend/.env` และมีข้อมูลครบ:

```env
PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_NAME=dolce_villa
DB_USER=root
DB_PASSWORD=your_password
```

#### 3. ตรวจสอบ MySQL Database

ตรวจสอบว่า:
- MySQL service กำลังรันอยู่
- Database `dolce_villa` ถูกสร้างแล้ว
- Username และ password ถูกต้อง

ทดสอบเชื่อมต่อ MySQL:
```bash
mysql -u root -p
USE dolce_villa;
SHOW TABLES;
EXIT;
```

#### 4. ตรวจสอบ Port 3001

ตรวจสอบว่า port 3001 ไม่ถูกใช้งานโดยโปรแกรมอื่น:

**Windows:**
```powershell
netstat -ano | findstr :3001
```

**macOS/Linux:**
```bash
lsof -i :3001
```

#### 5. ทดสอบ Backend API โดยตรง

เปิด browser ไปที่:
```
http://localhost:3001/api/health
```

ควรเห็น:
```json
{
  "status": "ok",
  "message": "Server is running",
  "database": "MySQL"
}
```

---

## ❌ Error: MySQL Connection Error

### สาเหตุ
ไม่สามารถเชื่อมต่อ MySQL database ได้

### วิธีแก้ไข

#### 1. ตรวจสอบ MySQL Service

**Windows:**
- เปิด `services.msc`
- ค้นหา "MySQL" และตรวจสอบว่า status เป็น "Running"

**macOS:**
```bash
brew services list
```

**Linux:**
```bash
sudo systemctl status mysql
```

#### 2. เริ่ม MySQL Service

**macOS:**
```bash
brew services start mysql
```

**Linux:**
```bash
sudo systemctl start mysql
```

#### 3. ตรวจสอบ Database

```bash
mysql -u root -p
SHOW DATABASES;
```

ถ้าไม่มี `dolce_villa` ให้สร้าง:
```sql
CREATE DATABASE dolce_villa;
EXIT;
```

#### 4. ตรวจสอบ Username และ Password

ทดสอบเชื่อมต่อด้วย command line:
```bash
mysql -u root -p
```

ถ้าเชื่อมต่อไม่ได้ แสดงว่า username/password ผิด

---

## ❌ Error: Frontend ไม่สามารถเชื่อมต่อ Backend

### สาเหตุ
Frontend ไม่สามารถเรียก API จาก Backend ได้

### วิธีแก้ไข

#### 1. ตรวจสอบ Backend กำลังรัน

เปิด browser ไปที่:
```
http://localhost:3001/api/health
```

#### 2. ตรวจสอบ CORS

ตรวจสอบว่า Backend server มี CORS enabled:
```javascript
app.use(cors());
```

#### 3. ตรวจสอบ API URL

ตรวจสอบว่า `AgencyService.ts` ใช้ URL ถูกต้อง:
```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
```

#### 4. ตรวจสอบ Environment Variables

สร้างไฟล์ `.env` ใน root directory (ถ้ายังไม่มี):
```env
VITE_API_BASE_URL=http://localhost:3001/api
```

**สำคัญ**: ต้อง restart frontend server หลังจากสร้าง/แก้ไข `.env`

---

## ✅ Checklist สำหรับการแก้ปัญหา

- [ ] Backend server กำลังรันอยู่ (`cd backend && npm run dev`)
- [ ] ไฟล์ `backend/.env` มีอยู่และตั้งค่าถูกต้อง
- [ ] MySQL service กำลังรันอยู่
- [ ] Database `dolce_villa` ถูกสร้างแล้ว
- [ ] Username และ password ใน `.env` ถูกต้อง
- [ ] Port 3001 ไม่ถูกใช้งานโดยโปรแกรมอื่น
- [ ] Backend API ทำงาน (ทดสอบที่ http://localhost:3001/api/health)
- [ ] Frontend สามารถเข้าถึง Backend (ตรวจสอบ Network tab ใน browser DevTools)

---

## 📞 ขั้นตอนการ Debug

1. **ตรวจสอบ Backend Logs**
   - ดู terminal ที่รัน `npm run dev` ใน backend folder
   - ตรวจสอบ error messages

2. **ตรวจสอบ Browser Console**
   - เปิด DevTools (F12)
   - ดู Console tab สำหรับ error messages
   - ดู Network tab สำหรับ API requests

3. **ทดสอบ API โดยตรง**
   ```bash
   curl http://localhost:3001/api/health
   ```

4. **ตรวจสอบ Database**
   ```bash
   mysql -u root -p dolce_villa
   SELECT * FROM agency_contacts;
   ```

---

## 🆘 ยังแก้ไม่ได้?

1. ตรวจสอบว่า MySQL ติดตั้งและรันอยู่
2. ตรวจสอบว่า database `dolce_villa` ถูกสร้างแล้ว
3. ตรวจสอบไฟล์ `backend/.env` ว่าตั้งค่าถูกต้อง
4. ลอง restart ทั้ง Backend และ Frontend servers
5. ตรวจสอบ firewall settings (อาจบล็อก port 3001)

