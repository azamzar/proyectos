<?php

namespace App\Http\Controllers;

namespace App\Http\Controllers;

use App\Models\ShoppingCart;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShoppingCartController extends Controller
{
    public function index()
    {
        // Obtener los productos del carrito del usuario autenticado
        $cartItems = ShoppingCart::with('product')->where('user_id', auth()->id())->get();

        return Inertia::render('Cart/Index', [
            'cartItems' => $cartItems
        ]);
    }

    public function store(Request $request)
    {
        // Añadir un producto al carrito
        ShoppingCart::updateOrCreate(
            [
                'user_id' => auth()->id(),
                'product_id' => $request->product_id,
            ],
            ['quantity' => $request->quantity]
        );

        return redirect()->route('cart.index')->with('success', 'Producto añadido al carrito.');
    }

    public function destroy(Product $product)
    {
        // Eliminar un producto del carrito
        ShoppingCart::where('user_id', auth()->id())
            ->where('product_id', $product->id)
            ->delete();

        return redirect()->route('cart.index')->with('success', 'Producto eliminado del carrito.');
    }
}
