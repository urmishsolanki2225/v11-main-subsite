<?php

namespace App\Models;

use App;

class AttachmentGroup extends Model
{
    // protected $with = [
    //     'attachments' => fn($q) => $q->whereHas('item.content'),
    // ];

    public function item() {
        return $this->belongsTo('App\Models\Item');
    }
    
    public function attachments() {
        return $this->hasMany('App\Models\Attachment')
                    ->orderBy('order');
    }

    public function content() {
        $locale = App::getLocale() ?? 'en';
        return $this->hasOne('App\Models\AttachmentGroupContent')
                    ->whereIn('lang', [$locale, '*']);
    }
    
    public function contents() {
        return $this->hasMany('App\Models\AttachmentGroupContent')
                    ->orderBy('lang');
    }
}
