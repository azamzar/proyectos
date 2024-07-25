<?php
require_once '../models/datos_conexion.php';
session_start();

$noticias = $_SESSION['noticias'];

$noticiaAMostrar = ['fecha' => '', 'titulo' => '', 'cuerpo' => ''];

$conn = mysqli_connect(HOST, USER, PASSWORD) or die("MySQL Error: " . mysqli_connect_error());
$db = mysqli_select_db($conn, DATABASE) or die("MySQL Error: " . mysqli_connect_error());

foreach ($noticias as $noticia) {
    if ($noticia['id'] == $_GET['id']) {
        $sql = "SELECT * FROM usuario WHERE id = " . $noticia['id_autor'];
        $resultado = mysqli_query($conn, $sql);

        // Verificar si hay resultados
        if (mysqli_num_rows($resultado) > 0) {
            // Obtener todos los resultados
            $usuario = mysqli_fetch_all($resultado, MYSQLI_ASSOC);

            $noticiaAMostrar['autor'] = $usuario[0]['nombre'];
        }

        $noticiaAMostrar['fecha'] = $noticia['fecha'];
        $noticiaAMostrar['cuerpo'] = $noticia['cuerpo'];
        $noticiaAMostrar['titulo'] = $noticia['titulo'];
        
        $_SESSION['noticiaAMostrar'] = $noticiaAMostrar;
    }
}
// Cerrar conexión
$conn->close();

header("Location: ../views/detalle_noticia.php");

?>