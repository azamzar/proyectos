<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Board;
use App\Models\Column;
use App\Models\Card;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // 1️⃣ Crear usuario de prueba si no existe
        $user = User::first();
        if (!$user) {
            $user = User::create([
                'name' => 'Usuario Prueba',
                'email' => 'test@example.com',
                'password' => bcrypt('password')
            ]);
        }

        // 2️⃣ Crear board de prueba si no existe
        $board = Board::first();
        if (!$board) {
            $board = Board::create([
                'name' => 'Mi primer board',
                'user_id' => $user->id
            ]);
        }

        // 3️⃣ Crear columna de prueba si no existe
        $column = Column::first();
        if (!$column) {
            $column = Column::create([
                'name' => 'To Do',
                'board_id' => $board->id
            ]);
        }

        // 4️⃣ Crear card de prueba si no existe
        $card = Card::first();
        if (!$card) {
            Card::create([
                'title' => 'Tarea inicial',
                'description' => 'Descripción de prueba',
                'column_id' => $column->id,
                'position' => 1
            ]);
        }

        // ✅ Mensaje de seed completado
        $this->command->info('Database seeded: usuario, board, columna y card creados');
    }
}
