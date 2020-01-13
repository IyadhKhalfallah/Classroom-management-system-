<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class GradeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return([
            'id'=> $this->id,
            'ds'=> $this->ds,
            'tp'=> $this->tp,
            'exam' => $this->exam,
            'average' => $this->average,
            'subject_id'=>$this->subject_id,
            'users_id'=>$this->users_id,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ]);
    }
}
