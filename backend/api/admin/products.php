<?php
// products.php - Admin Product CRUD
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../../config/db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    try {
        $stmt = $pdo->query("
            SELECT p.*, c.name as category_name,
                   (SELECT image_url FROM product_images WHERE product_id = p.id ORDER BY sort_order ASC LIMIT 1) as main_image
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            ORDER BY p.id DESC
        ");
        $products = $stmt->fetchAll();
        echo json_encode(["success" => true, "data" => $products]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
    }
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    
    if (!isset($data->name) || !isset($data->category_id) || !isset($data->price_per_piece)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Product name, category, and wholesale price are required"]);
        exit();
    }

    $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $data->name)));
    // Ensure unique slug
    $slug .= '-' . time();

    try {
        $pdo->beginTransaction();

        $stmt = $pdo->prepare("
            INSERT INTO products (name, slug, category_id, description, fabric, moq, price_per_piece, is_active)
            VALUES (:name, :slug, :category_id, :description, :fabric, :moq, :price_per_piece, :is_active)
        ");
        $stmt->execute([
            ':name' => $data->name,
            ':slug' => $slug,
            ':category_id' => $data->category_id,
            ':description' => $data->description ?? '',
            ':fabric' => $data->fabric ?? 'Rayon / Cotton',
            ':moq' => $data->moq ?? 12,
            ':price_per_piece' => $data->price_per_piece,
            ':is_active' => isset($data->is_active) ? (int)$data->is_active : 1
        ]);

        $productId = $pdo->lastInsertId();

        // Add images if provided
        if (isset($data->images) && is_array($data->images)) {
            $imgStmt = $pdo->prepare("INSERT INTO product_images (product_id, image_url, sort_order) VALUES (:pid, :url, :order)");
            foreach ($data->images as $index => $url) {
                if (!empty($url)) {
                    $imgStmt->execute([
                        ':pid' => $productId,
                        ':url' => $url,
                        ':order' => $index + 1
                    ]);
                }
            }
        }

        $pdo->commit();
        echo json_encode(["success" => true, "message" => "Product created successfully", "product_id" => $productId]);

    } catch (PDOException $e) {
        $pdo->rollBack();
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
    }
} elseif ($method === 'PUT') {
    $data = json_decode(file_get_contents("php://input"));
    if (!isset($data->id)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Product ID required"]);
        exit();
    }

    try {
        $stmt = $pdo->prepare("
            UPDATE products 
            SET name = :name, category_id = :category_id, description = :description, 
                fabric = :fabric, moq = :moq, price_per_piece = :price_per_piece, is_active = :is_active
            WHERE id = :id
        ");
        $stmt->execute([
            ':name' => $data->name,
            ':category_id' => $data->category_id,
            ':description' => $data->description ?? '',
            ':fabric' => $data->fabric ?? '',
            ':moq' => $data->moq ?? 12,
            ':price_per_piece' => $data->price_per_piece,
            ':is_active' => isset($data->is_active) ? (int)$data->is_active : 1,
            ':id' => $data->id
        ]);

        // If updated images provided
        if (isset($data->images) && is_array($data->images) && count($data->images) > 0) {
            $delImg = $pdo->prepare("DELETE FROM product_images WHERE product_id = :pid");
            $delImg->execute([':pid' => $data->id]);

            $imgStmt = $pdo->prepare("INSERT INTO product_images (product_id, image_url, sort_order) VALUES (:pid, :url, :order)");
            foreach ($data->images as $index => $url) {
                if (!empty($url)) {
                    $imgStmt->execute([
                        ':pid' => $data->id,
                        ':url' => $url,
                        ':order' => $index + 1
                    ]);
                }
            }
        }

        echo json_encode(["success" => true, "message" => "Product updated successfully"]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
    }
} elseif ($method === 'DELETE') {
    $id = isset($_GET['id']) ? (int)$_GET['id'] : null;
    if (!$id) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Product ID required"]);
        exit();
    }

    try {
        $stmt = $pdo->prepare("DELETE FROM products WHERE id = :id");
        $stmt->execute([':id' => $id]);
        echo json_encode(["success" => true, "message" => "Product deleted successfully"]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
    }
}
?>
