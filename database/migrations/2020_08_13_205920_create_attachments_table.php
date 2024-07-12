<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAttachmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('attachment_groups', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('item_id')->constrained()->onDelete('cascade');
            $table->integer('order')->default(999);
        });

        Schema::create('attachment_group_contents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('attachment_group_id')->constrained()->onDelete('cascade');
            $table->string('lang', 3)->default('*'); // language code or * for fallback
            $table->string('title', 1000)->nullable();
            $table->text('blurb')->nullable();
        });

        Schema::create('attachments', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('item_id')->constrained()->onDelete('cascade');
            $table->foreignId('attachment_group_id')->constrained()->onDelete('cascade');
            $table->integer('order')->default(999);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('attachments');
        Schema::dropIfExists('attachment_group_contents');
        Schema::dropIfExists('attachment_groups');
    }
}
