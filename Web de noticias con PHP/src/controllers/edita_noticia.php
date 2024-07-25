<?php
// Incluir la definición de la clase functions y de datos_conexion
require_once '../models/functions.php';

$functions = new \models\functions();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["cuerpo"]) && isset($_POST["titulo"])
        && isset($_POST["fecha"]) && isset($_POST["id_noticia"])) {
        $cuerpo = $_POST["cuerpo"];
        $titulo = $_POST["titulo"];
        $fecha = $_POST["fecha"];
        $id_noticia = $_POST["id_noticia"];

        // Llamar al método logueaUsuario
        $functions->editaNoticia($cuerpo, $titulo, $fecha, $id_noticia);
    } else {
        echo "Faltan campos por completar.";
    }
}

// Redireccionar al usuario a la página principal
header("Location: ../index.php");
?>