<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    use HasFactory;

    protected $fillable = [
        '_title',
        '_subtitle',
        '_heading',
        '_subheading',
        '_description',
        '_status',
        '_menuid',
        '_link',
        '_videourl',
        '_sort',
        '_image',
    ]; 
}
