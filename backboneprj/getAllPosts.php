<?php
$q = intval($_GET['q']);

$con = mysqli_connect('db539296506.db.1and1.com','dbo539296506','Mysql123!','db539296506');
if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}


mysqli_select_db($con,"ajax_demo");
$sql="SELECT * FROM blogpost LIMIT 5"; 
$result = mysqli_query($con,$sql);
$return_arr = array();


while($row = mysqli_fetch_array($result)) {

	$row_array = array(
    'id' => $row['id'],
    'title' => $row['title'],
    'description' => $row['descr'],
	'author' => $row['auth']
	);
	
    array_push($return_arr,$row_array);
}

echo json_encode($return_arr);

mysqli_close($con);

?>


