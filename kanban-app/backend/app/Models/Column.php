<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Column extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'board_id', 'position'];

    /**
     * Relación: Una columna pertenece a un tablero.
     * (Esto es lo que te faltaba añadir)
     */
    public function board(): BelongsTo
    {
        return $this->belongsTo(Board::class);
    }

    /**
     * Relación: Una columna tiene muchas tarjetas.
     */
    public function cards(): HasMany
    {
        return $this->hasMany(Card::class);
    }
}
