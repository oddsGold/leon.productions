<?php

namespace App\Http\Requests\Admin\Footer;

use App\Http\Requests\Admin\BaseRequest;

class ContactRequest extends BaseRequest
{
    public function rules()
    {
        return [
            'email' => 'required|string|max:150|email:rfc',
            'whatsapp' => 'required|string',
            'telegram' => 'required|string',
            'phone' => 'required|string',
        ];
    }
}
