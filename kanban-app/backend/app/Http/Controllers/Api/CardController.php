<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Card;
use Illuminate\Http\Request;

class CardController extends Controller
{
    public function index()
    {
        // Solo devolver las cards de las columnas visibles (1,2,3)
        $cards = Card::whereIn('column_id', [1,2,3])
                    ->orderBy('column_id')
                    ->orderBy('position')
                    ->get();

        return response()->json($cards);
    }
    public function store(Request $request)
    {
        $columnId = $request->column_id;
        if (!in_array($columnId, [1,2,3])) {
            return response()->json(['error' => 'Columna inválida'], 400);
        }

        $position = Card::where('column_id', $columnId)->max('position') + 1;

        $card = Card::create([
            'title' => $request->title,
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

        // Si la card cambia de columna, ajustamos ambas columnas
        if ($card->column_id != $newColumnId) {
            // Reducir posición de cards en columna origen
            Card::where('column_id', $card->column_id)
                ->where('position', '>', $card->position)
                ->decrement('position');

            // Incrementar posición de cards en columna destino
            Card::where('column_id', $newColumnId)
                ->where('position', '>=', $newPosition)
                ->increment('position');

            $card->column_id = $newColumnId;
            $card->position = $newPosition;
            $card->save();
        } else {
            // Mismo columna: mover verticalmente
            if ($newPosition > $card->position) {
                // Mover hacia abajo
                Card::where('column_id', $card->column_id)
                    ->whereBetween('position', [$card->position + 1, $newPosition])
                    ->decrement('position');
            } elseif ($newPosition < $card->position) {
                // Mover hacia arriba
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
