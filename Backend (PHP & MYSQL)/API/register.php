<?php

// required headers
//header("Access-Control-Allow-Origin: http://localhost:3000");
//header("Content-Type: application/json; charset=UTF-8");
//header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 

// get database connection
include_once '../Config/database.php';
include_once '../Objects/user.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

$user->email = $data->email;
$user->password = $data->password;
$user->username = $data->username;
if($data->type) $user->type =1;
else $user->type = 0;


if ($user->emailExists()){
    echo json_encode(array("message" => "Email exist"));
    // set response code
    http_response_code(400);

} else if ($user->userExists()){
    echo json_encode(array("message" => "User exist"));
    // set response code
    http_response_code(400);
} else // create the user
if($user->create()){
    // set response code
    http_response_code(200);

    // display message: user was created
    echo json_encode(array("message" => "User was created."));
}
// message if unable to create user
else{
    echo json_encode(array("message" => "Unable to create user."));

    // set response code
    http_response_code(400);
 
    // display message: unable to create user
   // echo json_encode(array("message" => "Unable to create user."));
}
?>
