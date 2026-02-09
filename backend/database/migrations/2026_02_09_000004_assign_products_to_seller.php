<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Product;
use App\Models\Seller;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $seller = Seller::first();

        if ($seller) {
            Product::whereNull('user_id')->update([
                'user_id' => $seller->id,
                'user_type' => Seller::class,
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No need to reverse this data fix
    }
};
