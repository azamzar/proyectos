<?php
    require_once 'models/datos_conexion.php';

    // Crear conexión
    $conn = mysqli_connect(HOST, USER, PASSWORD) or die("MySQL Error: " . mysqli_connect_error());
    $db = mysqli_select_db($conn, DATABASE) or die("MySQL Error: " . mysqli_connect_error());

    $sql = "SELECT * FROM noticia ORDER BY fecha DESC";
    $resultado = mysqli_query($conn, $sql);

    // Verificar si hay resultados
    if (mysqli_num_rows($resultado) > 0) {
        // Obtener todos los resultados
        $noticias = mysqli_fetch_all($resultado, MYSQLI_ASSOC);
        
        $_SESSION['noticias'] = $noticias;

        echo '<!-- Listado de noticias -->
        <div id="contenedorNoticias">
            <h2 style="text-align:left;">Últimas noticias</h2>
            <table class="table table-striped table-default table-responsive">
            <thead>
                <tr>
                    <th tabindex="0">Titulo</th>
                    <th tabindex="0">Cuerpo</th>
                    <th tabindex="0">Fecha</th>
                </tr>
            </thead>
            <tbody>';
        foreach ($noticias as $noticia):
            echo '<tr>
            <td>
                <a style="color: #555555 !important; text-decoration: none !important;"
                href="controllers/get_detalle_noticia.php?id= ' . (int)$noticia['id'] . '">' . $noticia['titulo'] . '</a>
            </td>
            <td>
                <a style="color: #555555 !important; text-decoration: none !important;"
                href="controllers/get_detalle_noticia.php?id= ' . (int)$noticia['id'] . '">' . $noticia['cuerpo'] . '</a>
            </td>
            <td>
                <a style="color: #555555 !important; text-decoration: none !important;"
                    href="controllers/get_detalle_noticia.php?id= ' . (int)$noticia['id'] . '">' . $noticia['fecha'] . '</a>
            </td>';

            echo '</tr>';
        endforeach;
        echo '</tbody>
            </table>
        </div>';
    } else {
        echo "No hay noticias! Logueate y empieza a crearlas.";
    }

    // Cerrar conexión
    $conn->close();
?>