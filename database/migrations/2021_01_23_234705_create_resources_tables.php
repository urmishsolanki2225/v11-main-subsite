<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateResourcesTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('resource_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('content_id')->constrained('item_contents')->onDelete('cascade');
            $table->string('path', 1000);
        });
        Schema::create('resource_videos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('content_id')->constrained('item_contents')->onDelete('cascade');
            $table->string('provider', 50);
            $table->string('provider_id', 50);
        });
        Schema::create('resource_links', function (Blueprint $table) {
            $table->id();
            $table->foreignId('content_id')->constrained('item_contents')->onDelete('cascade');
            $table->integer('order')->default(0);
            $table->string('url', 1000);
            $table->timestamp('checked_at')->nullable();
            $table->string('label', 1000)->nullable();
            // $table->string('pretext', 1000)->nullable();
            // $table->string('posttext', 1000)->nullable();
        });
        Schema::create('resource_files', function (Blueprint $table) {
            $table->id();
            $table->foreignId('content_id')->constrained('item_contents')->onDelete('cascade');
            $table->integer('order')->default(0);
            $table->string('path', 1000);
            $table->string('label', 1000)->nullable();
            $table->string('original_filename', 1000)->nullable();
            // $table->string('pretext', 1000)->nullable();
            // $table->string('posttext', 1000)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('resource_images');
        Schema::dropIfExists('resource_videos');
        Schema::dropIfExists('resource_links');
        Schema::dropIfExists('resource_files');
    }
}
