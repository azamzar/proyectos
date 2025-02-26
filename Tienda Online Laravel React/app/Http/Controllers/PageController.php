<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class PageController extends Controller
{
    // Método para mostrar la página de contacto
    public function contact()
    {
        return Inertia::render('Contact');
    }
}
