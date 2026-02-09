<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Seller extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'mobile',
        'password',
        'shop_name',
        'shop_description',
        'status',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'password' => 'hashed',
    ];

    protected $appends = ['role'];

    public function getRoleAttribute()
    {
        return 'seller';
    }

    public function products()
    {
        return $this->hasMany(Product::class, 'user_id'); // We might need to rename user_id to seller_id later if we strictly separate
    }
}
