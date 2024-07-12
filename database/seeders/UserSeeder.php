<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // some initial password to be reset
        User::upsert([
            ['email' => 'jan@misker.nl', 'name' => 'Jan Misker', 'password' => Hash::make('changeme'), 'role' => 'admin'],            
        ], ['email'], ['email', 'name', 'password', 'role']);
    }
}

