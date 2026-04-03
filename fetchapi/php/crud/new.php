<?php
require "../connect/connect.php";

header('Content-Type: application/json');

if($_SERVER['REQUEST_METHOD']==='POST'){
    $id = isset($_POST['id'])? trim($_POST['id']) : '';
    $nev = isset($_POST['nev'])? trim($_POST['nev']) : '';
}
try {
    $sql = "INSERT INTO poszt (id,nev) VALUES (?, ?)";
    $stmt =  $pdo->prepare($sql);
    $stmt -> execute([$id,$nev]);

    echo json_encode([
        'success' =>true,
        'message' => 'Successfull!'
    ]);
} catch (PDOException $e){
    echo json_encode([
        'success' => false
    ]);
}

?>