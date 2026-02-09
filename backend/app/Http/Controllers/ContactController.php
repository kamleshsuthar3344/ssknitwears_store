<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;



use Illuminate\Support\Facades\Http;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'subject' => 'required|string',
            'message' => 'required|string',
        ]);

        // Save to database
        \DB::table('contact_messages')->insert(array_merge($validated, [
            'created_at' => now(),
            'updated_at' => now(),
        ]));

        // Forward to FormSubmit.co (No backend password required)
        try {
            Http::post('https://formsubmit.co/ssknitwears14@gmail.com', [
                'name' => $validated['name'],
                'email' => $validated['email'],
                'subject' => $validated['subject'],
                'message' => $validated['message'],
                '_replyto' => $validated['email'], // Reply directly to customer
                '_subject' => 'New Contact: ' . $validated['subject'],
                '_template' => 'table',
                '_captcha' => 'false', // Disable captcha for API
            ]);
        } catch (\Exception $e) {
            \Log::error('Failed to forward contact form: ' . $e->getMessage());
        }

        return response()->json(['message' => 'Message sent successfully'], 201);
    }
}
