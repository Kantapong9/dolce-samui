<?php
/**
 * Health Check Endpoint
 * GET /api/health
 */

// Include config for database connection
require_once __DIR__ . '/../config.php';

// Set headers
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$conn = getDBConnection();

if (!$conn) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Database connection failed',
        'database' => 'MySQL'
    ]);
    exit();
}

// Test database connection
$result = $conn->query("SELECT NOW() as server_time, DATABASE() as database_name");

if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc();
    
    echo json_encode([
        'status' => 'ok',
        'message' => 'Server is running',
        'database' => 'MySQL',
        'serverTime' => $row['server_time'],
        'databaseName' => $row['database_name']
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Database query failed',
        'database' => 'MySQL'
    ]);
}
