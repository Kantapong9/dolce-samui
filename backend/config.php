<?php
/**
 * Database Configuration
 * 
 * สร้างไฟล์ .env หรือแก้ไขค่าตรงนี้ตามการตั้งค่าของคุณ
 */

// ตั้งค่า error reporting (ปิดใน production)
error_reporting(E_ALL);
ini_set('display_errors', 0);

// Database Configuration
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_PORT', getenv('DB_PORT') ?: '3306');
define('DB_NAME', getenv('DB_NAME') ?: 'dolce_villa');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASSWORD', getenv('DB_PASSWORD') ?: '');

// Timezone
date_default_timezone_set('Asia/Bangkok');

/**
 * Get database connection
 * 
 * @return mysqli|null
 */
function getDBConnection() {
    static $conn = null;
    
    if ($conn === null) {
        try {
            $conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
            
            if ($conn->connect_error) {
                throw new Exception("Connection failed: " . $conn->connect_error);
            }
            
            // Set charset to utf8mb4 for proper Thai character support
            $conn->set_charset("utf8mb4");
            
        } catch (Exception $e) {
            error_log("Database connection error: " . $e->getMessage());
            return null;
        }
    }
    
    return $conn;
}

/**
 * Initialize database and create table if not exists
 */
function initializeDatabase() {
    $conn = getDBConnection();
    
    if (!$conn) {
        return false;
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
        return true;
    } else {
        error_log("Error creating table: " . $conn->error);
        return false;
    }
}

// Initialize database on first load
initializeDatabase();
