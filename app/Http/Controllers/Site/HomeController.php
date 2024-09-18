<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Http\Resources\Service\SiteServiceResource;
use App\Http\Resources\VideoCase\SiteCaseCollection;
use App\Services\About\AboutService;
use App\Services\About\TypeOfWorksService;
use App\Services\CaseService;
use App\Services\ContactService;
use App\Services\FooterService;


class HomeController extends Controller
{

    protected AboutService $aboutService;
    protected TypeOfWorksService $typeOfWorksService;
    protected CaseService $caseService;
    protected ContactService $contactService;
    protected FooterService $footerService;

    public function __construct(
        AboutService $aboutService, TypeOfWorksService $typeOfWorksService,
        CaseService $caseService, ContactService $contactService, FooterService $footerService
    ){
        $this->aboutService = $aboutService;
        $this->typeOfWorksService = $typeOfWorksService;
        $this->caseService = $caseService;
        $this->contactService = $contactService;
        $this->footerService = $footerService;
    }

    public function index()
    {
        return view('site.pages.index',[
            'about' => [
                'description' => $this->aboutService->getDescription(),
                'services' => SiteServiceResource::collection($this->typeOfWorksService->getAll()),
                'contacts' => $this->aboutService->getContacts(),
                'socials' => $this->aboutService->getSocialMediaForSite(),
            ],
            'cases' => new SiteCaseCollection($this->caseService->getAll()),
            'contact' => [
                'description' => $this->contactService->getDescription(),
                'contacts' => $this->contactService->getContacts(),
                'socials' => $this->contactService->getSocialMediaForSite(),
            ],
            'footer' => [
                'contact' => $this->footerService->getContacts()
            ]
        ]);
    }
}
