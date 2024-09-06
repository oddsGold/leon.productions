<?php

namespace App\Http\Requests\Admin\VideoCase;

use App\Http\Requests\Admin\BaseRequest;

class CaseCreateRequest extends BaseRequest
{
    public function rules()
    {
        return [
            'description' => 'required|string|max:255',
            'preview_url' => 'nullable|string|max:150',
            'main_url' => 'required|string|max:150',
            'published' => 'required|boolean',
            'published_at' => 'nullable|date_format:Y-m-d H:i:s',
            'published_to' => 'nullable|date_format:Y-m-d H:i:s'
        ];
    }
}
