<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
<<<<<<< HEAD
use App\Course;
use Tymon\JWTAuth\Contracts\JWTSubject;
use App\Grade;
use App\eventCalendar;

class User extends Authenticatable implements JWTSubject
=======

class User extends Authenticatable
>>>>>>> 29bd73bbbd8e58ba2e674c3b538e31020eaa0bfb
{

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
<<<<<<< HEAD

    public function courses()
    {
    	return $this->hasMany(Course::class);
    }
    public function grades()
    {
        return $this->hasMany(Grade::class);
    }
    public function event()
    {
        return $this->hasMany(eventCalendar::class);
    }
=======
>>>>>>> 29bd73bbbd8e58ba2e674c3b538e31020eaa0bfb
}
