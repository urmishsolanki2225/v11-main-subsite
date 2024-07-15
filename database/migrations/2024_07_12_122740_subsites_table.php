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
        Schema::create('subsites', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('region_id');
            $table->string('name');
            $table->string('aliase_name');
            $table->longText('address');
            $table->string('phone');
            $table->string('fax');
            $table->string('email');
            $table->longText('map_url')->nullable();
            $table->longText('primary_color');
            $table->longText('secondary_color');
            $table->enum('is_active', ['active', 'in-active']);
            $table->longText('tracking_code')->nullable();
            $table->string('view_id')->nullable();
            $table->timestamps();
        });
        Schema::create('subsites_contact_us', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('subsite_id')->nullable();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('subject')->nullable();
            $table->longText('message')->nullable();
            $table->timestamps();
            $table->softDeletes(); // Adding soft delete column
        });
        Schema::table('users', function (Blueprint $table) {
            $table->unsignedBigInteger('subsite_id')->nullable()->after('id');
            $table->foreign('subsite_id')->references('id')->on('subsites')->onDelete('cascade');
        });
        Schema::table('items', function (Blueprint $table) {
            $table->enum('is_site', ['1', '2', '3'])->default('1')->comment('1 for Mainsite, 2 for Subsite, 3 for Bothsite');
        });
        Schema::table('collections', function (Blueprint $table) {
            $table->enum('is_site', ['1', '2'])->default('1')->comment('1 for Mainsite, 2 for Subsite');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subsites');
        Schema::dropIfExists('subsites_contact_us');
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['subsite_id']);
            $table->dropColumn('subsite_id');
        });
        Schema::table('items', function (Blueprint $table) {
            $table->dropColumn('is_site');
        });
        Schema::table('collections', function (Blueprint $table) {
            $table->dropColumn('is_site');
        });
    }
};
