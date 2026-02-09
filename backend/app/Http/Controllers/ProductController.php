<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with(['variants', 'productImages']);

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        if ($request->has('season')) {
            $query->where('season', $request->season);
        }
        
        if ($request->has('search')) {
             $query->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->has('featured')) {
            $query->where('is_featured', true);
        }

        if ($request->has('colors')) {
            $colors = is_array($request->colors) ? $request->colors : explode(',', $request->colors);
            $query->whereHas('variants', function($q) use ($colors) {
                $q->whereIn('color', $colors);
            });
        }

        // Sorting
        $sort = $request->input('sort', 'featured');
        switch ($sort) {
            case 'price_low':
                $query->orderBy('price', 'asc');
                break;
            case 'price_high':
                $query->orderBy('price', 'desc');
                break;
            case 'newest':
                $query->orderBy('created_at', 'desc');
                break;
            case 'featured':
            default:
                $query->orderBy('is_featured', 'desc')->orderBy('created_at', 'desc');
                break;
        }

        return response()->json($query->get());
    }

    public function show($idOrSlug)
    {
        return Product::with(['variants', 'productImages'])
            ->where('id', $idOrSlug)
            ->orWhere('slug', $idOrSlug)
            ->firstOrFail();
    }

    public function store(Request $request)
    {
        // Validation handled here for simplicity, but FormRequest recommended for complex data
        $validated = $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric', // Base price
            'description' => 'required|string',
            'category' => 'required|string',
            'season' => 'nullable|string',
            // Variants validation (support array or string)
            'variants' => 'nullable', 
            // Images
            'images.*' => 'image|max:2048',
        ]);

        try {
            DB::beginTransaction();

            $user = Auth::user(); // Could be Admin or Seller
            $userId = $user->id;
            $userType = get_class($user);

            $product = Product::create([
                'name' => $validated['name'],
                'slug' => Str::slug($validated['name']) . '-' . Str::random(6),
                'price' => $validated['price'],
                'description' => $validated['description'],
                'category' => $validated['category'],
                'season' => $request->input('season', 'All'),
                'stock' => 0, // Stock is now aggregate of variants
                'user_id' => $userId,
                'user_type' => $userType,
                'is_featured' => $request->boolean('is_featured', false),
                'images' => [], // Legacy
            ]);

            // Handle Variants (support JSON string or Array)
            $variantsInput = $request->input('variants');
            $variantsData = [];

            if (is_string($variantsInput)) {
                $variantsData = json_decode($variantsInput, true);
            } elseif (is_array($variantsInput)) {
                $variantsData = $variantsInput;
            }

            if (is_array($variantsData)) {
                foreach ($variantsData as $index => $variant) {
                    $newVariant = $product->variants()->create([
                        'color' => $variant['color'] ?? null,
                        'size' => $variant['size'] ?? null,
                        'stock' => $variant['stock'] ?? 0,
                        'price' => $variant['price'] ?? $product->price,
                        'sku' => $variant['sku'] ?? strtoupper(Str::random(8)),
                    ]);
                    $product->increment('stock', $variant['stock'] ?? 0);

                    // Handle Variant Image
                    if ($request->hasFile("variant_images.$index")) {
                        $file = $request->file("variant_images.$index");
                        $path = $file->store('products/variants', 'public');
                        $newVariant->image = asset('storage/' . $path);
                        $newVariant->save();
                    }
                }
            }

            // Handle File Images
            $mainImageSet = false;
            
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $index => $image) {
                    $path = $image->store('products', 'public');
                    $fullPath = asset('storage/' . $path);
                    
                    $product->productImages()->create([
                        'image_path' => $fullPath,
                        'is_main' => !$mainImageSet,
                    ]);
                    $mainImageSet = true;
                }
            }
            
            // Handle URL Images (For Testing/Seeding)
            if ($request->has('image_urls') && is_array($request->input('image_urls'))) {
                foreach ($request->input('image_urls') as $url) {
                    $product->productImages()->create([
                        'image_path' => $url,
                        'is_main' => !$mainImageSet,
                    ]);
                    $mainImageSet = true;
                }
            }
            
            // Sync legacy field
            if ($mainImageSet) {
                 $firstImg = $product->productImages()->first();
                 if ($firstImg) {
                    $product->update(['images' => ['main' => $firstImg->image_path]]);
                 }
            }

            DB::commit();
            
            return response()->json($product->load(['variants', 'productImages']), 201);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Product creation failed: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to create product: ' . $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        
        // Authorization check (Admin or Owner)
        // if ($product->user_id !== Auth::id() && !Auth::user()->role === 'admin') { ... }

        try {
            DB::beginTransaction();

            $product->update($request->only(['name', 'price', 'description', 'category', 'season', 'is_featured']));

            if ($request->has('variants')) {
                // For simplicity, we might wipe and recreate, or update smartly.
                // Creating new logic: Delete all and recreate is easiest for MVP
                $variantsData = json_decode($request->input('variants'), true);
                if (is_array($variantsData)) {
                    $product->variants()->delete(); // Wipe old
                    $product->stock = 0; // Reset aggregate
                    
                    foreach ($variantsData as $index => $variant) {
                        $newVariant = $product->variants()->create([
                            'color' => $variant['color'] ?? null,
                            'size' => $variant['size'] ?? null,
                            'stock' => $variant['stock'] ?? 0,
                            'price' => $variant['price'] ?? $product->price,
                            'sku' => $variant['sku'] ?? strtoupper(Str::random(8)),
                        ]);
                        $product->increment('stock', $variant['stock'] ?? 0);

                        // Handle Variant Image (New Upload)
                        if ($request->hasFile("variant_images.$index")) {
                            $file = $request->file("variant_images.$index");
                            $path = $file->store('products/variants', 'public');
                            $newVariant->image = asset('storage/' . $path);
                            $newVariant->save();
                        } elseif (isset($variant['image'])) {
                            // Keep existing image if passed back
                             $newVariant->image = $variant['image'];
                             $newVariant->save();
                        }
                    }
                    $product->save();
                }
            }
            
            // Image handling for updates is complex (delete old? append new?).
            // For now, let's allow appending.
            // Handle Deleted Images
            if ($request->has('deleted_images')) {
                $deletedIds = json_decode($request->input('deleted_images'), true);
                if (is_array($deletedIds)) {
                    foreach ($deletedIds as $imgId) {
                        $img = ProductImage::find($imgId);
                        if ($img && $img->product_id == $product->id) {
                             // Extract relative path from URL for storage deletion
                            $pathRef = parse_url($img->image_path, PHP_URL_PATH);
                            $pathRef = ltrim($pathRef, '/'); // storage/products/...
                            $pathRef = str_replace('storage/', '', $pathRef); // products/...
                            
                            \Illuminate\Support\Facades\Storage::disk('public')->delete($pathRef);
                            $img->delete();
                        }
                    }
                }
            }

            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $path = $image->store('products', 'public');
                    $product->productImages()->create([
                        'image_path' => asset('storage/' . $path),
                        'is_main' => false,
                    ]);
                }
            }

            DB::commit();
            return response()->json($product->load(['variants', 'productImages']));

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Update failed'], 500);
        }
    }
    public function destroy($id)
    {
        try {
            DB::beginTransaction();
            
            $product = Product::findOrFail($id);
            
            // Authorization check (Owner only)
            if ($product->user_id !== Auth::id()) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }

            // Delete related records first to avoid foreign key constraint issues
            // Delete product images
            $product->productImages()->delete();
            
            // Delete variants
            $product->variants()->delete();
            
            // Note: We're not deleting order items as they should be preserved for order history
            // If you want to prevent deletion of products with orders, uncomment:
            // if ($product->orderItems()->count() > 0) {
            //     return response()->json(['message' => 'Cannot delete product with existing orders'], 400);
            // }
            
            // Delete the product
            $product->delete();
            
            DB::commit();
            return response()->json(['message' => 'Product deleted successfully']);
            
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Product deletion failed: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to delete product: ' . $e->getMessage()], 500);
        }
    }
}
