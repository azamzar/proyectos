<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Column;
use Illuminate\Http\Request;

class ColumnController extends Controller
{
    // ✅ DEVOLVER SOLO COLUMNAS
    public function index()
    {
        return Column::whereIn('id', [1,2,3])->get();
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
}
