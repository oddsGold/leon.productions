<?php

namespace App\Http\Resources\VideoCase;

use Illuminate\Http\Resources\Json\ResourceCollection;

class SiteCaseCollection extends ResourceCollection
{
    public function toArray($request)
    {
        $this->collection->transform(function ($case) {
            return (new CaseResource($case))->except(['user', 'published', 'published_at', 'published_to', 'position']);
        });
        return parent::toArray($request);
    }
}
