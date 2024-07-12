<?php

namespace App\Models;

use App\Scopes\LanguageScope;

class AttachmentGroupContent extends Model
{
    public $timestamps = false;

    protected static function booted() {
        static::addGlobalScope(new LanguageScope);
    }
 
}