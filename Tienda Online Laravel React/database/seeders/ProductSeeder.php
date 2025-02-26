<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $productos = [
            [
                'name' => 'Chainsaw Man 1',
                'description' => 'Primer tomo del manga Chainsaw Man.',
                'price' => 9.00,
                'stock' => 50,
                'category_id' => 3,
                'image' => 'images/chainsaw-man.png'
            ],
            [
                'name' => 'Civil War',
                'description' => 'Tomo recopilatorio de Civil War, de Marvel.',
                'price' => 18.00,
                'stock' => 50,
                'category_id' => 3,
                'image' => 'images/civil-war.png'
            ],
            [
                'name' => 'Dan Da Dan 1',
                'description' => 'Primer tomo del manga Dan Da Dan.',
                'price' => 9.00,
                'stock' => 50,
                'category_id' => 3,
                'image' => 'images/dandadan.png'
            ],
            [
                'name' => 'Dragon Ball 1',
                'description' => 'Primer tomo del manga Dragon Ball (Ultimate Edition).',
                'price' => 13.00,
                'stock' => 50,
                'category_id' => 3,
                'image' => 'images/dragon-ball.png'
            ],
            [
                'name' => 'Neon Genesis Evangelion 1',
                'description' => 'Primer tomo del manga Neon Genesis Evangelion (Edición Coleccionista).',
                'price' => 18.00,
                'stock' => 50,
                'category_id' => 3,
                'image' => 'images/evangelion.png'
            ],
            [
                'name' => 'Frieren 1',
                'description' => 'Primer tomo del manga Frieren.',
                'price' => 9.00,
                'stock' => 50,
                'category_id' => 3,
                'image' => 'images/frieren.png'
            ],
            [
                'name' => 'Guardianes de la Noche 1',
                'description' => 'Primer tomo del manga Guardianes de la Noche (Kimetsu no Yaiba).',
                'price' => 9.00,
                'stock' => 50,
                'category_id' => 3,
                'image' => 'images/guardianes-de-la-noche.png'
            ],
            [
                'name' => 'Haikyû!! 1',
                'description' => 'Primer tomo del manga Haikyû!!.',
                'price' => 8.50,
                'stock' => 50,
                'category_id' => 3,
                'image' => 'images/haikyu.png'
            ],
            [
                'name' => 'Jujutsu Kaisen 1',
                'description' => 'Primer tomo del manga Jujutsu Kaisen (Guerra de Hechiceros).',
                'price' => 9.00,
                'stock' => 50,
                'category_id' => 3,
                'image' => 'images/jujutsu-kaisen.png'
            ],
            [
                'name' => 'Monster 1',
                'description' => 'Primer tomo del manga Monster (Kanzenban).',
                'price' => 15.95,
                'stock' => 50,
                'category_id' => 3,
                'image' => 'images/monster.png'
            ],
            [
                'name' => 'Naruto 3 en 1 (1)',
                'description' => 'Primer tomo del manga Naruto en su edición 3 en 1.',
                'price' => 17.95,
                'stock' => 50,
                'category_id' => 3,
                'image' => 'images/naruto.png'
            ],
            [
                'name' => 'One Piece 3 en 1 (1)',
                'description' => 'Primer tomo del manga One Piece en su edición 3 en 1.',
                'price' => 16.95,
                'stock' => 50,
                'category_id' => 3,
                'image' => 'images/one-piece.png'
            ],
            [
                'name' => 'Sailor Moon 1',
                'description' => 'Primer tomo del manga Pretty Guardian Sailor Moon (Eternal Edition).',
                'price' => 9.00,
                'stock' => 50,
                'category_id' => 3,
                'image' => 'images/sailor-moon.png'
            ],
            [
                'name' => 'Tomie',
                'description' => 'Tomo recopilatorio del manga Tomie.',
                'price' => 35.95,
                'stock' => 50,
                'category_id' => 3,
                'image' => 'images/tomie.png'
            ],
            [
                'name' => 'Watchmen',
                'description' => 'Tomo recopilatorio del cómic Watchmen en su edición DC Pocket Max.',
                'price' => 15.00,
                'stock' => 50,
                'category_id' => 3,
                'image' => 'images/watchmen.png'
            ],
            [
                'name' => 'Ace y Luffy',
                'description' => 'FIgura de Ace y Luffy de One Piece.',
                'price' => 59.95,
                'stock' => 50,
                'category_id' => 2,
                'image' => 'images/aceluffy.png'
            ],
            [
                'name' => 'Anya Forger',
                'description' => 'Figura de Anya Forger de Spy X Family.',
                'price' => 18.95,
                'stock' => 50,
                'category_id' => 2,
                'image' => 'images/anya.png'
            ],
            [
                'name' => 'Katsuki Bakugo',
                'description' => 'Figura de Katsuki Bakugo de My Hero Academia.',
                'price' => 24.95,
                'stock' => 50,
                'category_id' => 2,
                'image' => 'images/bakugo.png'
            ],
            [
                'name' => 'Charmander',
                'description' => 'Figura de Charmander de Pokémon.',
                'price' => 14.95,
                'stock' => 50,
                'category_id' => 2,
                'image' => 'images/charmander.png'
            ],
            [
                'name' => 'Tony Tony Chopper',
                'description' => 'Figura de Tony Tony Chopper de One Piece.',
                'price' => 23.90,
                'stock' => 50,
                'category_id' => 2,
                'image' => 'images/chopper.png'
            ],
            [
                'name' => 'Izuku Midoriya',
                'description' => 'Figura de Izuku Midoriya de My Hero Academia.',
                'price' => 34.95,
                'stock' => 50,
                'category_id' => 2,
                'image' => 'images/deku.png'
            ],
            [
                'name' => 'Goku y Vegeta',
                'description' => 'Figura de Goku y Vegeta de Dragon Ball Z.',
                'price' => 9,
                'stock' => 69.90,
                'category_id' => 2,
                'image' => 'images/dragonballfigura.png'
            ],
            [
                'name' => 'Satoru Gojo',
                'description' => 'Figura de Satoru Gojo de Jujutsu Kaisen.',
                'price' => 29.90,
                'stock' => 50,
                'category_id' => 2,
                'image' => 'images/gojo.png'
            ],
            [
                'name' => 'Goku y Gohan',
                'description' => 'Figura de Goku y Gohan de Dragon Ball Z.',
                'price' => 9,
                'stock' => 34.95,
                'category_id' => 2,
                'image' => 'images/gokugohan.png'
            ],
            [
                'name' => 'Gon Freecss',
                'description' => 'Figura de Gon Freecss de Hunter X Hunter.',
                'price' => 15.95,
                'stock' => 50,
                'category_id' => 2,
                'image' => 'images/gon.png'
            ],
            [
                'name' => 'Himiko Toga',
                'description' => 'Figura de Himiko Toga de My Hero Academia.',
                'price' => 27.95,
                'stock' => 50,
                'category_id' => 2,
                'image' => 'images/himiko.png'
            ],
            [
                'name' => 'Ichigo Kurosaki',
                'description' => 'Figura de Ichigo Kurosaki de Bleach.',
                'price' => 26.95,
                'stock' => 50,
                'category_id' => 2,
                'image' => 'images/ichigo.png'
            ],
            [
                'name' => 'Itachi Uchiha',
                'description' => 'Figura de Itachi Uchiha de Naruto.',
                'price' => 15.95,
                'stock' => 50,
                'category_id' => 2,
                'image' => 'images/itachi.png'
            ],
            [
                'name' => 'Kaworu Nagisa',
                'description' => 'Figura de Kaworu Nagisa de Neon Genesis Evangelion.',
                'price' => 34.95,
                'stock' => 50,
                'category_id' => 2,
                'image' => 'images/kaworu.png'
            ],
            [
                'name' => 'Monkey D. Luffy',
                'description' => 'Figura de Monkey D. Luffy de One Piece.',
                'price' => 23.90,
                'stock' => 50,
                'category_id' => 2,
                'image' => 'images/luffy.png'
            ],
            [
                'name' => 'Naruto Uzumaki',
                'description' => 'Figura de Naruto Uzumaki de Naruto.',
                'price' => 23.90,
                'stock' => 50,
                'category_id' => 2,
                'image' => 'images/narutouzumaki.png'
            ],
            [
                'name' => 'Nezuko Kamado',
                'description' => 'Figura de Nezuko Kamado de Guardianes de la Noche.',
                'price' => 18.95,
                'stock' => 50,
                'category_id' => 2,
                'image' => 'images/nezuko.png'
            ],
            [
                'name' => 'Power',
                'description' => 'Figura de Power de Chainsaw Man.',
                'price' => 26.90,
                'stock' => 50,
                'category_id' => 2,
                'image' => 'images/power.png'
            ],
            [
                'name' => 'Saitama',
                'description' => 'Figura de Saitama de One Punch Man.',
                'price' => 23.95,
                'stock' => 50,
                'category_id' => 2,
                'image' => 'images/saitama.png'
            ],
            [
                'name' => 'Sakura Haruno',
                'description' => 'Figura de Sakura Haruno de Naruto.',
                'price' => 22.90,
                'stock' => 50,
                'category_id' => 2,
                'image' => 'images/sakura.png'
            ],
            [
                'name' => 'Sasuke Uchiha',
                'description' => 'Figura de Sasuke Uchiha de Naruto.',
                'price' => 27.90,
                'stock' => 50,
                'category_id' => 2,
                'image' => 'images/sasuke.png'
            ],
            [
                'name' => 'Shoyo Hinata',
                'description' => 'Figura de Shoyo Hinata de Haikyu!!.',
                'price' => 29.90,
                'stock' => 50,
                'category_id' => 2,
                'image' => 'images/shoyo.png'
            ],
            [
                'name' => 'Tanjiro Kamado',
                'description' => 'Figura de Tanjiro Kamado de Guardianes de la Noche.',
                'price' => 23.95,
                'stock' => 50,
                'category_id' => 2,
                'image' => 'images/tanjiro.png'
            ],
            [
                'name' => 'Darth Vader',
                'description' => 'Figura de Darth Vader de Star Wars.',
                'price' => 27.95,
                'stock' => 50,
                'category_id' => 2,
                'image' => 'images/vader.png'
            ],
            [
                'name' => 'Yamato',
                'description' => 'Figura de Yamato de One Piece.',
                'price' => 15.95,
                'stock' => 50,
                'category_id' => 2,
                'image' => 'images/yamato.png'
            ],
            [
                'name' => 'Yor Forger',
                'description' => 'Figura de Yor Forger de Spy X Family.',
                'price' => 27.95,
                'stock' => 50,
                'category_id' => 2,
                'image' => 'images/yor.png'
            ],
            [
                'name' => 'Yuzuriha',
                'description' => 'Figura de Yuzuriha de Hells Paradise.',
                'price' => 26.95,
                'stock' => 50,
                'category_id' => 2,
                'image' => 'images/yuzuriha.png'
            ],
            [
                'name' => 'Roronoa Zoro',
                'description' => 'Figura de IRoronoa Zoro de One Piece.',
                'price' => 34.95,
                'stock' => 50,
                'category_id' => 2,
                'image' => 'images/zoro.png'
            ],
            [
                'name' => 'Bitoku',
                'description' => 'Juego de mesa Bitoku.',
                'price' => 54.00,
                'stock' => 50,
                'category_id' => 1,
                'image' => 'images/bitoku.png'
            ],
            [
                'name' => 'Catán',
                'description' => 'Juego de mesa Catán.',
                'price' => 38.50,
                'stock' => 50,
                'category_id' => 1,
                'image' => 'images/catan.png'
            ],
            [
                'name' => 'Cthulhu',
                'description' => 'Juego de mesa Cthulhu: Death May Die.',
                'price' => 98.95,
                'stock' => 50,
                'category_id' => 1,
                'image' => 'images/cthulhu.png'
            ],
            [
                'name' => 'Daruma',
                'description' => 'Juego de mesa Daruma.',
                'price' => 16.20,
                'stock' => 50,
                'category_id' => 1,
                'image' => 'images/daruma.png'
            ],
            [
                'name' => 'Dixit',
                'description' => 'Juego de mesa Dixit.',
                'price' => 32.95,
                'stock' => 50,
                'category_id' => 1,
                'image' => 'images/dixit.png'
            ],
            [
                'name' => 'Exploding Kittens',
                'description' => 'Juego de mesa Exploding Kittens.',
                'price' => 19.90,
                'stock' => 50,
                'category_id' => 1,
                'image' => 'images/explodingkittens.png'
            ],
            [
                'name' => 'Munchkin',
                'description' => 'Juego de mesa Munchkin.',
                'price' => 25.95,
                'stock' => 50,
                'category_id' => 1,
                'image' => 'images/munchkin.png'
            ],
            [
                'name' => 'Nekojima',
                'description' => 'Juego de mesa Nekojima.',
                'price' => 35.95,
                'stock' => 50,
                'category_id' => 1,
                'image' => 'images/nekojima.png'
            ],
            [
                'name' => 'Pelusas',
                'description' => 'Juego de mesa Pelusas.',
                'price' => 12.15,
                'stock' => 50,
                'category_id' => 1,
                'image' => 'images/pelusas.png'
            ],
            [
                'name' => 'Saboteur',
                'description' => 'Juego de mesa Ssaboteur.',
                'price' => 11.90,
                'stock' => 50,
                'category_id' => 1,
                'image' => 'images/saboteur.png'
            ],
            [
                'name' => 'Samurai Sword',
                'description' => 'Juego de mesa Samurai Sword.',
                'price' => 16.95,
                'stock' => 50,
                'category_id' => 1,
                'image' => 'images/samuraisword.png'
            ],
            [
                'name' => 'Sushi & Go',
                'description' => 'Juego de mesa Sushi & Go.',
                'price' => 8.95,
                'stock' => 50,
                'category_id' => 1,
                'image' => 'images/sushigo.png'
            ],
            [
                'name' => 'The White Castle',
                'description' => 'Juego de mesa The White Castle.',
                'price' => 26.95,
                'stock' => 50,
                'category_id' => 1,
                'image' => 'images/thewhitecastle.png'
            ],
            [
                'name' => 'The Witcher: El VIejo Mundo',
                'description' => 'Juego de mesa The Witcher: El VIejo Mundo.',
                'price' => 89.95,
                'stock' => 50,
                'category_id' => 1,
                'image' => 'images/thewitcher.png'
            ],
            [
                'name' => 'Virus Marvel',
                'description' => 'Juego de mesa Bitoku.',
                'price' => 14.35,
                'stock' => 50,
                'category_id' => 1,
                'image' => 'images/virusmarvel.png'
            ],
            [
                'name' => 'Yokai Pagoda',
                'description' => 'Juego de mesa Yokai Pagoda.',
                'price' => 13.45,
                'stock' => 50,
                'category_id' => 1,
                'image' => 'images/yokaipagoda.png'
            ],

        ];

        foreach ($productos as $producto) {
            Product::create($producto);
        }
    }
}
