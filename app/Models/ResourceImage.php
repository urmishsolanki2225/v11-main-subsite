<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;

class ResourceImage extends Model
{
    public $timestamps = false;
    public $appends = ["urls"];

    protected function urls(): Attribute
    {
        if (!str_starts_with($this->path, "image")) {
            return new Attribute(
                get: fn() => ["lead" => url("/img/{$this->path}?p=lead")]
            );
        }
        return new Attribute(
            get: fn() => ["lead" => url("/{$this->path}/lead.jpg")]
        );
    }

    public function content()
    {
        return $this->belongsTo(ItemContent::class);
    }
}
