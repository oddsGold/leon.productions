<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Footer\ContactRequest;
use App\Services\FooterService;

class FooterController extends Controller
{
    protected FooterService $footerService;

    public function __construct(FooterService $footerService)
    {
        $this->footerService = $footerService;
    }

    public function showContacts()
    {
        $this->authorize('viewAny', $this->footerService->getResource());
        return $this->footerService->getContacts();
    }

    public function updateContacts(ContactRequest $request)
    {
        $this->authorize('update', $this->footerService->getResource());
        return $this->footerService->updateContacts($request->all());
    }

}
