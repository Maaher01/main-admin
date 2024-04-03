<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        '_title',
        '_subtitle',
        '_description',
        '_countryid',
        '_degreeid',
        '_universityid',
        '_livingcost',
        '_tutionfees',
        '_applicationfees',
        '_programintake',
        '_programintakeopendate',
        '_programintakedeadline',
        '_document',
        '_credit',
        '_duration'
    ];
}
