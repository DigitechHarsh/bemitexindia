<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../config/db.php';

$category_slug = isset($_GET['category']) ? $_GET['category'] : null;

try {
    $query = "
        SELECT p.id, p.name, p.slug, p.fabric, p.moq, p.price_per_piece, p.catalog_pdf_url, c.name as category_name,
               (SELECT image_url FROM product_images WHERE product_id = p.id ORDER BY sort_order ASC LIMIT 1) as main_image
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.is_active = 1
    ";
    
    $params = [];
    
    if ($category_slug) {
        $query .= " AND c.slug = :category_slug";
        $params[':category_slug'] = $category_slug;
    }
    
    $query .= " ORDER BY p.created_at DESC";
    
    $stmt = $pdo->prepare($query);
    $stmt->execute($params);
    $products = $stmt->fetchAll();
    
    echo json_encode([
        "success" => true,
        "data" => $products
    ]);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}
?>
