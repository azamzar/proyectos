<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
// 1. FALTA ESTA IMPORTACIÓN (Fundamental para el tipo de retorno)
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        // 'user_id', <--- 2. ELIMINA ESTO. El usuario no tiene un user_id dentro de sí mismo.
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // Ahora PHP sabrá qué es "HasMany" gracias al import de arriba
    public function boards(): HasMany
    {
        return $this->hasMany(Board::class);
    }
}
