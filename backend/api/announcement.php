<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/db.php';

// Ensure announcements table exists
try {
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS announcements (
            id INT AUTO_INCREMENT PRIMARY KEY,
            badge VARCHAR(50) DEFAULT 'SURAT FACTORY DIRECT',
            message VARCHAR(255) NOT NULL,
            cta_text VARCHAR(100) DEFAULT 'Explore Collection',
            cta_link VARCHAR(255) DEFAULT '/products',
            product_slug VARCHAR(150) NULL,
            theme VARCHAR(50) DEFAULT 'maroon',
            is_active BOOLEAN DEFAULT TRUE,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");

    // Check if initial row exists
    $check = $pdo->query("SELECT COUNT(*) FROM announcements")->fetchColumn();
    if ($check == 0) {
        $pdo->exec("
            INSERT INTO announcements (badge, message, cta_text, cta_link, product_slug, theme, is_active)
            VALUES (
                'SURAT FACTORY DIRECT', 
                'Festive Ready Stock 2026 Direct From Looms | Fast All-India Transport Dispatch', 
                'View Trending Catalog', 
                '/products', 
                'premium-anarkali', 
                'maroon', 
                1
            )
        ");
    }
} catch(PDOException $e) {
    // Continue with fallback handling
}

$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'GET') {
        $stmt = $pdo->query("SELECT * FROM announcements ORDER BY id DESC LIMIT 1");
        $data = $stmt->fetch();

        if (!$data) {
            $data = [
                "id" => 1,
                "badge" => "SURAT FACTORY DIRECT",
                "message" => "Festive Ready Stock 2026 Direct From Looms | Fast All-India Transport Dispatch",
                "cta_text" => "View Trending Catalog",
                "cta_link" => "/products",
                "product_slug" => "premium-anarkali",
                "theme" => "maroon",
                "is_active" => 1
            ];
        }

        echo json_encode([
            "success" => true,
            "data" => $data
        ]);
        exit;
    }

    if ($method === 'POST') {
        $input = json_decode(file_get_contents("php://input"), true) ?? $_POST;

        $badge = trim($input['badge'] ?? 'SURAT FACTORY DIRECT');
        $message = trim($input['message'] ?? '');
        $cta_text = trim($input['cta_text'] ?? 'Explore Now');
        $cta_link = trim($input['cta_link'] ?? '/products');
        $product_slug = trim($input['product_slug'] ?? '');
        $theme = trim($input['theme'] ?? 'maroon');
        $is_active = isset($input['is_active']) ? ($input['is_active'] ? 1 : 0) : 1;

        if (empty($message)) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Announcement message is required"]);
            exit;
        }

        // If a specific product slug is selected, configure cta_link
        if (!empty($product_slug) && $product_slug !== "none") {
            $cta_link = "/products/" . $product_slug;
        }

        $check = $pdo->query("SELECT id FROM announcements ORDER BY id DESC LIMIT 1")->fetch();

        if ($check) {
            $stmt = $pdo->prepare("
                UPDATE announcements 
                SET badge = ?, message = ?, cta_text = ?, cta_link = ?, product_slug = ?, theme = ?, is_active = ?
                WHERE id = ?
            ");
            $stmt->execute([$badge, $message, $cta_text, $cta_link, $product_slug, $theme, $is_active, $check['id']]);
        } else {
            $stmt = $pdo->prepare("
                INSERT INTO announcements (badge, message, cta_text, cta_link, product_slug, theme, is_active)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ");
            $stmt->execute([$badge, $message, $cta_text, $cta_link, $product_slug, $theme, $is_active]);
        }

        echo json_encode([
            "success" => true,
            "message" => "Announcement Bar updated successfully",
            "data" => [
                "badge" => $badge,
                "message" => $message,
                "cta_text" => $cta_text,
                "cta_link" => $cta_link,
                "product_slug" => $product_slug,
                "theme" => $theme,
                "is_active" => $is_active
            ]
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
