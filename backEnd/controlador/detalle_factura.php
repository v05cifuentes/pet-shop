<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

require_once('../conexion.php');
require_once('../modelo/detalle_factura.php');

$control = $_GET['control'];
$detalles_factura = new DetallesFactura($conexion);

switch ($control) {
    case 'listarDetallesFactura':
        $id_factura = $_GET['id_factura'];
        $cons = $detalles_factura->listarDetallesFactura($id_factura);
        break;
    case 'agregarDetalle':
        $json = file_get_contents('php://input');
        $detalle = json_decode($json);
        $cons = $detalles_factura->agregarDetalle($detalle);
        break;
    case 'editarDetalle':
        $json = file_get_contents('php://input');
        $detalle_actualizado = json_decode($json);
        $id_detalle = $_GET['id_detalle'];
        $cons = $detalles_factura->editarDetalle($id_detalle, $detalle_actualizado);
        break;
    case 'anularDetalle':
        $id_detalle = $_GET['id_detalle'];
        $cons = $detalles_factura->anularDetalle($id_detalle);
        break;
    case 'activarDetalle':
        $id_detalle = $_GET['id_detalle'];
        $cons = $detalles_factura->activarDetalle($id_detalle);
        break;
    case 'filtrarPorEstado':
        $estado = $_GET['estado'];
        $cons = $detalles_factura->filtrarPorEstado($estado);
        break;
}

$datosj = json_encode($cons);
echo $datosj;
header('Content-type: application/json');
