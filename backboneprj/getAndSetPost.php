<?php

$title = $_POST['title'];
$description = $_POST['description'];
$author = $_POST['author'];


$con = mysqli_connect('db539296506.db.1and1.com','dbo539296506','Mysql123!','db539296506');
if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"ajax_demo");

$sql = "SELECT MAX(id) AS ID FROM blogposts";
$result = mysqli_query($con,$sql);
$row = mysqli_fetch_array($result);
$id = $row['id'];


$sql="INSERT INTO blogpost (id, title, descr, auth) VALUES (".$id.",".$title.",".$description.",".$author.")";
$result = mysqli_query($con,$sql);


$conn->close();
?>







