<?php

namespace App\Actions;

use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;
use Lorisleiva\Actions\Concerns\AsAction;

class StoreResizedImages
{
    use AsAction;

    public function handle(string $path, $bg = null)
    {
        Storage::setVisibility($path, "public");
        $imgData = Storage::get($path . "/original");
        if (!$imgData) {
            return;
        }
        if (!$bg) {
            $bg = config("eiie.image_background_fallback");
        }
        Storage::put(
            $path . "/card.jpg",
            Image::make($imgData)
                ->fit(724, 381)
                ->encode("jpg", 80),
            "public"
        );
        Storage::put(
            $path . "/portrait.jpg",
            Image::make($imgData)
                ->resize(724, 724, function ($constraint) {
                    $constraint->aspectRatio();
                })
                ->encode("jpg", 80),
            "public"
        );
        Storage::put(
            $path . "/thumb.jpg",
            Image::make($imgData)
                ->resize(300, 300, function ($constraint) {
                    $constraint->aspectRatio();
                })
                ->encode("jpg", 80),
            "public"
        );
        Storage::put(
            $path . "/lead.jpg",
            Image::make($imgData)
                ->fit(1448, 762)
                ->encode("jpg", 80),
            "public"
        );
        Storage::put(
            $path . "/inline.jpg",
            Image::make($imgData)
                ->resize(1448, null, function ($constraint) {
                    $constraint->aspectRatio();
                })
                ->encode("jpg", 80),
            "public"
        );
        Storage::put(
            $path . "/coverpage.jpg",
            Image::make($imgData)
                ->resize(1448, 762, function ($constraint) {
                    $constraint->aspectRatio();
                })
                ->resizeCanvas(1448, 762, "center", false, $bg)
                ->encode("jpg", 80),
            "public"
        );
    }
}
