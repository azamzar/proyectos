<?php
// Incluir la definición de la clase functions y de datos_conexion
require_once '../models/functions.php';

$functions = new \models\functions();
// Verificar si se enviaron datos del formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $titulo = $_POST['titulo'];
    $cuerpo = $_POST['cuerpo'];
    $fecha = $_POST['fecha'];

    $functions->guardaNoticia($titulo, $cuerpo, $fecha);

    // Redireccionar al usuario a la página principal
    header("Location: ../index.php");
}
?>