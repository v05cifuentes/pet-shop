<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

require_once('../conexion.php');
require_once('../modelo/login.php');

$email = $_GET['email'];
$clave = $_GET['clave'];

$login = new Login($conexion);

$vector =  $login->consulta($email, $clave);

$datosj = json_encode($vector);
echo $datosj;
header('Content-type: application/json');