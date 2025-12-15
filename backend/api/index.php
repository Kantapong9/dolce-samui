<?php
/**
 * API Router
 * 
 * Main entry point for all API requests
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include config
require_once __DIR__ . '/../config.php';

// Get request method and path
$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Remove base paths (handle different server configurations)
$basePaths = [
    '/backend/api',
    '/dolce-samui/backend/api',
    '/dolcevillasamui.com/backend/api',
    '/api'
];
foreach ($basePaths as $basePath) {
    if (strpos($path, $basePath) === 0) {
        $path = substr($path, strlen($basePath));
        break;
    }
}

// Debug: Log the path (remove in production)
// error_log("API Path: " . $path);

$path = trim($path, '/');

// Route handling
$routes = $path ? explode('/', $path) : [];

// Health check
if ((empty($routes) || $routes[0] === 'health') && $method === 'GET' && (empty($routes) || count($routes) === 1)) {
    require_once __DIR__ . '/health.php';
    exit();
}

// Agency contacts routes
if (!empty($routes) && $routes[0] === 'agency-contacts') {
    require_once __DIR__ . '/agency-contacts.php';
    exit();
}

// 404 Not Found
http_response_code(404);
echo json_encode([
    'success' => false,
    'message' => 'Endpoint not found'
]);
