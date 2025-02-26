<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Inertia\Inertia;
use Illuminate\Http\Request;

class StoreController extends Controller
{
    // Método para mostrar la página de la tienda
    public function index()
    {
        $products = Product::with('category')->inRandomOrder()->paginate(16);
        $categories = Category::all();

        return Inertia::render('Store/Index', [
            'products' => $products,
            'categories' => $categories,
        ]);
    }

    public function show($id)
    {
        $product = Product::with('category')->findOrFail($id);

        $product['image'] = $product['image'] ? asset($product['image']) : null;

        return Inertia::render('Store/ProductDetail', [
            'product' => $product,
        ]);
    }

    public function categories()
    {
        // Lógica para obtener categorías
        return Inertia::render('Store/Categories');
    }

    public function contact()
    {
        // Lógica para la página de contacto
        return Inertia::render('Store/Contact');
    }
}
