<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Column;
use Illuminate\Http\Request;
use App\Models\Board;

class ColumnController extends Controller
{
    public function index()
    {
        // ✅ CORRECCIÓN: Solo columnas que pertenecen al tablero del usuario logueado
        return Column::whereHas('board', function($query) {
            $query->where('user_id', auth()->id());
        })->orderBy('id', 'asc')->get();
    }

    // ✅ GUARDAR NUEVA COLUMNA
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        // 1. Intentar encontrar el tablero del usuario
        $board = Board::where('user_id', auth()->id())->first();

        // 2. 🚨 SOLUCIÓN PRO: Si no tiene tablero (usuario antiguo), se lo creamos ahora
        if (!$board) {
            $board = Board::create([
                'name' => 'Mi Tablero',
                'user_id' => auth()->id()
            ]);
        }

        // 3. Crear la columna asociada a ese ID
        try {
            $column = Column::create([
                'name' => $request->name,
                'board_id' => $board->id,
            ]);

            return response()->json($column, 201);
        } catch (\Exception $e) {
            // Esto te ayudará a ver en los logs si hay un error de base de datos
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // ✅ ACTUALIZAR NOMBRE
    public function update(Request $request, $id)
    {
        $column = Column::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $column->name = $request->name;
        $column->save();

        return response()->json($column);
    }

    // ✅ ELIMINAR COLUMNA
    public function destroy($id)
    {
        $column = Column::findOrFail($id);
        $column->delete();

        return response()->json(null, 204);
    }
}
