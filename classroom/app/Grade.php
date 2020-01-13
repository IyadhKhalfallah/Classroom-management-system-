<?php

namespace App;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Grade extends Model
{
    protected $table = 'grade';
    protected $fillable = [
        'ds', 'tp', 'exam','subject_id','users_id'
    ];

    public function subject()
    {
        return $this->belongsTo('App\Subject');
    }


    public function user(){
        return $this->belongsTo(User::class);
    }
}
