<?php

namespace App\Console\Commands;

use App\Actions\CleanHtml;
use App\Models\Item;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class MigrateEducation4Refugees extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = "eiie:migrate:ed4ref";

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = "Migrate specific items from old Education 4 Refugees website";

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        // database connection migrate has to be configured in config/database.php and contain the relevant table(s)
        $mapping = $this->getMapping();
        // foreach ($mapping["news"] as $newsIds) {
        //     $this->migrateItem($newsIds, [
        //         config("eiie.collection.news"),
        //         1318,
        //         1267,
        //     ]);
        // }
        foreach ($mapping["opinion"] as $opinionIds) {
            $this->migrateItem($opinionIds, [
                config("eiie.collection.opinion"),
                1318,
                1267,
            ]);
        }
        return Command::SUCCESS;
    }

    public function migrateItem($items, $collections)
    {
        $LANG = ["en", "fr", "es"];

        $item = Item::create([
            "type" => "article",
            "status" => "published",
            "old_type" => "ed4ref",
            "old_id" => $items[0],
        ]);
        $item->collections()->sync($collections);
        foreach ($items as $i => $id) {
            $oldItem = DB::connection("migrate")
                ->table("bksj9_content")
                ->select("*")
                ->where("id", $id)
                ->first();
            if (!$oldItem) {
                $this->error("Item not found #{$id}");
                continue;
            }
            $item->update([
                "created_at" => $oldItem->created,
                "updated_at" => $oldItem->created,
                "publish_at" => $oldItem->created,
            ]);
            $resp = Http::withBody(
                CleanHtml::clean($oldItem->introtext)->__toString(),
                "text/plain"
            )->post("http://localhost:8200/");
            if (!$resp->ok()) {
                $this->error("Error converting old item html #{$id}");
                $item->delete();
                continue;
            }
            $contentJson = $resp->json();
            $item->contents()->create([
                "lang" => $LANG[$i],
                "title" => $oldItem->title,
                "content_json" => json_encode(array_slice($contentJson, 1)),
                "blurb_json" => json_encode(array_slice($contentJson, 0, 1)),
            ]);
            $imgs = json_decode($oldItem->images);
            $imgIF = $imgs->image_intro
                ? "intro"
                : ($imgs->image_fulltext
                    ? "fulltext"
                    : null);
            if ($imgIF && !$item->images()->count()) {
                $path = $imgs->{"image_{$imgIF}"};
                $caption = $imgs->{"image_{$imgIF}_caption"};
                if ($path) {
                    // move image from tmp to image path
                    $path = str_replace("images/", "", $path);
                    if (!Storage::disk("local")->exists("ed4ref/" . $path)) {
                        Storage::disk("local")->copy(
                            "migrate_tmp/images/" . $path,
                            "ed4ref/" . $path
                        );
                    }
                    $itemImage = Item::create([
                        "type" => "resource",
                        "subtype" => "image",
                    ]);
                    $imageContent = $itemImage->contents()->create([
                        "lang" => "*",
                        "title" => $caption ?? "",
                    ]);
                    $imageContent->images()->create([
                        "path" => "ed4ref/{$path}",
                    ]);
                    $item->images()->attach($itemImage->id, ["order" => 1]);
                }
            }
        }
    }

    public function getMapping()
    {
        return [
            "opinion" => [[288], [287], [444]],
            "news" => [
                [441, 442, 443],
                [433],
                [431, 434, 436],
                [428],
                [427],
                [412],
                [404],
                [392],
                [373],
                [375],
                [363],
                [362],
                [364, 368, 386],
                [351, 352],
                [344],
                [341],
                [340],
                [339],
                [337],
                [319, 327],
                [318, 326],
                [312],
                [311],
                [310, 313],
                [292],
                [293],
                [291],
                [272],
                [269],
                [263],
                [261],
                [255],
                [238],
                [225],
                [221],
                [205, 113],
            ],
        ];
    }
}
