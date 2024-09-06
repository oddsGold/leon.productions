<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::get('/cases', [App\Http\Controllers\Site\CaseController::class, 'index']);
Route::get('/about/information', [App\Http\Controllers\Site\AboutController::class, 'index']);
Route::get('/contact/information', [App\Http\Controllers\Site\ContactController::class, 'index']);
Route::get('/footer/information', [App\Http\Controllers\Site\FooterController::class, 'index']);


Route::middleware(['auth.ips'])->group(function(){
    Route::prefix('auth')->group(function () {

        Route::post('login',[App\Http\Controllers\Admin\Auth\LoginController::class, 'login']);

        Route::middleware(['auth:jwt/login'])->group(function(){
            Route::post('tfa',[App\Http\Controllers\Admin\Auth\TFAController::class, 'check'])->name('api.admin.auth.tfa');
            Route::get('tfa/forgot',[App\Http\Controllers\Admin\Auth\TFAController::class, 'forgot']);
        });

        Route::middleware(['auth:jwt/refresh'])->group(function(){
            Route::post('refresh-tokens',[App\Http\Controllers\Admin\Auth\LoginController::class, 'refresh'])->name('api.admin.auth.refresh');
        });

        Route::middleware(['auth:jwt/base'])->group(function(){
            Route::post('logout',[App\Http\Controllers\Admin\Auth\LoginController::class, 'logout']);
        });

    });

    Route::middleware(['auth:jwt/base'])->group(function(){


        Route::get('cases', [App\Http\Controllers\Admin\CaseController::class, 'index']);
        Route::get('cases/{id}', [App\Http\Controllers\Admin\CaseController::class, 'edit']);
        Route::post('cases/{id}', [App\Http\Controllers\Admin\CaseController::class, 'update']);
        Route::delete('cases/{id}', [App\Http\Controllers\Admin\CaseController::class, 'destroy']);
        Route::post('cases', [App\Http\Controllers\Admin\CaseController::class, 'store']);

        Route::get('about/services', [App\Http\Controllers\Admin\ServiceController::class, 'index']);
        Route::get('about/services/{id}', [App\Http\Controllers\Admin\ServiceController::class, 'edit']);
        Route::post('about/services/{id}', [App\Http\Controllers\Admin\ServiceController::class, 'update']);
        Route::delete('about/services/{id}', [App\Http\Controllers\Admin\ServiceController::class, 'destroy']);
        Route::post('about/services', [App\Http\Controllers\Admin\ServiceController::class, 'store']);

        Route::get('about/description', [App\Http\Controllers\Admin\AboutController::class, 'showDescription']);
        Route::post('about/description', [App\Http\Controllers\Admin\AboutController::class, 'updateDescription']);
        Route::get('about/contacts', [App\Http\Controllers\Admin\AboutController::class, 'showContacts']);
        Route::post('about/contacts', [App\Http\Controllers\Admin\AboutController::class, 'updateContacts']);
        Route::get('about/social/media', [App\Http\Controllers\Admin\AboutController::class, 'showSocialMedia']);
        Route::post('about/social/media', [App\Http\Controllers\Admin\AboutController::class, 'updateSocialMedia']);

        Route::get('contact/description', [App\Http\Controllers\Admin\ContactController::class, 'showDescription']);
        Route::post('contact/description', [App\Http\Controllers\Admin\ContactController::class, 'updateDescription']);
        Route::get('contact/contacts', [App\Http\Controllers\Admin\ContactController::class, 'showContacts']);
        Route::post('contact/contacts', [App\Http\Controllers\Admin\ContactController::class, 'updateContacts']);
        Route::get('contact/social/media', [App\Http\Controllers\Admin\ContactController::class, 'showSocialMedia']);
        Route::post('contact/social/media', [App\Http\Controllers\Admin\ContactController::class, 'updateSocialMedia']);

        Route::get('footer/contacts', [App\Http\Controllers\Admin\FooterController::class, 'showContacts']);
        Route::post('footer/contacts', [App\Http\Controllers\Admin\FooterController::class, 'updateContacts']);

        Route::get('users', [App\Http\Controllers\Admin\UserController::class, 'index']);
        Route::get('users/{id}', [App\Http\Controllers\Admin\UserController::class, 'edit']);
        Route::post('users/{id}', [App\Http\Controllers\Admin\UserController::class, 'update']);
        Route::delete('users/{id}', [App\Http\Controllers\Admin\UserController::class, 'destroy']);
        Route::post('users', [App\Http\Controllers\Admin\UserController::class, 'store']);

        Route::get('roles', [App\Http\Controllers\Admin\RoleController::class, 'index']);
        Route::get('roles/{id}', [App\Http\Controllers\Admin\RoleController::class, 'edit']);
        Route::post('roles/{id}', [App\Http\Controllers\Admin\RoleController::class, 'update']);
        Route::delete('roles/{id}', [App\Http\Controllers\Admin\RoleController::class, 'destroy']);
        Route::post('roles', [App\Http\Controllers\Admin\RoleController::class, 'store']);

        Route::get('resources', [App\Http\Controllers\Admin\ResourceController::class, 'index']);


        //Support service
        Route::get('files', [App\Http\Controllers\Admin\FileController::class, 'index']);
        Route::get('files/{id}',[App\Http\Controllers\Admin\FileController::class, 'show']);
        Route::delete('files/{id}', [App\Http\Controllers\Admin\FileController::class, 'destroy']);
        Route::post('files',[App\Http\Controllers\Admin\FileController::class, 'store']);

        Route::get('images', [App\Http\Controllers\Admin\ImageController::class, 'index']);
        Route::get('images/{id}',[App\Http\Controllers\Admin\ImageController::class, 'show']);
        Route::delete('images/{id}', [App\Http\Controllers\Admin\ImageController::class, 'destroy']);
        Route::post('images',[App\Http\Controllers\Admin\ImageController::class, 'store']);

        Route::get('account/menus',[App\Http\Controllers\Admin\MenuController::class, 'index']);
        Route::post('account/password',[App\Http\Controllers\Admin\AccountController::class, 'password']);
        Route::post('account/email',[App\Http\Controllers\Admin\AccountController::class, 'email']);
        Route::get('account',[App\Http\Controllers\Admin\AccountController::class, 'index']);

    });

});
