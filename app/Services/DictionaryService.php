<?php

namespace App\Services;

use App\Models\Dictionary;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class DictionaryService
{

    protected string $model = Dictionary::class;
    protected string $cache_name = 'dictionary';
    protected int $cache_time_to_live = 2592000;


    public function get($key, $default = null): null|bool|string|int
    {
        if($elements = $this->getAllFromCache()){
            if(isset($elements[$key])){
                return $elements[$key];
            }
        }
        return $default;
    }

    public function getAll(): array
    {
        $elements = [];
        foreach ($this->getModel()->newQuery()->get() as $element){
            $elements[$element->key] = $this->convertToDataType(
                !is_null($element->small_value) ? $element->small_value : ($element->value ?: $element->long_value),
                $element->type
            );
        }
        return $elements;
    }

    public function set($key, $value): void
    {
        $model = $this->getModelOrCreate($key);
        $model->key = $key;
        $model->type = $this->getDataType($value);
        $model->small_value = null;
        $model->value = null;
        $model->long_value = null;
        if(is_bool($value) || is_int($value)){
            $model->small_value = $value;
        }
        if(is_string($value) && Str::length($value) < 200){
            $model->value = $value;
        }
        if(is_string($value) && Str::length($value) >= 200){
            $model->long_value = $value;
        }
        $model->user()->associate(auth()->user());
        $model->save();

        Cache::forget($this->cache_name);
        $this->getAllFromCache();
    }

    protected function getAllFromCache(): array
    {
        return Cache::remember($this->cache_name, $this->cache_time_to_live, function(){
            return $this->getAll();
        });
    }

    protected function getModel()
    {
        return new $this->model;
    }

    public function getModelOrCreate($key): Dictionary
    {
        if($element = $this->getModel()->newQuery()->key($key)->first()){
            return $element;
        }
        return $this->getModel();
    }

    protected function getDataType($value): string
    {
        if(is_bool($value))
            return 'boolean';
        if(is_int($value))
            return 'integer';
        if(is_null($value))
            return 'null';
        return 'string';
    }

    protected function convertToDataType($value, $type): null|bool|string|int
    {
        switch ($type){
            case 'boolean': return (bool)$value;
            case 'integer': return (int)$value;
            case 'null': return null;
            default: return (string)$value;
        }
    }

}
