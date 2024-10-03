<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('company_name', 255); // ชื่อบริษัท
            $table->string('registration_number', 100)->unique(); // เลขทะเบียนบริษัท
            $table->string('industry', 100); // อุตสาหกรรมที่บริษัททำ
            $table->string('address', 255); // ที่อยู่บริษัท
            $table->string('city', 100); // เมือง
            $table->string('state', 100); // รัฐหรือจังหวัด
            $table->string('postal_code', 20); // รหัสไปรษณีย์
            $table->string('country', 100); // ประเทศ
            $table->string('phone', 20)->nullable(); // เบอร์โทรศัพท์
            $table->string('email', 255)->nullable(); // อีเมลบริษัท
            $table->string('website', 255)->nullable(); // เว็บไซต์บริษัท
            $table->decimal('annual_revenue', 15, 2)->nullable(); // รายได้ประจำปี
            $table->integer('number_of_employees')->nullable(); // จำนวนพนักงาน
            $table->boolean('is_active')->default(true); // สถานะบริษัท (เปิด/ปิด)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
