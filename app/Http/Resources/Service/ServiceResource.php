<?php

namespace App\Http\Resources\Service;

use App\Http\Resources\BaseResource;

class ServiceResource extends BaseResource
{
    public function toArray($request)
    {
        return $this->filtrateFields([
            'id' => $this->id,
            'name' => $this->name,
            'user' => $this->user ? $this->user->login : null,
            'created_at' => (string)date_custom_format($this->created_at),
            'updated_at' => (string)date_custom_format($this->updated_at),
        ]);
    }
}
