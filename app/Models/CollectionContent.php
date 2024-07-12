<?php

namespace App\Models;

use App\Scopes\LanguageScope;
use Illuminate\Support\Str;

class CollectionContent extends Model
{
    protected $touches = ["collection"];
    protected $guarded = ["content"];
    protected $casts = ["meta" => "array"];

    protected static function booted()
    {
        static::addGlobalScope(new LanguageScope());
    }

    public function setTitleAttribute($val)
    {
        $this->attributes["title"] = $val;
        // always override slug
        $this->attributes["slug"] = Str::slug($val);
    }

    public function collection()
    {
        return $this->belongsTo("App\Models\Collection");
    }
}
