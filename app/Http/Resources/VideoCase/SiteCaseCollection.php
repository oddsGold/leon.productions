<?php

namespace App\Http\Resources\VideoCase;

use Illuminate\Http\Resources\Json\ResourceCollection;

class SiteCaseCollection extends ResourceCollection
{
    public function toArray($request)
    {
        $this->collection->transform(function ($case) {
            return new SiteCaseResource($case);
        });
        return parent::toArray($request);
    }
}
