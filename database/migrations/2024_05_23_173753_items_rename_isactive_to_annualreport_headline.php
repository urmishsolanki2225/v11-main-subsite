<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table("items", function (Blueprint $table) {
            $table->renameColumn("is_active", "annual_headline");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table("items", function (Blueprint $table) {
            $table->renameColumn("annual_headline", "is_active");
        });
    }
};
