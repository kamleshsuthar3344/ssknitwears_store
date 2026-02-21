<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'sku',
        'price',
        'sale_price',
        'description',
        'images',
        'category',
        'season',
        'stock',
        'seo_title',
        'is_featured',
        'seo_description',
        'user_id',
        'user_type'
    ];

    protected $casts = [
        'images' => 'array',
        'price' => 'decimal:2',
        'sale_price' => 'decimal:2',
        'is_featured' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($product) {
            if (empty($product->sku)) {
                $product->sku = static::generateSKU($product->category);
            }
        });
    }

    public static function generateSKU($category)
    {
        $prefix = 'SSK';
        $categoryCode = strtoupper(substr($category ?? 'GEN', 0, 3));
        
        // Get the last product for this category to determine next sequence
        $lastProduct = static::where('category', $category)
            ->where('sku', 'like', "{$prefix}-{$categoryCode}-%")
            ->orderBy('id', 'desc')
            ->first();
        
        if ($lastProduct && $lastProduct->sku) {
            // Extract sequence number from last SKU
            $parts = explode('-', $lastProduct->sku);
            $sequence = isset($parts[2]) ? (int)$parts[2] + 1 : 1;
        } else {
            $sequence = 1;
        }
        
        return sprintf('%s-%s-%03d', $prefix, $categoryCode, $sequence);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function variants()
    {
        return $this->hasMany(ProductVariant::class);
    }

    public function productImages()
    {
        return $this->hasMany(ProductImage::class);
    }
}
