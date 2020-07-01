<?php

/* Getting file name */
$filename = $_FILES['file']['name'];

/* Location */
$location = './';

/* Upload file */
move_uploaded_file($_FILES['file']['tmp_name'],$location.$filename);

$arr = array("name"=>$filename);
echo json_encode($arr);