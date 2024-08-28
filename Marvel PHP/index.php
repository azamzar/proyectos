<?php
const API_URL = "https://whenisthenextmcufilm.com/api";

// Inicializar cURL
$ch = curl_init(API_URL);

// Configurar opciones de cURL
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Ejecutar la solicitud y obtener la respuesta
$response = curl_exec($ch);

// Verificar si hubo un error en la solicitud
if (curl_errno($ch)) {
    echo 'Error en la solicitud cURL: ' . curl_error($ch);
}

// Cerrar la sesión cURL
curl_close($ch);

// Decodificar la respuesta JSON
$data = json_decode($response, true);

// Verificar si la decodificación fue exitosa
if (json_last_error() !== JSON_ERROR_NONE) {
    echo 'Error al decodificar JSON: ' . json_last_error_msg();
}

?>

<head>
   <meta charset="UTF-8" />
   <title>La próxima película de Marvel</title>
   <link
   rel="stylesheet"
   href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.classless.min.css"
>
</head>


<main>
    <section>
        <img
          src="<?= $data["poster_url"]; ?>" width="300" alt="Poster de <?= $data["title"]?>"
          style="border-radius: 16px" />
</section>

<hgroup>
    <h3><?= $data["title"]; ?> se estrena en <?= $data["days_until"]; ?> días</h3>
    <p>Fecha de estreno: <?= $data["release_date"]; ?></p>
    <p>La siguiente es: <?= $data["following_production"]["title"]; ?></p>
</hgroup>

</main>

    <style>
        :root {
            color-scheme: dark;
        }

        body {
            background-color: #121212; /* Color de fondo oscuro */
            color: #ffffff !important; /* Color de texto blanco */
            display: grid;
            place-content: center;
            margin: 0;
            min-height: 100vh; /* Asegura que el contenido esté centrado verticalmente */
        }

        main {
            text-align: center;
        }

        img {
            border-radius: 16px;
        }

        hgroup, h3, p {
            color: #ffffff !important; /* Asegura que el texto sea blanco */
        }
    </style>