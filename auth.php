<?php

header("Content-Type: application/json");

include "db.php";

try{

$data = json_decode(
    file_get_contents("php://input"),
    true
);

if(!$data){
    throw new Exception("Invalid Request");
}

$action = $data['action'] ?? '';

/* =====================
   REGISTER
===================== */


if($action == "register"){

    $username = trim($data['username']);
    $email = trim($data['email']);
    $password = $data['password'];

    // echo "<pre>";print_r($data);exit;

    if(strlen($username) < 3){
        echo json_encode([
            "status"=>"error",
            "message"=>"Username must contain 3 characters"
        ]);
        exit;
    }

    if(!filter_var($email,FILTER_VALIDATE_EMAIL)){
        echo json_encode([
            "status"=>"error",
            "message"=>"Invalid Email"
        ]);
        exit;
    }

    if(strlen($password) < 6){
        echo json_encode([
            "status"=>"error",
            "message"=>"Password must be minimum 6 characters"
        ]);
        exit;
    }

    $check = $conn->prepare(
        "SELECT id FROM users WHERE email=?"
    );

    $check->bind_param("s",$email);
    $check->execute();

    $result = $check->get_result();

    //    echo "<pre>";print_r($result);exit;

    if($result->num_rows > 0){

        echo json_encode([
            "status"=>"error",
            "message"=>"Email already exists"
        ]);
        exit;
    }

    $hashedPassword =
        password_hash($password,PASSWORD_DEFAULT);

    $stmt = $conn->prepare(
        "INSERT INTO users(username,email,password)
         VALUES(?,?,?)"
    );

    $stmt->bind_param(
        "sss",
        $username,
        $email,
        $hashedPassword
    );

    if($stmt->execute()){

        echo json_encode([
            "status"=>"success",
            "message"=>"Registration Successful"
        ]);

    }else{

        echo json_encode([
            "status"=>"error",
            "message"=>"Registration Failed"
        ]);
    }
}

/* =====================
   LOGIN
===================== */

if($action == "login"){

    $loginId = trim($data['loginId']);
    $password = $data['password'];

    $stmt = $conn->prepare(
        "SELECT * FROM users
         WHERE username=? OR email=?"
    );

    $stmt->bind_param(
        "ss",
        $loginId,
        $loginId
    );

    $stmt->execute();

    $result = $stmt->get_result();

    if($result->num_rows == 0){

        echo json_encode([
            "status"=>"error",
            "field"=>"login-id-error",
            "message"=>"User not found"
        ]);
        exit;
    }

    $user = $result->fetch_assoc();

    if(password_verify(
        $password,
        $user['password']
    )){

        echo json_encode([
            "status"=>"success",
            "username"=>$user['username'],
            "email"=>$user['email']
        ]);

    }else{

        echo json_encode([
            "status"=>"error",
            "field"=>"login-password-error",
            "message"=>"Incorrect Password"
        ]);
    }
}

/* =====================
   RESET PASSWORD
===================== */

if($action == "reset_password"){

    $email = trim($data['email']);

    $stmt = $conn->prepare(
        "SELECT id FROM users WHERE email=?"
    );

    $stmt->bind_param("s",$email);
    $stmt->execute();

    $result = $stmt->get_result();

    if($result->num_rows > 0){

        echo json_encode([
            "status"=>"success",
            "message"=>"Email Found"
        ]);

    }else{

        echo json_encode([
            "status"=>"error",
            "field"=>"reset-email-error",
            "message"=>"Email Not Found"
        ]);
    }
}

}catch(Exception $e){

    echo json_encode([
        "status"=>"error",
        "message"=>$e->getMessage()
    ]);
}

?>