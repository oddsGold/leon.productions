<?php

namespace App\Http\Resources\VideoCase;

use App\Http\Resources\BaseResource;
use App\Http\Resources\Image\ImageResource;

class CaseResource extends BaseResource
{
    public function toArray($request)
    {
        return $this->filtrateFields([
            'id' => $this->id,
            'slug' => $this->slug,
            'description' => $this->description,
            'image' => (new ImageResource($this->image))->only(['id', 'url', 'name', 'path', 'created_at']),
            'preview_url' => $this->preview_url,
            'main_url' => $this->main_url,
            'user' => $this->user ? $this->user->login : null,
            'published' => (bool)$this->published,
            'published_at' => (string)date_custom_format($this->published_at, 'Y-m-d H:i:s'),
            'published_to' => (string)date_custom_format($this->published_to, 'Y-m-d H:i:s'),
            'created_at' => (string)date_custom_format($this->created_at),
            'updated_at' => (string)date_custom_format($this->updated_at),
        ]);
    }
}
