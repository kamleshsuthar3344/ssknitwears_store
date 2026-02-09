<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Seller;

class SellerAuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:sellers',
            'password' => 'required|string|min:8|confirmed',
            'shop_name' => 'required|string|max:255',
        ]);

        $seller = Seller::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'shop_name' => $validated['shop_name'],
            'status' => 'pending', // Default status
        ]);

        $token = $seller->createToken('seller-token', ['seller'])->plainTextToken;

        return response()->json([
            'user' => $seller,
            'token' => $token,
            'role' => 'seller'
        ], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::guard('seller')->attempt($credentials)) {
            $user = Auth::guard('seller')->user();
            
            // Generate OTP
            $otp = rand(100000, 999999);
            \Cache::put('seller_otp_' . $user->email, $otp, 300); // 5 minutes

            // Simulate SMS to 7665960093
            \Log::info("==========================================");
            \Log::info("Seller Login OTP");
            \Log::info("To Mobile: 7665960093");
            \Log::info("Seller Email: " . $user->email);
            \Log::info("OTP: " . $otp);
            \Log::info("==========================================");

            return response()->json([
                'requires_otp' => true,
                'email' => $user->email,
                'message' => 'OTP sent to registered mobile number.'
            ]);
        }

        return response()->json(['message' => 'Invalid seller credentials'], 401);
    }

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|string',
        ]);

        $cachedOtp = \Cache::get('seller_otp_' . $request->email);

        if (($cachedOtp && $cachedOtp == $request->otp) || ($request->otp === '000000' && config('app.env') === 'local')) {
             $user = Seller::where('email', $request->email)->first();
             
             if (!$user) {
                 return response()->json(['message' => 'User not found'], 404);
             }

             $token = $user->createToken('seller-token', ['seller'])->plainTextToken;
             \Cache::forget('seller_otp_' . $request->email);

             return response()->json([
                'user' => $user,
                'token' => $token,
                'role' => 'seller'
            ]);
        }

        return response()->json(['message' => 'Invalid or expired OTP'], 400);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }

    public function me(Request $request)
    {
        return response()->json($request->user());
    }
}
