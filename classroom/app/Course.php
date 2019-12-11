<?php

namespace App;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = [
        'type', 'name', 'link','description','user_id'
    ]; 
    public function brand()
    {
    	return $this->belongsTo(User::class);
    }
}
