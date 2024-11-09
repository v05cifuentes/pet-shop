<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

require_once('../conexion.php');
require_once('../modelo/citas.php');

$control = $_GET['control'];
$citas = new Citas($conexion);

switch ($control) {
    case 'listarCitas':
        $cons = $citas->listarCitas();
        break;
    case 'insertarCita':
        $json = file_get_contents('php://input');
        $params = json_decode($json);
        $cons = $citas->insertarCita($params);
        break;
    case 'eliminarCita':
        $id = $_GET['id_cita'];
        $cons = $citas->eliminarCita($id);
        break;
    case 'editarCita':
        $json = file_get_contents('php://input');
        $params = json_decode($json);
        $id = $_GET['id_cita'];
        $cons = $citas->editarCita($id, $params);
        break;
    case 'filtrarPorCliente':
        $valor = $_GET['cliente'];
        $cons = $citas->filtrarPorCliente($valor);
        break;
}

$datosj = json_encode($cons);
header('Content-type: application/json');
echo $datosj;
