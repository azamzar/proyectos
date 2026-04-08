<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BoardController;
use App\Http\Controllers\Api\ColumnController;
use App\Http\Controllers\Api\CardController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::get('/test', function () {
    return response()->json(['ok' => true]);
});

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/me', [AuthController::class, 'me']);

    // 🧩 BOARDS
    Route::get('/boards', [BoardController::class, 'index']);
    Route::post('/boards', [BoardController::class, 'store']);

    // 📦 COLUMNS (por board)
    Route::get('/boards/{board}/columns', [ColumnController::class, 'index']);
    Route::post('/boards/{board}/columns', [ColumnController::class, 'store']);
    Route::put('/columns/{id}', [ColumnController::class, 'update']);

    // 🃏 CARDS (por board)
    Route::get('/boards/{board}/cards', [CardController::class, 'index']);
    Route::post('/cards', [CardController::class, 'store']);
    Route::post('/cards/reorder', [CardController::class, 'reorder']);
    Route::put('/cards/{id}', [CardController::class, 'update']);
});

