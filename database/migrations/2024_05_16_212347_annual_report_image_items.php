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
        Schema::create("annual_report_imageitems", function (Blueprint $table) {
            $table->id();
            $table
                ->foreignId("annual_report_id")
                ->constrained()
                ->onDelete("cascade");
            $table
                ->foreignId("imageitem_id")
                ->constrained("items")
                ->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists("annual_report_imageitems");
    }
};
