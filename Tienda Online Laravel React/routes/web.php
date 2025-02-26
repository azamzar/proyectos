<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\ShoppingCartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

// Rutas públicas
Route::get('/store', [StoreController::class, 'index'])->name('store.index');
Route::get('/store/{id}', [StoreController::class, 'show'])->name('store.show');
Route::get('/category/{category}', [CategoryController::class, 'show'])->name('category.show');
Route::get('/categories/{id}', [CategoryController::class, 'show'])->name('categories.show');
Route::get('/categories', [StoreController::class, 'categories'])->name('store.categories');
Route::get('/products/{id}', [StoreController::class, 'show'])->name('products.show');
Route::get('/contact', [StoreController::class, 'contact'])->name('store.contact');
Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');

// Rutas del footer
Route::get('/about-us', function () {
    return Inertia::render('AboutUs');
})->name('about-us');

Route::get('/register', function () {
    return Inertia::render('Register');
})->name('register');

Route::get('/contact', function () {
    return Inertia::render('Store/Contact');
})->name('store.contact');

Route::get('/returns', function () {
    return Inertia::render('Returns');
})->name('returns');

Route::get('/terms', function () {
    return Inertia::render('Terms');
})->name('terms');

Route::get('/privacy-policy', function () {
    return Inertia::render('PrivacyPolicy');
})->name('privacy-policy');

Route::get('/cookies-policy', function () {
    return Inertia::render('CookiesPolicy');
})->name('cookies-policy');

// Página principal
Route::get('/', function () {
    return Inertia::location('/store', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Ruta común para todos los usuarios autenticados
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Proteger rutas según el rol
Route::middleware(['auth'])->group(function () {

    // Rutas accesibles solo para administradores
    Route::middleware(['role:admin'])->group(function () {

        // Gestión de productos (solo para administradores)
        Route::resource('admin/products', AdminProductController::class);
        Route::get('admin/products/create', [AdminProductController::class, 'create'])->name('products.create');
        Route::get('admin/products/{product}/edit', [AdminProductController::class, 'edit'])->name('products.edit');
        Route::delete('admin/products/{product}', [AdminProductController::class, 'destroy'])->name('products.destroy');

        // Rutas de gestión de usuarios (solo administradores)
        Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
        Route::post('/users', [UserController::class, 'store'])->name('users.store');
    });

    Route::middleware('role:user')->group(function () {

        // Rutas de carrito de compras (para usuarios normales)
        Route::get('cart', [ShoppingCartController::class, 'index'])->name('cart.index');
        Route::post('cart/store', [ShoppingCartController::class, 'store'])->name('cart.store');
        Route::delete('cart/{product}', [ShoppingCartController::class, 'destroy'])->name('cart.destroy');
        Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
        Route::post('/cart/updateQuantity', [CartController::class, 'updateQuantity'])->name('cart.updateQuantity');

        // Rutas de pedidos (usuarios normales)
        Route::get('orders', [OrderController::class, 'index'])->name('orders.index');
        Route::post('orders/store', [OrderController::class, 'store'])->name('orders.store');
    });

    // Rutas comunes para todos los roles (usuarios y administradores)
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::post('/cart/store', [CartController::class, 'store'])->name('cart.store');
    Route::post('/cart/remove', [CartController::class, 'remove'])->name('cart.remove');
    Route::post('/cart/updateQuantity', [CartController::class, 'updateQuantity'])->name('cart.updateQuantity');
    Route::post('/cart/clear', [CartController::class, 'clear'])->name('cart.clear');
    Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');

    Route::get('/profile', [UserController::class, 'profile'])->name('user.profile');
    Route::get('/user/profile', [UserController::class, 'profile'])->name('user.profile');
    Route::put('/user/profile', [UserController::class, 'updateProfile'])->name('profile.update');
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
    Route::get('/user/orders', [OrderController::class, 'index'])->name('user.orders');
});

require __DIR__ . '/auth.php';
