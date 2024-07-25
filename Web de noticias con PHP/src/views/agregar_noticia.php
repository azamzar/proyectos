
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/styles.css">
    <title>Formulario de Noticias</title>
    <style>
        body {
            background-color: #344050;
            text-align: center;
            color: #fff;
        }

        .nuevaNoticia {
            background-color: #cfe2ff;
            margin-top: 2%;
            border-radius: 5px !important;
            position: absolute;
            top: 40%;
            left: 50%;
            width: 30%;
            transform: translate(-50%, -50%);
            color: black;
        }

        .button_form,
        .button_form > a {
            background-color: #4CAF50 !important;
            color: white !important;
            border: none !important;
            border-radius: 5px !important;
            cursor: pointer !important;
            padding: 10px 20px !important;
            margin-bottom: 2%;
        }

        .button_form:hover {
            background-color: #45a049 !important;
            color: white !important;
        }
        
        .volver {
            text-align: left;
            position: relative;
            margin: -2% 0 0 2%;
            
        }
    </style>
</head>
<body>
    <div class="header_index_page">
        <p style="position: relative; right: -80%;"><span>Bienvenido/a,
            <?php echo $_SESSION['usuario_nombre']; ?>  
        </span>  
        <a class="button" href="controllers/logout.php">Cerrar sesión</a><p>
        <hr>
    </div>
    <h1>Formulario de Nueva Noticia</h1>
    <form class="nuevaNoticia" action="../controllers/agregar_noticia.php" method="post">
        <label for="titulo">Título:</label><br>
        <input style="width: 85%;" type="text" id="titulo" name="titulo" required><br><br>
        
        <label for="cuerpo">Cuerpo:</label><br>
        <textarea style="padding: 1%;" id="cuerpo" name="cuerpo" rows="10" cols="70" required></textarea><br><br>
        
        <label for="fecha">Fecha:</label><br>
        <input type="date" id="fecha" name="fecha" required><br><br>
        
        <input class="button_form" type="submit" value="Guardar Noticia">
    </form>

    <!-- Botón para volver al listado de noticias -->
    <div class="volver">
        <button class="button_form" type="button"><a href="../index.php">Volver</a></button>
    </div>
</body>
</html>