<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Product;

class SellerController extends Controller
{
    public function products()
    {
        return response()->json(
            Product::where('user_id', Auth::id())
                ->where('user_type', get_class(Auth::user()))
                ->get()
        );
    }

    public function stats()
    {
        $sellerId = Auth::id();
        
        // Note: This assumes Orders are linked to Sellers somehow. 
        // If not, we might need a seller_id in orders or order_items.
        // For now, let's provide product counts.
        return response()->json([
            'total_products' => Product::where('user_id', $sellerId)->where('user_type', get_class(Auth::user()))->count(),
            'total_sales' => 0, // Placeholder until order association is clear
            'total_orders' => 0, // Placeholder
        ]);
    }
}
