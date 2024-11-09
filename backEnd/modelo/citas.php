<?php
class Citas {
    public $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    public function listarCitas() {
        $con = "SELECT 
                    citas.id_cita, 
                    clientes.nombre, 
                    mascotas.nombre_mascota, 
                    citas.fecha_hora, 
                    servicios.nombre_servicio,
                    servicios.precio,
                    citas.estado, 
                    citas.notas
                FROM citas
                JOIN clientes ON citas.id_cliente = clientes.id_cliente
                JOIN mascotas ON citas.id_mascota = mascotas.id_mascota
                JOIN servicios ON citas.id_servicio = servicios.id_servicio";
        $res = mysqli_query($this->conexion, $con);
        $vec = [];

        while($row = mysqli_fetch_array($res, MYSQLI_ASSOC)) {
            $vec[]  = $row;
        }
        return $vec;
    }

    public function eliminarCita($id) {
        $del = "DELETE FROM citas WHERE id_cita = $id";
        mysqli_query($this->conexion, $del);
        $vec = [];
        $vec['resultado'] = 'OK';
        $vec['mensaje'] = 'Cita eliminada correctamente';
        return $vec;
    }

    public function insertarCita($parms){
        $insert_query = "INSERT INTO citas(id_cliente, id_mascota, fecha_hora, estado, notas) VALUES ($parms->id_cliente, $parms->id_mascota, '$parms->fecha_hora', '$parms->estado', '$parms->notas')";
        mysqli_query($this->conexion, $insert_query) or die('no inserto');

        // Obtener el ID de la cita recién insertada
        $con = "SELECT LAST_INSERT_ID() AS id_cita";
        $res = mysqli_query($this->conexion, $con);
        $idCita = mysqli_fetch_assoc($res)['id_cita'];
    
        // Aquí podrías devolver el ID de la cita como respuesta
        return $idCita;
    }

    public function editarCita($id, $params){
        // Obtener el ID del cliente basado en el nombre proporcionado
        $nombre = $params->nombre;
        $cliente_query = "SELECT id_cliente FROM clientes WHERE nombre = '$nombre'";
        $cliente_result = mysqli_query($this->conexion, $cliente_query);
    
        // Verificar si se encontró el cliente
        if(mysqli_num_rows($cliente_result) == 0) {
            $vec = [];
            $vec['resultado'] = 'Error';
            $vec['mensaje'] = 'El cliente especificado no existe';
            return $vec;
        }
    
        // Obtener el ID del cliente
        $cliente_row = mysqli_fetch_assoc($cliente_result);
        $cliente_id = $cliente_row['id_cliente'];
    
        // Obtener el ID de la mascota basado en el nombre proporcionado
        $nombre_mascota = $params->nombre_mascota;
        $mascota_query = "SELECT id_mascota FROM mascotas WHERE nombre_mascota = '$nombre_mascota'";
        $mascota_result = mysqli_query($this->conexion, $mascota_query);
    
        // Verificar si se encontró la mascota
        if(mysqli_num_rows($mascota_result) == 0) {
            $vec = [];
            $vec['resultado'] = 'Error';
            $vec['mensaje'] = 'La mascota especificada no existe';
            return $vec;
        }
    
        // Obtener el ID de la mascota
        $mascota_row = mysqli_fetch_assoc($mascota_result);
        $mascota_id = $mascota_row['id_mascota'];
    
        // Proceder con la actualización de la cita
        $update_query = "UPDATE citas SET id_cliente = '$cliente_id', id_mascota = '$mascota_id', fecha_hora = '$params->fecha_hora', estado = '$params->estado', notas = '$params->notas' WHERE id_cita = $id";
        mysqli_query($this->conexion, $update_query) or die('no actualizo');
        $vec = [];
        $vec['resultado'] = 'OK';
        $vec['mensaje'] = 'Cita actualizada correctamente';
        return $vec;
    }

    public function filtrarPorCliente($nombre){
        $filtro_query = "SELECT citas.*, clientes.nombre, mascotas.nombre_mascota, servicios.nombre_servicio
                        FROM citas 
                        INNER JOIN clientes ON citas.id_cliente = clientes.id_cliente 
                        INNER JOIN mascotas ON citas.id_mascota = mascotas.id_mascota
                        INNER JOIN servicios ON citas.id_servicio = servicios.id_servicio
                        WHERE LOWER(clientes.nombre) LIKE LOWER('%$nombre%')";
        $res = mysqli_query($this->conexion, $filtro_query);
        $vec = [];
    
        while($row = mysqli_fetch_array($res)) {
            $vec[]  = $row;
        }
        return $vec;
    }
}

