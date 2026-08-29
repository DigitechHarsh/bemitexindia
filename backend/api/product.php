<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../config/db.php';

$slug = isset($_GET['slug']) ? $_GET['slug'] : null;

if (!$slug) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Product slug is required."]);
    exit;
}

try {
    // Get product details
    $stmt = $pdo->prepare("
        SELECT p.id, p.category_id, p.name, p.slug, p.description, p.fabric, p.moq, p.price_per_piece, c.name as category_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.slug = :slug AND p.is_active = 1
    ");
    $stmt->execute([':slug' => $slug]);
    $product = $stmt->fetch();
    
    if (!$product) {
        http_response_code(404);
        echo json_encode(["success" => false, "message" => "Product not found."]);
        exit;
    }
    
    // Get product images
    $imgStmt = $pdo->prepare("SELECT image_url, sort_order FROM product_images WHERE product_id = :product_id ORDER BY sort_order ASC");
    $imgStmt->execute([':product_id' => $product['id']]);
    $images = $imgStmt->fetchAll();
    
    $product['images'] = $images;
    
    echo json_encode([
        "success" => true,
        "data" => $product
    ]);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}
?>
