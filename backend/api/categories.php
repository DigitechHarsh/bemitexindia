<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/db.php';

$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'GET') {
        // Get all categories with associated product count
        $stmt = $pdo->query("
            SELECT c.id, c.name, c.slug, c.created_at, 
                   COUNT(p.id) as product_count
            FROM categories c
            LEFT JOIN products p ON p.category_id = c.id
            GROUP BY c.id
            ORDER BY c.name ASC
        ");
        $categories = $stmt->fetchAll();
        
        echo json_encode([
            "success" => true,
            "data" => $categories
        ]);
        exit;
    }

    $input = json_decode(file_get_contents("php://input"), true) ?? $_POST;
    $action = $input['action'] ?? '';

    if ($method === 'POST' && $action === 'create' || ($method === 'POST' && empty($action) && isset($input['name']))) {
        // Add new category
        $name = trim($input['name'] ?? '');
        $slug = trim($input['slug'] ?? '');

        if (empty($name)) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Category name is required"]);
            exit;
        }

        if (empty($slug)) {
            $slug = strtolower(preg_replace('/[^a-z0-9]+/i', '-', $name));
            $slug = trim($slug, '-');
        }

        // Check if slug exists
        $check = $pdo->prepare("SELECT id FROM categories WHERE slug = ?");
        $check->execute([$slug]);
        if ($check->rowCount() > 0) {
            $slug = $slug . '-' . time();
        }

        $stmt = $pdo->prepare("INSERT INTO categories (name, slug) VALUES (?, ?)");
        $stmt->execute([$name, $slug]);
        $newId = $pdo->lastInsertId();

        echo json_encode([
            "success" => true,
            "message" => "Category added successfully",
            "data" => [
                "id" => $newId,
                "name" => $name,
                "slug" => $slug,
                "product_count" => 0
            ]
        ]);
        exit;
    }

    if (($method === 'POST' && $action === 'update') || $method === 'PUT') {
        // Update category
        $id = intval($input['id'] ?? 0);
        $name = trim($input['name'] ?? '');
        $slug = trim($input['slug'] ?? '');

        if ($id <= 0 || empty($name)) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Valid ID and Name are required"]);
            exit;
        }

        if (empty($slug)) {
            $slug = strtolower(preg_replace('/[^a-z0-9]+/i', '-', $name));
            $slug = trim($slug, '-');
        }

        $stmt = $pdo->prepare("UPDATE categories SET name = ?, slug = ? WHERE id = ?");
        $stmt->execute([$name, $slug, $id]);

        echo json_encode([
            "success" => true,
            "message" => "Category updated successfully"
        ]);
        exit;
    }

    if (($method === 'POST' && $action === 'delete') || $method === 'DELETE') {
        $id = intval($input['id'] ?? $_GET['id'] ?? 0);
        if ($id <= 0) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Invalid category ID"]);
            exit;
        }

        // Unlink or check products first
        $pdo->prepare("UPDATE products SET category_id = NULL WHERE category_id = ?")->execute([$id]);

        $stmt = $pdo->prepare("DELETE FROM categories WHERE id = ?");
        $stmt->execute([$id]);

        echo json_encode([
            "success" => true,
            "message" => "Category deleted successfully"
        ]);
        exit;
    }

    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed"]);

} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}
?>
