<?php

header('Content-type: application/json');
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 

// get database connection
include_once '../Config/database.php';
include_once '../Objects/item.php';

$database = new Database();
$db = $database->getConnection();

$item = new Item($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

//json_encode($example);

$item->itemid = $data->itemid;

// create the service
if($item->remove()){
    // set response code
    http_response_code(200);
    // display message: user was service
    echo json_encode(array("message" => "Service or product was removed",));
}
 
// message if unable to create service
else{
    echo json_encode(array(
        "message" => "Unable to remove the service or product.",
        "itemid"=>$item->itemid,
        "responce"=>$responce
));
    // set response code
    http_response_code(400);
    // display message: unable to create service
}
?>
