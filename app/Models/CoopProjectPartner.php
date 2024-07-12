<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class CoopProjectPartner extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $with = [
        "country:id,type",
        "country.content:id,collection_id,title",
    ];

    public function project()
    {
        return $this->belongsTo(CoopProject::class, "coop_project_id");
    }

    public function country()
    {
        return $this->belongsTo(Collection::class, "country_collection_id");
    }
}
