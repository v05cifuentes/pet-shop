<?php
    class Mascotas {
        public $conexion;

        public function __construct($conexion) {
            $this->conexion = $conexion;
        }

        public function listarMascotas() {
            $con ="SELECT * FROM mascotas";
            $res = mysqli_query($this->conexion, $con);
            $vec = [];

            while($row = mysqli_fetch_array($res, MYSQLI_ASSOC)) {
                $vec[]  = $row;
            }
            return $vec;
        }

        public function eliminarMascota($id) {
            $del = "DELETE FROM mascotas WHERE id_mascota = $id";
            mysqli_query($this->conexion, $del);
            $vec = [];
            $vec['resultado'] = 'OK';
            $vec['mensaje'] = 'Mascota eliminada correctamente';
            return $vec;
        }

        public function insertarMascota($parms){
            $insert_query = "INSERT INTO mascotas(nombre_mascota, raza, edad, genero, notas, foto) VALUES ('$parms->nombre_mascota', '$parms->raza', $parms->edad, '$parms->genero', '$parms->notas', '$parms->foto')";
            mysqli_query($this->conexion, $insert_query) or die('no inserto');
            $vec = [];
            $vec['resultado'] = 'OK';
            $vec['mensaje'] = 'Mascota insertada correctamente';
            return $vec;
        }

        public function editarMascota($id, $params){
            $update_query = "UPDATE mascotas SET nombre_mascota = '$params->nombre_mascota', raza = '$params->raza', edad = $params->edad, genero = '$params->genero', notas = '$params->notas', foto = '$params->foto' WHERE id_mascota = $id";
            mysqli_query($this->conexion, $update_query) or die('no actualizo');
            $vec = [];
            $vec['resultado'] = 'OK';
            $vec['mensaje'] = 'Mascota actualizada correctamente';
            return $vec;
        }

        public function filtrarPorNombre($data){
            $filtro_query = "SELECT * FROM mascotas WHERE nombre_mascota LIKE '%$data%'";
            $res = mysqli_query($this->conexion, $filtro_query);
            $vec = [];

            while($row = mysqli_fetch_array($res)) {
                $vec[]  = $row;
            }
            return $vec;
        }
    }

