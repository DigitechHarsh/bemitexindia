<?php
// db.php - Database connection configuration

// Hostinger MySQL Credentials
$host = 'localhost';
$dbname = 'u315909654_bemitex';
$username = 'u315909654_bemitex_admin';
$password = 'Bemitex_2026PassAdmin';

// Set headers for CORS and JSON response
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    
    // Set PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // Set default fetch mode to associative array
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false, 
        "error" => "Database connection failed: " . $e->getMessage()
    ]);
    exit();
}
?>

