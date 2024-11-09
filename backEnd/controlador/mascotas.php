<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

require_once('../conexion.php');
require_once('../modelo/mascotas.php');

$control = $_GET['control'];
$mascotas = new Mascotas($conexion);

switch ($control) {
    case 'listarMascotas':
        $cons = $mascotas->listarMascotas();
        break;
    case 'insertarMascota':
        $json = file_get_contents('php://input');
        $params = json_decode($json);
        $cons = $mascotas->insertarMascota($params);
        break;
    case 'eliminarMascota':
        $id = $_GET['id_mascota'];
        $cons = $mascotas->eliminarMascota($id);
        break;
    case 'editarMascota':
        $json = file_get_contents('php://input');
        $params = json_decode($json);
        $id = $_GET['id_mascota'];
        $cons = $mascotas->editarMascota($id, $params);
        break;
    case 'filtrarPorNombre':
        $valor = $_GET['nombre'];
        $cons = $mascotas->filtrarPorNombre($valor);
        break;
}

$datosj = json_encode($cons);
header('Content-type: application/json');
echo $datosj;
