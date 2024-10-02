<?php
$server_name = 'localhost'; 
$dbname = 'news_website'; 
$username = ''; 
$password = ''; 
$conn = new mysqli($server_name, $username,$password,$dbname);
if ($conn->connect_error) {
    die("Connection failed: ");
}
try {
    $conn = new PDO(dsn: "mysql:host=$host;dbname=$dbname", username: $username, password: $password);
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>