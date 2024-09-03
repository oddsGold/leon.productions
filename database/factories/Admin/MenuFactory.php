<?php

namespace Database\Factories\Admin;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Admin\Menu;

class MenuFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Menu::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'parent_id' => null,
            'name' => $this->faker->unique()->word(),
            'urn' => null
        ];
    }
}
