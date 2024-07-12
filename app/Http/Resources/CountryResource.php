<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CountryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->content->title,
            'affiliates' => AffiliateResource::collection($this->items),
            'country_code' => !empty($this->items) ? $this->items[0]->affiliate->country_code : null,
            // 'type' => $this->type,
            // 'status' => $this->status,
        ];
    }
}
