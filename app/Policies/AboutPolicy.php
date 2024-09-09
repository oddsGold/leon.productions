<?php

namespace App\Policies;


use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class AboutPolicy
{
    use HandlesAuthorization;

    protected $model = 'App\Models\About';

    public function viewAny(User $user)
    {
        return $this->hasPermission($user, 'view') ||
            $this->isAdmin($user) ||
            $this->isSuperAdmin($user);
    }

    public function view(User $user)
    {
        return $this->hasPermission($user, 'view') ||
            $this->isAdmin($user) ||
            $this->isSuperAdmin($user);
    }

    public function create(User $user)
    {
        return $this->hasPermission($user, 'create') ||
            $this->isAdmin($user) ||
            $this->isSuperAdmin($user);
    }

    public function update(User $user)
    {
        return $this->hasPermission($user, 'update') ||
            $this->isAdmin($user) ||
            $this->isSuperAdmin($user);
    }

    public function delete(User $user)
    {
        return $this->hasPermission($user, 'delete') ||
            $this->isAdmin($user) ||
            $this->isSuperAdmin($user);
    }

    public function restore(User $user)
    {
        return $this->hasPermission($user, 'delete') ||
            $this->isAdmin($user) ||
            $this->isSuperAdmin($user);
    }

    public function forceDelete(User $user)
    {
        return $this->hasPermission($user, 'delete') ||
            $this->isAdmin($user) ||
            $this->isSuperAdmin($user);
    }

    protected function hasPermission($user, $name)
    {
        return $user->role->resource($this->getResource())->hasPermission($name);
    }

    protected function getResource()
    {
        return $this->model;
    }

    protected function isAdmin($user)
    {
        return $user->role->isAdmin();
    }

    protected function isSuperAdmin($user)
    {
        return $user->role->isSuperAdmin();
    }

}
