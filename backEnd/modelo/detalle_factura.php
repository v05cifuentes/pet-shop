<?php

    class DetallesFactura {
        public $conexion;

        public function __construct($conexion) {
            $this->conexion = $conexion;
        }

        public function listarDetallesFactura($id_factura) {
            $consulta = "SELECT * FROM detalles_factura WHERE id_factura = $id_factura";
            $resultado = mysqli_query($this->conexion, $consulta);
            $detalles = [];

            while($row = mysqli_fetch_array($resultado, MYSQLI_ASSOC)) {
                $detalles[] = $row;
            }

            return $detalles;
        }

        public function agregarDetalle($detalle) {
            $id_factura = $detalle->id_factura;
            $tipo_elemento = $detalle->tipo_elemento;
            $id_producto = $detalle->id_producto;
            $id_servicio = $detalle->id_servicio;
            $cantidad = $detalle->cantidad;
            $precio_unitario = $detalle->precio_unitario;
        
            $insertar_query = "INSERT INTO detalles_factura(id_factura, tipo_elemento, id_producto, id_servicio, cantidad, precio_unitario, estado) VALUES ($id_factura, '$tipo_elemento', $id_producto, $id_servicio, $cantidad, $precio_unitario, 'Activa')";
            mysqli_query($this->conexion, $insertar_query) or die('Error al insertar detalle de factura');
        
            $resultado = [];
            $resultado['resultado'] = 'OK';
            $resultado['mensaje'] = 'Detalle de factura insertado correctamente';
        
            return $resultado;
        }

        public function editarDetalle($id_detalle, $detalle_actualizado) {
            $id_factura = $detalle_actualizado->id_factura;
            $tipo_elemento = $detalle_actualizado->tipo_elemento;
            $id_producto = $detalle_actualizado->id_producto;
            $id_servicio = $detalle_actualizado->id_servicio;
            $cantidad = $detalle_actualizado->cantidad;
            $precio_unitario = $detalle_actualizado->precio_unitario;
    
            $update_query = "UPDATE detalles_factura SET id_factura = $id_factura, tipo_elemento = '$tipo_elemento', id_producto = $id_producto, id_servicio = $id_servicio, cantidad = $cantidad, precio_unitario = $precio_unitario WHERE id_detalle = $id_detalle";
            mysqli_query($this->conexion, $update_query) or die('Error al actualizar detalle de factura');
    
            $resultado = [];
            $resultado['resultado'] = 'OK';
            $resultado['mensaje'] = 'Detalle de factura actualizado correctamente';
    
            return $resultado;
        }
        
        public function anularDetalle($id_detalle) {
            $update_query = "UPDATE detalles_factura SET estado = 'Anulada' WHERE id_detalle = $id_detalle";
            mysqli_query($this->conexion, $update_query) or die('Error al anular detalle de factura');
    
            $resultado = [];
            $resultado['resultado'] = 'OK';
            $resultado['mensaje'] = 'Detalle de factura anulado correctamente';
    
            return $resultado;
        }
    
        public function activarDetalle($id_detalle) {
            $update_query = "UPDATE detalles_factura SET estado = 'Activa' WHERE id_detalle = $id_detalle";
            mysqli_query($this->conexion, $update_query) or die('Error al activar detalle de factura');
    
            $resultado = [];
            $resultado['resultado'] = 'OK';
            $resultado['mensaje'] = 'Detalle de factura activado correctamente';
    
            return $resultado;
        }
    
        // Método para filtrar detalles de factura por estado (Activa o Anulada)
        public function filtrarPorEstado($estado) {
            $filtro_query = "SELECT * FROM detalles_factura WHERE estado = '$estado'";
            $resultado = mysqli_query($this->conexion, $filtro_query);
            $detalles = [];
    
            while($row = mysqli_fetch_array($resultado, MYSQLI_ASSOC)) {
                $detalles[] = $row;
            }
    
            return $detalles;
        }
        

        
    }
