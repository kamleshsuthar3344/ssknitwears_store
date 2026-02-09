<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $user = null;

        if ($request->bearerToken()) {
            $user = Auth::guard('sanctum')->user();
        }

        if (!$user) {
            $user = $request->user();
        }

        if (!$user) {
             return response()->json(['message' => 'Unauthorized'], 401);
        }
        
        // Ensure user has a role property (should be in database)
        // If your User model uses a different column, adjust here.
        $userRole = $user->role ?? 'user';

        // "super_admin" can access everything (optional, but good practice)
        if ($userRole === 'super_admin') {
            return $next($request);
        }

        // Check if user's role is in the allowed roles list passed to middleware
        // usage: middleware('role:admin,seller')
        if (in_array($userRole, $roles)) {
            return $next($request);
        }

        return response()->json(['message' => 'Forbidden: Insufficient Permissions'], 403);
    }
}
