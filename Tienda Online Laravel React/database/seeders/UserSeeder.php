<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'name' => 'Lolo user',
            'email' => 'lolo@gmail.com',
            'password' => 'lolololo'
        ]);

        $role = Role::findByName('user');
        $user->assignRole($role);

        $user = User::create([
            'name' => 'Alberto admin',
            'email' => 'alberto@gmail.com',
            'password' => 'alberto'
        ]);

        $role = Role::findByName('admin');
        $user->assignRole($role);
    }
}
