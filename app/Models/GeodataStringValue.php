<?php

namespace App\Models;

use App\Scopes\LanguageScope;

class GeodataStringValue extends Model
{
    public $timestamps = false;

    protected static function booted()
    {
        static::addGlobalScope(new LanguageScope());
    }

    public function country()
    {
        return $this->belongsTo(Collection::class);
    }
}
