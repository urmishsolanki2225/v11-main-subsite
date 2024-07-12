<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AffiliateResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // return $this->affiliate;
        $result = collect($this->affiliate)->only([
            'official_name', 'acronym', 
            'phone_main', 'phone_other', 'phone_other2',
            'fax_main', 'fax_other',
            'website', 'email', 'email_other',
            'street1', 'street2', 'street3', 'zip', 'city', 'state', 'country_code',
        ]);
        $result['name'] = $this->content->title;
        return $result;
    }
}
