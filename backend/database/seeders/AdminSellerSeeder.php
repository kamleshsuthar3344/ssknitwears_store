<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\Admin;
use App\Models\Seller;

class AdminSellerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Clear Old Data
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Admin::truncate();
        Seller::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // 2. Create Super Admin
        Admin::create([
            'name' => 'Super Admin',
            'email' => 'ssknitwears14@gmail.com',
            'mobile' => '7665960093',
            'password' => Hash::make('ssknitwears14@123'),
        ]);

        // 3. Create Seller
        Seller::create([
            'name' => 'Main Seller',
            'email' => 'ssknitwears14@gmail.com',
            'mobile' => '7665960093',
            'password' => Hash::make('ssknitwears14@123'),
            'shop_name' => 'SS Knitwear Main',
            'status' => 'approved',
            // Note: Mobile column might not exist on Seller yet, if it does:
            // 'mobile' => '7665960093' 
        ]);
        
        $this->command->info('Admin and Seller accounts reset successfully.');
    }
}
