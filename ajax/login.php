<?php
/*this file validates username and password against database*/

include 'connect.php';

session_start();


if ($_SERVER["REQUEST_METHOD"] === "POST")
{

    $username = $_POST["username"];
    $password = $_POST["password"];

    $output = "";

    if ($username && $password) {

        try {
            $conn = new PDO("mysql:host=$host;dbname=$db", $dbusername, $dbpassword); // establish connection
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // set the PDO error mode to exception

            $query = $conn->prepare("SELECT * FROM users WHERE username=:username AND pword=:password");
            $query->bindParam(':username', $username);
            $query->bindParam(':password', $password);
            $query->execute();
            $row = $query->fetch();
            if (isset($row) && !empty($row))
            {
                $_SESSION['username'] = $row['username'];
                $_SESSION['id'] = $row['id'];
                $_SESSION['user'] = $row['firstname']. " ".$row['lastname'];
                echo true;
            }
            else
            {
                echo "Incorrect username and password combination";
            }

            $conn = null; // close connection

        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }
}

if ($_SERVER["REQUEST_METHOD"] === "GET")
{
    if (isset($_SESSION['sign-out']) && !empty($_SESSION['sign-out']))
    {
        session_unset();
        session_destroy();
    }
}
