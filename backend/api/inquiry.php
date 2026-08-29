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
    !empty($data->business_type) &&
    !empty($data->phone)
) {
    try {
        $query = "INSERT INTO inquiries (
            name, business_name, business_type, phone, whatsapp, 
            city, country, category_interest, quantity_needed, message
        ) VALUES (
            :name, :business_name, :business_type, :phone, :whatsapp, 
            :city, :country, :category_interest, :quantity_needed, :message
        )";
        
        $stmt = $pdo->prepare($query);
        
        // Sanitize and bind
        $stmt->bindParam(':name', htmlspecialchars(strip_tags($data->name)));
        $stmt->bindParam(':business_name', htmlspecialchars(strip_tags($data->business_name ?? '')));
        $stmt->bindParam(':business_type', htmlspecialchars(strip_tags($data->business_type)));
        $stmt->bindParam(':phone', htmlspecialchars(strip_tags($data->phone)));
        $stmt->bindParam(':whatsapp', htmlspecialchars(strip_tags($data->whatsapp ?? '')));
        $stmt->bindParam(':city', htmlspecialchars(strip_tags($data->city ?? '')));
        $stmt->bindParam(':country', htmlspecialchars(strip_tags($data->country ?? '')));
        $stmt->bindParam(':category_interest', htmlspecialchars(strip_tags($data->category_interest ?? '')));
        $stmt->bindParam(':quantity_needed', htmlspecialchars(strip_tags($data->quantity_needed ?? '')));
        $stmt->bindParam(':message', htmlspecialchars(strip_tags($data->message ?? '')));
        
        if($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["success" => true, "message" => "Inquiry submitted successfully."]);
        } else {
            http_response_code(503);
            echo json_encode(["success" => false, "message" => "Unable to submit inquiry."]);
        }
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Incomplete data. Name, business type, and phone are required."]);
}
?>
