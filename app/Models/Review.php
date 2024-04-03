<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;
    protected $fillable = [
        '_title',
        '_subtitle',
        '_description',
        '_status',
        '_image',
    ]; 
}
