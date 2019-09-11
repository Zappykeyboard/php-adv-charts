<?php 
  include 'database.php';

  header('Content-type: application/json');
  $res = $graphs;
  echo json_encode($res);
?>