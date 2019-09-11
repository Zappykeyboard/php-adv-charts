<?php 
  include 'database.php';

  header('Content-type: application/json');

  $level = $_GET['level'];

  //nota: questo sistema nonriporta le chiavi dei graph
  switch($level) {
    case "guest":
      $res[] = $graphs['fatturato'];
      break;
    case "employee":
      $res[] = $graphs['fatturato'];
      $res[] = $graphs['fatturato_by_agent'];
      break;
    case 'c-level':
      $res = $graphs;
      break;
    default:
      $res= 'Parametro non valido';
  }

  echo json_encode($res);
?>