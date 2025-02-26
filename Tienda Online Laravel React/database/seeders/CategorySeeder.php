<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run()
    {
        Category::create(['name' => 'Juegos de mesa', 'description' => 'Categoría para juegos de mesa', 'slug' => 'juegos-de-mesa']);
        Category::create(['name' => 'Figuras', 'description' => 'Categoría para figuras', 'slug' => 'figuras']);
        Category::create(['name' => 'Cómics y manga', 'description' => 'Categoría para cómics y manga', 'slug' => 'comics-y-manga']);
    }
}
