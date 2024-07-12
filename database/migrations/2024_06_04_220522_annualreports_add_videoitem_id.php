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
        Schema::table("annual_reports", function (Blueprint $table) {
            $table
                ->foreignId("video_item_id")
                ->nullable()
                ->constrained("items");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table("annual_reports", function (Blueprint $table) {
            $table->dropConstrainedForeignId("video_item_id");
        });
    }
};
