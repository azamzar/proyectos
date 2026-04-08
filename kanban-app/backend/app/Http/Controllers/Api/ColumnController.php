<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Column;
use App\Models\Board;
use Illuminate\Http\Request;

class ColumnController extends Controller
{
    public function index(Request $request, $boardId)
    {
        return response()->json(['ok' => true]);
    }

    public function store(Request $request, $boardId)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255'
            ]);

            $board = $request->user()->boards()->find($boardId);
            if (!$board) {
                return response()->json(['error'=>'Board no encontrado o no autorizado'], 404);
            }

            $column = $board->columns()->create([
                'name' => $request->name
            ]);

            return response()->json($column);
        } catch (\Exception $e) {
            return response()->json(['error'=>'Error al crear columna','detalle'=>$e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
            ]);

            $column = Column::where('id', $id)
                ->whereHas('board', function ($query) use ($request) {
                    $query->where('user_id', $request->user()->id);
                })
                ->first();

            if (!$column) {
                return response()->json(['error'=>'Columna no encontrada o no autorizada'], 404);
            }

            $column->update([
                'name' => $request->name
            ]);

            return response()->json($column);
        } catch (\Exception $e) {
            return response()->json(['error'=>'Error al actualizar columna','detalle'=>$e->getMessage()], 500);
        }
    }
}
