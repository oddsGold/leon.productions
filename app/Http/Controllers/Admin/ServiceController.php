<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Service\ServiceCreateRequest;
use App\Http\Requests\Admin\Service\ServiceSortRequest;
use App\Http\Requests\Admin\Service\ServiceUpdateRequest;
use App\Http\Resources\Service\ServiceCollection;
use App\Http\Resources\Service\ServiceResource;
use App\Services\About\TypeOfWorksService;
use Illuminate\Http\Request;

class ServiceController extends Controller
{

    protected TypeOfWorksService $typeOfWorksService;

    public function __construct(TypeOfWorksService $typeOfWorksService)
    {
        $this->typeOfWorksService = $typeOfWorksService;
    }

    public function index()
    {
        $this->authorize('viewAny', $this->typeOfWorksService->getResource());
        return new ServiceCollection($this->typeOfWorksService->getAllWithPagination());
    }

    public function store(ServiceCreateRequest $request)
    {
        $this->authorize('create', $this->typeOfWorksService->getResource());
        return new ServiceResource($this->typeOfWorksService->create($request->all()));
    }

    public function edit($id)
    {
        $this->authorize('update', $this->typeOfWorksService->getResource());
        return new ServiceResource($this->typeOfWorksService->getById($id));
    }

    public function update(ServiceUpdateRequest $request, $id)
    {
        $this->authorize('update', $this->typeOfWorksService->getResource());
        return new ServiceResource($this->typeOfWorksService->update($id, $request->all()));
    }

    public function destroy(Request $request, $id)
    {
        $this->authorize('delete', $this->typeOfWorksService->getResource());
        $this->typeOfWorksService->delete($id);
    }

    public function sort(ServiceSortRequest $request)
    {
        $this->authorize('update', $this->typeOfWorksService->getResource());
        $this->typeOfWorksService->changeSortBySequence($request->sequence);
    }
}
