<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class CoopProject extends Model
{
    use HasFactory;

    public $with = ["partners"];

    public function content()
    {
        return $this->belongsTo(ItemContent::class)->withoutGlobalScopes();
    }

    public function getOutcomesAttribute($value)
    {
        // return null;
        if ($value === '[{"type":"p","children":[{"text":""}]}]') {
            return null;
        }
        return $value;
    }

    // /**
    //  *
    //  * @return \Illuminate\Database\Eloquent\Casts\Attribute
    //  */
    // protected function outcomes(): Attribute
    // {
    //     return Attribute::make(
    //         get: function ($value) {
    //             return [];
    //             return $value;
    //         }
    //     );
    // }

    public function item()
    {
        // return $this->hasOneThrough(Item::class, ItemContent::class);
        // return $this->belongsToMany(Item::class, "item_contents");
        return $this->content->item;
    }

    public function partners()
    {
        return $this->hasMany(CoopProjectPartner::class)
            ->select("coop_project_partners.*", "country.title AS country_name")
            ->leftJoinSub(
                CollectionContent::select("collection_id", "title", "id"),
                "country",
                fn($join) => $join->on(
                    "country_collection_id",
                    "=",
                    "country.collection_id"
                )
            )
            ->orderByRaw("COALESCE(country_name, 'zzz') asc")
            ->orderBy("role", "asc")
            ->orderBy("name", "asc");
    }

    public function partnersBenefitting()
    {
        return $this->partners()->where("role", "benefitting");
    }

    public function partnersDevCoop()
    {
        return $this->partners()->where("role", "dev_coop");
    }

    public function partnerMembers()
    {
        return $this->hasManyThrough(
            Item::class,
            CoopProjectPartner::class,
            "coop_project_id",
            "affiliate_item_id"
        )->as("partner");
    }

    public function partnerCountries()
    {
        return $this->belongsToMany(
            Collection::class,
            "coop_project_partners",
            "coop_project_id",
            "country_collection_id"
        )->distinct();
    }

    public function partnerBenefittingCountries()
    {
        return $this->partnerCountries()->where(
            "coop_project_partners.role",
            "benefitting"
        );
    }

    public function scopePublished($q)
    {
        return $q->whereHas(
            "content",
            fn($q) => $q->withoutGlobalScopes()->has("item")
        );
    }

    public function scopeCurrent($q)
    {
        return $q
            ->where("year_start", "<=", date("Y"))
            ->where("year_end", ">=", date("Y") - 2);
    }
}
