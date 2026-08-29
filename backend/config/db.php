<?php
// db.php - Database connection configuration
$host = 'localhost';
$dbname = 'bemitex_db';
$username = 'root';
$password = '';

// When deploying to Hostinger, uncomment and update these:
// $host = '127.0.0.1'; // or Hostinger DB server
// $dbname = 'your_hostinger_dbname';
// $username = 'your_hostinger_dbuser';
// $password = 'your_hostinger_dbpass';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    
    // Set PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // Set default fetch mode to associative array
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    
} catch(PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>
