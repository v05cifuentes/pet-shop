<?php
class Servicios {
    public $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    public function listarServicios() {
        $con = "SELECT * FROM servicios";
        $res = mysqli_query($this->conexion, $con);
        $vec = [];

        while($row = mysqli_fetch_array($res, MYSQLI_ASSOC)) {
            $vec[]  = $row;
        }
        return $vec;
    }

    public function eliminarServicio($id) {
        $del = "DELETE FROM servicios WHERE id_servicio = $id";
        mysqli_query($this->conexion, $del);
        $vec = [];
        $vec['resultado'] = 'OK';
        $vec['mensaje'] = 'Servicio eliminado correctamente';
        return $vec;
    }

    public function insertarServicio($parms){
        $insert_query = "INSERT INTO servicios(nombre_servicio, descripcion, precio) VALUES ('$parms->nombre_servicio', '$parms->descripcion', $parms->precio)";
        mysqli_query($this->conexion, $insert_query) or die('no inserto');
        $vec = [];
        $vec['resultado'] = 'OK';
        $vec['mensaje'] = 'Servicio insertado correctamente';
        return $vec;
    }

    public function editarServicio($id, $params){
        $update_query = "UPDATE servicios SET nombre_servicio = '$params->nombre_servicio', descripcion = '$params->descripcion', precio = $params->precio WHERE id_servicio = $id";
        mysqli_query($this->conexion, $update_query) or die('no actualizo');
        $vec = [];
        $vec['resultado'] = 'OK';
        $vec['mensaje'] = 'Servicio actualizado correctamente';
        return $vec;
    }

    public function filtrarPorNombre($data){
        $filtro_query = "SELECT * FROM servicios WHERE nombre_servicio LIKE '%$data%'";
        $res = mysqli_query($this->conexion, $filtro_query);
        $vec = [];

        while($row = mysqli_fetch_array($res)) {
            $vec[]  = $row;
        }
        return $vec;
    }
}

