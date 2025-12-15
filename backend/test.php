<?php
/**
 * Test PHP Configuration
 * 
 * เปิดไฟล์นี้ผ่าน browser เพื่อทดสอบว่า PHP ทำงานได้
 * URL: http://localhost/dolce-samui/backend/test.php
 */

echo "<h1>PHP Test</h1>";
echo "<p>PHP Version: " . phpversion() . "</p>";

// Test MySQL extension
if (extension_loaded('mysqli')) {
    echo "<p>✅ MySQLi extension is loaded</p>";
} else {
    echo "<p>❌ MySQLi extension is NOT loaded</p>";
}

// Test database connection
require_once __DIR__ . '/config.php';

$conn = getDBConnection();

if ($conn) {
    echo "<p>✅ Database connection successful</p>";
    echo "<p>Database: " . DB_NAME . "</p>";
    echo "<p>Host: " . DB_HOST . "</p>";
    
    // Test query
    $result = $conn->query("SELECT NOW() as server_time, DATABASE() as database_name");
    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo "<p>Server Time: " . $row['server_time'] . "</p>";
        echo "<p>Database Name: " . $row['database_name'] . "</p>";
    }
    
    // Check if table exists
    $result = $conn->query("SHOW TABLES LIKE 'agency_contacts'");
    if ($result && $result->num_rows > 0) {
        echo "<p>✅ Table 'agency_contacts' exists</p>";
    } else {
        echo "<p>⚠️ Table 'agency_contacts' does not exist. Run init-db.php to create it.</p>";
    }
    
    $conn->close();
} else {
    echo "<p>❌ Database connection failed</p>";
    echo "<p>Please check your database configuration in config.php</p>";
}

echo "<hr>";
echo "<p><a href='init-db.php'>Initialize Database</a></p>";
echo "<p><a href='api/health'>Test API Health Check</a></p>";
