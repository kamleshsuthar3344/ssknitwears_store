<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Slider extends Model
{
    protected $fillable = [
        'title',
        'subtitle',
        'image_path_desktop',
        'image_path_mobile',
        'link',
        'order',
        'status'
    ];

    protected $casts = [
        'status' => 'boolean',
    ];
}
