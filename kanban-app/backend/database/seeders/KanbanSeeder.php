<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Column;
use App\Models\Card;

class KanbanSeeder extends Seeder
{
    public function run(): void
    {
        // Columnas típicas
        $todo = Column::create(['name' => 'To Do']);
        $inProgress = Column::create(['name' => 'In Progress']);
        $done = Column::create(['name' => 'Done']);

        // Cards de ejemplo
        Card::create([
            'title' => 'Configurar proyecto',
            'description' => 'Instalar Laravel y React',
            'column_id' => $todo->id
        ]);

        Card::create([
            'title' => 'Diseñar base de datos',
            'description' => 'Crear tablas de columns y cards',
            'column_id' => $inProgress->id
        ]);

        Card::create([
            'title' => 'Deploy inicial',
            'description' => 'Subir a SQLite o servidor de prueba',
            'column_id' => $done->id
        ]);
    }
}
