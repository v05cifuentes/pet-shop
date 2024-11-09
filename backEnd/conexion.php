<?php
/*Datos de conexion a la base de datos*/
    $servidor = "localhost";
    $usuario = "root";
    $clave = "";
    $bd = "pet_shop";

    $conexion = mysqli_connect($servidor, $usuario, $clave, $bd) or die("No encontró la base de datos");
    mysqli_select_db($conexion, $bd) or die("No encontró la base de datos");
    mysqli_set_charset($conexion, "utf8");