<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

require_once('../conexion.php');
require_once('../modelo/clientes.php');

$control = $_GET['control'];
$clientes = new Clientes($conexion);

switch ($control) {
    case 'listarClientes':
        $cons = $clientes->listarClientes();
        break;
    case 'insertarCliente':
        $json = file_get_contents('php://input');
        $params = json_decode($json);
        $cons = $clientes->insertarCliente($params);
        break;
    case 'eliminarCliente':
        $id = $_GET['id_cliente'];
        $cons = $clientes->eliminarCliente($id);
        break;
    case 'editarCliente':
        $json = file_get_contents('php://input');
        $params = json_decode($json);
        $id = $_GET['id_cliente'];
        $cons = $clientes->editarCliente($id, $params);
        break;
    case 'filtrarPorNombre':
        $valor = $_GET['nombre'];
        $cons = $clientes->filtrarPorNombre($valor);
        break;
}

$datosj = json_encode($cons);
echo $datosj;
header('Content-type: application/json');
