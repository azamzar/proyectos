<?php
// Incluir la definición de la clase functions y de datos_conexion
require_once '../models/functions.php';

$functions = new \models\functions();

$id_noticia = $_GET['id'];
$functions->eliminaNoticia($id_noticia);

// Redireccionar al usuario a la página principal
header("Location: ../index.php");
?>