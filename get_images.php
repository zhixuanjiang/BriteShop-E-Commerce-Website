<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$servername = "database-1.cz8y0m086lxj.ap-southeast-2.rds.amazonaws.com";
$username = "admin";
$password = "360401498Bb";
$database = "testdb";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die(json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]));
}

$sql = "SELECT * FROM product_images";
$result = $conn->query($sql);

$images = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $images[$row['image_name']] = $row['image_url'];
    }
}

$conn->close();

echo json_encode($images);
?> 