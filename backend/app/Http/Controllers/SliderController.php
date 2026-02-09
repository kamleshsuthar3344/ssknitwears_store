<?php

namespace App\Http\Controllers;

use App\Models\Slider;
use Illuminate\Http\Request;

class SliderController extends Controller
{
    public function index()
    {
        return response()->json(Slider::where('status', true)->orderBy('order')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'image_desktop' => 'required|image',
            'image_mobile' => 'required|image'
        ]);

        $desktopPath = $request->file('image_desktop')->store('sliders', 'public');
        $mobilePath = $request->file('image_mobile')->store('sliders', 'public');

        $slider = Slider::create([
            'title' => $validated['title'],
            'subtitle' => $request->input('subtitle'),
            'image_path_desktop' => asset('storage/' . $desktopPath),
            'image_path_mobile' => asset('storage/' . $mobilePath),
            'link' => $request->input('link'),
            'order' => $request->input('order', 0),
            'status' => true
        ]);

        return response()->json($slider, 201);
    }
}
