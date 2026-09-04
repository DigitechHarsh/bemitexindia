<?php
// video-calls.php - Admin Video Call Bookings Management
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../../config/db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    try {
        $status = isset($_GET['status']) ? $_GET['status'] : null;
        if ($status && $status !== 'all') {
            $stmt = $pdo->prepare("SELECT * FROM video_call_bookings WHERE status = :status ORDER BY preferred_date ASC");
            $stmt->execute([':status' => $status]);
        } else {
            $stmt = $pdo->query("SELECT * FROM video_call_bookings ORDER BY created_at DESC");
        }
        $bookings = $stmt->fetchAll();

        echo json_encode(["success" => true, "data" => $bookings]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
    }
} elseif ($method === 'PUT') {
    $data = json_decode(file_get_contents("php://input"));
    if (!isset($data->id) || !isset($data->status)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Booking ID and status required"]);
        exit();
    }

    try {
        $stmt = $pdo->prepare("UPDATE video_call_bookings SET status = :status WHERE id = :id");
        $stmt->execute([
            ':status' => $data->status,
            ':id' => $data->id
        ]);
        echo json_encode(["success" => true, "message" => "Booking status updated successfully"]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
    }
} elseif ($method === 'DELETE') {
    $id = isset($_GET['id']) ? (int)$_GET['id'] : null;
    if (!$id) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Booking ID required"]);
        exit();
    }

    try {
        $stmt = $pdo->prepare("DELETE FROM video_call_bookings WHERE id = :id");
        $stmt->execute([':id' => $id]);
        echo json_encode(["success" => true, "message" => "Booking deleted successfully"]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
    }
}
?>
