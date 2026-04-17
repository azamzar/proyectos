<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Card;
use App\Models\Column; // Importante añadir esto para validar
use Illuminate\Http\Request;

class CardController extends Controller
{
    public function index()
    {
        // ✅ CORREGIDO: Devolver todas las cards ordenadas por posición
        $cards = Card::orderBy('column_id')
                    ->orderBy('position')
                    ->get();

        return response()->json($cards);
    }

    public function store(Request $request)
    {
        // ✅ CORREGIDO: Validar que la columna existe en la base de datos,
        // en lugar de usar una lista fija [1,2,3]
        $request->validate([
            'title' => 'required|string|max:255',
            'column_id' => 'required|exists:columns,id',
            'description' => 'nullable|string'
        ]);

        $columnId = $request->column_id;

        // Calculamos la posición: si no hay cards, empezamos en 0
        $maxPosition = Card::where('column_id', $columnId)->max('position');
        $position = is_null($maxPosition) ? 0 : $maxPosition + 1;

        $card = Card::create([
            'title' => $request->title,
            'description' => $request->description,
            'column_id' => $columnId,
            'position' => $position,
        ]);

        return response()->json($card);
    }

    public function reorder(Request $request)
    {
        $card = Card::findOrFail($request->card_id);
        $newColumnId = $request->new_column_id;
        $newPosition = $request->new_position;

        if ($card->column_id != $newColumnId) {
            // Ajuste en columna origen
            Card::where('column_id', $card->column_id)
                ->where('position', '>', $card->position)
                ->decrement('position');

            // Ajuste en columna destino
            Card::where('column_id', $newColumnId)
                ->where('position', '>=', $newPosition)
                ->increment('position');

            $card->column_id = $newColumnId;
            $card->position = $newPosition;
            $card->save();
        } else {
            if ($newPosition > $card->position) {
                Card::where('column_id', $card->column_id)
                    ->whereBetween('position', [$card->position + 1, $newPosition])
                    ->decrement('position');
            } elseif ($newPosition < $card->position) {
                Card::where('column_id', $card->column_id)
                    ->whereBetween('position', [$newPosition, $card->position - 1])
                    ->increment('position');
            }

            $card->position = $newPosition;
            $card->save();
        }

        return response()->json($card);
    }

    public function update(Request $request, $id)
    {
        $card = Card::findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $card->update($request->only('title', 'description'));

        return response()->json($card);
    }
}
