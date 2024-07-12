<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCollectionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('collections', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('type');
            $table->enum('status', ['published', 'unpublished', 'archived', 'draft']);
            $table->timestamp('publish_at')->nullable();
            $table->string('layout')->nullable();
            $table->enum('ordering', ['date', 'manual', 'alphabet']);
            $table->enum('display', ['show', 'hide', 'hide_as_sublist']);
            $table->integer('slots_template_id')->nullable(); 
            $table->string('old_type')->nullable();
            $table->string('old_id')->nullable();
        });
        Schema::create('collection_contents', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('collection_id')->constrained()->onDelete('cascade');
            $table->string('lang', 3)->default('*'); // language code or * for fallback
            $table->string('title', 1000)->default('');
            $table->string('subtitle', 1000)->nullable();
            $table->string('slug', 1000)->default('-');
            $table->longText('blurb')->nullable();
/*             $table->string('lead_image');
            $table->string('lead_image_caption')->nullable();
            $table->string('thumb_image'); */
            $table->json('meta')->nullable(); // placeholder for meta info we might need later on
        });

        Schema::create('collection_imageitems', function (Blueprint $table) {
        	$table->id();
        	$table->foreignId('collection_id')->constrained()->onDelete('cascade');
        	$table->foreignId('imageitem_id')->constrained('items')->onDelete('cascade');
        	$table->integer('order');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('collection_contents');        		
        Schema::dropIfExists('collection_imageitems');
        Schema::dropIfExists('collections');
    }
}
