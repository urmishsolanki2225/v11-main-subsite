<?php

namespace App\Http\Resources;

use App\View\Components\RenderContent;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\App;

class ItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $renderBlurb = new RenderContent(
            $this->content,
            "html",
            null,
            null,
            true
        );
        $renderContent = new RenderContent(
            $this->content,
            "html",
            null,
            null,
            false,
            true
        );
        $images = $this->images;
        if (!$images) {
            $images = [];
        } else {
            $images = $images->map(
                fn($img) => $img->content->images[0]->urls ?? []
            );
        }
        return [
            "id" => $this->id,
            "permalink" => $this->permalink,
            "publish_at" => $this->publish_at ?? $this->created_at,
            "publish_at_str" => (
                $this->publish_at ??
                ($this->created_at ?? Carbon::now())
            )
                ->locale(App::getLocale())
                ->isoFormat("D MMMM YYYY"),
            "title" => $this->content->title ?? "",
            "blurb" => $renderBlurb->output,
            "fulltext" => $renderContent->output,
            "images" => $images,
            "collections" => $this->whenLoaded(
                "collections",
                fn() => $this->collections->pluck("content.title")
            ),
        ];
    }
}
