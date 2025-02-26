<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        // Obtener pedidos del usuario autenticado
        $user = User::find(auth()->user()->id);

        // Si el usuario es administrador, obtener todos los pedidos
        if ($user->hasRole('admin')) {
            $orders = Order::latest()->get();
        } else {
            // Si es un usuario normal, obtener solo sus pedidos
            $orders = $user->orders()->latest()->get();
        }
        return Inertia::render('Users/Orders', [
            'orders' => $orders,
        ]);
    }

    public function store(Request $request)
    {
        // Validar los datos
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'required|email|max:255',
            'province' => 'required|string|max:100',
            'postalCode' => 'required|string|max:10',
            'paymentMethod' => 'required|string|in:tarjeta,paypal,transferencia,efectivo',
            'items' => 'required|array',
            'total' => 'required|numeric|min:0',
        ]);

        // Crear el pedido
        $order = Order::create([
            'user_id' => auth()->id(),
            'name' => $validated['name'],
            'address' => $validated['address'],
            'phone' => $validated['phone'],
            'email' => $validated['email'],
            'province' => $validated['province'],
            'postal_code' => $validated['postalCode'],
            'payment_method' => $validated['paymentMethod'],
            'total' => $validated['total'],
        ]);

        // Guardar los productos del pedido
        foreach ($validated['items'] as $item) {
            $order->items()->create([
                'product_id' => $item['id'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
            ]);
        }

        // Redirigir al índice de pedidos
        return redirect()->route('orders.index')->with('success', 'Pedido realizado con éxito.');
    }
}
