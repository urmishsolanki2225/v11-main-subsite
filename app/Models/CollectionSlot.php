<?php

namespace App\Models;

use App;

class CollectionSlot extends Model
{
    protected $with = ['title'];

    //
    public function title() {
        $locale = App::getLocale() ?? 'en';
        return $this->hasOne('App\Models\CollectionSlotTitle', 'slot_id')
                    ->whereIn('lang', [$locale, '*']);
    }

    public function titles() {
        return $this->hasMany('App\Models\CollectionSlotTitle', 'slot_id')
                    ->orderBy('lang');
    }

}
