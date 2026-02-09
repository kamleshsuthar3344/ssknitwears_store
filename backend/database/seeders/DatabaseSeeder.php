<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Product;
use App\Models\Slider;
use App\Models\Address;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            AdminSellerSeeder::class,
        ]);

        // 1. Create Admin User
        $admin = User::firstOrCreate(
            ['email' => 'admin@ssknitwear.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]
        );
        
        $user = User::firstOrCreate(
            ['email' => 'user@example.com'],
            [
                'name' => 'Demo User',
                'password' => Hash::make('password'),
                'role' => 'user',
            ]
        );

        // 2. Seed Sliders
        $sliders = [
            [
                'image' => '/images/slider/slider1.png',
                'title' => 'Winter Has Arrived.|Amazing new designs.',
                'subtitle' => 'FW 18 Collection',
                'link' => '/shop/women'
            ],
            [
                'image' => '/images/slider/slider2.png',
                'title' => 'New Season Trends.|Bold & Beautiful.',
                'subtitle' => 'FW 18 Collection',
                'link' => '/shop/men'
            ],
            [
                'image' => '/images/slider/slide3.png',
                'title' => 'Premium Knitwear.|Crafted for Comfort.',
                'subtitle' => 'FW 18 Collection',
                'link' => '/shop/kids'
            ]
        ];

        foreach ($sliders as $index => $slide) {
            Slider::create([
                'title' => $slide['title'],
                'subtitle' => $slide['subtitle'],
                'image_path_desktop' => $slide['image'], // Using same for mobile for now as per data
                'image_path_mobile' => $slide['image'],
                'link' => $slide['link'],
                'order' => $index + 1,
                'status' => true
            ]);
        }

        // 3. Seed Products
        $products = [
            // Men's Collection
            [
                'name' => 'BRATS Round Neck Men’s Pullover',
                'price' => 715.00,
                'sale_price' => 715.00, // Assuming sales price is current price
                'image' => '/images/products/p1.jpeg',
                'category' => 'Men',
                'season' => 'Winter'
            ],
            [
                'name' => 'BRATS Round neck front design pullover',
                'price' => 715.00,
                'image' => '/images/products/p2.jpeg',
                'category' => 'Men',
                'season' => 'Winter'
            ],
            [
                'name' => 'BRATS Reglan Sleeve two coloured sweater',
                'price' => 715.00,
                'image' => '/images/products/p3.jpg',
                'category' => 'Men',
                'season' => 'Winter'
            ],
            [
                'name' => 'BRATS Pullover, self Design with striper',
                'price' => 715.00,
                'image' => '/images/products/p4.jpeg',
                'category' => 'Men',
                'season' => 'Winter'
            ],
            [
                'name' => 'BRATS Polo neck Honey bee design',
                'price' => 715.00,
                'image' => '/images/products/p5.jpeg',
                'category' => 'Men',
                'season' => 'Winter'
            ],
            [
                'name' => 'BRATS High neck self design',
                'price' => 715.00,
                'image' => '/images/products/p6.jpeg',
                'category' => 'Men',
                'season' => 'Winter'
            ],
            [
                'name' => 'BRATS Front design Round neck',
                'price' => 699.00,
                'image' => '/images/products/p7.jpg',
                'category' => 'Men',
                'season' => 'Winter'
            ],
            
            // Women's Collection
            [
                'name' => 'Dik Dik Elegant Cardigan',
                'price' => 1299.00,
                'sale_price' => 899.00,
                'image' => '/images/products/p2.jpeg',
                'category' => 'Women',
                'season' => 'Winter'
            ],
            [
                'name' => 'Dik Dik Soft Knit Pullover',
                'price' => 1100.00,
                'sale_price' => 950.00,
                'image' => '/images/products/p4.jpeg',
                'category' => 'Women',
                'season' => 'Winter'
            ],
            [
                'name' => 'Dik Dik Premium Wool Sweater',
                'price' => 1599.00,
                'sale_price' => 1200.00,
                'image' => '/images/products/p6.jpeg',
                'category' => 'Women',
                'season' => 'Winter'
            ],
            [
                'name' => 'Dik Dik Stylish Winter Top',
                'price' => 900.00,
                'sale_price' => 750.00,
                'image' => '/images/products/p1.jpeg',
                'category' => 'Women',
                'season' => 'Summer'
            ],

            // Kids' Collection
            [
                'name' => 'Kids Cozy Winter Sweater',
                'price' => 699.00,
                'sale_price' => 499.00,
                'image' => '/images/products/p5.jpeg',
                'category' => 'Kids',
                'season' => 'Winter'
            ],
            [
                'name' => 'Little Stars Pullover',
                'price' => 700.00,
                'sale_price' => 550.00,
                'image' => '/images/products/p3.jpg',
                'category' => 'Kids',
                'season' => 'Winter'
            ],
            [
                'name' => 'Kids Warm Fleece Hoodie',
                'price' => 800.00,
                'sale_price' => 650.00,
                'image' => '/images/products/p7.jpg',
                'category' => 'Kids',
                'season' => 'Winter'
            ],
            [
                'name' => 'Junior Knitwear Classic',
                'price' => 799.00,
                'sale_price' => 599.00,
                'image' => '/images/products/p4.jpeg',
                'category' => 'Kids',
                'season' => 'Summer'
            ]
        ];

        $mainSeller = \App\Models\Seller::first(); 

        foreach ($products as $p) {
            Product::create([
                'name' => $p['name'],
                'slug' => Str::slug($p['name']) . '-' . rand(1000, 9999), 
                'price' => $p['price'], // Original price
                'sale_price' => $p['sale_price'] ?? null,
                'description' => 'Premium quality knitwear designed for comfort and style.',
                'images' => [
                    'main' => $p['image'],
                    'hover' => $p['image'], // Using same image for hover for now
                    'thumb' => $p['image']
                ],
                'category' => $p['category'],
                'season' => $p['season'],
                'stock' => 50,
                'seo_title' => $p['name'] . ' | SSKNITWEAR',
                'seo_description' => 'Buy ' . $p['name'] . ' online at SSKNITWEAR. Premium quality winter wear.',
                'user_id' => $mainSeller ? $mainSeller->id : null,
                'user_type' => $mainSeller ? \App\Models\Seller::class : null,
            ]);
        }
        
        // 4. Seed Address
        Address::create([
            'user_id' => $user->id,
            'name' => 'Demo User',
            'phone' => '9876543210',
            'address' => '123 Fashion Street',
            'city' => 'Mumbai',
            'state' => 'Maharashtra',
            'zip' => '400001',
            'type' => 'shipping'
        ]);
    }
}
