<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Board extends Model
{
    use HasFactory;

    // 🆕 ESTA ES LA LÍNEA CLAVE: Permite guardar estos campos mediante create()
    protected $fillable = ['name', 'user_id'];

    /**
     * Relación: Un tablero pertenece a un usuario.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relación: Un tablero tiene muchas columnas.
     */
    public function columns(): HasMany
    {
        return $this->hasMany(Column::class);
    }
}
