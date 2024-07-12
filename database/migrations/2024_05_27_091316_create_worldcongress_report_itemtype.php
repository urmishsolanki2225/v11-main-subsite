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
        Schema::create("activityreport_congress", function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->softDeletes();
            $table
                ->foreignId("item_id")
                ->constrained("items")
                ->cascadeOnDelete();
            $table->integer("year_from", false, true);
            $table->integer("year_to", false, true);
        });
        DB::statement(
            "ALTER TABLE `items` CHANGE COLUMN `type` `type` ENUM('static','article','resource','affiliate','person','library','slot','contact','dcproject','dev_coop_project','activityreport_congress') NOT NULL DEFAULT 'article'"
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists("activityreport_congress");
    }
};
