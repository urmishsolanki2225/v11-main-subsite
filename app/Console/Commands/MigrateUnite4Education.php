<?php

namespace App\Console\Commands;

use App\Actions\CleanHtml;
use App\Models\Item;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class MigrateUnite4Education extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = "eiie:migrate:unite4ed";

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = "Migrate specific items from old Unite 4 Education website";

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
        foreach ($mapping["opinion"] as $opinionIds) {
            $this->migrateItem($opinionIds, [
                config("eiie.collection.opinion"),
                1312,
                1466,
            ]);
        }
        return Command::SUCCESS;
    }

    public function migrateItem($items, $collections)
    {
        $LANG = ["en", "fr", "es"];
        $oldId = join("-", $items);

        $item = Item::create([
            "type" => "article",
            "status" => "published",
            "old_type" => "unite4ed",
            "old_id" => $oldId,
        ]);
        $item->collections()->sync($collections);
        foreach ($items as $i => $id) {
            if (!$id) {
                continue;
            }
            $oldItem = DB::connection("migrate")
                ->table("edintl_posts")
                ->select("*")
                ->where("id", $id)
                ->first();
            if (!$oldItem) {
                $this->error("Item not found #{$id}");
                continue;
            }
            $item->update([
                "created_at" => $oldItem->post_date,
                "updated_at" => $oldItem->post_date,
                "publish_at" => $oldItem->post_date,
            ]);
            $text = "<p>" . $oldItem->post_content . "</p>";
            $text = str_replace("\r\n\r\n", "</p><p>", $text);
            $text = str_replace("<strong>", "<h3>", $text);
            $text = str_replace("</strong>", "</h3>", $text);
            $resp = Http::withBody(
                CleanHtml::clean($text)->__toString(),
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
                "title" => $oldItem->post_title,
                "blurb_json" => json_encode(array_slice($contentJson, 0, 2)),
                "content_json" => json_encode(array_slice($contentJson, 2)),
            ]);
            if (!$item->images()->count()) {
                $postImage = DB::connection("migrate")
                    ->table("edintl_posts")
                    ->select("*")
                    ->where("post_parent", $id)
                    ->where("post_type", "attachment")
                    ->orderBy("id", "desc")
                    ->first();
                if ($postImage) {
                    $filename =
                        $postImage->post_name .
                        "." .
                        str_replace("image/", "", $postImage->post_mime_type);
                    if (
                        Storage::disk("local")->exists(
                            "unite4ed/{$filename}"
                        ) ||
                        copy(
                            $postImage->guid,
                            "./storage/app/unite4ed/" . $filename
                        )
                    ) {
                        $itemImage = Item::create([
                            "type" => "resource",
                            "subtype" => "image",
                        ]);
                        $imageContent = $itemImage->contents()->create([
                            "lang" => "*",
                            "title" => "",
                        ]);
                        $imageContent->images()->create([
                            "path" => "unite4ed/{$filename}",
                        ]);
                        $item->images()->attach($itemImage->id, ["order" => 1]);
                    } else {
                        $this->error(
                            "could not download " . $id . " " . $filename
                        );
                    }
                }
            }
        }
    }

    public function getMapping()
    {
        return [
            "opinion" => [
                [3051],
                [3057],
                [3072],
                [3104, 3241, 3245],
                [3110],
                [3223, 3277],
                [3250],
                [3256],
                [3262, 3303],
                [3282],
                [3295],
                [3321],
                [3326],
                [3329],
                [3333],
                [3342],
                [3349],
                [3363],
                [3091, 3237, 3210],
                [0, 3316],
                [2529],
                [2813],
                [2688],
                [2695],
                [2698],
                [2826],
                [2835, 2890],
                [2855],
                [2874],
                [2878],
                [3017],
                [2981],
                [2898],
                [2916],
                [2928, 2953, 2959],
                [3072],
                [3038],
                [3035],
                [3002],
                [2998],
                [2943],
                [2985],
                [3758, 3913],
                [3743],
                [3735],
                [3725],
                [3669],
                [3628],
                [3467],
                [3599, 0, 3597],
                [3585],
                [3567],
                [3522],
                [3497],
                [3478],
                [3400],
                [3404],
                [3391],
                [3375],
                [3363],
                [3349],
                [3342],
                [4057],
                [4051],
                [4016, 4045, 4030],
                [3984],
                [3994, 0, 3993],
                [3967],
                [3960],
                [3953],
                [3944],
                [3935],
                [3907, 0, 3904],
                [3899],
                [3884],
                [3848],
                [3827],
                [3821],
                [3813],
                [3778],
                [3772],
                [3763],
                [4319],
                [4308],
                [4294],
                [4280],
                [4248],
                [4226],
                [4239],
                [4220],
                [4202, 0, 4211],
                [4188],
                [4180],
                [4166],
                [4158],
                [4137],
                [4131],
                [4116],
                [4085],
                [4079],
                [4072],
                [4067],
                [4541, 4545],
                [4531],
                [4523],
                [4505],
                [4455, 4500, 4459],
                [4431],
                [4422],
                [4448, 0, 4442],
                [4416],
                [4411],
                [4393, 0, 4395],
                [4385],
                [4378],
                [4357, 4367, 4363],
                [4436],
                [4348],
                [4340],
                [4330, 4473, 4483],
                [4326],
                [0, 3631],
                [0, 3895],
                [0, 4123],
                [0, 4150],
                [0, 4173],
                [0, 4300],
                [0, 4371],
                [0, 0, 3930],
                [0, 0, 2948],
            ],
        ];
    }
}
