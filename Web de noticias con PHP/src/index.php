<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Periódico Online</title>
    <link rel="stylesheet" href="css/styles.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>

<body>
    <div class="header_index_page">
    <?php if (!isset($_SESSION)) : session_start(); endif; ?>
        <h1 style="text-align:center;">Periódico Online</h1>
        <?php if (!isset($_SESSION['id_usuario'])) {?>
        <form style="text-align:center;" action="controllers/login.php" method="post">
            <input class="col-lg-5" type="email" name="email" placeholder="Email" required>
            <input class="col-lg-5" type="password" name="password" placeholder="Contraseña" required>
            <button class="button_form" type="submit">Iniciar sesión</button>
            <button class="button_form" type="button"><a href="views/registro.html">Registrarse</a></button>
        </form>
        <hr>
    </div>
    <!-- Listado de noticias -->
    <?php include 'controllers/get_noticias_sin_loguear.php'; ?>
    <?php } else { 
        ?>
        <p style="position: relative; right: -80%;"><span>Bienvenido/a,
            <?php echo $_SESSION['usuario_nombre']; ?>  
        </span>  
        <a class="button" href="controllers/logout.php">Cerrar sesión</a><p>
        <hr>
    </div>
    <?php 
        $noticias = $_SESSION['noticias'];
        echo '<!-- Listado de noticias -->
            <div id="contenedorNoticias">
                <h2 style="text-align:left;">Últimas noticias</h2>
                <table class="table table-striped table-default table-responsive">
                <thead>
                    <tr>
                        <th tabindex="0">Titulo</th>
                        <th tabindex="0">Cuerpo</th>
                        <th tabindex="0">Fecha</th>
                        <th></th>
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

                if (isset($noticia['tiene_permiso']) && $noticia['tiene_permiso']) {
                    echo '<td class="button_table">
                        <a style="text-decoration: none !important;"
                            href="views/edita_noticia.php?idEditar= ' . (int)$noticia['id'] . '">Editar</a>
                        <a style="text-decoration: none !important;"
                            href="controllers/borra_noticia.php?id= ' . (int)$noticia['id'] . '">Borrar</a>
                    </td>';
                } else {
                    echo '<td></td>';
                }
                echo '</tr>';
            endforeach;
            echo '</tbody>
                </table>
            </div>';
            ?>
        <div class="button_footer">
            <a href="views/agregar_noticia.php">+ Añadir noticia</a>
        </div>
    <?php } ?>
</body>

</html>