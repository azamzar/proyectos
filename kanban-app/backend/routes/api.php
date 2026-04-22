<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BoardController;
use App\Http\Controllers\Api\ColumnController;
use App\Http\Controllers\Api\CardController;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Artisan;

Route::get('/run-migrations', function () {
    // 1. Limpiamos TODA la caché de configuración y rutas
    Artisan::call('config:clear');
    Artisan::call('route:clear');
    Artisan::call('cache:clear');
    
    try {
        // 2. Ejecutamos las migraciones
        Artisan::call('migrate', ['--force' => true]);
        
        return response()->json([
            'status' => 'success',
            'message' => 'Caché limpia y migraciones ejecutadas',
            'output' => Artisan::output()
        ]);
    } catch (\Exception $e) {
        return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
    }
});

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
