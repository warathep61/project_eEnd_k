<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Company::insert([
            [
                'company_name' => 'Tech Innovators Co., Ltd.',
                'registration_number' => '1234567890',
                'industry' => 'Technology',
                'address' => '1234 Innovation Street',
                'city' => 'Bangkok',
                'state' => 'Bangkok',
                'postal_code' => '10100',
                'country' => 'Thailand',
                'phone' => '021234567',
                'email' => 'info@techinnovators.com',
                'website' => 'https://www.techinnovators.com',
                'annual_revenue' => 10000000.00,
                'number_of_employees' => 200,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'company_name' => 'Green Earth Solutions',
                'registration_number' => '9876543210',
                'industry' => 'Environmental Services',
                'address' => '5678 Green Park Avenue',
                'city' => 'Chiang Mai',
                'state' => 'Chiang Mai',
                'postal_code' => '50000',
                'country' => 'Thailand',
                'phone' => '053123456',
                'email' => 'contact@greenearth.com',
                'website' => 'https://www.greenearth.com',
                'annual_revenue' => 5000000.00,
                'number_of_employees' => 50,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'company_name' => 'Global Logistics Corp.',
                'registration_number' => '1122334455',
                'industry' => 'Logistics',
                'address' => '99 Port Road',
                'city' => 'Phuket',
                'state' => 'Phuket',
                'postal_code' => '83000',
                'country' => 'Thailand',
                'phone' => '076123456',
                'email' => 'support@globallogistics.com',
                'website' => 'https://www.globallogistics.com',
                'annual_revenue' => 20000000.00,
                'number_of_employees' => 500,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
