<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Actions\OEmbed;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Pagination\LengthAwarePaginator;

class SoundCloudController extends Controller
{
    public function show()
    {
        $allTracks = Cache::remember("soundcloud_tracks", 60 * 60, function () {
            return $this->loadTracks();
        });
        $currentPage = LengthAwarePaginator::resolveCurrentPage();
        $tracks = collect($allTracks)->forPage(
            $currentPage,
            config("eiie.pagination_size")
        );
        $paginated = new LengthAwarePaginator(
            $tracks,
            count($allTracks),
            config("eiie.pagination_size"),
            $currentPage,
            [
                "path" => url()->current(),
            ]
        );
        return view("soundcloud", ["paginated" => $paginated]);
    }

    protected function loadTracks()
    {
        $client_id = "1cf1ebd97aeb057f0f6711daed0d7e80";
        $view = "";
        $userid = "254740937";
        $offset = 0;
        $url =
            "https://api.soundcloud.com/users/" .
            $userid .
            "/tracks.json?client_id=" .
            $client_id .
            "&order=created_at&offset=" .
            $offset .
            "&limit=200&linked_partitioning=1";
        $response = Http::get($url);
        $json = $response->json();
        return empty($json["collection"]) ? [] : $json["collection"];
    }
}

/**
 * https://api.soundcloud.com/users/254740937/tracks.json?client_id=1cf1ebd97aeb057f0f6711daed0d7e80&order=created_at&offset=0&limit=200&linked_partitioning=1
 */
