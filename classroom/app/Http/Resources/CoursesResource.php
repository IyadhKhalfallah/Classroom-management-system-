<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CoursesResource extends JsonResource
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
            'id_course'=> $this->id_course,
            'type'=> $this->type,
            'name' => $this->name,
            'subject' => $this->subject,
            'user_id'=>$this->user_id,
            'link' => $this->link,
            'description' => $this->description,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
]);
    }
}
