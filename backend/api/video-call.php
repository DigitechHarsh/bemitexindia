<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../config/db.php';

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"));

if(
    !empty($data->name) &&
    !empty($data->phone) &&
    !empty($data->preferred_date) &&
    !empty($data->preferred_time)
) {
    try {
        $query = "INSERT INTO video_call_bookings (
            name, business_name, phone, whatsapp, 
            preferred_date, preferred_time, product_interest
        ) VALUES (
            :name, :business_name, :phone, :whatsapp, 
            :preferred_date, :preferred_time, :product_interest
        )";
        
        $stmt = $pdo->prepare($query);
        
        // Sanitize and bind
        $stmt->bindParam(':name', htmlspecialchars(strip_tags($data->name)));
        $stmt->bindParam(':business_name', htmlspecialchars(strip_tags($data->business_name ?? '')));
        $stmt->bindParam(':phone', htmlspecialchars(strip_tags($data->phone)));
        $stmt->bindParam(':whatsapp', htmlspecialchars(strip_tags($data->whatsapp ?? '')));
        $stmt->bindParam(':preferred_date', htmlspecialchars(strip_tags($data->preferred_date)));
        $stmt->bindParam(':preferred_time', htmlspecialchars(strip_tags($data->preferred_time)));
        $stmt->bindParam(':product_interest', htmlspecialchars(strip_tags($data->product_interest ?? '')));
        
        if($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["success" => true, "message" => "Video call booked successfully."]);
        } else {
            http_response_code(503);
            echo json_encode(["success" => false, "message" => "Unable to book video call."]);
        }
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Incomplete data. Name, phone, preferred date and time are required."]);
}
?>
