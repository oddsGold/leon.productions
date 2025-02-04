<?php

namespace App\Models;

use App\Extensions\Published;
use App\Extensions\Sortable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class VideoCase extends Model
{
    use HasFactory,
        SoftDeletes,
        Sortable,
        Published;

    protected $table = 'cases';

    protected $fillable = [
        'slug',
        'description',
        'image_id',
        'preview_url',
        'main_url',
        'published',
        'published_at',
        'published_to',
        'position',
    ];

    protected $dates = [
        'published_at', 'published_to'
    ];

    public $sortable = [
        'id'
    ];

    public function image()
    {
        return $this->belongsTo(Image::class,'image_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
