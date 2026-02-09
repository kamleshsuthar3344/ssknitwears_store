<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'shipping_address' => 'required',
            'payment_method' => 'required|string',
            'total_amount' => 'required|numeric',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric',
        ]);

        try {
            DB::beginTransaction();

            // 1. Create Order
            $order = Order::create([
                'user_id' => Auth::id(), // Requires auth:sanctum
                'total_amount' => $request->total_amount,
                'status' => 'pending',
                'payment_method' => $request->payment_method,
                'shipping_address' => $request->shipping_address, // Cast to array/json automatically by Model
            ]);

            // 2. Create Order Items & Deduct Stock
            foreach ($request->items as $item) {
                // Determine attributes (Size/Color)
                $attributes = [
                    'size' => $item['size'] ?? null,
                    'color' => $item['color'] ?? null,
                    'variant_id' => $item['variant_id'] ?? null,
                ];

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                    'attributes' => $attributes,
                ]);

                // 3. Deduct Stock if Variant ID is present
                if (!empty($item['variant_id'])) {
                    $variant = ProductVariant::find($item['variant_id']);
                    if ($variant) {
                        if ($variant->stock < $item['quantity']) {
                            throw new \Exception("Insufficient stock for product ID {$item['product_id']} (Variant: {$item['variant_id']})");
                        }
                        $variant->decrement('stock', $item['quantity']);
                    }
                }
            }

            DB::commit();

            return response()->json([
                'message' => 'Order placed successfully',
                'order_id' => $order->id
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to place order',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function index()
    {
        $orders = Order::where('user_id', Auth::id())->with('items.product')->latest()->get();
        return response()->json($orders);
    }

    public function show($id)
    {
        $order = Order::where('user_id', Auth::id())->where('id', $id)->with('items.product')->firstOrFail();
        return response()->json($order);
    }

    public function track(Request $request)
    {
        $request->validate(['order_id' => 'required']);
        $order = Order::where('id', $request->order_id)->with('items.product')->first();

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        return response()->json($order);
    }
}
