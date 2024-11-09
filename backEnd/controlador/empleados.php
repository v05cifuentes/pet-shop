<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

require_once('../conexion.php');
require_once('../modelo/empleados.php');

$control = $_GET['control'];
$empleados = new Empleados($conexion);

switch ($control) {
    case 'listarEmpleados':
        $cons = $empleados->listarEmpleados();
        break;
    case 'insertarEmpleado':
        $json = file_get_contents('php://input');
        $params = json_decode($json);
        $cons = $empleados->insertarEmpleado($params);
        break;
    case 'eliminarEmpleado':
        $id = $_GET['id_empleado'];
        $cons = $empleados->eliminarEmpleado($id);
        break;
    case 'editarEmpleado':
        $json = file_get_contents('php://input');
        $params = json_decode($json);
        $id = $_GET['id_empleado'];
        $cons = $empleados->editarEmpleado($id, $params);
        break;
    case 'filtrarPorNombre':
        $valor = $_GET['nombre'];
        $cons = $empleados->filtrarPorNombre($valor);
        break;
}

$datosj = json_encode($cons);
echo $datosj;
header('Content-type: application/json');
