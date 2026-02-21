<?php
require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$products = \App\Models\Product::all(['id', 'name', 'user_id', 'created_at']);

echo "Total products in database: " . $products->count() . "\n";
echo str_repeat("=", 80) . "\n\n";

$grouped = $products->groupBy('user_id');

foreach ($grouped as $userId => $userProducts) {
    echo "User ID: {$userId} ({$userProducts->count()} products)\n";
    echo str_repeat("-", 80) . "\n";
    foreach ($userProducts as $product) {
        echo "  ID: {$product->id} - {$product->name} (Created: {$product->created_at})\n";
    }
    echo "\n";
}
