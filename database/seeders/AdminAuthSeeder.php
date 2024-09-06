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


        $caseResource = \App\Models\Resource::factory()->create(['name' => \App\Models\VideoCase::class, 'label' => 'Кейсы']);
        $aboutResource = \App\Models\Resource::factory()->create(['name' => 'App\Models\About', 'label' => 'About']);
        $contactResource = \App\Models\Resource::factory()->create(['name' => 'App\Models\Contact', 'label' => 'Contact']);
        $footerResource = \App\Models\Resource::factory()->create(['name' => 'App\Models\Footer', 'label' => 'Footer']);
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

         \App\Models\Admin\Menu::factory()
             ->for($caseResource, 'resource')
             ->create([
                 'name' => 'Кейсы',
                 'urn' => '/admin/cases'
             ]);

        $aboutParent = \App\Models\Admin\Menu::factory()->create(['name' => 'About']);
        \App\Models\Admin\Menu::factory()
            ->for($aboutParent, 'parents')
            ->for($aboutResource, 'resource')
            ->create([
                'name' => 'Копирайт',
                'urn' => '/admin/about/copyright'
            ]);
        \App\Models\Admin\Menu::factory()
            ->for($aboutParent, 'parents')
            ->for($aboutResource, 'resource')
            ->create([
                'name' => 'Услуги',
                'urn' => '/admin/about/services'
            ]);
        \App\Models\Admin\Menu::factory()
            ->for($aboutParent, 'parents')
            ->for($aboutResource, 'resource')
            ->create([
                'name' => 'Контакты',
                'urn' => '/admin/about/contacts'
            ]);
        \App\Models\Admin\Menu::factory()
            ->for($aboutParent, 'parents')
            ->for($aboutResource, 'resource')
            ->create([
                'name' => 'Социальные сети',
                'urn' => '/admin/about/socials'
            ]);

        $contactParent = \App\Models\Admin\Menu::factory()->create(['name' => 'Contact']);
        \App\Models\Admin\Menu::factory()
            ->for($contactParent, 'parents')
            ->for($contactResource, 'resource')
            ->create([
                'name' => 'Копирайт',
                'urn' => '/admin/contact/copyright'
            ]);
        \App\Models\Admin\Menu::factory()
            ->for($contactParent, 'parents')
            ->for($contactResource, 'resource')
            ->create([
                'name' => 'Контакты',
                'urn' => '/admin/contact/contacts'
            ]);
        \App\Models\Admin\Menu::factory()
            ->for($contactParent, 'parents')
            ->for($contactResource, 'resource')
            ->create([
                'name' => 'Социальные сети',
                'urn' => '/admin/contact/socials'
            ]);

        $footerParent = \App\Models\Admin\Menu::factory()->create(['name' => 'Footer']);
        \App\Models\Admin\Menu::factory()
            ->for($footerParent, 'parents')
            ->for($footerResource, 'resource')
            ->create([
                'name' => 'Контакты',
                'urn' => '/admin/footer/contacts'
            ]);
        \App\Models\Admin\Menu::factory()
            ->for($footerParent, 'parents')
            ->for($footerResource, 'resource')
            ->create([
                'name' => 'Социальные сети',
                'urn' => '/admin/footer/socials'
            ]);


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
