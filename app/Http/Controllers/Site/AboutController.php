<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Services\About\AboutService;
use App\Services\About\TypeOfWorksService;

class AboutController extends Controller
{
    protected AboutService $aboutService;
    protected TypeOfWorksService $typeOfWorksService;

    public function __construct(AboutService $aboutService, TypeOfWorksService $typeOfWorksService)
    {
        $this->aboutService = $aboutService;
        $this->typeOfWorksService = $typeOfWorksService;
    }

    public function index()
    {
        return [
            'description' => $this->aboutService->getDescription(),
            'services' => $this->typeOfWorksService->getAll(),
            'contacts' => $this->aboutService->getContacts(),
            'socials' => $this->aboutService->getSocialMediaForSite(),
        ];
    }
}
