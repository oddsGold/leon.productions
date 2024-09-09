<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\About\ContactRequest;
use App\Http\Requests\Admin\About\DescriptionRequest;
use App\Http\Requests\Admin\About\SocialMediaRequest;
use App\Services\About\AboutService;

class AboutController extends Controller
{
    protected AboutService $aboutService;

    public function __construct(AboutService $aboutService)
    {
        $this->aboutService = $aboutService;
    }

    public function showDescription()
    {
        $this->authorize('viewAny', $this->aboutService->getResource());
        return ['description' => (string)$this->aboutService->getDescription()];
    }

    public function updateDescription(DescriptionRequest $request)
    {
        $this->authorize('update', $this->aboutService->getResource());
        return ['description' => (string)$this->aboutService->updateDescription($request->description)];
    }

    public function showContacts()
    {
        $this->authorize('viewAny', $this->aboutService->getResource());
        return $this->aboutService->getContacts();
    }

    public function updateContacts(ContactRequest $request)
    {
        $this->authorize('update', $this->aboutService->getResource());
        return $this->aboutService->updateContacts($request->all());
    }

    public function showSocialMedia()
    {
        $this->authorize('viewAny', $this->aboutService->getResource());
        return $this->aboutService->getSocialMedia();
    }

    public function updateSocialMedia(SocialMediaRequest $request)
    {
        $this->authorize('update', $this->aboutService->getResource());
        return $this->aboutService->updateSocialMedia($request->all());
    }
}
