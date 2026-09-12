<?php
// upload.php - Direct File & Image Upload for Admin Panel
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed"]);
    exit();
}

if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "No file uploaded or upload error occurred"]);
    exit();
}

$file = $_FILES['file'];
$uploadDir = __DIR__ . '/../../uploads/';

if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

// Generate unique clean file name
$ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
$allowedExts = ['jpg', 'jpeg', 'png', 'webp', 'pdf', 'avif'];

if (!in_array($ext, $allowedExts)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid file format. Allowed: JPG, PNG, WEBP, PDF"]);
    exit();
}

$fileName = 'bemitex_' . time() . '_' . bin2hex(random_bytes(4)) . '.' . $ext;
$targetPath = $uploadDir . $fileName;

if (move_uploaded_file($file['tmp_name'], $targetPath)) {
    // Determine public URL
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "https://";
    $host = $_SERVER['HTTP_HOST'] ?? 'bemitex.harshaicreations.com';
    $publicUrl = $protocol . $host . '/backend/uploads/' . $fileName;

    http_response_code(200);
    echo json_encode([
        "success" => true,
        "url" => $publicUrl,
        "filename" => $fileName,
        "message" => "File uploaded successfully"
    ]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Failed to move uploaded file to destination"]);
}
?>
