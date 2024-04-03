<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Studentregistration extends Model
{
    use HasFactory;

    protected $fillable = [
        '_name',
        '_dob',
        '_email',
        '_mobile',
        '_ielts',
        '_countryid',
        '_qualification',
        '_passport',
        '_status',
    ];
}
