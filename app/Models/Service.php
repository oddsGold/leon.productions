<?php

namespace App\Models;

use App\Extensions\Sortable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Service extends Model
{
    use HasFactory,
        SoftDeletes,
        Sortable;

    protected $fillable = [
        'name',
        'position',
    ];

    public $sortable = [
        'id', 'name'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
