<?php

include 'connect.php';

session_start();

if (isset($_SESSION['username']))
{
    echo true;
}
else
{
    echo "Logged out";
}