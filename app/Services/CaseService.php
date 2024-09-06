<?php

namespace App\Services;

use App\Contracts\CRUD;
use App\Models\VideoCase as VideoCaseModel;

class CaseService extends CRUDService implements CRUD
{
    protected string $model = VideoCaseModel::class;


    public function getAll()
    {
        return $this->getModel()
            ->newQuery()
            ->published()
            ->latest()
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
        $model->slug = $this->fillSlug($model->slug, $model->description);
        $model->user()->associate(auth()->user());
        $model->save();
        return $model;
    }
}
