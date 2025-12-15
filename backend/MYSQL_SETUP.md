# คู่มือการตั้งค่า MySQL Database

## 📋 สารบัญ

- [การติดตั้ง MySQL](#การติดตั้ง-mysql)
- [การสร้าง Database](#การสร้าง-database)
- [การตั้งค่า Database Configuration](#การตั้งค่า-database-configuration)
- [การ Initialize Database](#การ-initialize-database)
- [การตรวจสอบการทำงาน](#การตรวจสอบการทำงาน)
- [Troubleshooting](#troubleshooting)

---

## การติดตั้ง MySQL

### Windows (XAMPP)

1. ดาวน์โหลด XAMPP:
   - https://www.apachefriends.org/
   - เลือกเวอร์ชันที่เหมาะสมกับ Windows ของคุณ

2. ติดตั้ง XAMPP:
   - เปิดไฟล์ installer ที่ดาวน์โหลดมา
   - เลือก components: Apache, MySQL, PHP
   - ติดตั้งตามขั้นตอน

3. เริ่ม MySQL Service:
   - เปิด XAMPP Control Panel
   - คลิก "Start" ที่ MySQL

4. ตรวจสอบการติดตั้ง:
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
CREATE DATABASE dolce_villa CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# (Optional) สร้าง user ใหม่สำหรับแอป
CREATE USER 'dolce_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON dolce_villa.* TO 'dolce_user'@'localhost';
FLUSH PRIVILEGES;

# ออกจาก MySQL shell
EXIT;
```

### วิธีที่ 2: ใช้ MySQL Workbench / phpMyAdmin

1. เปิด MySQL Workbench หรือ phpMyAdmin
2. เชื่อมต่อกับ MySQL server
3. สร้าง database ใหม่:
   - ชื่อ: `dolce_villa`
   - Character set: `utf8mb4`
   - Collation: `utf8mb4_unicode_ci`

---

## การตั้งค่า Database Configuration

แก้ไขไฟล์ `backend/config.php`:

```php
// Database Configuration
define('DB_HOST', 'localhost');
define('DB_PORT', '3306');
define('DB_NAME', 'dolce_villa');
define('DB_USER', 'root');
define('DB_PASSWORD', 'your_password');
```

### ตัวอย่างการตั้งค่าต่างๆ

**ใช้ root user:**
```php
define('DB_HOST', 'localhost');
define('DB_PORT', '3306');
define('DB_NAME', 'dolce_villa');
define('DB_USER', 'root');
define('DB_PASSWORD', 'your_root_password');
```

**ใช้ user ที่สร้างใหม่:**
```php
define('DB_HOST', 'localhost');
define('DB_PORT', '3306');
define('DB_NAME', 'dolce_villa');
define('DB_USER', 'dolce_user');
define('DB_PASSWORD', 'your_password');
```

**เชื่อมต่อกับ MySQL บน server อื่น:**
```php
define('DB_HOST', '192.168.1.100');
define('DB_PORT', '3306');
define('DB_NAME', 'dolce_villa');
define('DB_USER', 'remote_user');
define('DB_PASSWORD', 'remote_password');
```

---

## การ Initialize Database

### วิธีที่ 1: ใช้ PHP Script (แนะนำ)

**ผ่าน Command Line:**
```bash
cd backend
php init-db.php
```

**ผ่าน Browser:**
```
http://localhost/dolce-samui/backend/init-db.php
```

### วิธีที่ 2: ใช้ SQL Script

```bash
mysql -u root -p dolce_villa < init.sql
```

หรือรัน SQL ต่อไปนี้ใน MySQL:

```sql
CREATE TABLE IF NOT EXISTS agency_contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    agency_name VARCHAR(255) NOT NULL,
    details TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

## การตรวจสอบการทำงาน

### 1. ตรวจสอบ Health Check

เปิด browser ไปที่:
```
http://localhost/dolce-samui/backend/api/health
```

ควรเห็น:
```json
{
  "status": "ok",
  "message": "Server is running",
  "database": "MySQL",
  "serverTime": "2024-01-01 12:00:00",
  "databaseName": "dolce_villa"
}
```

### 2. ทดสอบการบันทึกข้อมูล

```bash
curl -X POST http://localhost/dolce-samui/backend/api/agency-contacts \
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

หรือใช้ phpMyAdmin:
1. เปิด phpMyAdmin
2. เลือก database `dolce_villa`
3. คลิกที่ table `agency_contacts`
4. ดูข้อมูล

---

## Troubleshooting

### ❌ Error: "Access denied for user"

**ปัญหา**: Username หรือ password ผิด

**แก้ไข**:
1. ตรวจสอบ username และ password ใน `config.php`
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
   # Windows (XAMPP)
   เปิด XAMPP Control Panel และตรวจสอบว่า MySQL กำลังรัน
   
   # macOS
   brew services list
   
   # Linux
   sudo systemctl status mysql
   ```

2. เริ่ม MySQL service:
   ```bash
   # Windows (XAMPP)
   คลิก "Start" ที่ MySQL ใน XAMPP Control Panel
   
   # macOS
   brew services start mysql
   
   # Linux
   sudo systemctl start mysql
   ```

3. ตรวจสอบ host และ port ใน `config.php`

### ❌ Error: "Unknown database 'dolce_villa'"

**ปัญหา**: Database ยังไม่ได้สร้าง

**แก้ไข**:
```bash
mysql -u root -p
CREATE DATABASE dolce_villa CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

หรือรัน `init-db.php`

### ❌ Error: "Table 'agency_contacts' already exists"

**ปัญหา**: ตารางมีอยู่แล้ว (ไม่เป็นปัญหา)

**แก้ไข**: ไม่ต้องทำอะไร ระบบจะข้ามการสร้างตาราง

### ❌ Error: "Port 3306 already in use"

**ปัญหา**: มี MySQL service อื่นใช้ port 3306 อยู่

**แก้ไข**:
1. หยุด MySQL service ที่ใช้ port 3306
2. หรือเปลี่ยน port ใน `config.php`:
   ```php
   define('DB_PORT', '3307');
   ```

### ❌ Error: "Connection refused" หรือ "Connection timeout"

**ปัญหา**: Firewall หรือ network configuration

**แก้ไข**:
1. ตรวจสอบ firewall settings
2. ตรวจสอบว่า MySQL อนุญาตให้เชื่อมต่อจาก localhost
3. ตรวจสอบ network configuration

---

## Database Schema

ตาราง `agency_contacts` จะถูกสร้างอัตโนมัติเมื่อรัน `init-db.php`:

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

- Database และ table จะถูกสร้างอัตโนมัติเมื่อรัน `init-db.php`
- ควร backup database เป็นประจำ
- สำหรับ production ควรสร้าง user แยกสำหรับแอป (ไม่ใช้ root)
- ควรตั้งค่า password ที่แข็งแรง
- ใช้ UTF-8 (utf8mb4) เพื่อรองรับภาษาไทยและ emoji
- สำหรับ production ควรปิด error reporting ใน `config.php`

---

## การ Backup และ Restore

### Backup Database

```bash
mysqldump -u root -p dolce_villa > backup.sql
```

### Restore Database

```bash
mysql -u root -p dolce_villa < backup.sql
```

---

## Security Best Practices

1. **ไม่ใช้ root user ใน production**
   - สร้าง user แยกสำหรับแอป
   - ให้สิทธิ์เฉพาะที่จำเป็น

2. **ใช้ Prepared Statements**
   - ป้องกัน SQL Injection
   - ใช้ mysqli prepared statements

3. **ตั้งค่า Password ที่แข็งแรง**
   - ใช้ password ที่มีความยาวอย่างน้อย 12 ตัวอักษร
   - รวมตัวอักษร ตัวเลข และสัญลักษณ์

4. **ปิด Error Reporting ใน Production**
   ```php
   error_reporting(0);
   ini_set('display_errors', 0);
   ```

5. **ใช้ HTTPS**
   - เข้ารหัสข้อมูลระหว่าง client และ server
   - ป้องกันการดักจับข้อมูล
