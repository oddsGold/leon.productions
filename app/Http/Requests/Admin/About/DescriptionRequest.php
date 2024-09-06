<?php

namespace App\Http\Requests\Admin\About;

use App\Http\Requests\Admin\BaseRequest;

class DescriptionRequest extends BaseRequest
{
    public function rules()
    {
        return [
            'description' => 'required|string',
        ];
    }
}
