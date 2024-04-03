<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Newsfeed extends Model
{
    use HasFactory;
    protected $fillable = [
        '_title',
        '_subtitle',
        '_image',
        '_date',
        '_status'
    ];
}
