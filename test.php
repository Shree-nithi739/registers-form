<?php

$conn = new mysqli(
    "127.0.0.1",
    "root",
    "",
    "",
    3306
);

if ($conn->connect_error) {
    die("Failed: " . $conn->connect_error);
}

echo "Connected successfully";
?>