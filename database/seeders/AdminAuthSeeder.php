<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class AdminAuthSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        ///// RESOURCES

        $userResource = \App\Models\Resource::factory()->create(['name' => \App\Models\User::class, 'label' => 'Пользователи']);
        $roleResource = \App\Models\Resource::factory()->create(['name' => \App\Models\Role::class, 'label' => 'Роли пользователей']);



        ///// PERMISSIONS
        $viewPermission = \App\Models\Permission::factory()->create(['name' => 'view', 'label' => 'Просмотр']);
        $createPermission = \App\Models\Permission::factory()->create(['name' => 'create', 'label' => 'Создение']);
        $updatePermission = \App\Models\Permission::factory()->create(['name' => 'update', 'label' => 'Изминение']);
        $deletePermission = \App\Models\Permission::factory()->create(['name' => 'delete', 'label' => 'Удаление']);



        ///// USER ROLES
        \App\Models\Role::factory()
            ->has(\App\Models\User::factory()->state(['login' => 'user_chadyk', 'tfa' => 0])->count(1), 'users')
            ->has(\App\Models\User::factory()->state(['login' => 'user_sulym', 'tfa' => 0])->count(1), 'users')


            ->hasAttached($userResource,['permission_id' => $viewPermission->id])
            ->hasAttached($userResource,['permission_id' => $createPermission->id])
            ->hasAttached($userResource,['permission_id' => $updatePermission->id])
            ->hasAttached($userResource,['permission_id' => $deletePermission->id])

            ->hasAttached($roleResource,['permission_id' => $viewPermission->id])
            ->hasAttached($roleResource,['permission_id' => $createPermission->id])
            ->hasAttached($roleResource,['permission_id' => $updatePermission->id])
            ->hasAttached($roleResource,['permission_id' => $deletePermission->id])

            ->create(['name' => \App\Models\Role::SUPER_ADMIN_NAME, 'label' => 'Супер администратор']);



        \App\Models\Role::factory()
            ->has(\App\Models\User::factory()->state(['login' => 'user_test', 'tfa' => 1])->count(1), 'users')
            ->has(\App\Models\User::factory()->state(['login' => 'user_test_2', 'tfa' => 1])->count(1), 'users')


            ->hasAttached($userResource,['permission_id' => $viewPermission->id])
            ->hasAttached($userResource,['permission_id' => $createPermission->id])
            ->hasAttached($userResource,['permission_id' => $updatePermission->id])
            ->hasAttached($userResource,['permission_id' => $deletePermission->id])

            ->hasAttached($roleResource,['permission_id' => $viewPermission->id])
            ->hasAttached($roleResource,['permission_id' => $createPermission->id])
            ->hasAttached($roleResource,['permission_id' => $updatePermission->id])
            ->hasAttached($roleResource,['permission_id' => $deletePermission->id])


            ->create(['name' => \App\Models\Role::ADMIN_NAME, 'label' => 'Администратор']);




        \App\Models\Role::factory()
            ->has(\App\Models\User::factory()->state([
                'login' => 'HttpExceptionRobot',
                'password' => null,
            ]), 'users')
            ->create(['name' => \App\Models\Role::HTTP_EXCEPTION_NAME, 'label' => 'Отправщик уведомлений exceptions']);

        \App\Models\Role::factory()
            ->has(\App\Models\User::factory()->state([
                'login' => 'ErrorExceptionRobot',
                'password' => null,
            ]), 'users')
            ->create(['name' => \App\Models\Role::ERROR_EXCEPTION_NAME, 'label' => 'Отправщик уведомлений error']);




        ///// ADMIN MENU



        $usersParent = \App\Models\Admin\Menu::factory()->create(['name' => 'Пользователи']);
        \App\Models\Admin\Menu::factory()
            ->for($usersParent, 'parents')
            ->for($userResource, 'resource')
            ->create([
            'name' => 'Пользователи',
            'urn' => '/admin/users'
        ]);
        \App\Models\Admin\Menu::factory()
            ->for($usersParent, 'parents')
            ->for($roleResource, 'resource')
            ->create([
            'name' => 'Роли',
            'urn' => '/admin/roles'
        ]);


    }
}
