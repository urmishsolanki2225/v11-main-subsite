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
            $table->bigIncrements('id');
            $table->unsignedBigInteger('region_id');
            $table->string('name', 255);
            $table->string('aliase_name', 255);
            $table->longText('address');
            $table->string('phone', 255);
            $table->string('fax', 255);
            $table->string('email', 255);
            $table->longText('map_url')->nullable();
            $table->longText('primary_color');
            $table->longText('secondary_color');
            $table->enum('is_active', ['active', 'in-active']);
            $table->longText('tracking_code')->nullable();
            $table->string('view_id', 255)->nullable();
            $table->string('facebookURL', 255)->nullable();
            $table->string('twitterURL', 255)->nullable();
            $table->string('youtubeURL', 255)->nullable();
            $table->string('soundcloudURL', 255)->nullable();
            $table->string('languages', 255)->nullable();
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
        Schema::table('items', function (Blueprint $table) {
            $table->enum('is_site', ['1', '2', '3'])->default('1')->comment('1 for Mainsite, 2 for Subsite, 3 for Bothsite');
        });
        Schema::table('collections', function (Blueprint $table) {
            $table->enum('is_site', ['1', '2'])->default('1')->comment('1 for Mainsite, 2 for Subsite');
        });
        Schema::table('users', function (Blueprint $table) {
            $table->unsignedBigInteger('subsite_id')->nullable()->after('id');
            $table->foreign('subsite_id')->references('id')->on('subsites')->onDelete('cascade');
        });
        DB::statement("
            ALTER TABLE `users` 
            MODIFY `role` ENUM('editor', 'admin', 'subsiteadmin') 
            CHARACTER SET utf8mb4 
            COLLATE utf8mb4_unicode_ci 
            NOT NULL DEFAULT 'editor'
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {       
        Schema::dropIfExists('subsites');
        Schema::dropIfExists('subsites_contact_us');        
        Schema::table('items', function (Blueprint $table) {
            $table->dropColumn('is_site');
        });
        Schema::table('collections', function (Blueprint $table) {
            $table->dropColumn('is_site');
        });
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['subsite_id']);
            $table->dropColumn('subsite_id');
        });
        DB::statement("
            ALTER TABLE `users` 
            MODIFY `role` ENUM('editor', 'admin') 
            CHARACTER SET utf8mb4 
            COLLATE utf8mb4_unicode_ci 
            NOT NULL DEFAULT 'editor'
        ");
    }
};
