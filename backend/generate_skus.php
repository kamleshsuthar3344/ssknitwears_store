<?php
require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

echo "Generating SKUs for existing products...\n";
echo str_repeat("=", 80) . "\n\n";

$products = \App\Models\Product::whereNull('sku')->get();

if ($products->isEmpty()) {
    echo "No products without SKUs found.\n";
    exit;
}

foreach ($products as $product) {
    $sku = \App\Models\Product::generateSKU($product->category);
    $product->sku = $sku;
    $product->save();
    
    echo "✓ Generated SKU for Product ID {$product->id}: {$product->name}\n";
    echo "  SKU: {$sku}\n";
    echo "  Category: {$product->category}\n\n";
}

echo str_repeat("=", 80) . "\n";
echo "SKU generation complete!\n\n";

// Show all products with SKUs
$allProducts = \App\Models\Product::all(['id', 'name', 'sku', 'category']);
echo "All products with SKUs:\n";
foreach ($allProducts as $product) {
    echo "  [{$product->sku}] {$product->name} ({$product->category})\n";
}
