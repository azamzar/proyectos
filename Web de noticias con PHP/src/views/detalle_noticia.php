<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detalle de la Noticia</title>
    <link rel="stylesheet" href="css/styles.css">
    <style>
        body {
            background-color: #344050;
            text-align: center;
            color: #fff;
        }

        .article_principal {
            background-color: #fff;
            margin-top: 2%;
            border-radius: 5px !important;
            position: absolute;
            top: 25%;
            left: 50%;
            width: 70%;
            transform: translate(-50%, -50%);
            padding: 2%;
            text-align: justify;
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
    <?php session_start();?>
    <div class="header_index_page">
        <p style="position: relative; right: -80%;"><span>Bienvenido/a,
            <?php echo $_SESSION['usuario_nombre']; ?>  
        </span>  
        <a class="button" href="controllers/logout.php">Cerrar sesión</a><p>
        <hr>
    </div>
    <h1>Detalle de la Noticia</h1>
    <!-- Detalle de la noticia -->
    <article class="article_principal">
        <h1><?php echo $_SESSION['noticiaAMostrar']['titulo'];?></h1>
        <p>Fecha: <span><?php echo $_SESSION['noticiaAMostrar']['fecha'];?></span></p>
        <p>Autor: <span><?php echo $_SESSION['noticiaAMostrar']['autor'];?></span></p>
        <p><?php echo $_SESSION['noticiaAMostrar']['cuerpo'];?></p>
    </article>
    <!-- Botón para volver al listado de noticias -->
    <div class="volver">
        <button class="button_form" type="button"><a href="../index.php">Volver</a></button>
    </div>
</body>
</html>
