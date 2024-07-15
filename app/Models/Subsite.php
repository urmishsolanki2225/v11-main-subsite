<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Subsite extends Model
{
    use HasFactory, Notifiable;
    public $timestamps = true;
    protected $table = 'subsites';
    protected $guarded = [];

    protected $fillable = [
        'region_id',
        'name',
        'aliase_name',
        'address',
        'phone',
        'fax',
        'email',
        'map_url',
        'is_active',
        'primary_color',
        'secondary_color',
        'tracking_code',
        'view_id',
        'languages',
        'facebookURL',
        'twitterURL',
        'youtubeURL',
        'soundcloudURL',
    ];

    public function subsiteusers()
    {
        return $this->hasMany(Users::class);
    }
}
