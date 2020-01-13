<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class eventCalendar extends Model
{
    protected $fillable = [
        'title', 'description', 'type','date','user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
