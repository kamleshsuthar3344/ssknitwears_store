<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\User;
use App\Models\Product;

class AdminController extends Controller
{
    public function stats()
    {
        return response()->json([
            'total_users' => User::count(),
            'total_orders' => Order::count(),
            'total_revenue' => Order::where('status', 'completed')->sum('total_amount'), 
            'pending_orders' => Order::where('status', 'pending')->count(),
            'active_sellers' => Seller::where('status', 'approved')->count(),
            'total_products' => Product::count(),
        ]);
    }
}
