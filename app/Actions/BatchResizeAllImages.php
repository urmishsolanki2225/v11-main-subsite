<?php

namespace App\Actions;

use App\Models\ResourceImage;
use Exception;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Lorisleiva\Actions\Concerns\AsAction;

class BatchResizeAllImages
{
    use AsAction;

    public string $commandSignature = "eiie:batch-resize-images";

    public function handle()
    {
        ini_set("memory_limit", "256M");
        ResourceImage::whereNot("path", "like", "image/%")
            ->with([
                "content.item" => fn($q) => $q->withoutGlobalScopes(),
                "content.item.imageForItems" => fn(
                    $q
                ) => $q->withoutGlobalScopes(),
            ])
            ->chunk(100, function ($resourceImages) {
                foreach ($resourceImages as $resourceImage) {
                    $bgColor = config("eiie.image_background_fallback");
                    if (
                        !empty(
                            $resourceImage->content->item->imageForItems[0]
                                ->support_color
                        )
                    ) {
                        $bgColor =
                            $resourceImage->content->item->imageForItems[0]
                                ->support_color;
                    }
                    // get a new base path
                    $path = str_replace("img/", "", $resourceImage->path);
                    if (Storage::exists("img/" . $path)) {
                        if ($this->command) {
                            $this->command->info(
                                $resourceImage->id . " doing... "
                            );
                        }
                        $newPath = "image/" . $path;
                        Storage::copy("img/" . $path, $newPath . "/original");
                        try {
                            StoreResizedImages::run($newPath, $bgColor);
                            $resourceImage->path = $newPath;
                            $resourceImage->save();
                        } catch (Exception $ex) {
                            if ($this->command) {
                                $this->command->error($ex);
                            }
                        }
                    } else {
                        if ($this->command) {
                            $this->command->info(
                                $resourceImage->id . " not found " . $path
                            );
                        }
                    }
                    if ($resourceImage->id % 100 === 0 && $this->command) {
                        $this->command->info("done: " . $resourceImage->id);
                    }
                }
            });
    }

    public function asCommand(Command $command): void
    {
        $this->command = $command;
        $this->handle();
    }
}
