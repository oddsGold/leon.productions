<?php

namespace App\Services\About;

use App\Contracts\CRUD;
use App\Models\Service as ServiceModel;
use App\Services\CRUDService;

class TypeOfWorksService extends CRUDService implements CRUD
{
    protected string $model = ServiceModel::class;

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
        $model->save();
        return $model;
    }

    public function getResource(): string
    {
        return 'App\Models\About';
    }

}
