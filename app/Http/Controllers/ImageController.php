<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Contracts\Filesystem\Factory;
use Intervention\Image\Exception\NotReadableException;
use League\Glide\Responses\LaravelResponseFactory;
use League\Glide\ServerFactory;

class ImageController extends Controller
{
    public function show(Filesystem $filesystem, Factory $factory, $path)
    {
        $server = ServerFactory::create([
            "response" => new LaravelResponseFactory(app("request")),
            "driver" => extension_loaded("imagick") ? "imagick" : "gd",
            "source" => $filesystem->getDriver(),
            // 'cache' => $filesystem->getDriver(),
            "cache" => $factory->disk("cache")->getDriver(),
            "source_path_prefix" => "img",
            "cache_path_prefix" => ".cache",
            "base_url" => "img",
            "presets" => [
                "lead" => [
                    "w" => 1448,
                    "h" => 762,
                    "fit" => "crop",
                    "q" => 80,
                ],
                "card" => [
                    "w" => 724,
                    "h" => 381,
                    "fit" => "crop",
                    "q" => 80,
                ],
                "portrait" => [
                    "w" => 724,
                    "h" => 724,
                    "fit" => "contain",
                    "q" => 80,
                ],
                "lead_mob" => [
                    "w" => 724,
                    "h" => 381,
                    "fit" => "crop",
                    "q" => 80,
                ],
                "card_mob" => [
                    "w" => 724,
                    "h" => 381,
                    "fit" => "crop",
                    "q" => 80,
                ],
                "portrait_mob" => [
                    "w" => 724,
                    "h" => 724,
                    "fit" => "contain",
                    "q" => 80,
                ],
                "coverpage" => [
                    "w" => 1448,
                    "h" => 762,
                    "fit" => "fill",
                    "q" => 80,
                    "bg" => config("eiie.image_background_fallback"),
                ],
                "coverpage_card" => [
                    "w" => 724,
                    "h" => 381,
                    "fit" => "fill",
                    "q" => 80,
                    "bg" => config("eiie.image_background_fallback"),
                ],
                "coverpage_card_mob" => [
                    "w" => 724,
                    "h" => 381,
                    "fit" => "fill",
                    "q" => 80,
                    "bg" => config("eiie.image_background_fallback"),
                ],
                "inline" => [
                    "w" => 1448,
                    "q" => 80,
                ],
            ],
        ]);

        try {
            $resp = $server->getImageResponse($path, request()->all());
        } catch (\League\Glide\Filesystem\FileNotFoundException $ex) {
            abort(404);
        } catch (NotReadableException $ex) {
            abort(404);
        }
        return $resp;
    }
}
