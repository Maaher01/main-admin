<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Component extends Model
{
    use HasFactory;

    protected $fillable = [
        '_title',
        '_subtitle',
        '_description',
        '_status',
        '_menuid',
        '_sectionid',
        '_link',
        '_videourl',
        '_sort',
        '_image',
    ]; 
}
