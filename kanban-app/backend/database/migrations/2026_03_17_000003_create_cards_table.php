<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cards', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // título de la card
            $table->text('description')->nullable(); // opcional
            $table->foreignId('column_id')
                  ->constrained('columns')
                  ->cascadeOnDelete(); // referencia a la columna
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cards');
    }
};
