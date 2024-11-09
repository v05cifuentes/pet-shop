<?php
class Inventario {
    public $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    public function listarInventario() {
        $con = "SELECT * FROM inventario";
        $res = mysqli_query($this->conexion, $con);
        $vec = [];

        while($row = mysqli_fetch_array($res, MYSQLI_ASSOC)) {
            $vec[]  = $row;
        }
        return $vec;
    }

    public function eliminarProducto($id) {
        $del = "DELETE FROM inventario WHERE id_producto = $id";
        mysqli_query($this->conexion, $del);
        $vec = [];
        $vec['resultado'] = 'OK';
        $vec['mensaje'] = 'Producto eliminado correctamente';
        return $vec;
    }

    public function insertarProducto($parms){
        $insert_query = "INSERT INTO inventario(nombre_producto, descripcion, cantidad_stock, precio_unitario) VALUES ('$parms->nombre_producto', '$parms->descripcion', $parms->cantidad_stock, $parms->precio_unitario)";
        mysqli_query($this->conexion, $insert_query) or die('no inserto');
        $vec = [];
        $vec['resultado'] = 'OK';
        $vec['mensaje'] = 'Producto insertado correctamente';
        return $vec;
    }

    public function editarProducto($id, $params){
        $update_query = "UPDATE inventario SET nombre_producto = '$params->nombre_producto', descripcion = '$params->descripcion', cantidad_stock = $params->cantidad_stock, precio_unitario = $params->precio_unitario WHERE id_producto = $id";
        mysqli_query($this->conexion, $update_query) or die('no actualizo');
        $vec = [];
        $vec['resultado'] = 'OK';
        $vec['mensaje'] = 'Producto actualizado correctamente';
        return $vec;
    }

    public function filtrarPorNombre($data){
        $filtro_query = "SELECT * FROM inventario WHERE nombre_producto LIKE '%$data%'";
        $res = mysqli_query($this->conexion, $filtro_query);
        $vec = [];

        while($row = mysqli_fetch_array($res)) {
            $vec[]  = $row;
        }
        return $vec;
    }
}
?>
