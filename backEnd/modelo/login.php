<?php
class Login {
    public $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    public function consulta($email, $clave) {
        $con = "SELECT * FROM users WHERE email = '$email' AND clave = sha1('$clave')";
        $res = mysqli_query($this->conexion, $con);
        $vec = [];

        while($row = mysqli_fetch_array($res, MYSQLI_ASSOC)) {
            $vec[]  = $row;
        }

        if($vec == []){
            $vec[0] = array("validar"=>"no valida");
        }else{
            $vec[0]['validar']="valida";
        }

        return $vec;
    }
}