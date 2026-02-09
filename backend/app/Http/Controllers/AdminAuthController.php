<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Admin;

class AdminAuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:admins',
            'password' => 'required|string|min:8', // removed confirmed for simplicity in chaos
        ]);

        $admin = Admin::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
        ]);

        $token = $admin->createToken('admin-token', ['admin'])->plainTextToken;

        return response()->json([
            'user' => $admin,
            'token' => $token,
            'role' => 'admin'
        ], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Attempt authentication (check email & password)
        if (Auth::guard('admin')->attempt($credentials)) {
            $user = Auth::guard('admin')->user();
            
            // Generate OTP
            $otp = rand(100000, 999999);
            \Cache::put('admin_otp_' . $user->email, $otp, 300); // 5 minutes

            // Simulate SMS to 7665960093
            \Log::info("==========================================");
            \Log::info("Admin Login OTP");
            \Log::info("To Mobile: 7665960093");
            \Log::info("Admin Email: " . $user->email);
            \Log::info("OTP: " . $otp);
            \Log::info("==========================================");

            return response()->json([
                'requires_otp' => true,
                'email' => $user->email,
                'message' => 'OTP sent to registered mobile number.'
            ]);
        }

        return response()->json(['message' => 'Invalid admin credentials'], 401);
    }

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|string',
        ]);

        $cachedOtp = \Cache::get('admin_otp_' . $request->email);

        if ($cachedOtp && $cachedOtp == $request->otp) {
             $user = Admin::where('email', $request->email)->first();
             
             if (!$user) {
                 return response()->json(['message' => 'User not found'], 404);
             }

             // Create Token
             $token = $user->createToken('admin-token', ['admin'])->plainTextToken;
             \Cache::forget('admin_otp_' . $request->email);

             return response()->json([
                'user' => $user,
                'token' => $token,
                'role' => 'admin'
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
