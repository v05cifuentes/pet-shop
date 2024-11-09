<?php
class Empleados {
    public $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    public function listarEmpleados() {
        $con = "SELECT * FROM empleados";
        $res = mysqli_query($this->conexion, $con);
        $vec = [];

        while($row = mysqli_fetch_array($res, MYSQLI_ASSOC)) {
            $vec[]  = $row;
        }
        return $vec;
    }

    public function eliminarEmpleado($id) {
        $del = "DELETE FROM empleados WHERE id_empleado = $id";
        mysqli_query($this->conexion, $del);
        $vec = [];
        $vec['resultado'] = 'OK';
        $vec['mensaje'] = 'Empleado eliminado correctamente';
        return $vec;
    }

    public function insertarEmpleado($parms){
        $insert_query = "INSERT INTO empleados(nombre, cargo, horario) VALUES ('$parms->nombre', '$parms->cargo', '$parms->horario')";
        mysqli_query($this->conexion, $insert_query) or die('no inserto');
        $vec = [];
        $vec['resultado'] = 'OK';
        $vec['mensaje'] = 'Empleado insertado correctamente';
        return $vec;
    }

    public function editarEmpleado($id, $params){
        $update_query = "UPDATE empleados SET nombre = '$params->nombre', cargo = '$params->cargo', horario = '$params->horario' WHERE id_empleado = $id";
        mysqli_query($this->conexion, $update_query) or die('no actualizo');
        $vec = [];
        $vec['resultado'] = 'OK';
        $vec['mensaje'] = 'Empleado actualizado correctamente';
        return $vec;
    }

    public function filtrarPorNombre($data){
        $filtro_query = "SELECT * FROM empleados WHERE nombre LIKE '%$data%'";
        $res = mysqli_query($this->conexion, $filtro_query);
        $vec = [];

        while($row = mysqli_fetch_array($res)) {
            $vec[]  = $row;
        }
        return $vec;
    }
}
