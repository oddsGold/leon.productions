<?php

namespace App\Http\Requests\Admin\Contact;

use App\Http\Requests\Admin\BaseRequest;

class DescriptionRequest extends BaseRequest
{
    public function rules()
    {
        return [
            'description' => 'nullable|string',
        ];
    }
}
