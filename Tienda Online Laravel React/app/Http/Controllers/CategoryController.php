<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function show($slug)
    {
        // Encuentra la categoría por slug, o devuelve un 404 si no existe
        $category = Category::where('slug', $slug)->firstOrFail();

        // Filtra los productos asociados a la categoría
        $products = Product::where('category_id', $category->id)
            ->select('id', 'name', 'price', 'image')
            ->get();

        $products = $products->map(function ($product) {
            $product->image = asset($product->image);
            return $product;
        });


        // Retorna la vista con los productos y la categoría
        return Inertia::render('Store/Category', [
            'products' => $products,
            'category' => $category->name,
        ]);
    }
}
