<?php
/**
 * Database Initialization Script
 * 
 * รันไฟล์นี้เพื่อสร้าง database และ table อัตโนมัติ
 * 
 * Usage: php init-db.php
 * หรือเปิดผ่าน browser: http://localhost/dolce-samui/backend/init-db.php
 */

require_once __DIR__ . '/config.php';

// Create database if not exists
$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create database
$sql = "CREATE DATABASE IF NOT EXISTS " . DB_NAME . " CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
if ($conn->query($sql) === TRUE) {
    echo "✅ Database '" . DB_NAME . "' created or already exists\n";
} else {
    die("❌ Error creating database: " . $conn->error);
}

$conn->close();

// Create table
$conn = getDBConnection();

if (!$conn) {
    die("❌ Error connecting to database\n");
}

$sql = "
    CREATE TABLE IF NOT EXISTS agency_contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        agency_name VARCHAR(255) NOT NULL,
        details TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
";

if ($conn->query($sql) === TRUE) {
    echo "✅ Table 'agency_contacts' created or already exists\n";
} else {
    die("❌ Error creating table: " . $conn->error);
}

$conn->close();

echo "\n✅ Database initialization completed!\n";
echo "Database: " . DB_NAME . "\n";
echo "Table: agency_contacts\n";
