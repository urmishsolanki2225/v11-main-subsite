<?php

namespace App\Models;

class DCProject extends Model
{
    protected $table = 'dcprojects';
    public $timestamps = false;
    protected $casts = [
        'started_at' => 'datetime:Y-m-d', 
        'ended_at' => 'datetime:Y-m-d',
    ];

    public function content() {
        return $this->belongsTo(ItemContent::class);
    }

    public function organisations() {
        return $this->belongsToMany(
            'App\Models\Item', 
            'dcproject_organisations',
            'dcproject_id',
            'member_id'
        )
        ->withPivot('role', 'order')
        ->orderBy('order')
        ;
    }

    public function hostOrganisations() {
        return $this->organisations()
            ->where('role', 'host')
            ;
    }

    public function cooperatingOrganisations() {
        return $this->organisations()
            ->where('role', 'cooperating')
            ;
    }

}
