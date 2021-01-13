<?php
    $host = "localhost"; 
    $user = "root"; 
    $password = ""; 
    $dbname = "exam"; 
    $id = '';

    $con = mysqli_connect($host, $user, $password,$dbname);

    $method = $_SERVER["REQUEST_METHOD"];
    $request = explode('/', trim($_SERVER['PATH_INFO'],'/'));

    if (!con) {
        die("Connection failed: ".mysqli_connect_error());
    }

    switch ($method) {
        case 'GET':
          break;
        case 'POST':
          $email = $_POST["email"];
          $password = $_POST["password"];

          $sql = "select * from user where username = $username and password = $password";
          break;
        default:
          break;
    }

    $result = mysqli_query($con,$sql);

    if (!$result) {
        http_response_code(404);
        die(mysqli_error($con));
    }

    if ($method == 'POST') {
        echo json_encode($result);
    } else {
        echo mysqli_affected_rows($con);
    }
    
    $con->close();
?>