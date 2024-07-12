<?php

namespace App\Models;

class ResourceEmbed extends Model
{
    public $timestamps = false;

    public function content()
    {
        return $this->belongsTo(ItemContent::class);
    }
}
