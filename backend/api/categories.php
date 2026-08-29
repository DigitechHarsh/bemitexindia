<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../config/db.php';

try {
    // Get all categories
    $stmt = $pdo->query("SELECT id, name, slug FROM categories ORDER BY name ASC");
    $categories = $stmt->fetchAll();
    
    echo json_encode([
        "success" => true,
        "data" => $categories
    ]);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}
?>
