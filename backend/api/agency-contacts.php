<?php
/**
 * Agency Contacts API Endpoints
 * 
 * GET    /api/agency-contacts      - Get all contacts
 * GET    /api/agency-contacts/:id  - Get contact by ID
 * POST   /api/agency-contacts      - Create new contact
 */

// Include config for database connection
require_once __DIR__ . '/../config.php';

// Set headers
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Remove base paths (handle different server configurations)
$basePaths = [
    '/backend/api/agency-contacts',
    '/dolce-samui/backend/api/agency-contacts',
    '/dolcevillasamui.com/backend/api/agency-contacts',
    '/backend/api',
    '/dolce-samui/backend/api',
    '/dolcevillasamui.com/backend/api',
    '/api/agency-contacts',
    '/api'
];

// Remove the longest matching base path
$longestMatch = '';
foreach ($basePaths as $basePath) {
    if (strpos($path, $basePath) === 0 && strlen($basePath) > strlen($longestMatch)) {
        $longestMatch = $basePath;
    }
}

if ($longestMatch) {
    $path = substr($path, strlen($longestMatch));
}

$path = trim($path, '/');
$routes = $path ? explode('/', $path) : [];

// If path is empty or just 'agency-contacts', set routes correctly
if (empty($routes) || $routes[0] === 'agency-contacts') {
    if ($routes[0] === 'agency-contacts') {
        array_shift($routes); // Remove 'agency-contacts' from routes
    }
}

$conn = getDBConnection();

if (!$conn) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล'
    ]);
    exit();
}

// Get contact by ID
// Check if there's an ID in the routes (could be routes[0] or routes[1] depending on path parsing)
$contactId = null;
if (!empty($routes)) {
    // If first route element is numeric, it's the ID
    if (is_numeric($routes[0])) {
        $contactId = intval($routes[0]);
    } elseif (isset($routes[1]) && is_numeric($routes[1])) {
        $contactId = intval($routes[1]);
    }
}

if ($method === 'GET' && $contactId !== null) {
    $id = $contactId;
    
    $stmt = $conn->prepare("SELECT * FROM agency_contacts WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        http_response_code(404);
        echo json_encode([
            'success' => false,
            'message' => 'ไม่พบข้อมูล'
        ]);
    } else {
        $row = $result->fetch_assoc();
        // Convert snake_case to camelCase for frontend
        $contact = [
            'id' => $row['id'],
            'firstName' => $row['first_name'],
            'lastName' => $row['last_name'],
            'agencyName' => $row['agency_name'],
            'details' => $row['details'],
            'createdAt' => $row['created_at']
        ];
        echo json_encode([
            'success' => true,
            'data' => $contact
        ]);
    }
    
    $stmt->close();
    exit();
}

// Get all contacts
if ($method === 'GET') {
    $result = $conn->query("SELECT * FROM agency_contacts ORDER BY created_at DESC");
    
    $contacts = [];
    while ($row = $result->fetch_assoc()) {
        // Convert snake_case to camelCase for frontend
        $contacts[] = [
            'id' => $row['id'],
            'firstName' => $row['first_name'],
            'lastName' => $row['last_name'],
            'agencyName' => $row['agency_name'],
            'details' => $row['details'],
            'createdAt' => $row['created_at']
        ];
    }
    
    echo json_encode([
        'success' => true,
        'data' => $contacts
    ]);
    exit();
}

// Create new contact
if ($method === 'POST') {
    // Get JSON input
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    
    if (!$data) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Invalid JSON data'
        ]);
        exit();
    }
    
    $firstName = $data['firstName'] ?? '';
    $lastName = $data['lastName'] ?? '';
    $agencyName = $data['agencyName'] ?? '';
    $details = $data['details'] ?? '';
    
    // Validation
    if (empty($firstName) || empty($lastName) || empty($agencyName)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'กรุณากรอกชื่อ นามสกุล และชื่อ Agency'
        ]);
        exit();
    }
    
    // Sanitize input
    $firstName = $conn->real_escape_string($firstName);
    $lastName = $conn->real_escape_string($lastName);
    $agencyName = $conn->real_escape_string($agencyName);
    $details = $conn->real_escape_string($details);
    
    // Insert into database
    $stmt = $conn->prepare("INSERT INTO agency_contacts (first_name, last_name, agency_name, details) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $firstName, $lastName, $agencyName, $details);
    
    if ($stmt->execute()) {
        $insertId = $conn->insert_id;
        
        echo json_encode([
            'success' => true,
            'message' => 'บันทึกข้อมูลสำเร็จ',
            'data' => [
                'id' => $insertId,
                'firstName' => $data['firstName'],
                'lastName' => $data['lastName'],
                'agencyName' => $data['agencyName'],
                'details' => $data['details'] ?? ''
            ]
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'เกิดข้อผิดพลาดในการบันทึกข้อมูล',
            'error' => $conn->error
        ]);
    }
    
    $stmt->close();
    exit();
}

// Method not allowed
http_response_code(405);
echo json_encode([
    'success' => false,
    'message' => 'Method not allowed'
]);
