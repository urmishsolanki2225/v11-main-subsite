<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDevelopmentCooperationProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create("coop_projects", function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table
                ->foreignId("content_id")
                ->constrained("item_contents")
                ->cascadeOnDelete();
            $table->integer("year_start");
            $table->integer("year_end");
            $table->mediumText("description");
            $table->mediumText("objectives");
            $table->mediumText("activities");
            $table->mediumText("outcomes")->nullable();
            $table->string("url")->nullable();
            $table->string("public_email")->nullable();
            $table->string("contact_name");
            $table->string("contact_email");
            $table->mediumText("funding");
            $table->string("budget_currency", 10)->nullable();
            $table->integer("budget_amount")->nullable();
            $table->mediumText("remark_internal")->nullable();
            $table->boolean("is_reviewed")->default(false);
        });

        Schema::create("coop_project_partners", function (Blueprint $table) {
            $table->id();
            $table->foreignId("coop_project_id")->constrained();
            $table
                ->foreignId("affiliate_item_id")
                ->nullable()
                ->constrained("items")
                ->nullOnDelete();
            $table
                ->foreignId("country_collection_id")
                ->nullable()
                ->constrained("collections")
                ->nullOnDelete();
            $table->string("name")->default("");
            $table->enum("role", ["benefitting", "dev_coop"]);
        });

        DB::statement(
            "ALTER TABLE `items` CHANGE COLUMN `type` `type` ENUM('static','article','resource','affiliate','person','library','slot','contact','dcproject','dev_coop_project') NOT NULL DEFAULT 'article'"
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists("coop_project_partners");
        Schema::dropIfExists("coop_projects");
    }
}
