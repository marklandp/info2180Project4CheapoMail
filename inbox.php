<?php

include 'connect.php';

session_start();

$read = $_POST["isRead"];
$msg = $_POST["msg"];

if ($_SERVER["REQUEST_METHOD"] === "POST"){  
    if (isset($_SESSION['id']) && !empty($_SESSION['id']) && isset($read) && !empty($read) && $read==="no" && isset($msg) && !empty($msg) && $msg==="none"){
        $id = $_SESSION['id'];
        $conn = new PDO("mysql:host=$host;dbname=$db", $dbusername, $dbpassword);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        if (isset($id) && !empty($id)){
                
                $query_messages = $conn->prepare("SELECT * FROM message WHERE recipient_id=:recipient_id ORDER BY `id` DESC"); // finds message for the user
                $query_messages->bindParam(':recipient_id', $id);
                $query_messages->execute();

                $emails = [];

                while ($row = $query_messages->fetch(PDO::FETCH_ASSOC))
                {
                    array_push($emails, $row); // adds all the emails for the user to the $emails array
                }
                
                if (isset($emails) && !empty($emails)) 
                {                                
                    $html = "";
                    $html .= "<table>";
                    $html .= "<thead><tr id=\"head\">"
                    . "<th id=\"from\" class=\"from\">From</th><th class=\"sub\">Subject</th><th id=\"body\" class=\"body\">Body</th>"
                    . "</tr></thead><tbody>";

                    // create email list
                    foreach ($emails as $email)
                    {
                        $prevRead = $conn->prepare("SELECT * FROM message_read WHERE message_id=:message and reader_id=:reader"); 
                        $prevRead->bindParam(':message', $email['id']);
                        $prevRead->bindParam(':reader', $id);
                        $prevRead->execute();
                        $found = [];
                        while ($prev_read = $prevRead->fetch(PDO::FETCH_ASSOC)){
                            array_push($found, $prev_read); 

                        }
                        if (isset($found) && !empty($found)) { 
                            $class = "read";
                        }else{
                            $class = "notRead";
                        }
                        
                        $query_messages = $conn->prepare("SELECT username FROM users WHERE id=:user_id"); // finds message for the user
                        $query_messages->bindParam(':user_id', $email['user_id']);
                        $query_messages->execute();
                        $name = $query_messages->fetch(PDO::FETCH_ASSOC);
                        $html .= "<tr id=\"tr{$email['id']}\" class=\"$class\" onclick=\"read({$email['id']})\"><td class=\"from\" >{$name['username']}</td>";
                        $html .= "<td class=\"subject\">{$email['subject']}</td>";
                        $html .= "<td id=\"body{$email['id']}\" class=\"body\">{$email['body']}</td>";

                        $html .= "</tr>";
                    }

                    $html .= "</tbody></table>";

                    echo $html;
                }
                else
                {
                    echo "You have no messages.";
                }

            }
            else
            {
                $conn = null;
                echo "Session expired!";
            }
        } elseif (isset($_SESSION['id']) && !empty($_SESSION['id']) && isset($read) && !empty($read) && $read==="yes" && isset($msg) && !empty($msg)) {
            $id = $_SESSION['id'];
            $conn = new PDO("mysql:host=$host;dbname=$db", $dbusername, $dbpassword);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            $prevRead = $conn->prepare("SELECT * FROM message_read WHERE message_id=:message and reader_id=:reader"); 
            $prevRead->bindParam(':message', $msg);
            $prevRead->bindParam(':reader', $id);
            $prevRead->execute();
            $found = [];
                while ($prev_read = $prevRead->fetch(PDO::FETCH_ASSOC))
                {
                    array_push($found, $prev_read); 
                    
                }
                
                if (isset($found) && !empty($found)) { 
                    echo "message was previously read, no databse insertion will be executed";
                }else{           
            
                    $insert_read_info = $conn->prepare("INSERT INTO message_read (message_id,reader_id) VALUES (:message, :reader)"); 
                    $insert_read_info->bindParam(':message', $msg);
                    $insert_read_info->bindParam(':reader', $id);
                    $insert_read_info->execute();
            
                    echo TRUE;
                    $conn = null;
                }
            
        }else{
        $conn = null;
        echo "Session expired!";
    }
}