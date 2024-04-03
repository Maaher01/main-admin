<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Companyprofile extends Model
{
    use HasFactory;


    protected $fillable = [
        '_name',
        '_email',
        '_mobile',
        '_latlong',
        '_description',
        '_phone',
        '_website',
        '_image'
    ];
}
