<?php

namespace App;
use Illuminate\Database\Eloquent\Model;
use App\Grade;

class Subject extends Model
{
    protected $table = 'subject';
    protected $fillable = [
        'name', 'coefficient'
    ];

    public function grade(){
        return $this->hasMany('App\Grade');
    }
}
