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
        Schema::table('queue_monitor', function (Blueprint $table) {
            $table->integer('year')->nullable();
            $table->string('lang', 10)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('queue_monitor', function (Blueprint $table) {
            $table->dropColumn(['year', 'lang']);
        });
    }
};
