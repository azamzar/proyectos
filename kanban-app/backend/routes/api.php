<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BoardController;
use App\Http\Controllers\Api\ColumnController;
use App\Http\Controllers\Api\CardController;

Route::get('/cards', [CardController::class, 'index']);
Route::post('/cards', [CardController::class, 'store']);
Route::post('/cards/reorder', [CardController::class, 'reorder']);

Route::get('/columns', [ColumnController::class, 'index']);
Route::post('/columns', [ColumnController::class, 'store']);

Route::put('/columns/{id}', [ColumnController::class, 'update']);
Route::put('/cards/{id}', [CardController::class, 'update']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('boards', BoardController::class);
Route::apiResource('columns', ColumnController::class);
Route::apiResource('cards', CardController::class);


