<?php

namespace App\Http\Resources\VideoCase;

use Illuminate\Http\Resources\Json\ResourceCollection;

class CaseCollection extends ResourceCollection
{
    public function toArray($request)
    {
        $this->collection->transform(function ($case) {
            return (new CaseResource($case));
        });
        return parent::toArray($request);
    }
}
