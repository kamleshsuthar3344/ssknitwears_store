<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Seller;
use App\Models\Product;
use App\Models\ProductVariant;
use PHPUnit\Framework\Attributes\Test;

class E2EFlowTest extends TestCase
{
    // usage: C:\xampp\php\php.exe artisan test tests/Feature/E2EFlowTest.php

    #[Test]
    public function full_e2e_website_flow()
    {
        // ----------------------------------------------------------------
        // PART 1: SELLER FLOW
        // ----------------------------------------------------------------
        $this->info("--- Starting Seller Flow ---");

        // 1. Register Seller
        $sellerData = [
            'name' => 'Test Seller',
            'email' => 'seller_e2e@test.com',
            'password' => 'password',
            'shop_name' => 'E2E Knits'
        ];
        
        $response = $this->postJson('/api/seller/register', $sellerData);
        $response->assertStatus(201);
        $this->assertDatabaseHas('sellers', ['email' => 'seller_e2e@test.com']);
        $sellerToken = $response->json('token');
        $this->info("Seller Registered & Logged In.");

        // 2. Add Product
        $productData = [
            'name' => 'E2E Sweater',
            'description' => 'A test sweater',
            'price' => 1000,
            'category' => 'Men',
            'image' => 'placeholder.jpg',
            'variants' => [
                ['color' => 'Red', 'size' => 'M', 'stock' => 10, 'price' => 1000]
            ]
        ];

        $response = $this->withHeader('Authorization', 'Bearer ' . $sellerToken)
                         ->postJson('/api/seller/products', $productData);
        $response->assertStatus(201);
        $productId = $response->json('product.id');
        $this->assertDatabaseHas('products', ['name' => 'E2E Sweater']);
        $this->info("Product 'E2E Sweater' Created with ID: $productId");

        // ----------------------------------------------------------------
        // PART 2: CUSTOMER FLOW
        // ----------------------------------------------------------------
        $this->info("--- Starting Customer Flow ---");

        // 3. Register Customer
        $userData = [
            'name' => 'Test Customer',
            'email' => 'customer_e2e@test.com',
            'password' => 'password'
        ];

        $response = $this->postJson('/api/register', $userData);
        $response->assertStatus(201);
        $userToken = $response->json('token');
        $this->info("Customer Registered & Logged In.");

        // 4. Shop: Get Product Details (Verify Logic)
        $response = $this->getJson("/api/products");
        $response->assertStatus(200);
        $response->assertJsonFragment(['name' => 'E2E Sweater']);

        // 5. Checkout: Place Order
        // Need to find the variant ID first
        $variant = ProductVariant::where('product_id', $productId)->first();
        $this->assertNotNull($variant, "Variant should exist");

        $orderPayload = [
            'total_amount' => 1000,
            'payment_method' => 'cod',
            'shipping_address' => [
                'name' => 'Test Customer',
                'address' => '123 Test St',
                'city' => 'Test City',
                'zip' => '12345'
            ],
            'items' => [
                [
                    'product_id' => $productId,
                    'variant_id' => $variant->id,
                    'quantity' => 1,
                    'price' => 1000,
                    'color' => 'Red',
                    'size' => 'M'
                ]
            ]
        ];

        $response = $this->withHeader('Authorization', 'Bearer ' . $userToken)
                         ->postJson('/api/orders', $orderPayload);
        
        $response->assertStatus(201);
        $orderId = $response->json('order_id');
        $this->info("Order Placed Successfully. Order ID: $orderId");

        // ----------------------------------------------------------------
        // PART 3: VERIFICATION
        // ----------------------------------------------------------------
        
        // 6. Verify Stock Deduction
        $freshVariant = $variant->fresh();
        $this->assertEquals(9, $freshVariant->stock, "Stock should be reduced from 10 to 9");
        $this->info("Stock Deduction Verified (10 -> 9).");

        $this->info("--- E2E TEST COMPLETE: SUCCESS ---");
    }

    private function info($msg) {
        fwrite(STDERR, $msg . PHP_EOL);
    }
}
