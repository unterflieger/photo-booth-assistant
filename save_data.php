<?php
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "database_name";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$name = $_POST['name'];
$email = $_POST['email'];
$number = $_POST['number'];

$sql = "INSERT INTO entries (name, email, number) VALUES ('$name', '$email', '$number')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    http_response_code(500);
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
