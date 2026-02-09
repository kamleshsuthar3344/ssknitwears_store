<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Seller;
use App\Models\Product;
use App\Models\Address;
use Laravel\Sanctum\Sanctum;

class EndToEndFlowTest extends TestCase
{
    // usage of RefreshDatabase might wipe the seeded data. 
    // Instead of using RefreshDatabase, I will rely on creating unique data for this test 
    // or just being careful. The seeded data is needed for the test to be realistic if I rely on existing IDs.
    // However, for a robust test, I should create my own data.
    // Let's use RefreshDatabase and re-seed if necessary, or just create what we need.
    // Actually, "RefreshDatabase" trait will migrate the db for testing. 
    // Since I want to test the *running* state, maybe I shouldn't wipe it?
    // Laravel tests usually run on a separate DB or transaction. 
    // Let's NOT use RefreshDatabase for now to avoid messing with the user's running DB environment 
    // if the .env.testing isn't set up.
    // Better to create unique users/sellers to avoid conflicts.

    public function test_end_to_end_flow()
    {
        // 1. Register User
        $userEmail = 'testuser_' . uniqid() . '@example.com';
        $response = $this->postJson('/api/register', [
            'name' => 'Test User',
            'email' => $userEmail,
            'mobile' => '9876543210',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);
        $response->assertStatus(201);
        $userToken = $response->json('token');
        $this->assertNotNull($userToken, 'User registration failed to return token');

        // 2. Login User (Optional since we got token, but good to verify)
        $response = $this->postJson('/api/login', [
            'email' => $userEmail,
            'password' => 'password',
        ]);
        $response->assertStatus(200);
        
        // 3. Create Address for User (Needed for order)
        $response = $this->postJson('/api/addresses', [
            'name' => 'Test User',
            'phone' => '1234567890',
            'address' => '123 Test St',
            'city' => 'Test City',
            'state' => 'Test State',
            'zip' => '12345',
            'type' => 'shipping'
        ], ['Authorization' => 'Bearer ' . $userToken]);
        $response->assertStatus(201);
        $addressId = $response->json('address.id');

        // 4. Create Seller (To own the product)
        $sellerEmail = 'testseller_' . uniqid() . '@gmail.com';
        // We don't have a public register route for sellers active in API (it was commented out), 
        // so we'll create one directly using factory or model if possible, 
        // OR login as the existing seeded seller.
        // Let's use the existing seeded seller 'ssknitwears14@gmail.com' to be safe 
        // and match the real scenario.
        
        $sellerEmail = 'ssknitwears14@gmail.com';
        $sellerPassword = 'ssknitwears14@123';
        
        $response = $this->postJson('/api/seller/login', [
            'email' => $sellerEmail,
            'password' => $sellerPassword,
        ]);
        // If seeded data isn't present in test environment, this might fail.
        // But assuming we are running against the same DB connection as "serve" (dangerous but likely here).
        // Let's assume we need to authenticate as seller.
        
        if ($response->status() !== 200) {
           // Fallback: Create a seller if login fails (e.g. if test db is empty)
           $seller = Seller::create([
               'name' => 'Test Seller',
               'email' => $sellerEmail,
               'password' => bcrypt($sellerPassword),
               'mobile' => '1234567890',
               'shop_name' => 'Test Shop',
               'status' => 'approved'
           ]);
           $response = $this->postJson('/api/seller/login', [
                'email' => $sellerEmail,
                'password' => $sellerPassword,
            ]);
        }
        
        $response->assertStatus(200);
        $this->assertTrue($response->json('requires_otp'));

        // Retrieve OTP from Cache
        $otp = \Illuminate\Support\Facades\Cache::get('seller_otp_' . $sellerEmail);
        $this->assertNotNull($otp, 'OTP not found in cache');

        // Verify OTP
        $response = $this->postJson('/api/seller/verify-otp', [
            'email' => $sellerEmail,
            'otp' => (string)$otp
        ]);
        
        $response->assertStatus(200);
        $sellerToken = $response->json('token');
        $this->assertNotNull($sellerToken, 'Seller login failed after OTP');

        // 5. Seller Adds Product
        $seller = Seller::where('email', $sellerEmail)->first();
        Sanctum::actingAs($seller, ['seller']);
        $response = $this->postJson('/api/seller/products', [ 
            'name' => 'E2E Test Product',
            'slug' => 'e2e-test-product-' . uniqid(),
            'price' => 100,
            'category' => 'Men',
            'season' => 'Winter',
            'description' => 'Test Description',
            'stock' => 10,
            'images' => [
                'main' => \Illuminate\Http\UploadedFile::fake()->create('test.jpg', 100),
                'hover' => \Illuminate\Http\UploadedFile::fake()->create('hover.jpg', 100),
                'thumb' => \Illuminate\Http\UploadedFile::fake()->create('thumb.jpg', 100),
            ],
            'is_featured' => false
        ]);
        
        $response->assertStatus(201);
        $productId = $response->json('id');
        $this->assertNotNull($productId, 'Product creation failed');

        // 6. User Places Order
        // We need to re-find the user because the instance might be stale or we just want to be sure
        $user = User::where('email', $userEmail)->first();
        Sanctum::actingAs($user, ['*']); // User doesn't have specific abilities usually, or just '*'
        
        $response = $this->postJson('/api/orders', [
            'address_id' => $addressId, 
            'shipping_address' => [
                'name' => 'Test User',
                'address' => '123 Test St',
                'city' => 'Test City',
                'state' => 'Test State',
                'zip' => '12345',
                'phone' => '1234567890'
            ],
            'items' => [
                [
                    'product_id' => $productId,
                    'quantity' => 1,
                    'price' => 100
                ]
            ],
            'total_amount' => 100,
            'payment_method' => 'cod'
        ]);
        
        $response->assertStatus(201);
        $orderId = $response->json('order_id');
        $this->assertNotNull($orderId);

        // 7. Seller Checks Orders
        Sanctum::actingAs($seller, ['seller']);
        $response = $this->getJson('/api/seller/orders');
        $response->assertStatus(200);
        
        // Assert our order is in the list
        $orders = $response->json();
        $found = false;
        foreach ($orders as $order) {
            if ($order['id'] == $orderId) {
                $found = true;
                break;
            }
        }
        $this->assertTrue($found, 'Order not found in seller list');

        // 8. Seller Accepts Order
        $response = $this->putJson("/api/seller/orders/{$orderId}/status", [
            'status' => 'processing'
        ]);
        
        $response->assertStatus(200);
        $this->assertEquals('processing', $response->json('order.status'));
    }
}
