<?php
/**
 * Debug endpoint to check routing
 * 
 * Access: http://localhost/backend/api/debug
 */

header('Content-Type: application/json; charset=utf-8');

$data = [
    'REQUEST_URI' => $_SERVER['REQUEST_URI'] ?? 'N/A',
    'SCRIPT_NAME' => $_SERVER['SCRIPT_NAME'] ?? 'N/A',
    'PHP_SELF' => $_SERVER['PHP_SELF'] ?? 'N/A',
    'PATH_INFO' => $_SERVER['PATH_INFO'] ?? 'N/A',
    'REQUEST_METHOD' => $_SERVER['REQUEST_METHOD'] ?? 'N/A',
    'parsed_path' => parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH),
    'base_paths' => [
        '/backend/api',
        '/dolce-samui/backend/api',
        '/dolcevillasamui.com/backend/api',
        '/api'
    ]
];

echo json_encode($data, JSON_PRETTY_PRINT);
