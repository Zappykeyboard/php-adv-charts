<?php 
  include 'database.php';

  header('Content-type: application/json');
  $res = $data;
  echo json_encode($res);
?>