<?php

$host = "localhost";
$user = "root";
$password = "";
$database = "user_auth";

$conn = new mysqli(
    $host,
    $user,
    $password,
    $database,
    3306
);

if ($conn->connect_error) {

    die(json_encode([
        "status"=>"error",
        "message"=>"Database Connection Failed : "
                    .$conn->connect_error
    ]));
}

?>