<?php

namespace App\Http\Requests\Admin\Service;

use App\Http\Requests\Admin\BaseRequest;

class ServiceCreateRequest extends BaseRequest
{
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
        ];
    }
}
