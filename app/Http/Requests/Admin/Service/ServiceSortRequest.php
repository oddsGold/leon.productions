<?php

namespace App\Http\Requests\Admin\Service;

use App\Http\Requests\Admin\BaseRequest;

class ServiceSortRequest extends BaseRequest
{
    public function rules()
    {
        return [
            'sequence' => 'required|array',
            'sequence.*' => 'required|integer'
        ];
    }
}
