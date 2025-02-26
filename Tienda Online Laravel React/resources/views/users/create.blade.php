<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crear Usuario</title>
</head>
<body>

    <h1>Crear Usuario</h1>

    <!-- Mostrar errores de validación -->
    @if ($errors->any())
        <div>
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <!-- Formulario de creación de usuario -->
    <form action="{{ route('users.store') }}" method="POST">
        @csrf <!-- Token CSRF para protección de formularios -->

        <div>
            <label for="name">Nombre:</label>
            <input type="text" id="name" name="name" value="{{ old('name') }}">
        </div>

        <div>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" value="{{ old('email') }}">
        </div>

        <div>
            <label for="password">Contraseña:</label>
            <input type="password" id="password" name="password">
        </div>

        <div>
            <label for="password_confirmation">Confirmar Contraseña:</label>
            <input type="password" id="password_confirmation" name="password_confirmation">
        </div>

        <button type="submit">Crear Usuario</button>
    </form>

</body>
</html>
