<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class eventCalendarResource extends JsonResource
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
            'title'=> $this->title,
            'description' => $this->description,
            'user_id' => $this->user_id,
            'type'=>$this->type,
            'date' => $this->date,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ]);
    }
}
