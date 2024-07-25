<?php
namespace models;

require_once '../models/datos_conexion.php';

class functions {
    public function logueaUsuario($email, $password) 
    {
        session_start();
        $conexion = mysqli_connect(HOST, USER, PASSWORD) or die("MySQL Error: " . mysqli_connect_error());
        $db = mysqli_select_db($conexion, DATABASE) or die("MySQL Error: " . mysqli_connect_error());
        // Validar credenciales en la base de datos
        // Aquí debes implementar la lógica para verificar el usuario en la base de datos
        // Consulta la base de datos para verificar si el usuario y la contraseña son válidos
        $sql = "SELECT * FROM usuario WHERE email = ? AND contrasena = ?";
        $query = $conexion->prepare($sql);
        
        if ($query) {
            $query->bind_param('ss', $email, $password);
            $query->execute();
            $result = $query->get_result();
            $user = $result->fetch_assoc();

            if (!empty($user)) {
                // Si las credenciales son válidas, iniciar sesión
                $_SESSION["id_usuario"] = $user['id'];
                $_SESSION["usuario_email"] = $user['email'];
                $_SESSION["usuario_nombre"] = $user['nombre'];
                $_SESSION['noticias'] = [];

                $sql = "SELECT * FROM noticia ORDER BY fecha DESC";
                $resultado = mysqli_query($conexion, $sql);

                // Verificar si hay resultados
                if (mysqli_num_rows($resultado) > 0) {
                    // Obtener todos los resultados
                    $noticias = mysqli_fetch_all($resultado, MYSQLI_ASSOC);

                    $noticiasData = [];

                    if (!empty($noticias)) {
                        foreach ($noticias as $noticia) {
                            $noticia['tiene_permiso'] = false;
                            if ($_SESSION["id_usuario"] == $noticia['id_autor']) {
                                $noticia['tiene_permiso'] = true;
                            }

                            array_push($noticiasData, $noticia);
                        }

                        $_SESSION['noticias'] = $noticiasData;
                    }
                }

                // Redireccionar al usuario a la página principal
                header("Location: ../index.php");
            } else {
                // Manejo del caso en que las credenciales no son válidas
                echo "Credenciales no válidas"; // Esto es solo un ejemplo, puedes manejar el flujo según tu aplicación
            }
        }
    }

    public function guardaNoticia($titulo, $cuerpo, $fecha) 
    {
        session_start();

        // Crear conexión
        $conn = mysqli_connect(HOST, USER, PASSWORD) or die("MySQL Error: " . mysqli_connect_error());
        $db = mysqli_select_db($conn, DATABASE) or die("MySQL Error: " . mysqli_connect_error());

        $id_autor = $_SESSION["id_usuario"];

        // Query de inserción
        $sql = "INSERT INTO noticia (id_autor, titulo, cuerpo, fecha) VALUES ('$id_autor', '$titulo', '$cuerpo', '$fecha')";

        // Ejecutar la inserción
        if ($conn->query($sql) === TRUE) {
            $sql = "SELECT * FROM noticia ORDER BY fecha DESC";
            $resultado = mysqli_query($conn, $sql);

            // Verificar si hay resultados
            if (mysqli_num_rows($resultado) > 0) {
                // Obtener todos los resultados
                $noticias = mysqli_fetch_all($resultado, MYSQLI_ASSOC);

                if (!empty($noticias)) {
                    $noticiasData = [];
                    if (!empty($noticias)) {
                        foreach ($noticias as $noticia) {
                            $noticia['tiene_permiso'] = false;
                            if ($_SESSION["id_usuario"] == $noticia['id_autor']) {
                                $noticia['tiene_permiso'] = true;
                            }

                            array_push($noticiasData, $noticia);
                        }

                        $_SESSION['noticias'] = $noticiasData;
                    }
                } else {
                    $_SESSION['noticias'] = [];
                }

                header("Location: ../index.php");
            } else {
                echo "Error al insertar registro: " . $conn->error;
            }

            // Cerrar conexión
            $conn->close();
        }
    }

    public function eliminaNoticia($id_noticia)
    {
        session_start();

        $conexion = mysqli_connect(HOST, USER, PASSWORD) or die("MySQL Error: " . mysqli_connect_error());
        $db = mysqli_select_db($conexion, DATABASE) or die("MySQL Error: " . mysqli_connect_error());

        $query = "DELETE FROM noticia WHERE id = ?;";
        $statement = $conexion->prepare($query);

        if ($statement) {
            $statement->bind_param('s', $id_noticia);
            $statement->execute();

            $sql = "SELECT * FROM noticia ORDER BY fecha DESC";
            $resultado = mysqli_query($conexion, $sql);

            // Verificar si hay resultados
            if (mysqli_num_rows($resultado) > 0) {
                // Obtener todos los resultados
                $noticias = mysqli_fetch_all($resultado, MYSQLI_ASSOC);

                $noticiasData = [];
                if (!empty($noticias)) {
                    foreach ($noticias as $noticia) {
                        $noticia['tiene_permiso'] = false;
                        if ($_SESSION["id_usuario"] == $noticia['id_autor']) {
                            $noticia['tiene_permiso'] = true;
                        }

                        array_push($noticiasData, $noticia);
                    }

                    $_SESSION['noticias'] = $noticiasData;
                } else {
                    $_SESSION['noticias'] = [];
                }

                header("Location: ../index.php");
            }

            // Redireccionar al usuario a la página de inicio de sesión
            header("Location: ../index.php");
            exit();
        }
    }

    public function editaNoticia($cuerpo, $titulo, $fecha, $id_noticia)
    {
        session_start();

        $conexion = mysqli_connect(HOST, USER, PASSWORD) or die("MySQL Error: " . mysqli_connect_error());
        $db = mysqli_select_db($conexion, DATABASE) or die("MySQL Error: " . mysqli_connect_error());
        
        $query = "UPDATE noticia
            SET cuerpo = ?, titulo = ?, fecha = ?
            WHERE  id = ?;";
        $statement = $conexion->prepare($query);

        if ($statement) {
            $statement->bind_param('ssss', $cuerpo, $titulo, $fecha, $id_noticia);
            $statement->execute();

            $sql = "SELECT * FROM noticia ORDER BY fecha DESC";
            $resultado = mysqli_query($conexion, $sql);

            // Verificar si hay resultados
            if (mysqli_num_rows($resultado) > 0) {
                // Obtener todos los resultados
                $noticias = mysqli_fetch_all($resultado, MYSQLI_ASSOC);

                $noticiasData = [];
                if (!empty($noticias)) {
                    foreach ($noticias as $noticia) {
                        $noticia['tiene_permiso'] = false;
                        if ($_SESSION["id_usuario"] == $noticia['id_autor']) {
                            $noticia['tiene_permiso'] = true;
                        }

                        array_push($noticiasData, $noticia);
                    }

                    $_SESSION['noticias'] = $noticiasData;
                } else {
                    $_SESSION['noticias'] = [];
                }

                header("Location: ../index.php");
            }

            // Redireccionar al usuario a la página de inicio de sesión
            header("Location: ../index.php");
            exit();
        }
    }
}
?>