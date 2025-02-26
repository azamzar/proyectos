<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    public function create()
    {
        return Inertia::render('Users/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return redirect()->route('users.index')->with('success', 'Usuario creado correctamente');
    }

    public function profile()
    {
        return Inertia::render('Users/Profile', [
            'user' => auth()->user(),
        ]);
    }

    public function updateProfile(Request $request)
    {
        $user = User::find(auth()->id());

        if (!$user) {
            return redirect()->back()->withErrors(['error' => 'No se ha encontrado el usuario.']);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'current_password' => 'nullable|required_with:new_password|string',
            'new_password' => ['nullable', 'required_with:current_password', 'confirmed', Password::defaults()],
        ]);

        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'address' => $validated['address'],
        ]);

        if ($request->filled('current_password') && Hash::check($request->current_password, $user->password)) {
            $user->update([
                'password' => Hash::make($request->new_password),
            ]);
        }

        return redirect()->back()->with('success', 'Perfil actualizado exitosamente.');
    }

    public function orders()
    {
        $orders = Order::where('user_id', auth()->id())->paginate(10);

        return Inertia::render('Users/Orders', [
            'orders' => $orders
        ]);
    }
}
