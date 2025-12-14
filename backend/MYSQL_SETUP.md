# คู่มือการตั้งค่า MySQL Database

## 📋 สารบัญ

- [การติดตั้ง MySQL](#การติดตั้ง-mysql)
- [การสร้าง Database](#การสร้าง-database)
- [การตั้งค่า Environment Variables](#การตั้งค่า-environment-variables)
- [การติดตั้ง Dependencies](#การติดตั้ง-dependencies)
- [การรัน Server](#การรัน-server)
- [การตรวจสอบการทำงาน](#การตรวจสอบการทำงาน)
- [Troubleshooting](#troubleshooting)

---

## การติดตั้ง MySQL

### Windows

1. ดาวน์โหลด MySQL Installer:
   - https://dev.mysql.com/downloads/installer/
   - เลือก "MySQL Installer for Windows"

2. ติดตั้ง MySQL:
   - เปิดไฟล์ installer ที่ดาวน์โหลดมา
   - เลือก "Developer Default" หรือ "Server only"
   - ตั้งค่า root password (จำไว้สำหรับใช้ใน .env)
   - รอให้ติดตั้งเสร็จ

3. ตรวจสอบการติดตั้ง:
   ```bash
   mysql --version
   ```

### macOS

```bash
# ติดตั้ง MySQL
brew install mysql

# เริ่ม MySQL service
brew services start mysql

# ตั้งค่า root password (ถ้ายังไม่ได้ตั้ง)
mysql_secure_installation
```

### Linux (Ubuntu/Debian)

```bash
# อัปเดต package list
sudo apt update

# ติดตั้ง MySQL Server
sudo apt install mysql-server

# เริ่ม MySQL service
sudo systemctl start mysql
sudo systemctl enable mysql

# ตั้งค่า root password
sudo mysql_secure_installation
```

---

## การสร้าง Database

### วิธีที่ 1: ใช้ MySQL Command Line

```bash
# เข้าสู่ MySQL shell
mysql -u root -p

# สร้าง database
CREATE DATABASE dolce_villa;

# (Optional) สร้าง user ใหม่สำหรับแอป
CREATE USER 'dolce_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON dolce_villa.* TO 'dolce_user'@'localhost';
FLUSH PRIVILEGES;

# ออกจาก MySQL shell
EXIT;
```

### วิธีที่ 2: ใช้ MySQL Workbench

1. เปิด MySQL Workbench
2. เชื่อมต่อกับ MySQL server
3. คลิกขวาที่ "Schemas" → "Create Schema"
4. ตั้งชื่อ database: `dolce_villa`
5. คลิก "Apply"

---

## การตั้งค่า Environment Variables

สร้างไฟล์ `backend/.env` ในโฟลเดอร์ backend:

```env
# Server Port
PORT=3001

# MySQL Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=dolce_villa
DB_USER=root
DB_PASSWORD=your_password
```

### ตัวอย่างการตั้งค่าต่างๆ

**ใช้ root user:**
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=dolce_villa
DB_USER=root
DB_PASSWORD=your_root_password
```

**ใช้ user ที่สร้างใหม่:**
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=dolce_villa
DB_USER=dolce_user
DB_PASSWORD=your_password
```

**เชื่อมต่อกับ MySQL บน server อื่น:**
```env
DB_HOST=192.168.1.100
DB_PORT=3306
DB_NAME=dolce_villa
DB_USER=remote_user
DB_PASSWORD=remote_password
```

---

## การติดตั้ง Dependencies

```bash
cd backend
npm install
```

จะติดตั้ง `mysql2` package อัตโนมัติ

---

## การรัน Server

```bash
cd backend
npm run dev
```

ถ้าตั้งค่าถูกต้อง จะเห็น:
```
✅ MySQL database connected
✅ Database table initialized
Server is running on http://localhost:3001
MySQL Database: localhost:3306/dolce_villa
```

---

## การตรวจสอบการทำงาน

### 1. ตรวจสอบ Health Check

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
  "serverTime": "2024-01-01T12:00:00.000Z",
  "databaseName": "dolce_villa"
}
```

### 2. ทดสอบการบันทึกข้อมูล

```bash
curl -X POST http://localhost:3001/api/agency-contacts \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "ทดสอบ",
    "lastName": "ระบบ",
    "agencyName": "Test Agency",
    "details": "ทดสอบการเชื่อมต่อ MySQL"
  }'
```

### 3. ตรวจสอบข้อมูลใน Database

```bash
mysql -u root -p dolce_villa

SELECT * FROM agency_contacts;
```

---

## Troubleshooting

### ❌ Error: "Access denied for user"

**ปัญหา**: Username หรือ password ผิด

**แก้ไข**:
1. ตรวจสอบ username และ password ใน `.env`
2. ทดสอบเชื่อมต่อด้วย command line:
   ```bash
   mysql -u root -p
   ```
3. ตรวจสอบว่า user มีสิทธิ์เข้าถึง database:
   ```sql
   SHOW GRANTS FOR 'your_user'@'localhost';
   ```

### ❌ Error: "Can't connect to MySQL server"

**ปัญหา**: MySQL service ไม่ได้รัน หรือ host/port ผิด

**แก้ไข**:
1. ตรวจสอบว่า MySQL service กำลังรัน:
   ```bash
   # Windows
   services.msc (ค้นหา MySQL)
   
   # macOS
   brew services list
   
   # Linux
   sudo systemctl status mysql
   ```

2. เริ่ม MySQL service:
   ```bash
   # macOS
   brew services start mysql
   
   # Linux
   sudo systemctl start mysql
   ```

3. ตรวจสอบ host และ port ใน `.env`

### ❌ Error: "Unknown database 'dolce_villa'"

**ปัญหา**: Database ยังไม่ได้สร้าง

**แก้ไข**:
```bash
mysql -u root -p
CREATE DATABASE dolce_villa;
EXIT;
```

### ❌ Error: "Table 'agency_contacts' already exists"

**ปัญหา**: ตารางมีอยู่แล้ว (ไม่เป็นปัญหา)

**แก้ไข**: ไม่ต้องทำอะไร ระบบจะข้ามการสร้างตาราง

### ❌ Error: "Port 3306 already in use"

**ปัญหา**: มี MySQL service อื่นใช้ port 3306 อยู่

**แก้ไข**:
1. หยุด MySQL service ที่ใช้ port 3306
2. หรือเปลี่ยน port ใน `.env`:
   ```env
   DB_PORT=3307
   ```

---

## Database Schema

ตาราง `agency_contacts` จะถูกสร้างอัตโนมัติเมื่อรัน server ครั้งแรก:

| Column | Type | Description |
|--------|------|-------------|
| id | INT AUTO_INCREMENT | Primary Key |
| first_name | VARCHAR(255) | ชื่อ |
| last_name | VARCHAR(255) | นามสกุล |
| agency_name | VARCHAR(255) | ชื่อ Agency |
| details | TEXT | รายละเอียด |
| created_at | DATETIME | วันที่สร้าง (Auto) |

---

## หมายเหตุ

- Database และ table จะถูกสร้างอัตโนมัติเมื่อรัน server ครั้งแรก
- ควร backup database เป็นประจำ
- สำหรับ production ควรสร้าง user แยกสำหรับแอป (ไม่ใช้ root)
- ควรตั้งค่า password ที่แข็งแรง

