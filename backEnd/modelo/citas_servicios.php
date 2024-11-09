<?php
class CitasServicios {
    public $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    public function listarCitasServicios() {
        $query = "SELECT * FROM citas_servicios";
        $result = mysqli_query($this->conexion, $query);
        $citasServicios = [];

        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            $citasServicios[] = $row;
        }
        return $citasServicios;
    }

    public function insertarServiciosEnCita($parms){
        $insert_query = "INSERT INTO citas_servicios(id_cita, id_servicio) VALUES ($parms->id_cita, $parms->id_servicio)";

        mysqli_query($this->conexion, $insert_query) or die('no inserto');
        $vec = [];
        $vec['resultado'] = 'OK';
        $vec['mensaje'] = 'Cita insertada correctamente';
        return $vec;
    }
}