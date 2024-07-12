<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemCollectionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('item_collection', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('item_id')->constrained()->onDelete('cascade');
            $table->foreignId('collection_id')->constrained()->onDelete('cascade');
            $table->integer('order')->default(9999999);
            $table->integer('item_order')->default(9999999);
            $table->unique(['item_id', 'collection_id']);
        });
        Schema::create('collection_collection', function (Blueprint $table) {
        	$table->id();
        	$table->timestamps();
        	$table->foreignId('sub_id')->constrained('collections')->onDelete('cascade');
        	$table->foreignId('parent_id')->constrained('collections')->onDelete('cascade');
        	$table->integer('sub_order')->default(9999999);
            $table->integer('parent_order')->default(9999999);
            $table->unique(['parent_id', 'sub_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('item_collection');
        Schema::dropIfExists('collection_collection');
    }
}
