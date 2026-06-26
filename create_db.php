<?php

// Show MySQL errors
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {

    // Connect to MySQL Server
    $conn = new mysqli("127.0.0.1", "root", "", "", 3306);

    echo "Connected Successfully <br>";

    // Create Database
    $sql = "CREATE DATABASE IF NOT EXISTS user_auth";

    if ($conn->query($sql)) {
        echo "Database Created Successfully <br>";
    }

    // Select Database
    $conn->select_db("user_auth");

    // Create Users Table
    $table = "
    CREATE TABLE IF NOT EXISTS users(
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";

    if ($conn->query($table)) {
        echo "Users Table Created Successfully";
    }

} catch (mysqli_sql_exception $e) {

    die("MySQL Connection Error: " . $e->getMessage());

}

$conn->close();

?>