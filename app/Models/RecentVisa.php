<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecentVisa extends Model
{
    use HasFactory;
    protected $fillable = [
        '_image',
        '_status',
    ];
}