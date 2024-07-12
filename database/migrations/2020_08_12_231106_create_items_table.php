<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->timestamp('publish_at')->nullable();
            $table->enum('type', [
                'static', 'article', 'resource', 'affiliate', 'person', 'library', 'slot', 'contact', 'dcproject'
            ]);
            $table->enum('subtype', [
                'file', 'file_external', 'image', 'image.icon', 'image.square', 'image.portrait', 'video', 'link', 'embed'
            ])->nullable();
            $table->enum('status', ['published', 'unpublished', 'archived', 'draft']);
            $table->integer('editor_id')->nullable();
            $table->string('old_type')->nullable();
            $table->string('old_id')->nullable();
        });
        Schema::create('item_contents', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('item_id')->constrained()->onDelete('cascade');
            $table->string('lang', 3)->default('*'); // language code or * for fallback
            $table->string('title', 1000)->default('');
            $table->string('subtitle', 1000)->nullable();
            $table->string('slug', 1000)->default('-');
            $table->mediumText('blurb')->nullable();
//             $table->string('lead_image')->nullable();
//             $table->string('lead_image_caption')->nullable();
//             $table->string('thumb_image')->nullable();
//             $table->json('slideshow')->nullable();
            $table->mediumText('content')->nullable();
            // $table->json('resources')->nullable(); // array with labels and resource_uri's, later maybe in a table
            $table->json('footnotes')->nullable(); // array with footnotes, text or items 
            $table->json('meta')->nullable(); // placeholder for meta info we might need later on, always an object
        });
        
        Schema::create('item_imageitems', function (Blueprint $table) {
        	$table->id();
        	$table->foreignId('item_id')->constrained()->onDelete('cascade');
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
        Schema::dropIfExists('item_imageitems');
        Schema::dropIfExists('item_contents');
        Schema::dropIfExists('items');
    }
}
