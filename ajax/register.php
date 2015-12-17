<?php
/*this file inserts new users into database*/

include 'connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST")  
{
    // add checks to these
    $fname = $_POST["firstname"];
    $lname = $_POST["lastname"];
    $username = $_POST["username"];
    $password = $_POST["password"];

    if ($fname && $lname && $username && $password) 
    {
        try 
        {
            $conn = new PDO("mysql:host=$host;dbname=$db", $dbusername, $dbpassword); // establish connection
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // set the PDO error mode to exception

            $stmt = $conn->prepare("INSERT INTO users (firstname, lastname, username, pword) VALUES (:newFirstname, :newLastname, :newUsername, :newPassword)");
            $stmt->bindParam(':newFirstname', $fname);
            $stmt->bindParam(':newLastname', $lname);
            $stmt->bindParam(':newUsername', $username);
            $stmt->bindParam(':newPassword', $password);

            $stmt->execute();

            $conn = null; // close connection

            echo true;

        }
        catch (PDOException $e) // catches any exception thrown
        {
            echo "Connection failed: " . $e->getMessage();
        }
    }
    else
    {
        echo "User was not registered";
    }
}