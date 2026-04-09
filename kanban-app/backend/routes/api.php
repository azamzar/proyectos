<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BoardController;
use App\Http\Controllers\Api\ColumnController;
use App\Http\Controllers\Api\CardController;
use App\Http\Controllers\Api\AuthController; // Necesitarás crear este controlador

// ---------------- RUTAS PÚBLICAS ----------------
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// ---------------- RUTAS PROTEGIDAS (Requieren Token) ----------------
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Recursos principales
    Route::apiResource('boards', BoardController::class);
    Route::apiResource('columns', ColumnController::class);
    Route::apiResource('cards', CardController::class);

    // Rutas personalizadas
    Route::post('/cards/reorder', [CardController::class, 'reorder']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
