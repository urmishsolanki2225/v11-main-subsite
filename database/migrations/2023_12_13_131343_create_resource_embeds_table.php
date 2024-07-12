<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('resource_embeds', function (Blueprint $table) {
            $table->id();
            $table->foreignId('content_id')->constrained('item_contents')->onDelete('cascade');
            $table->string('provider', 50);
            $table->longText('provider_id')->nullable()->change();
        });        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('resource_embeds');
    }
};
