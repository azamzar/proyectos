<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index()
    {
        // Obtener los datos del carrito desde la sesión
        $cart = session('cart', []);

        return Inertia::render('Cart/Index', [
            'cartItems' => array_values($cart),
        ]);
    }
    // Agregar un producto al carrito
    public function store(Request $request)
    {
        $productId = $request->input('product_id');
        $cart = session()->get('cart', []);

        // Verifica si el producto ya existe en el carrito
        if (isset($cart[$productId])) {
            $cart[$productId]['quantity']++;
        } else {
            $cart[$productId] = [
                'id' => $productId,
                'name' => $request->input('product_name'),
                'price' => $request->input('product_price'),
                'quantity' => 1,
                'image_url' => $request->input('product_image_url'),
            ];
        }

        // Guardar el carrito en la sesión
        session()->put('cart', $cart);

        // Agregar un mensaje de éxito
        return redirect()->back()->with('success', 'Producto agregado al carrito.');
    }


    public function remove(Request $request)
    {
        // Lógica para eliminar el producto del carrito
        $productId = $request->input('product_id');
        $cart = session()->get('cart', []);

        if (isset($cart[$productId])) {
            unset($cart[$productId]);
            session()->put('cart', $cart);
        }

        return redirect()->route('cart.index'); // Redirige de vuelta al carrito después de eliminar
    }

    // Vaciar carrito después de compra
    public function clear()
    {
        session()->forget('cart'); // Limpia el carrito

        // Redirige al índice del carrito o a otra página
        return redirect()->route('orders.index')->with('success', 'Carrito limpiado con éxito.');
    }

    public function updateQuantity(Request $request)
    {
        $request->validate([
            'product_id' => 'required|integer',
            'quantity' => 'required|integer|min:1',
        ]);

        // Obtener el carrito de la sesión
        $cart = session()->get('cart', []);

        // Verificar si el producto existe en el carrito
        if (isset($cart[$request->product_id])) {
            // Actualizar la cantidad del producto
            $cart[$request->product_id]['quantity'] = $request->quantity;

            // Guardar los cambios en la sesión
            session()->put('cart', $cart);
        }

        // Redirigir de vuelta al carrito
        return redirect()->route('cart.index')->with('success', 'Cantidad actualizada correctamente.');
    }
}
