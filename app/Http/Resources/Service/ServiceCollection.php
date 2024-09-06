<?php

namespace App\Http\Resources\Service;

use Illuminate\Http\Resources\Json\ResourceCollection;

class ServiceCollection extends ResourceCollection
{
    public function toArray($request)
    {
        $this->collection->transform(function ($service) {
            return (new ServiceResource($service));
        });
        return parent::toArray($request);
    }
}
