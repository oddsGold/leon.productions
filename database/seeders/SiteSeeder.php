<?php


namespace Database\Seeders;


use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class SiteSeeder extends Seeder
{


    public function run()
    {

        $user = \App\Models\User::query()->first();
        if(!is_null($user)){


        }
    }

}
