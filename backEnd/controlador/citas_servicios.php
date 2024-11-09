<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

require_once('../conexion.php');
require_once('../modelo/citas_servicios.php');

$control = $_GET['control'];
$citasServicios = new CitasServicios($conexion);

switch ($control) {
    case 'listarCitasServicios':
        $cons = $citasServicios->listarCitasServicios();
        break;
    case 'insertarServiciosEnCita':
        $json = file_get_contents('php://input');
        $params = json_decode($json);
        $cons = $citasServicios->insertarServiciosEnCita($params);
        break;
}

$datosj = json_encode($cons);
echo $datosj;
header('Content-type: application/json');
