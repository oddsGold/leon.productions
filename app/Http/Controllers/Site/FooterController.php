<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Services\FooterService;

class FooterController extends Controller
{
    protected FooterService $footerService;

    public function __construct(FooterService $footerService)
    {
        $this->footerService = $footerService;
    }

    public function index()
    {
        return [
            'contact' => $this->footerService->getContacts()
        ];
    }
}
