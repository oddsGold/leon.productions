<?php

namespace App\Http\Requests\Admin\Footer;

use App\Http\Requests\Admin\BaseRequest;

class ContactRequest extends BaseRequest
{
    public function rules()
    {
        return [
            'email' => 'nullable|string|max:150|email:rfc',
            'whatsapp' => 'nullable|string',
            'telegram' => 'nullable|string',
            'phone' => 'nullable|string',
        ];
    }
}
