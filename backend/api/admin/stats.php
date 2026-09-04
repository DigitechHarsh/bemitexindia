<?php
// stats.php - Admin Dashboard Summary Statistics
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../../config/db.php';

try {
    // Total Products
    $prodStmt = $pdo->query("SELECT COUNT(*) as total, AVG(moq) as avg_moq FROM products WHERE is_active = 1");
    $prodData = $prodStmt->fetch();

    // Inquiries stats
    $inqStmt = $pdo->query("SELECT COUNT(*) as total, SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) as new_count FROM inquiries");
    $inqData = $inqStmt->fetch();

    // Video bookings stats
    $bookStmt = $pdo->query("SELECT COUNT(*) as total, SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending_count FROM video_call_bookings");
    $bookData = $bookStmt->fetch();

    // Recent inquiries
    $recentInqStmt = $pdo->query("SELECT id, name, business_name, category_interest, city, status, created_at FROM inquiries ORDER BY created_at DESC LIMIT 5");
    $recentInquiries = $recentInqStmt->fetchAll();

    // Recent bookings
    $recentBookStmt = $pdo->query("SELECT id, name, business_name, preferred_date, preferred_time, status FROM video_call_bookings ORDER BY created_at DESC LIMIT 5");
    $recentBookings = $recentBookStmt->fetchAll();

    echo json_encode([
        "success" => true,
        "data" => [
            "total_products" => (int)$prodData['total'],
            "avg_moq" => round((float)$prodData['avg_moq'], 1),
            "new_inquiries" => (int)$inqData['new_count'],
            "total_inquiries" => (int)$inqData['total'],
            "pending_bookings" => (int)$bookData['pending_count'],
            "total_bookings" => (int)$bookData['total'],
            "recent_inquiries" => $recentInquiries,
            "recent_bookings" => $recentBookings
        ]
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}
?>
