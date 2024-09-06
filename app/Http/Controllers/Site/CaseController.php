<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Http\Resources\VideoCase\SiteCaseCollection;
use App\Services\CaseService;

class CaseController extends Controller
{
    protected CaseService $caseService;

    public function __construct(CaseService $caseService)
    {
        $this->caseService = $caseService;
    }

    public function index()
    {
        return new SiteCaseCollection($this->caseService->getAll());
    }
}
