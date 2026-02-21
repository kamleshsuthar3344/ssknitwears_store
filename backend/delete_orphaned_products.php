<?php
require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

// IDs of orphaned products to delete
$orphanedIds = [2, 3, 4, 5, 6, 7];

echo "Deleting orphaned products...\n";
echo str_repeat("=", 80) . "\n\n";

foreach ($orphanedIds as $id) {
    $product = \App\Models\Product::find($id);
    
    if ($product) {
        echo "Deleting ID {$id}: {$product->name} (User ID: {$product->user_id})\n";
        
        // Delete related records first
        $product->productImages()->delete();
        $product->variants()->delete();
        
        // Delete the product
        $product->delete();
        
        echo "  ✓ Deleted successfully\n\n";
    } else {
        echo "Product ID {$id} not found (already deleted?)\n\n";
    }
}

echo str_repeat("=", 80) . "\n";
echo "Cleanup complete!\n\n";

// Show remaining products
$remaining = \App\Models\Product::all(['id', 'name', 'user_id']);
echo "Remaining products in database: " . $remaining->count() . "\n";
foreach ($remaining as $product) {
    echo "  ID: {$product->id} - {$product->name} (User ID: {$product->user_id})\n";
}
