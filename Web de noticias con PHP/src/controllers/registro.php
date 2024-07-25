<?php
// Incluir archivo de conexión a la base de datos
require_once '../models/datos_conexion.php';

// Verificar si se enviaron datos del formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $conexion = mysqli_connect(HOST, USER, PASSWORD) or die("MySQL Error: " . mysqli_connect_error());
    $db = mysqli_select_db($conexion, DATABASE) or die("MySQL Error: " . mysqli_connect_error());
    // Verificar si los campos están presentes
    if (isset($_POST["email"]) && isset($_POST["nombre"]) && isset($_POST["password"])) {
        $email = $_POST["email"];
        $nombre = $_POST["nombre"];
        $password = $_POST["password"];

        // Verificar si el usuario ya existe
        $sql = "SELECT COUNT(*) AS total FROM usuario WHERE email = ?";
        $statement = $conexion->prepare($sql);
        
        if ($statement) {
            $statement->bind_param('s', $email);
            $statement->execute();
            $result = $statement->get_result();
            $row = $result->fetch_assoc();

            if ($row['total'] > 0) {
                echo "El usuario ya existe.";
            } else {
                // Insertar nuevo usuario en la base de datos usando MySQLi
                $sql = "INSERT INTO usuario (email, nombre, contrasena) VALUES (?, ?, ?)";
                $statement = $conexion->prepare($sql);

                if ($statement) {
                    $statement->bind_param('sss', $email, $nombre, $password);
                    $statement->execute();

                    // Redireccionar al usuario a la página de inicio de sesión
                    header("Location: ../index.php");
                    exit();
                } else {
                    echo "Error en la preparación de la consulta.";
                }
            }
        } else {
            echo "Error en la preparación de la consulta.";
        }
    } else {
        echo "Faltan campos por completar.";
    }
}
?>