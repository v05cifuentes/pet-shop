<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

require_once('../conexion.php');
require_once('../modelo/servicios.php');

$control = $_GET['control'];
$servicios = new Servicios($conexion);

switch ($control) {
    case 'listarServicios':
        $cons = $servicios->listarServicios();
        break;
    case 'insertarServicio':
        $json = file_get_contents('php://input');
        $params = json_decode($json);
        $cons = $servicios->insertarServicio($params);
        break;
    case 'eliminarServicio':
        $id = $_GET['id_servicio'];
        $cons = $servicios->eliminarServicio($id);
        break;
    case 'editarServicio':
        $json = file_get_contents('php://input');
        $params = json_decode($json);
        $id = $_GET['id_servicio'];
        $cons = $servicios->editarServicio($id, $params);
        break;
    case 'filtrarPorNombre':
        $valor = $_GET['nombre_servicio'];
        $cons = $servicios->filtrarPorNombre($valor);
        break;
}

$datosj = json_encode($cons);
echo $datosj;
header('Content-type: application/json');
