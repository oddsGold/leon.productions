<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Services\ContactService;

class ContactController extends Controller
{

    protected ContactService $contactService;

    public function __construct(ContactService $contactService)
    {
        $this->contactService = $contactService;
    }

    public function index()
    {
        return [
            'description' => $this->contactService->getDescription(),
            'contacts' => $this->contactService->getContacts(),
            'socials' => $this->contactService->getSocialMediaForSite(),
        ];
    }
}
