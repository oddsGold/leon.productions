<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\VideoCase\CaseCreateRequest;
use App\Http\Requests\Admin\VideoCase\CaseSortRequest;
use App\Http\Requests\Admin\VideoCase\CaseUpdateRequest;
use App\Http\Resources\VideoCase\CaseCollection;
use App\Http\Resources\VideoCase\CaseResource;
use App\Services\CaseService;
use Illuminate\Http\Request;

class CaseController extends Controller
{
    protected CaseService $caseService;

    public function __construct(CaseService $caseService)
    {
        $this->caseService = $caseService;
    }

    public function index()
    {
        $this->authorize('viewAny', get_class($this->caseService->getModel()));
        return new CaseCollection($this->caseService->getAllWithPagination());
    }

    public function store(CaseCreateRequest $request)
    {
        $this->authorize('create', get_class($this->caseService->getModel()));
        return new CaseResource($this->caseService->create($request->all()));
    }

    public function edit($id)
    {
        $this->authorize('update', $this->caseService->getModel());
        return new CaseResource($this->caseService->getById($id));
    }

    public function update(CaseUpdateRequest $request, $id)
    {
        $this->authorize('update', $this->caseService->getModel());
        return new CaseResource($this->caseService->update($id, $request->all()));
    }

    public function destroy(Request $request, $id)
    {
        $this->authorize('delete', $this->caseService->getModel());
        $this->caseService->delete($id);
    }

    public function sort(CaseSortRequest $request)
    {
        $this->authorize('update', $this->caseService->getModel());
        $this->caseService->changeSortBySequence($request->sequence);
    }
}
