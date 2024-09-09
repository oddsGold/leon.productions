<?php

namespace App\Http\Resources\VideoCase;

use App\Http\Resources\BaseResource;

class SiteCaseResource extends BaseResource
{
    public function toArray($request)
    {
        return $this->filtrateFields([
            'id' => $this->id,
            'slug' => (string)$this->slug,
            'description' => (string)$this->description,
            'image' => $this->image ? asset($this->image->getPathAndName()) : null,
            'preview_url' => $this->preview_url,
            'main_url' => $this->main_url,
            'updated_at' => (string)date_custom_format($this->updated_at),
        ]);
    }
}
