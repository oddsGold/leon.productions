<?php

namespace App\Http\Requests\Admin\VideoCase;

use App\Http\Requests\Admin\BaseRequest;

class CaseUpdateRequest extends BaseRequest
{
    public function rules()
    {
        return [
            'slug' => 'required|string|min:3|max:255|not_in:showreel',
            'description' => 'required|string|max:255',
            'preview_url' => 'nullable|string|max:150',
            'main_url' => 'required|string|max:150',
            'image' => 'nullable',
            'image.id' => 'nullable|integer',
            'image.name' => 'nullable|string',
            'image.path' => 'nullable|string',
            'image.url' => 'nullable|string',
            'published' => 'required|boolean',
            'published_at' => 'nullable|date_format:Y-m-d H:i:s',
            'published_to' => 'nullable|date_format:Y-m-d H:i:s'
        ];
    }
}
