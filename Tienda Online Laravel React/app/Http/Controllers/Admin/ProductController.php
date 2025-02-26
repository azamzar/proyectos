<?php

namespace App\Http\Controllers\Admin;

use App\Models\Product;
use App\Models\Category;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    // Listar todos los productos
    public function index()
    {
        // Obtener todos los productos, incluyendo las categorías relacionadas
        $products = Product::with('category')->get();

        // Retornar la vista de Inertia con los productos
        return Inertia::render('Admin/Products/Index', ['products' => $products]);
    }

    // Mostrar el formulario de creación de un producto
    public function create()
    {
        // Obtener las categorías para mostrarlas en el formulario de creación
        $categories = Category::all();

        // Retornar la vista de Inertia con las categorías disponibles
        return Inertia::render('Admin/Products/Create', ['categories' => $categories]);
    }

    // Almacenar un nuevo producto en la base de datos
    public function store(Request $request)
    {
        // Validar los datos enviados desde el formulario
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|string',
        ]);

        // Crear un nuevo producto con los datos validados
        Product::create($request->all());

        // Redirigir al listado de productos
        return Inertia::location(route('products.index', ['success' => 'Producto creado']));
    }

    // Mostrar el formulario de edición de un producto
    public function edit(Product $product)
    {
        // Obtener todas las categorías
        $categories = Category::all();

        // Retornar la vista de edición con el producto y las categorías
        return Inertia::render('Admin/Products/Edit', [
            'product' => $product,
            'categories' => $categories,
        ]);
    }

    // Actualizar un producto existente en la base de datos
    public function update(Request $request, Product $product)
    {
        // Validar los datos del formulario
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|string',
        ]);

        // Actualizar el producto con los datos validados
        $product->update($request->all());

        // Redirigir al listado de productos
        return Inertia::location(route('products.index', ['success' => 'Producto modificado']));
    }

    // Eliminar un producto de la base de datos
    public function destroy(Product $product)
    {
        // Eliminar el producto directamente
        $product->delete();

        // Redirigir a la lista de productos con un mensaje de éxito
        return Inertia::location(route('products.index', ['success' => 'Producto eliminado']));
    }


    // Buscar el producto por ID, o mostrar un 404 si no existe.
    public function show($id)
    {
        $product = Product::findOrFail($id);

        return Inertia::render('Admin/Products/Show', [
            'product' => $product,
        ]);
    }
}
