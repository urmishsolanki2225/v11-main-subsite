<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCollectionSlotsTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('collection_slots', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->integer('template_id');
            $table->integer('order');
        });
        Schema::create('collection_slot_titles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('slot_id')->constrained('collection_slots')->onDelete('cascade');
            $table->string('lang', 3)->default('*'); // language code or * for fallback
            $table->string('title', 1000);
            $table->string('slug', 1000);
        });
        Schema::create('collection_slot_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('collection_id')->constrained()->onDelete('cascade');
            $table->foreignId('slot_id')->constrained('collection_slots')->onDelete('cascade');
            $table->foreignId('item_id')->constrained()->onDelete('cascade');
            // $table->string('lang', 3); // otherwise we have to query very deep
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('collection_slot_items');
        Schema::dropIfExists('collection_slot_titles');
        Schema::dropIfExists('collection_slots');
    }
}
