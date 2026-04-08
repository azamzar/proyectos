<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Card;
use App\Models\Column;
use Illuminate\Http\Request;

class CardController extends Controller
{
    public function index(Request $request, $boardId)
    {
        try {
            $cards = Card::whereHas('column.board', function ($query) use ($boardId, $request) {
                $query->where('id', $boardId)
                    ->where('user_id', $request->user()->id);
            })->get();

            return response()->json($cards);
        } catch (\Exception $e) {
            return response()->json(['error'=>'Error al obtener cards','detalle'=>$e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'title' => 'required|string|max:255',
                'column_id' => 'required|integer'
            ]);

            $column = Column::where('id', $request->column_id)
            ->whereHas('board', function ($query) use ($request) {
                $query->where('user_id', $request->user()->id);
            })
            ->first();

            if (!$column) {
                return response()->json(['error'=>'Columna no encontrada o no autorizada'], 404);
            }

            $position = Card::where('column_id', $column->id)->max('position');
            $position = $position ? $position + 1 : 1;

            $card = Card::create([
                'title' => $request->title,
                'column_id' => $column->id,
                'position' => $position
            ]);

            return response()->json($card);
        } catch (\Exception $e) {
            return response()->json(['error'=>'Error al crear card','detalle'=>$e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string'
            ]);

            $card = Card::where('id', $id)
                ->whereHas('column', function ($query) use ($request) {
                    $query->where('user_id', $request->user()->id);
                })
                ->first();

            if (!$card) {
                return response()->json(['error'=>'Card no encontrada o no autorizada'], 404);
            }

            $card->update($request->only('title', 'description'));

            return response()->json($card);
        } catch (\Exception $e) {
            return response()->json(['error'=>'Error al actualizar card','detalle'=>$e->getMessage()], 500);
        }
    }

    public function reorder(Request $request)
    {
        try {
            $request->validate([
                'card_id' => 'required|integer',
                'new_column_id' => 'required|integer',
                'new_position' => 'required|integer'
            ]);

            $card = Card::where('id', $request->card_id)
                ->whereHas('column', function ($query) use ($request) {
                    $query->where('user_id', $request->user()->id);
                })
                ->first();

            if (!$card) {
                return response()->json(['error'=>'Card no encontrada o no autorizada'], 404);
            }

            $newColumnId = $request->new_column_id;
            $newPosition = $request->new_position;

            // Reordenamiento seguro
            if ($card->column_id != $newColumnId) {
                Card::where('column_id', $card->column_id)
                    ->where('position', '>', $card->position)
                    ->decrement('position');

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
        } catch (\Exception $e) {
            return response()->json(['error'=>'Error al reordenar card','detalle'=>$e->getMessage()], 500);
        }
    }
}
