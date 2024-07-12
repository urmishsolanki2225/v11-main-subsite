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
        Schema::create("geodata_sets", function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("label");
            $table->string("source_label");
            $table->string("source_link");
        });
        Schema::create("geodata_columns", function (Blueprint $table) {
            $table->id();
            $table
                ->foreignId("set_id")
                ->constrained("geodata_sets")
                ->cascadeOnDelete();
            $table->string("data_type", 32);
        });
        Schema::create("geodata_column_labels", function (Blueprint $table) {
            $table->id();
            $table
                ->foreignId("column_id")
                ->constrained("geodata_columns")
                ->cascadeOnDelete();
            $table->string("lang", 3)->default("*"); // language code or * for fallback
            $table->string("label", 1000);
        });
        Schema::create("geodata_numeric_values", function (Blueprint $table) {
            $table->id();
            $table
                ->foreignId("column_id")
                ->constrained("geodata_columns")
                ->cascadeOnDelete();
            $table
                ->foreignId("country_id")
                ->constrained("collections")
                ->cascadeOnDelete();
            $table->decimal("value", 10, 2);
        });
        Schema::create("geodata_string_values", function (Blueprint $table) {
            $table->id();
            $table
                ->foreignId("column_id")
                ->constrained("geodata_columns")
                ->cascadeOnDelete();
            $table
                ->foreignId("country_id")
                ->constrained("collections")
                ->cascadeOnDelete();
            $table->string("lang", 3)->default("*"); // language code or * for fallback
            $table->string("value", 1000);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists("geodata_column_labels");
        Schema::dropIfExists("geodata_numeric_values");
        Schema::dropIfExists("geodata_string_values");
        Schema::dropIfExists("geodata_columns");
        Schema::dropIfExists("geodata_sets");
    }
};
