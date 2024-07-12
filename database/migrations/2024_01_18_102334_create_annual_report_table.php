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
        Schema::create('annual_reports', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->timestamp('publish_at')->nullable();
            $table->integer('year')->nullable();
            $table->integer('month')->nullable();
            $table->enum('type', [
                'summary', 'highlight'
            ]);
            $table->enum('status', ['published', 'unpublished', 'archived', 'draft']);
            $table->timestamp('deleted_at')->nullable();
            $table->integer('order_index')->nullable();
            $table->enum('published_reports', ['0', '1'])->default('0');
            $table->timestamp('main_publish_at')->nullable();

        });
        Schema::create('annual_report_contents', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('annualreport_id')->constrained('annual_reports')->onDelete('cascade');
            $table->string('lang', 3)->default('*'); // language code or * for fallback
            $table->string('title', 1000)->default('');
            $table->string('slug', 1000)->default('-');
            $table->mediumText('blurb')->nullable();
            $table->mediumText('content')->nullable();
            $table->longText('blurb_json')->nullable();
            $table->longText('content_json')->nullable();
        });
        Schema::create('annual_report_images', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('content_id')->nullable()->constrained('annual_report_contents')->onDelete('cascade');
            $table->integer('year')->nullable();
            $table->string('path', 1000);            
        });
        Schema::create('annual_report_item', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('item_id')->constrained('items')->onDelete('cascade');
            $table->foreignId('annualreport_id')->constrained('annual_reports')->onDelete('cascade');
            $table->unique(['item_id', 'annualreport_id']);
            $table->integer('order')->nullable();   

        });
        Schema::table('items', function (Blueprint $table) {
            $table->enum('is_active', ['0', '1'])->default('0')->comment('1 for active, 0 for inactive, default 0');
        });
        Schema::create('anuual_reports_video', function (Blueprint $table) {
            $table->id();
            $table->timestamps();            
            $table->integer('year')->nullable();
            $table->string('provider', 50);
            $table->string('provider_id', 50);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('annual_report');
        Schema::dropIfExists('annual_report_contents');
        Schema::dropIfExists('annual_report_images');
        Schema::dropIfExists('annual_report_item');
        Schema::table('items', function (Blueprint $table) {
            $table->dropColumn('is_active');
        });
    }
};