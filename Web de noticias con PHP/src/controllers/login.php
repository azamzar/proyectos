<?php
// Incluir la definición de la clase functions y de datos_conexion
require_once '../models/functions.php';
require_once '../models/datos_conexion.php';

session_start();

// Crear una instancia de la clase functions y de datos_conexion
$functions = new \models\functions();
// Verificar si se enviaron datos del formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $_SESSION["login"] = '0';
    
    // Verificar si los campos están presentes
    if (isset($_POST["email"]) && isset($_POST["password"])) {
        $email = $_POST["email"];
        $password = $_POST["password"];

        // Llamar al método logueaUsuario
        $functions->logueaUsuario($email, $password);
    } else {
        echo "Faltan campos por completar.";
    }
}
?>

