<?php
/*
 *this file retrieves the currently logged in user's First and lastnames 
 *and checks if the user is an admin 
 * 
 * 
 */

include 'connect.php';
session_start();

$checkAdmin = $_POST["admin"];

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($checkAdmin) && !empty($checkAdmin) && $checkAdmin==="no"){
    if (isset($_SESSION['user']) && !empty($_SESSION['user'])){
        $id = $_SESSION['user'];
        echo $id;        
    }else{
        echo "Error retrieving name";
    }
} elseif ($_SERVER["REQUEST_METHOD"] === "POST" && isset($checkAdmin) && !empty($checkAdmin) && $checkAdmin==="check") {
         if (isset($_SESSION['id']) && $_SESSION['id']=="1" && isset($_SESSION['username']) && $_SESSION['username']=="admin") {
             echo "admin";
     } else {
         echo "not admin";
     }
     }



