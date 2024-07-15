<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
//Added By Cyblance for delete functionality start
use Illuminate\Database\Eloquent\SoftDeletes;
//Added By Cyblance for delete functionality end

class User extends Authenticatable
{
    //Added By Cyblance for delete functionality start
    use HasFactory, Notifiable, SoftDeletes;
    //Added By Cyblance for delete functionality end

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    //Added By Cyblance for delete functionality start
    protected $dates = ['deleted_at'];
    //Added By Cyblance for delete functionality end
    
    protected $fillable = [
        'name',
        'email',
        'password',
        //Added by Cyblance to add role in database start
        'role',
        //Added by Cyblance to add role in database end
        //Added by Cyblance for Subsite section start
        'subsite_id'
        //Added by Cyblance for Subsite section end
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
