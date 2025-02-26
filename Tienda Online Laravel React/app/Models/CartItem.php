<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    use HasFactory;

    // Aquí puedes especificar los campos que se pueden asignar masivamente
    protected $fillable = [
        'user_id',
        'product_id',
        'quantity',
    ];

    // Definir la relación con el modelo User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Definir la relación con el modelo Product (si existe)
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
