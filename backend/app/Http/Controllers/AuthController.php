<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    public function register(Request $request) {
        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users,email',
            'mobile' => 'required|string|max:15', // Added mobile validation
            'password' => 'required|string|confirmed'
        ]);

        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'mobile' => $fields['mobile'], // Added mobile to creation
            'password' => Hash::make($fields['password']),
            'role' => 'user'
        ]);

        $token = $user->createToken('myapptoken')->plainTextToken;

        // Simulate Welcome Email
        \Log::info("==========================================");
        \Log::info("Subject: Welcome to SS Knitwear!");
        \Log::info("To: " . $user->email);
        \Log::info("Hi " . $user->name . ", thank you for registering with us.");
        \Log::info("==========================================");

        return response()->json([
            'user' => $user,
            'token' => $token
        ], 201);
    }

    public function login(Request $request) {
        $fields = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);

        if (!Auth::attempt($fields)) {
            return response()->json([
                'message' => 'Bad credentials'
            ], 401);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $token = $user->createToken('myapptoken')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ], 200);
    }

    public function logout(Request $request) {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $user->tokens()->delete();
        
        return response()->json([
            'message' => 'Logged out'
        ]);
    }

    public function me(Request $request) {
        return response()->json($request->user());
    }

    public function forgotPassword(Request $request) {
        $request->validate(['email' => 'required|email']);
        
        $user = User::where('email', $request->email)->first();

        if ($user) {
            $otp = rand(100000, 999999);
            // Store OTP in cache for 10 minutes
            \Cache::put('otp_' . $request->email, $otp, 600);

            // Simulate Sending OTP (Log it)
            \Log::info("==========================================");
            \Log::info("OTP for Password Reset");
            \Log::info("To: " . $request->email);
            \Log::info("Your OTP is: " . $otp);
            \Log::info("==========================================");
        }

        // Always return success to prevent user enumeration
        return response()->json(['message' => 'If an account exists, an OTP has been sent.']);
    }

    public function verifyOtp(Request $request) {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|string'
        ]);

        $cachedOtp = \Cache::get('otp_' . $request->email);

        if ($cachedOtp && $cachedOtp == $request->otp) {
            return response()->json(['message' => 'OTP Verified']);
        }

        return response()->json(['message' => 'Invalid or expired OTP'], 400);
    }

    public function resetPassword(Request $request) {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|string',
            'password' => 'required|string|confirmed'
        ]);

        $cachedOtp = \Cache::get('otp_' . $request->email);

        if (!$cachedOtp || $cachedOtp != $request->otp) {
            return response()->json(['message' => 'Invalid or expired OTP'], 400);
        }

        $user = User::where('email', $request->email)->first();

        if ($user) {
            $user->password = Hash::make($request->password);
            $user->save();
            
            // Clear OTP
            \Cache::forget('otp_' . $request->email);
            
            return response()->json(['message' => 'Password has been reset successfully.']);
        }

        return response()->json(['message' => 'User not found'], 404);
    }
    public function updateProfile(Request $request) {
        $user = $request->user();

        $validated = $request->validate([
            'name' => 'required|string',
            'mobile' => 'required|string|max:15',
            'current_password' => 'nullable|string',
            'new_password' => 'nullable|string|min:6|confirmed',
        ]);

        $user->name = $validated['name'];
        $user->mobile = $validated['mobile'];

        if ($request->filled('current_password') && $request->filled('new_password')) {
            if (!Hash::check($request->current_password, $user->password)) {
                return response()->json(['message' => 'Current password does not match'], 400);
            }
            $user->password = Hash::make($request->new_password);
        }

        $user->save();

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user
        ]);
    }
}
