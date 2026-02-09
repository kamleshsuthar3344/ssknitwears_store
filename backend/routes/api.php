<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\SliderController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\ContactController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/verify-otp', [AuthController::class, 'verifyOtp']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{slug}', [ProductController::class, 'show']);
Route::get('/sliders', [SliderController::class, 'index']);
Route::post('/track-order', [OrderController::class, 'track']);
Route::post('/contact', [ContactController::class, 'store']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'me']);
    Route::post('/user/profile', [AuthController::class, 'updateProfile']);

    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);

    Route::post('/addresses', [AddressController::class, 'store']);
    Route::put('/addresses/{id}', [AddressController::class, 'update']);
    Route::get('/addresses', [AddressController::class, 'index']);

    // Admin routes
    Route::post('/products', [ProductController::class, 'store']); 
    Route::post('/sliders', [SliderController::class, 'store']);
});

// Admin Routes
Route::prefix('admin')->group(function () {
    Route::post('/login', [App\Http\Controllers\AdminAuthController::class, 'login']);
    Route::post('/verify-otp', [App\Http\Controllers\AdminAuthController::class, 'verifyOtp']);
    // Route::post('/register', [App\Http\Controllers\AdminAuthController::class, 'register']); // Disabled

    Route::middleware(['auth:sanctum', 'role:admin,super_admin'])->group(function () {
        Route::post('/logout', [App\Http\Controllers\AdminAuthController::class, 'logout']);
        Route::get('/me', [App\Http\Controllers\AdminAuthController::class, 'me']);
        
        Route::get('/stats', [App\Http\Controllers\AdminController::class, 'stats']);
        // Product Management for Admin
        Route::post('/products', [ProductController::class, 'store']);
    });
});

// Seller Routes
Route::prefix('seller')->group(function () {
    Route::post('/login', [App\Http\Controllers\SellerAuthController::class, 'login']);
    Route::post('/verify-otp', [App\Http\Controllers\SellerAuthController::class, 'verifyOtp']);
    // Route::post('/register', [App\Http\Controllers\SellerAuthController::class, 'register']); // Disabled

    Route::middleware(['auth:sanctum', 'role:seller'])->group(function () {
        Route::post('/logout', [App\Http\Controllers\SellerAuthController::class, 'logout']);
        Route::get('/me', [App\Http\Controllers\SellerAuthController::class, 'me']);

        Route::get('/products', [App\Http\Controllers\SellerController::class, 'products']);
        Route::get('/stats', [App\Http\Controllers\SellerController::class, 'stats']);
        Route::post('/products', [ProductController::class, 'store']);
        Route::put('/products/{id}', [ProductController::class, 'update']);
        Route::delete('/products/{id}', [ProductController::class, 'destroy']);
        
        Route::get('/orders', [App\Http\Controllers\SellerOrderController::class, 'index']);
        Route::put('/orders/{id}/status', [App\Http\Controllers\SellerOrderController::class, 'updateStatus']);
    });
});
