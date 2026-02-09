<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\Auth;

class SellerOrderController extends Controller
{
    public function index()
    {
        try {
            $sellerId = Auth::id();
            if (!$sellerId) {
                \Illuminate\Support\Facades\Log::error('SellerOrderController: Auth::id() returned null');
                return response()->json(['message' => 'Unauthorized'], 401);
            }

            // Fetch orders that have items belonging to this seller
            $orders = Order::whereHas('items.product', function ($query) use ($sellerId) {
                $query->where('user_id', $sellerId)
                      ->where('user_type', 'App\\Models\\Seller');
            })->with(['items' => function ($query) use ($sellerId) {
                // Only load items belonging to this seller
                $query->whereHas('product', function ($q) use ($sellerId) {
                    $q->where('user_id', $sellerId)
                      ->where('user_type', 'App\\Models\\Seller');
                })->with('product');
            }, 'user'])->latest()->get();

            return response()->json($orders);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('SellerOrderController Error: ' . $e->getMessage());
            \Illuminate\Support\Facades\Log::error($e->getTraceAsString());
            return response()->json(['message' => 'Server Error: ' . $e->getMessage()], 500);
        }
    }

    public function updateStatus(Request $request, $orderId)
    {
        $request->validate([
            'status' => 'required|string|in:pending,processing,shipped,delivered,cancelled',
        ]);

        $sellerId = Auth::id();

        // Verify the order contains items for this seller
        $order = Order::where('id', $orderId)->whereHas('items.product', function ($query) use ($sellerId) {
            $query->where('user_id', $sellerId)
                  ->where('user_type', 'App\\Models\\Seller');
        })->firstOrFail();

        // For now, update the main order status. 
        // In a real multi-vendor system, we'd update individual order items or a pivot status.
        // But per current request requirements, we'll update the main order status.
        $order->update(['status' => $request->status]);

        return response()->json(['message' => 'Order status updated successfully', 'order' => $order]);
    }
}
