<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Board;

class BoardController extends Controller
{
    public function index(Request $request)
    {
        try {
            $boards = $request->user()->boards()->get();
            return response()->json($boards);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al obtener boards',
                'detalle' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        // 1. Validar
        $request->validate(['name' => 'required|string|max:255']);

        // 2. Crear
        $board = $request->user()->boards()->create([
            'name' => $request->name
        ]);

        // 3. RETORNO SIMPLIFICADO: Si esto funciona, el problema es el objeto $board completo.
        return response()->json([
            'id' => $board->id,
            'name' => $board->name
        ]);
    }

    public function show(Request $request, $id)
    {
        try {
            $board = $request->user()->boards()->find($id);
            if (!$board) {
                return response()->json(['error' => 'Board no encontrado'], 404);
            }
            return response()->json($board);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al obtener board',
                'detalle' => $e->getMessage()
            ], 500);
        }
    }
}
