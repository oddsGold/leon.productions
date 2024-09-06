<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Contact\ContactRequest;
use App\Http\Requests\Admin\Contact\DescriptionRequest;
use App\Http\Requests\Admin\Contact\SocialMediaRequest;
use App\Services\ContactService;

class ContactController extends Controller
{
    protected ContactService $contactService;

    public function __construct(ContactService $contactService)
    {
        $this->contactService = $contactService;
    }

    public function showDescription()
    {
        $this->authorize('viewAny', $this->contactService->getResource());
        return $this->contactService->getDescription();
    }

    public function updateDescription(DescriptionRequest $request)
    {
        $this->authorize('update', $this->contactService->getResource());
        return $this->contactService->updateDescription($request->description);
    }

    public function showContacts()
    {
        $this->authorize('viewAny', $this->contactService->getResource());
        return $this->contactService->getContacts();
    }

    public function updateContacts(ContactRequest $request)
    {
        $this->authorize('update', $this->contactService->getResource());
        return $this->contactService->updateContacts($request->all());
    }

    public function showSocialMedia()
    {
        $this->authorize('viewAny', $this->contactService->getResource());
        return $this->contactService->getSocialMedia();
    }

    public function updateSocialMedia(SocialMediaRequest $request)
    {
        $this->authorize('update', $this->contactService->getResource());
        return $this->contactService->updateSocialMedia($request->all());
    }

}
