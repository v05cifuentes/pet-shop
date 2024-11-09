<?php
class Facturas {
    public $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    public function listarFacturas() {
        $con = "SELECT f.*, c.nombre
                FROM facturas f
                JOIN clientes c ON f.id_cliente = c.id_cliente";
        $res = mysqli_query($this->conexion, $con);
        $vec = [];

        while($row = mysqli_fetch_array($res, MYSQLI_ASSOC)) {
            $vec[]  = $row;
        }
        return $vec;
    }

    public function eliminarFactura($id) {
        $del = "DELETE FROM facturas WHERE id_factura = $id";
        mysqli_query($this->conexion, $del);
        $vec = [];
        $vec['resultado'] = 'OK';
        $vec['mensaje'] = 'Factura eliminada correctamente';
        return $vec;
    }

    public function insertarFactura($parms){
        $insert_query = "INSERT INTO facturas(id_cliente, fecha_emision, total, estado_pago) VALUES ($parms->id_cliente, '$parms->fecha_emision', $parms->total, '$parms->estado_pago')";
        mysqli_query($this->conexion, $insert_query) or die('no inserto');
        $vec = [];
        $vec['resultado'] = 'OK';
        $vec['mensaje'] = 'Factura insertada correctamente';
        return $vec;
    }

    public function editarFactura($id, $params){
        $update_query = "UPDATE facturas SET id_cliente = $params->id_cliente, fecha_emision = '$params->fecha_emision', total = $params->total, estado_pago = '$params->estado_pago' WHERE id_factura = $id";
        mysqli_query($this->conexion, $update_query) or die('no actualizo');
        $vec = [];
        $vec['resultado'] = 'OK';
        $vec['mensaje'] = 'Factura actualizada correctamente';
        return $vec;
    }

    public function filtrarPorCliente($data){
        $filtro_query = "SELECT * FROM facturas WHERE id_cliente LIKE '%$data%'";
        $res = mysqli_query($this->conexion, $filtro_query);
        $vec = [];

        while($row = mysqli_fetch_array($res)) {
            $vec[]  = $row;
        }
        return $vec;
    }
}

