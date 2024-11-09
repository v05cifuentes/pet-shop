<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

require_once('../conexion.php');
require_once('../modelo/facturas.php');

$control = $_GET['control'];
$facturas = new Facturas($conexion);

switch ($control) {
    case 'listarFacturas':
        $cons = $facturas->listarFacturas();
        break;
    case 'insertarFactura':
        $json = file_get_contents('php://input');
        $params = json_decode($json);
        $cons = $facturas->insertarFactura($params);
        break;
    case 'eliminarFactura':
        $id = $_GET['id_factura'];
        $cons = $facturas->eliminarFactura($id);
        break;
    case 'editarFactura':
        $json = file_get_contents('php://input');
        $params = json_decode($json);
        $id = $_GET['id_factura'];
        $cons = $facturas->editarFactura($id, $params);
        break;
    case 'filtrarPorCliente':
        $valor = $_GET['id_cliente'];
        $cons = $facturas->filtrarPorCliente($valor);
        break;
}

$datosj = json_encode($cons);
echo $datosj;
header('Content-type: application/json');
