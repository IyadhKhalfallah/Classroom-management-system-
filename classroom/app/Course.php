<?php

namespace App;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $primaryKey = 'id_course';
    protected $fillable = [
        'type', 'name', 'link','description','user_id','subject'
    ]; 
    public function users()
    {
    	return $this->belongsTo(User::class);
    }
}
