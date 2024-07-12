<?php

namespace App\Actions;

use App\Models\Item;
use App\Models\ResourceLink;
use App\Models\ResourceVideo;
use App\Models\ResourceImage;
use App\Models\ResourceFile;
//Added by Cyblance for Annual-Reports section start
use App\Models\ResourceEmbed;
use Carbon\Carbon;
//Added by Cyblance for Annual-Reports section end

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class CreateResourceItem
{
    public function execute(Request $request)
    {
        $subtype = $request->input("subtype");
        switch ($subtype) {
            case "link":
                return $this->createLink($request->all());
            case "video":
                return $this->createVideo($request->all());
            case "image":
            case "image.portrait":
            case "image.square":
            case "image.icon":
                return $this->createImage($request);
            case "file":
                return $this->createFiles($request);
            case "embed":
                return $this->createEmbed($request->all());
            default:
                throw ValidationException::withMessages([
                    "subtype" => "Unknown resource subtype: " . $subtype,
                ]);
        }
    }

    protected function createLink(array $data)
    {
        return $this->createResourceItem(
            $data,
            ResourceLink::class,
            ["url" => $data["url"]],
            "links",
            ["url" => $data["url"], "label" => $data["title"], "order" => 0]
        );
    }

    protected function createVideo(array $data)
    {
        return $this->createResourceItem(
            $data,
            ResourceVideo::class,
            ["provider_id" => $data["provider_id"]],
            "videos",
            [
                "provider_id" => $data["provider_id"],
                "provider" => $data["provider"],
            ]
        );
    }

    protected function createImage(Request $request)
    {
        if ($request->hasFile("files")) {
            // should be only one
            // foreach ($request->file('files') as $file) {
            $file = $request->file("files")[0];
            // $name = $file->getClientOriginalName();
            $extension = $file->extension();
            $path = "";
            if ($extension == "svg") {
                // store svg in separate dir, public (vector)
                $path = $file->store("img_v");
            } else {
                // path is a folder inside img
                // with original.<extension> already stored
                $path = "image/" . $file->hashName();
                $file->storeAs($path, "original");
                StoreResizedImages::dispatchSync($path);
            }
            return $this->createResourceItem(
                $request->all(),
                ResourceImage::class,
                null,
                "images",
                ["path" => $path]
            );
        }
    }

    protected function createFiles(Request $request)
    {
        if ($request->hasFile("files")) {
            // should have been checked in validator
            $contents = $this->createItemAndContents($request->all());
            $paths = [];
            foreach ($request->file("files") as $file) {
                $path = $file->store("files");
                $path = Str::replaceFirst("files/", "", $path);
                $contents->files()->create([
                    "path" => $path,
                    "original_filename" => $file->getClientOriginalName(),
                ]);
            }
            $item = Item::where("id", $contents->item_id)
                ->with([
                    "content",
                    "content.links",
                    "content.images",
                    "content.videos",
                    "content.files",
                    "content.embeds",
                    "contents",
                ])
                ->first();
            return ["item" => $item, "exists" => false];
        }
    }

    protected function createEmbed(array $data)
    {
        return $this->createResourceItem(
            $data,
            ResourceEmbed::class,
            ["post_url" => $data["post_url"]],
            "embeds",
            [
                "post_url" => $data["post_url"],
            ]
        );
    }

    public function createResourceItem(
        $data,
        $model,
        $constraints,
        $relation,
        $create
    ) {
        $didExist = false;
        $item = false;
        if ($constraints) {
            $item = $this->checkExisting($model, $constraints, $data);
        }
        if ($item) {
            $didExist = true;
        } else {
            $contents = $this->createItemAndContents($data);
            $item = $contents->item;
            $contents->{$relation}()->create($create);
        }

        $item = Item::where("id", $item->id)
            ->with([
                "content",
                "content.links",
                "content.images",
                "content.videos",
                "content.files",
                "content.embeds",
                "contents",
            ])
            ->first();
        return ["item" => $item, "exists" => $didExist];
    }

    protected function checkExisting($model, $constraints, $data)
    {
        if (isset($data["force"]) && $data["force"]) {
            return;
        }
        $resource = $model::firstWhere($constraints);
        if ($resource) {
            return $resource->content->item;
        }
    }

    public function createItemAndContents($data)
    {
        $item = Item::create([
            "type" => "resource",
            "subtype" => $data["subtype"],
            "publish_at" => Carbon::now()->subMinute(1),
        ]);
        $title = $data["title"];
        if (!$title) {
            $title = "";
        }
        return $item->contents()->create([
            "lang" => "*",
            "title" => $title,
            "subtitle" => isset($data["subtitle"]) ? $data["subtitle"] : "",
            "slug" => Str::slug($title ? $title : "-"),
            "blurb" => isset($data["blurb"]) ? $data["blurb"] : "",
        ]);
    }
}
