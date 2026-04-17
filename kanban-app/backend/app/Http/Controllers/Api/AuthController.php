<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Board; // 🆕 Importante
use App\Models\Column; // 🆕 Importante
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB; // Para transacciones

class AuthController extends Controller
{
    public function register(Request $request) {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed|min:8'
        ]);

        // Usamos una transacción para asegurar que si falla la creación del board,
        // no se cree el usuario a medias.
        return DB::transaction(function () use ($data) {

            // 1. Crear el usuario
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
            ]);

            // 2. Crear su tablero personal único
            $board = Board::create([
                'name' => 'Mi Tablero Principal',
                'user_id' => $user->id,
            ]);

            // 3. Crear columnas por defecto para que no entre a una app vacía
            // Esto mejora mucho la "Profesionalidad" y el Onboarding
            $defaultColumns = ['To Do', 'En progreso', 'Hecho'];
            foreach ($defaultColumns as $name) {
                Column::create([
                    'name' => $name,
                    'board_id' => $board->id,
                ]);
            }

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'user' => $user,
                'token' => $token,
                'message' => 'Usuario y tablero inicializados correctamente'
            ], 201);
        });
    }

    public function login(Request $request) {
        $data = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $data['email'])->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response()->json(['message' => 'Credenciales inválidas'], 401);
        }

        // Opcional: Borrar tokens antiguos para que solo haya una sesión activa
        $user->tokens()->delete();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(Request $request) {
        // Revocar el token que se está usando
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Sesión cerrada correctamente']);
    }
}
