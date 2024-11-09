<?php
class Clientes {
    public $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    public function listarClientes() {
        $con = "SELECT c.*, m.nombre_mascota
                FROM clientes c
                LEFT JOIN mascotas m ON c.id_mascota = m.id_mascota";
        $res = mysqli_query($this->conexion, $con);
        $vec = [];
    
        while($row = mysqli_fetch_array($res, MYSQLI_ASSOC)) {
            $vec[] = $row;
        }
        return $vec;
    }

    public function eliminarCliente($id) {
        $del = "DELETE FROM clientes WHERE id_cliente = $id";
        mysqli_query($this->conexion, $del);
        $vec = [];
        $vec['resultado'] = 'OK';
        $vec['mensaje'] = 'Cliente eliminado correctamente';
        return $vec;
    }

    public function insertarCliente($parms){
        $insert_query = "INSERT INTO clientes(nombre, telefono, email, direccion, notas, id_mascota) 
                         VALUES ('$parms->nombre', '$parms->telefono', '$parms->email', '$parms->direccion', '$parms->notas', '$parms->id_mascota')";
        mysqli_query($this->conexion, $insert_query) or die('no inserto');
        $vec = [];
        $vec['resultado'] = 'OK';
        $vec['mensaje'] = 'Cliente insertado correctamente';
        return $vec;
    }

    public function editarCliente($id, $params){
        $update_query = "UPDATE clientes SET nombre = '$params->nombre', telefono = '$params->telefono', email = '$params->email', direccion = '$params->direccion', notas = '$params->notas' WHERE id_cliente = $id";
        mysqli_query($this->conexion, $update_query) or die('no actualizo');
        $vec = [];
        $vec['resultado'] = 'OK';
        $vec['mensaje'] = 'Cliente actualizado correctamente';
        return $vec;
    }

    public function filtrarPorNombre($data){
        $filtro_query = "SELECT * FROM clientes WHERE nombre LIKE '%$data%'";
        $res = mysqli_query($this->conexion, $filtro_query);
        $vec = [];

        while($row = mysqli_fetch_array($res)) {
            $vec[]  = $row;
        }
        return $vec;
    }
}
