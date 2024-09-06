<?php

namespace App\Http\Requests\Admin\About;

use App\Http\Requests\Admin\BaseRequest;

class SocialMediaRequest extends BaseRequest
{
    public function rules()
    {
        return [
            'instagram_link' => 'required|string|max:400',
            'instagram_published' => 'required|boolean',
            'facebook_link' => 'required|string|max:400',
            'facebook_published' => 'required|boolean',
            'youtube_link' => 'required|string|max:400',
            'youtube_published' => 'required|boolean',
            'linkedin_link' => 'required|string|max:400',
            'linkedin_published' => 'required|boolean',
            'vimeo_link' => 'required|string|max:400',
            'vimeo_published' => 'required|boolean',
        ];
    }
}
