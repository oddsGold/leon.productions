<?php

namespace App\Http\Resources\Service;

use App\Http\Resources\BaseResource;

class ServiceForSiteResource extends BaseResource
{
    public function toArray($request)
    {
        return $this->filtrateFields([
            'id' => $this->id,
            'name' => $this->name,
        ]);
    }
}
