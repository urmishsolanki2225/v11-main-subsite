<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class AddPartialorderToCollections extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("ALTER TABLE `collections` CHANGE COLUMN `ordering` `ordering` ENUM('date', 'manual', 'alphabet', 'partial_date') NOT NULL DEFAULT 'date'");

        // Schema::table('collections', function (Blueprint $table) {
        //     $table->
        // });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('collections', function (Blueprint $table) {
            //
        });
    }
}
