<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

require_once('../conexion.php');
require_once('../modelo/inventario.php');

$control = $_GET['control'];
$inventario = new Inventario($conexion);

switch ($control) {
    case 'listarInventario':
        $cons = $inventario->listarInventario();
        break;
    case 'insertarProducto':
        $json = file_get_contents('php://input');
        $params = json_decode($json);
        $cons = $inventario->insertarProducto($params);
        break;
    case 'eliminarProducto':
        $id = $_GET['id_producto'];
        $cons = $inventario->eliminarProducto($id);
        break;
    case 'editarProducto':
        $json = file_get_contents('php://input');
        $params = json_decode($json);
        $id = $_GET['id_producto'];
        $cons = $inventario->editarProducto($id, $params);
        break;
    case 'filtrarPorNombre':
        $valor = $_GET['nombre_producto'];
        $cons = $inventario->filtrarPorNombre($valor);
        break;
}

$datosj = json_encode($cons);
echo $datosj;
header('Content-type: application/json');
