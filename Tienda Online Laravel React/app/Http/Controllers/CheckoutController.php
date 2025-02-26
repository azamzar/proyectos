<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function store(Request $request)
    {
        // Validar los datos del formulario
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
        ]);

        // Obtener los datos del carrito
        $cart = session('cart', []);
        $total = collect($cart)->sum(fn($item) => $item['price'] * $item['quantity']);

        if (empty($cart)) {
            return back()->with('error', 'El carrito está vacío');
        }

        // Crear el pedido
        $order = Order::create([
            'user_id' => $request->user()->id,
            'total' => $total,
            'name' => $validated['name'],
            'address' => $validated['address'],
        ]);

        // Guardar los items del pedido
        foreach ($cart as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item['id'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
            ]);
        }

        // Limpiar el carrito
        session()->forget('cart');

        return redirect()->route('orders.index')->with('success', 'Compra confirmada');
    }

    public function index()
    {
        $cart = session('cart', []);
        $total = collect($cart)->sum(function ($item) {
            return $item['price'] * $item['quantity'];
        });

        return Inertia::render('Checkout/Index', [
            'cart' => array_values($cart),
            'total' => $total,
        ]);
    }
}
