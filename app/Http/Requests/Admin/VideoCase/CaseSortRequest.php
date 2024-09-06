<?php

namespace App\Http\Requests\Admin\VideoCase;

use App\Http\Requests\Admin\BaseRequest;

class CaseSortRequest extends BaseRequest
{
    public function rules()
    {
        return [
            'sequence' => 'required|array',
            'sequence.*' => 'required|integer'
        ];
    }
}
