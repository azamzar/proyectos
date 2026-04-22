<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BoardController;
use App\Http\Controllers\Api\ColumnController;
use App\Http\Controllers\Api\CardController;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Artisan;

Route::get('/run-migrations', function () {
    // Limpiamos caché de rutas y configuración antes de migrar
    Artisan::call('route:clear');
    Artisan::call('config:clear');
    
    try {
        $output = Artisan::call('migrate', ['--force' => true]);
        return response()->json([
            'message' => 'Migraciones ejecutadas', 
            'output' => Artisan::output()
        ]);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
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
