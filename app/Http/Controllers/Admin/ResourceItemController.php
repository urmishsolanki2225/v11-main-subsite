<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\Item;
use App\Models\ItemContent;
use App\Filters\CollectionMemberFilter;
use App\Filters\SearchContentsAndResourcesFilter;
use App\Sorts\ItemContentTitleSort;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;

use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\AllowedInclude;

use Spatie\QueryBuilder\Filters\Filter;

use App\Actions\CreateResourceItem;
use App\Actions\StoreResizedImages;
use App\Models\ResourceImage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ResourceItemController extends Controller
{
    public function index(Request $request)
    {
        $items = QueryBuilder::for(Item::class)
            ->allowedFilters([
                AllowedFilter::exact("type"),
                AllowedFilter::exact("subtype"),
                // AllowedFilter::partial('search', 'contents.title'),
                AllowedFilter::custom(
                    "search",
                    new SearchContentsAndResourcesFilter()
                ),
                // AllowedFilter::exact('collection.id', null, false)
                AllowedFilter::custom(
                    "collection.id",
                    new CollectionMemberFilter()
                ),
            ])
            ->allowedSorts([
                "id",
                "created_at",
                "updated_at",
                "type",
                "layout",
                AllowedSort::custom(
                    "title",
                    new ItemContentTitleSort(),
                    "title"
                ),
                // AllowedSort::field('items_count', 'items_count')
            ])
            ->defaultSort("-created_at")
            ->with([
                "contents:id,item_id,title,lang,slug",
                "contents.images",
                "contents.links",
                "contents.videos",
                "contents.files",
            ])
            ->withoutGlobalScopes()
            // ->withCount(['items'])
            ->jsonPaginate()
            ->appends(request()->query());

        return response()->json(["resourceitems" => $items]);
    }

    public function show(Request $request, $id)
    {
        $item = Item::where("id", $id)
            ->with([
                "contents:id,item_id,title,lang",
                "contents.images",
                "contents.links",
                "contents.videos",
                "contents.files",
            ])
            ->withoutGlobalScopes()
            ->first();
        return response()->json($item);
    }

    public function store(Request $request, CreateResourceItem $createAction)
    {
        if ($request->user()->cannot("create", Item::class)) {
            // return Redirect::back()->withErrors(['error' => 'Not authorized']);
            return response()->json(["message" => "Not authorized"], 403);
        }

        $request->validate([
            "subtype" => "required",
            // 'title' => 'string',
            "url" => "url|required_if:subtype,link",
            "files" =>
                "required_if:subtype,image,image.portrait,image.square,image.icon",
            "files.*" => "file",
        ]);

        return response()->json($createAction->execute($request));
    }

    public function uploadFile(Request $request)
    {
        if ($request->user()->cannot("create", Item::class)) {
            // return Redirect::back()->withErrors(['error' => 'Not authorized']);
            return response()->json(["message" => "Not authorized"], 403);
        }
        $request->validate([
            "content_id" => "required",
            "files" => "required",
            "files.*" => "file",
        ]);

        $content = ItemContent::withoutGlobalScopes()->find(
            $request->input("content_id")
        );

        foreach ($request->file("files") as $file) {
            $path = $file->store("files");
            $path = Str::replaceFirst("files/", "", $path);
            $content->files()->create([
                "path" => $path,
                "original_filename" => $file->getClientOriginalName(),
                "label" => $request->input("label"),
            ]);
        }

        return response()->json(["success" => true, "path" => $path]);
        // return Redirect::route('admin.items.edit', $content->item_id)
        //             ->with(['info' => 'File uploaded']);
    }

    public function replaceImage(Request $request)
    {
        if ($request->user()->cannot("create", Item::class)) {
            // return Redirect::back()->withErrors(['error' => 'Not authorized']);
            return response()->json(["message" => "Not authorized"], 403);
        }
        $request->validate([
            "content_id" => "integer|required",
            "file" => "required|file",
        ]);

        $content = ItemContent::withoutGlobalScopes()->find(
            $request->input("content_id")
        );

        $file = $request->file("file");
        // $path = $file->store('img');
        // $path = Str::replaceFirst('img/', '', $path);
        $path = "image/" . $file->hashName();
        $file->storeAs($path, "original");
        StoreResizedImages::dispatchSync($path);
        $imgResource = $content->images()->first();
        if ($imgResource) {
            $oldPath = $imgResource->path;
            $imgResource->path = $path;
            $imgResource->save();
            if (str_starts_with($oldPath, "image")) {
                if (!ResourceImage::where("path", $oldPath)->exists()) {
                    Storage::move(
                        $oldPath,
                        str_replace("image/", "image_old/", $oldPath)
                    );
                }
            } else {
                if (!str_starts_with($oldPath, "img/")) {
                    $oldPath = "img/" . $oldPath;
                }
                Storage::move(
                    $oldPath,
                    str_replace("img/", "img_old", $oldPath)
                );
            }
        } else {
            Log::warning(
                "replaceImage for non existing content? " . $content->id
            );
        }
        // $content->images()->updateOrCreate(
        //     [
        //         "content_id" => $content->id,
        //     ],
        //     [
        //         "path" => $path,
        //     ]
        // );

        return response()->json(["success" => true, "path" => $path]);
    }
}
