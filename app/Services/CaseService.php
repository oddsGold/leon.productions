<?php

namespace App\Services;

use App\Contracts\CRUD;
use App\Models\VideoCase as VideoCaseModel;
use App\Services\Admin\Query\OptionsService;

class CaseService extends CRUDService implements CRUD
{
    protected string $model = VideoCaseModel::class;
    protected ImageService $imageService;

    public function __construct(OptionsService $queryOptions, ImageService $imageService)
    {
        parent::__construct($queryOptions);
        $this->imageService = $imageService;
    }

    public function getAll()
    {
        return $this->getModel()
            ->newQuery()
            ->published()
            ->get();
    }

    public function create($data)
    {
        return $this->save(new $this->model, $data);
    }

    public function update($id, $data)
    {
        return $this->save($this->getById($id), $data);
    }

    protected function save($model, $data)
    {
        $model->fill($data);
        $model->user()->associate(auth()->user());
        if(isset($data['image']) && $data['image']){
            $model->image()->associate($this->imageService->getById($data['image']['id'] ?? null));
        }
        if(isset($data['image']) && is_null($data['image']) && !is_null($model->image)){
            $model->image()->dissociate();
        }
        $model->save();
        return $model;
    }
}
