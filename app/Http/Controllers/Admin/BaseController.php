<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

class BaseController extends Controller
{

    public function index()
    {
        return view('admin.pages.index');
    }
}
