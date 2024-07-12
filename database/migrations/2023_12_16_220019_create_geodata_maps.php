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
        Schema::create("geodata_maps", function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("label");
            $table->foreignId("dataset_id")->constrained("geodata_sets");
            $table->json("config");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists("geodata_maps");
    }
};
